import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch {
    // Silent check for connection availability
    return false;
  }
}

export async function signInWithGoogle() {
  // If API key is placeholder demo key, skip popup call to prevent red console errors
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('DemoKey')) {
    throw new Error('AUTH_DEMO_KEY_UNCONFIGURED');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: unknown) {
    const errString = String(error);
    if (errString.includes('api-key-not-valid') || errString.includes('auth/invalid-api-key')) {
      throw new Error('AUTH_DEMO_KEY_UNCONFIGURED');
    }
    throw error;
  }
}

export async function logOut() {
  try {
    await firebaseSignOut(auth);
  } catch {
    // Silent catch
  }
}

export async function saveQuizResultToFirestore(
  user: User,
  topicId: string,
  topicTitle: string,
  lobId: string,
  score: number,
  totalQuestions: number,
  passed: boolean
) {
  const path = `users/${user.uid}/quizResults`;
  try {
    await addDoc(collection(db, path), {
      userId: user.uid,
      topicId,
      topicTitle,
      lobId,
      score,
      totalQuestions,
      passed,
      completedAt: new Date().toISOString(),
      timestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function submitTrainerQuestionToFirestore(
  user: User,
  questionText: string,
  category: string,
  lobId: string
) {
  const path = 'trainerQuestions';
  try {
    await addDoc(collection(db, path), {
      userId: user.uid,
      userEmail: user.email || 'agent@pomegran.com',
      userName: user.displayName || 'Agent',
      lobId,
      question: questionText,
      category,
      status: 'pending',
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
