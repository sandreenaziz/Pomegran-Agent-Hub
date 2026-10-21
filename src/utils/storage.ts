/**
 * Local storage manager for agent progress tracking
 */
import { LobId } from '../data/content';

const KEYS = {
  LAST_LOB: 'pomegran_last_lob',
  QUIZ_RESULTS: 'pomegran_quiz_results',
  SCENARIO_RESULTS: 'pomegran_scenario_results',
  COMPLETED_LESSONS: 'pomegran_completed_lessons',
  WATCHED_VIDEOS: 'pomegran_watched_videos',
  AGENT_PROFILE: 'pomegran_agent_profile',
};

export interface QuizResult {
  topicId: string;
  lobId: LobId;
  score: number; // 0 - 5
  percentage: number;
  passed: boolean;
  completedAt: string;
}

export interface ScenarioResult {
  scenarioId: string;
  lobId: LobId;
  score: number; // 0 - 100
  completedAt: string;
}

export interface AgentProfile {
  name: string;
  agentId: string;
}

export function getLastLob(): LobId | null {
  try {
    const val = localStorage.getItem(KEYS.LAST_LOB);
    if (val && ['csr', 'tsr', 'sales', 'activation', 'canquest'].includes(val)) {
      return val as LobId;
    }
    return null;
  } catch {
    return null;
  }
}

export function setLastLob(lob: LobId): void {
  try {
    localStorage.setItem(KEYS.LAST_LOB, lob);
  } catch (e) {
    console.error('Storage error', e);
  }
}

export function getQuizResults(): Record<string, QuizResult> {
  try {
    const raw = localStorage.getItem(KEYS.QUIZ_RESULTS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveQuizResult(result: QuizResult): void {
  try {
    const current = getQuizResults();
    current[result.topicId] = result;
    localStorage.setItem(KEYS.QUIZ_RESULTS, JSON.stringify(current));
  } catch (e) {
    console.error('Storage error', e);
  }
}

export function getScenarioResults(): Record<string, ScenarioResult> {
  try {
    const raw = localStorage.getItem(KEYS.SCENARIO_RESULTS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveScenarioResult(result: ScenarioResult): void {
  try {
    const current = getScenarioResults();
    current[result.scenarioId] = result;
    localStorage.setItem(KEYS.SCENARIO_RESULTS, JSON.stringify(current));
  } catch (e) {
    console.error('Storage error', e);
  }
}

export function getCompletedLessons(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.COMPLETED_LESSONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleLessonComplete(lessonId: string): boolean {
  try {
    const list = getCompletedLessons();
    const exists = list.includes(lessonId);
    let updated: string[];
    if (exists) {
      updated = list.filter((id) => id !== lessonId);
    } else {
      updated = [...list, lessonId];
    }
    localStorage.setItem(KEYS.COMPLETED_LESSONS, JSON.stringify(updated));
    return !exists;
  } catch (e) {
    console.error('Storage error', e);
    return false;
  }
}

export function getWatchedVideos(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.WATCHED_VIDEOS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleWatchedVideo(videoId: string): boolean {
  try {
    const list = getWatchedVideos();
    const exists = list.includes(videoId);
    let updated: string[];
    if (exists) {
      updated = list.filter((id) => id !== videoId);
    } else {
      updated = [...list, videoId];
    }
    localStorage.setItem(KEYS.WATCHED_VIDEOS, JSON.stringify(updated));
    return !exists;
  } catch (e) {
    console.error('Storage error', e);
    return false;
  }
}

export function getAgentProfile(): AgentProfile {
  try {
    const raw = localStorage.getItem(KEYS.AGENT_PROFILE);
    return raw ? JSON.parse(raw) : { name: '', agentId: '' };
  } catch {
    return { name: '', agentId: '' };
  }
}

export function saveAgentProfile(profile: AgentProfile): void {
  try {
    localStorage.setItem(KEYS.AGENT_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Storage error', e);
  }
}
