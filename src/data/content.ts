/**
 * Pomegran Account – Agent Hub Content Repository
 * Author: Sandrine Aziz
 * Date: Oct 15, 2026
 *
 * All LOBs, Hot Topics, Quizzes, Scenarios, Soft Skills Lessons, and Videos
 * are configured in this single structured file.
 */

export interface AppSettings {
  appName: string;
  tagline: string;
  welcomeLine: string;
  trainerEmail: string;
  passMarkPercentage: number;
  documentDate: string;
  author: string;
}

export const SETTINGS: AppSettings = {
  appName: "Pomegran Account – Agent Hub",
  tagline: "One place to learn, practice, and get answers",
  welcomeLine: "Pick your team to start learning",
  trainerEmail: "Sandreen.aziz@intelcia.com",
  passMarkPercentage: 80,
  documentDate: "Oct 15, 2026",
  author: "@Sandrine Aziz",
};

export type LobId = 'csr' | 'tsr' | 'sales' | 'activation' | 'canquest';

export interface LobConfig {
  id: LobId;
  name: string;
  fullName: string;
  description: string;
  focusArea: string;
  badgeLabel: string;
  bgImage: string;
  accent: {
    primary: string; // Tailwind hex or class reference
    light: string;
    border: string;
    text: string;
    tagBg: string;
  };
}

import csrBg from '../assets/images/lob_bg_csr_1792089527777.jpg';
import tsrBg from '../assets/images/lob_bg_tsr_1792089528442.jpg';
import salesBg from '../assets/images/lob_bg_sales_1792089529315.jpg';
import activationBg from '../assets/images/lob_bg_activation_1792089528791.jpg';
import canquestBg from '../assets/images/lob_bg_canquest_1792089528824.jpg';

export const LOBS: LobConfig[] = [
  {
    id: 'csr',
    name: 'CSR',
    fullName: 'Customer Service Representative',
    description: 'Inbound account questions, billing, and complaints',
    focusArea: 'Inbound account questions, billing, complaints',
    badgeLabel: 'Customer Service',
    bgImage: csrBg,
    accent: {
      primary: '#BA1E38', // Official Pomegran Crimson from OIP.webp
      light: '#FFF1F3',
      border: '#FBCDD3',
      text: '#BA1E38',
      tagBg: '#FFE4E8',
    },
  },
  {
    id: 'tsr',
    name: 'TSR',
    fullName: 'Technical Support Representative',
    description: 'Troubleshooting, access issues, and escalation steps',
    focusArea: 'Troubleshooting, access issues, escalation steps',
    badgeLabel: 'Tech Support',
    bgImage: tsrBg,
    accent: {
      primary: '#1D4ED8', // Blue 700
      light: '#EFF6FF',
      border: '#BFDBFE',
      text: '#1D4ED8',
      tagBg: '#DBEAFE',
    },
  },
  {
    id: 'sales',
    name: 'Sales',
    fullName: 'Sales Representative',
    description: 'Product positioning, upgrades, and closing',
    focusArea: 'Product positioning, upgrades, closing',
    badgeLabel: 'Commercial & Growth',
    bgImage: salesBg,
    accent: {
      primary: '#047857', // Emerald 700
      light: '#ECFDF5',
      border: '#A7F3D0',
      text: '#047857',
      tagBg: '#D1FAE5',
    },
  },
  {
    id: 'activation',
    name: 'Activation',
    fullName: 'Activation Specialist',
    description: 'New account setup, verification, and first-use guidance',
    focusArea: 'New account setup, verification, first-use guidance',
    badgeLabel: 'Onboarding & Setup',
    bgImage: activationBg,
    accent: {
      primary: '#6D28D9', // Purple 700
      light: '#F5F3FF',
      border: '#DDD6FE',
      text: '#6D28D9',
      tagBg: '#EDE9FE',
    },
  },
  {
    id: 'canquest',
    name: 'Canquest',
    fullName: 'Canquest Queue (CSR · TSR · Sales)',
    description: 'Dedicated multi-skill queue handling customer service, technical support, and sales',
    focusArea: 'Multi-skill queue: Customer service, technical troubleshooting, and sales inquiries',
    badgeLabel: 'CSR · TSR · Sales',
    bgImage: canquestBg,
    accent: {
      primary: '#B45309', // Amber 700
      light: '#FFFBEB',
      border: '#FDE68A',
      text: '#B45309',
      tagBg: '#FEF3C7',
    },
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface HotTopic {
  id: string;
  lobId: LobId;
  title: string;
  teaser: string;
  updatedDate: string;
  readTime: string;
  isNew: boolean;
  summary: string;
  keyPoints: string[];
  doAndDont: {
    dos: string[];
    donts: string[];
  };
  quizQuestions: QuizQuestion[];
}

export interface ScenarioOption {
  id: string;
  text: string;
  rating: 'best' | 'acceptable' | 'poor';
  points: number;
  customerReaction: string;
  reason: string;
  nextStepId?: string;
}

export interface ScenarioStep {
  prompt: string;
  options: ScenarioOption[];
}

export interface Scenario {
  id: string;
  lobId: LobId;
  title: string;
  channel: 'Phone Call' | 'Inbound Chat';
  customerName: string;
  customerMood: string;
  difficulty: 'Standard' | 'Challenging';
  setup: string;
  firstStep: ScenarioStep;
  secondSteps: Record<string, ScenarioStep>;
  idealPath: string;
  takeaway: string;
}

export interface SoftSkillLesson {
  id: string;
  title: string;
  coreIdea: string;
  readTime: string;
  whyItMatters: string;
  techniqueSteps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  sayThis: string;
  notThis: string;
  quizQuestions: QuizQuestion[];
}

export interface VideoItem {
  id: string;
  lobId: LobId | 'all';
  title: string;
  duration: string;
  description: string;
  tags: string[];
  url: string;
  speaker: string;
  keyTakeaways: string[];
}

// -------------------------------------------------------------
// HOT TOPICS (3 per LOB, 5 quiz questions each)
// -------------------------------------------------------------
export const HOT_TOPICS: HotTopic[] = [
  // CSR TOPICS
  {
    id: 'csr-refund-policy',
    lobId: 'csr',
    title: 'Updated Refund Policy & Fee Discretion',
    teaser: 'Guidelines on automatic credits, service outage adjustments, and manager approval tiers.',
    updatedDate: 'Oct 14, 2026',
    readTime: '3 min read',
    isNew: true,
    summary: 'The Q4 refund policy gives front-line CSRs direct authorization to issue goodwill credits up to $50 without supervisor sign-off, provided the account has no recurring abuse flags.',
    keyPoints: [
      'Frontline agents can issue up to $50 credit per billing cycle for verified discrepancies.',
      'Credits above $50 require Tier 2 lead sign-off with documented verification.',
      'Bank fee adjustments (NSF caused by Pomegran billing error) require an official bank transaction statement.',
      'Always log the root reason code (e.g., BILL_ERR_DUPLICATE or OUTAGE_PRORATED) in the CRM billing tab.'
    ],
    doAndDont: {
      dos: [
        'Acknowledge the monetary discrepancy immediately before explaining timeline rules.',
        'Apply the standard credit code within the session so the customer receives SMS confirmation.',
        'Advise that credit card reversals reflect within 3 to 5 business days.'
      ],
      donts: [
        'Never promise an instant same-day credit card chargeback to the customer bank.',
        'Do not issue multiple sub-$50 credits in separate tickets to bypass supervisor approval limits.',
        'Never argue over bank statement validity if the customer uploaded a clear digital screenshot.'
      ]
    },
    quizQuestions: [
      {
        id: 'csr-rp-q1',
        question: 'What is the maximum credit a frontline CSR can issue independently under the updated policy?',
        options: ['$25 per year', '$50 per billing cycle', '$100 with verbal notice', '$15 per incident'],
        correctIndex: 1,
        explanation: 'Frontline agents hold up to $50 credit autonomy per billing cycle for legitimate account discrepancies.'
      },
      {
        id: 'csr-rp-q2',
        question: 'What is required when a customer requests reimbursement for an NSF fee caused by a billing error?',
        options: ['Oral verification only', 'Official bank transaction proof/statement', 'Manager in-person review', 'Police report'],
        correctIndex: 1,
        explanation: 'Bank fee reimbursements require an official bank statement showing the date, charge, and resulting NSF fee.'
      },
      {
        id: 'csr-rp-q3',
        question: 'How long does a processed credit take to show on the customer’s external card or banking ledger?',
        options: ['Instantly upon click', '3 to 5 business days', '30 calendar days', 'At the next fiscal quarter'],
        correctIndex: 1,
        explanation: 'Card issuers and banks take 3 to 5 business days to clear merchant credits to cardholder accounts.'
      },
      {
        id: 'csr-rp-q4',
        question: 'An agent wants to issue $80 in credit. Can they split it into two $40 requests to avoid escalations?',
        options: [
          'Yes, if the customer is polite',
          'Yes, if done on different days',
          'No, splitting amounts to bypass threshold limits violates policy and triggers an audit',
          'Yes, as long as the total remains under $100'
        ],
        correctIndex: 2,
        explanation: 'Structuring or splitting credits to circumvent lead approval violates financial compliance policies.'
      },
      {
        id: 'csr-rp-q5',
        question: 'What must an agent do immediately after issuing a valid account credit in the CRM?',
        options: [
          'Delete the previous notes',
          'Apply the exact root reason code and notify the customer of confirmation SMS',
          'Transfer the call to supervisor queue',
          'Mute the headset for 60 seconds'
        ],
        correctIndex: 1,
        explanation: 'Recording the proper root cause code ensures financial reporting accuracy and automated customer confirmation.'
      }
    ]
  },
  {
    id: 'csr-verify-identity',
    lobId: 'csr',
    title: 'Verifying Caller Identity & Security Standards',
    teaser: 'Two-factor confirmation protocols, third-party callers, and protecting customer data.',
    updatedDate: 'Oct 12, 2026',
    readTime: '3 min read',
    isNew: false,
    summary: 'Always confirm identity before discussing or changing account details. Multi-factor verification protects sensitive customer data and prevents unauthorized SIM swaps or identity compromise.',
    keyPoints: [
      'Require two standard identifiers (Account PIN/One-Time Code plus registered billing address or DOB).',
      'Never read out the customer’s full credit card number, full address, or password to them.',
      'Unverified callers may only receive general package information; zero account-specific records.',
      'Document every verification outcome: passed, failed, or alternate OTP sent.'
    ],
    doAndDont: {
      dos: [
        'Ask open questions: "Could you please confirm the billing street address on file?"',
        'Offer the SMS One-Time Passcode (OTP) when the customer cannot recall their security PIN.',
        'Politely explain privacy safeguards when declining an unverified request.'
      ],
      donts: [
        'Never ask: "Is your address 123 Maple Street?" (Never supply the answer).',
        'Do not share account balances or billing history if identity is only partially established.',
        'Never allow an unauthorized spouse or roommate access without an authorized contact flag on file.'
      ]
    },
    quizQuestions: [
      {
        id: 'csr-vi-q1',
        question: 'A caller asks for their balance but cannot answer their security PIN or questions. What should the agent do?',
        options: [
          'Give the balance anyway if they seem honest',
          'Politely explain that verification is required and offer the alternative OTP method',
          'Transfer the call to another agent without comment',
          'Hang up immediately without an explanation'
        ],
        correctIndex: 1,
        explanation: 'Access is only granted after verification; offering an alternative OTP preserves security and helpfulness.'
      },
      {
        id: 'csr-vi-q2',
        question: 'How should you prompt a customer for their registered billing address?',
        options: [
          '"Are you still living at 450 Elm Street?"',
          '"Can you please confirm your street number and postal code on file?"',
          '"Is your postal code M4B 1B3?"',
          '"I see you are in Toronto, correct?"'
        ],
        correctIndex: 1,
        explanation: 'Agents must prompt with open-ended verification rather than providing answers for the caller to confirm.'
      },
      {
        id: 'csr-vi-q3',
        question: 'A caller states they are the account holder’s son and needs to check the bill. His name is NOT on file. What is the rule?',
        options: [
          'Provide the bill if he shares the same surname',
          'Politely inform him that account details can only be released to authorized names on the profile',
          'Change the account holder name to the son',
          'Ask him to guess the password three times'
        ],
        correctIndex: 1,
        explanation: 'Only authorized contacts named in the account CRM may access private billing and profile records.'
      },
      {
        id: 'csr-vi-q4',
        question: 'What is the role of an SMS One-Time Passcode (OTP) when security PIN is forgotten?',
        options: [
          'It is a backup verification method sent directly to the verified mobile on file',
          'It deletes the customer PIN permanently',
          'It is only for marketing subscriptions',
          'It requires a manager override'
        ],
        correctIndex: 0,
        explanation: 'An OTP sent to the primary registered device verifies physical possession of the authenticated line.'
      },
      {
        id: 'csr-vi-q5',
        question: 'Why must verification attempts be logged in the CRM notes?',
        options: [
          'To generate spam marketing emails',
          'To track security attempts and alert colleagues if suspicious repeated failures occur',
          'To reduce agent handle time scores',
          'It is not required if the caller fails'
        ],
        correctIndex: 1,
        explanation: 'Logging verification helps detect targeted social engineering attempts and protects the customer account.'
      }
    ]
  },
  {
    id: 'csr-billing-disputes',
    lobId: 'csr',
    title: 'Handling Billing Disputes & Proration Clarification',
    teaser: 'Demystifying midterm plan changes, prorated fees, and roaming overage investigations.',
    updatedDate: 'Oct 09, 2026',
    readTime: '4 min read',
    isNew: false,
    summary: 'Billing confusion is the #1 driver of customer frustration. Clear, empathetic explanations of bill cycles, cycle cut-off dates, and prorated charges prevent repeat inbound calls.',
    keyPoints: [
      'Explain that the first bill after a plan change covers both the prorated partial cycle and the upcoming month in advance.',
      'Walk through the bill PDF item by item using shared screen or invoice line indicators.',
      'Check roaming and data overage timestamps against tower logs before assuming customer error.',
      'Offer automated payment discounts ($5/mo) to soften rate adjustment concerns.'
    ],
    doAndDont: {
      dos: [
        'Acknowledge: "I know looking at an unexpected balance is stressful. Let me break down the line items with you."',
        'Use simple calendar math: "From Oct 3 to Oct 15 is 12 days on Plan A, and Oct 16 to Nov 15 is the new Plan B."',
        'Provide the customer with the revised total after adjustments.'
      ],
      donts: [
        'Avoid jargon like "advance billed recurring accruals" or "arrears ledger adjustments".',
        'Do not dismiss overage claims as "you must have streamed YouTube" without checking data buckets.',
        'Never hang up without confirming the customer understands the next month’s expected bill amount.'
      ]
    },
    quizQuestions: [
      {
        id: 'csr-bd-q1',
        question: 'Why is the first invoice after upgrading a plan higher than the advertised monthly price?',
        options: [
          'Pomegran adds a mandatory 50% penalty',
          'It includes prorated charges for days used on the new plan plus the upcoming month billed in advance',
          'Upgraded plans always double the taxes permanently',
          'It is a system glitch that always requires a full refund'
        ],
        correctIndex: 1,
        explanation: 'Telecommunication billing bills the upcoming month in advance plus the prorated difference of the current cycle.'
      },
      {
        id: 'csr-bd-q2',
        question: 'What is the most effective way to explain a prorated bill to a confused caller?',
        options: [
          'Read the fine print from the terms of service verbatim',
          'Break down the billing dates into plain daily intervals and contrast the two plan segments',
          'Tell them to wait for the second invoice to see if it fixes itself',
          'Transfer to technical support'
        ],
        correctIndex: 1,
        explanation: 'Breaking charges into exact date segments makes proration intuitive and transparent.'
      },
      {
        id: 'csr-bd-q3',
        question: 'A customer claims they were charged roaming while near the national border without leaving the country. What should you check?',
        options: [
          'Check tower handshake timestamps to see if the device picked up a border tower while on domestic soil',
          'Tell the customer their phone must have crossed the border without them',
          'Deny any dispute immediately',
          'Cancel their international feature immediately'
        ],
        correctIndex: 0,
        explanation: 'Accidental border tower drift is a known phenomenon and eligible for frontline courtesy adjustments upon review.'
      },
      {
        id: 'csr-bd-q4',
        question: 'Which phrase best demonstrates active ownership during a billing dispute?',
        options: [
          '"That is just how the billing software calculates things."',
          '"I see the confusion on page 2. Let me review that $14 charge and explain why it was applied."',
          '"You should have read the notification email last month."',
          '"I cannot help you with charges older than yesterday."'
        ],
        correctIndex: 1,
        explanation: 'Taking ownership by pinpointing the specific charge builds customer trust and reduces escalations.'
      },
      {
        id: 'csr-bd-q5',
        question: 'What should always be confirmed before concluding a billing dispute resolution call?',
        options: [
          'Confirm that the customer knows what their next regular monthly invoice amount will be',
          'Ask the customer to rate you 5 stars on social media',
          'Pitch three new accessories',
          'Remind them that fees can increase at any moment'
        ],
        correctIndex: 0,
        explanation: 'Confirming future expected billing amounts prevents repeat calls when the next month arrives.'
      }
    ]
  },

  // TSR TOPICS
  {
    id: 'tsr-password-reset',
    lobId: 'tsr',
    title: 'Password Reset & Account Lockout Flow',
    teaser: 'Handling self-service portal lockouts, MFA recovery keys, and secure agent-initiated resets.',
    updatedDate: 'Oct 15, 2026',
    readTime: '3 min read',
    isNew: true,
    summary: 'When customers are locked out of their Pomegran Self-Care app or Web Portal after 5 incorrect attempts, follow the zero-knowledge reset protocol to restore access safely.',
    keyPoints: [
      'Lockout triggers automatically after 5 consecutive failed login attempts within 15 minutes.',
      'Agents do not have access to view or manually set raw passwords; resets generate a secure temporary link via SMS/Email.',
      'Always confirm secondary verification before initiating an MFA token reset.',
      'Ensure the customer clears browser cache or refreshes the mobile app if the session hangs on redirect.'
    ],
    doAndDont: {
      dos: [
        'Verify that the email address on file does not have a typo before triggering the reset link.',
        'Instruct the customer to stay on the line until they confirm the password change screen loads.',
        'Remind them that reset links expire in exactly 20 minutes for security.'
      ],
      donts: [
        'Never ask the customer to read their new chosen password out loud to you.',
        'Do not send the reset link to an alternate email address not listed on the verified profile.',
        'Never bypass MFA removal without checking the fraud alert flag in CRM.'
      ]
    },
    quizQuestions: [
      {
        id: 'tsr-pr-q1',
        question: 'How many failed login attempts trigger the automated security lockout on the Pomegran portal?',
        options: ['3 attempts', '5 attempts within 15 minutes', '10 attempts within an hour', '1 attempt'],
        correctIndex: 1,
        explanation: 'The system locks the portal account after 5 failed attempts in 15 minutes to prevent brute-force attacks.'
      },
      {
        id: 'tsr-pr-q2',
        question: 'Can a TSR agent view or directly type in a new permanent password on behalf of a customer?',
        options: [
          'Yes, if the customer authorizes it verbally',
          'No, agents can only trigger an authenticated self-service reset link',
          'Yes, but only for executive accounts',
          'Yes, during night shifts'
        ],
        correctIndex: 1,
        explanation: 'Pomegran adheres to zero-knowledge security; agents never see or enter raw customer passwords.'
      },
      {
        id: 'tsr-pr-q3',
        question: 'How long is the secure temporary password reset link valid?',
        options: ['24 hours', '7 days', '20 minutes', 'Indefinitely until clicked'],
        correctIndex: 2,
        explanation: 'Password reset links expire in 20 minutes to minimize exposure window.'
      },
      {
        id: 'tsr-pr-q4',
        question: 'A customer has lost access to their registered MFA authenticator phone. What is the prerequisite to reset MFA?',
        options: [
          'Primary identity verification + secondary security question verification, with manager authorization flag',
          'A simple verbal agreement',
          'Sending an email to any address they state on the call',
          'MFA can never be reset under any circumstance'
        ],
        correctIndex: 0,
        explanation: 'MFA recovery requires multi-step identity verification to safeguard against account takeover attacks.'
      },
      {
        id: 'tsr-pr-q5',
        question: 'What troubleshooting step resolves an app that loops back to the login screen after entering the new password?',
        options: [
          'Buying a new phone',
          'Force-closing the app, clearing application cache, or checking system time synchronization',
          'Waiting 3 weeks for an app update',
          'Switching the phone to airplane mode permanently'
        ],
        correctIndex: 1,
        explanation: 'Stale app cache or misaligned device clock can cause session authentication tokens to invalidate.'
      }
    ]
  },
  {
    id: 'tsr-escalation-criteria',
    lobId: 'tsr',
    title: 'Tier 2 Escalation Criteria & Ticket Hygiene',
    teaser: 'When to escalate to Network Engineering vs Tier 2, and what diagnostic logs must be attached.',
    updatedDate: 'Oct 11, 2026',
    readTime: '4 min read',
    isNew: false,
    summary: 'Premature or undocumented escalations increase customer turnaround times. Follow the 4-point diagnostic checklist before routing tickets to Tier 2 Technical Operations.',
    keyPoints: [
      'Tier 1 must complete: Power cycle test, APN verification, SIM swap/reseat, and local outage check.',
      'Every escalated ticket MUST contain: Signal RSSI/RSRP values, device IMEI, and 3 specific failure timestamps.',
      'Repeat tickets (same issue within 72 hours) receive high-priority SLA tagging.',
      'Warm transfer is required only when service is completely degraded and emergency services access is affected.'
    ],
    doAndDont: {
      dos: [
        'Collect 3 exact timestamps of recent failed attempts (within the last 48 hours).',
        'Summarize the troubleshooting already performed so Tier 2 does not repeat identical steps.',
        'Set expectations: "Tier 2 will review the tower packet log and update you via SMS within 24 hours."'
      ],
      donts: [
        'Never escalate with the note: "Customer says internet does not work, please fix."',
        'Do not blind-transfer a customer into the Tier 2 engineering queue.',
        'Never promise that an on-site technician will arrive the same afternoon.'
      ]
    },
    quizQuestions: [
      {
        id: 'tsr-ec-q1',
        question: 'Which diagnostic data is mandatory on an escalated mobile data issue ticket?',
        options: [
          'The customer’s favorite mobile app',
          'Signal metric values (RSSI/RSRP), device IMEI, and 3 recent failure timestamps',
          'Only the customer’s phone number',
          'The credit score of the caller'
        ],
        correctIndex: 1,
        explanation: 'Network engineers require signal metrics, hardware IMEI, and specific event timestamps to query tower logs.'
      },
      {
        id: 'tsr-ec-q2',
        question: 'When is a warm transfer to Tier 2 senior support permitted?',
        options: [
          'Whenever the customer speaks loudly',
          'Only when complete service outage impairs emergency access or critical service SLA requires direct handoff',
          'On all calls taken after 4 PM',
          'Never under any scenario'
        ],
        correctIndex: 1,
        explanation: 'Warm live transfers are reserved for critical priority situations; standard cases use asynchronous ticket routing.'
      },
      {
        id: 'tsr-ec-q3',
        question: 'What is the standard resolution SLA for Tier 2 network ticket investigations?',
        options: ['10 minutes', '24 to 48 hours with SMS milestone updates', '30 business days', '6 months'],
        correctIndex: 1,
        explanation: 'Tier 2 deep network investigations operate on a 24 to 48 hour turnaround with proactive SMS updates.'
      },
      {
        id: 'tsr-ec-q4',
        question: 'Why does escalating an incomplete ticket hurt the customer experience?',
        options: [
          'It charges the customer an extra fee',
          'Tier 2 will reject the ticket back to Tier 1, resetting the wait clock and delaying the customer resolution',
          'It logs the agent out of the system',
          'It automatically cancels the account'
        ],
        correctIndex: 1,
        explanation: 'Tickets lacking basic diagnostics get kicked back to Tier 1, doubling the customer’s total waiting time.'
      },
      {
        id: 'tsr-ec-q5',
        question: 'What constitutes a "repeat ticket" deserving high-priority attention?',
        options: [
          'A customer calling about a different product',
          'The exact same unresolved issue reported within 72 hours of a previous ticket closure',
          'Any customer who has been a subscriber for more than 1 year',
          'A call lasting more than 8 minutes'
        ],
        correctIndex: 1,
        explanation: 'Repeat complaints within 72 hours signal systemic failure and receive accelerated priority.'
      }
    ]
  },
  {
    id: 'tsr-known-outage',
    lobId: 'tsr',
    title: 'Known Outage Communication & Incident Management',
    teaser: 'Communicating planned maintenance and unexpected localized fiber/tower incidents calmly.',
    updatedDate: 'Oct 08, 2026',
    readTime: '3 min read',
    isNew: false,
    summary: 'During localized fiber cuts or cellular tower upgrades, proactive communication prevents customer panic and avoids unnecessary device resets or hardware dispatches.',
    keyPoints: [
      'Always consult the Live Outage Incident Map before troubleshooting individual hardware.',
      'Do not instruct the customer to factory-reset their phone or router if an area outage is confirmed.',
      'Advise customer on temporary Wi-Fi Calling or hotspot alternatives where feasible.',
      'Subscribe the customer’s phone number to automated incident resolution SMS notifications.'
    ],
    doAndDont: {
      dos: [
        'Check postal codes against the Incident Map immediately if multiple callers report dropped packets.',
        'Acknowledge the event upfront: "We are aware of a fiber cut affecting the North Ward sector."',
        'Provide the estimated time to restoration (ETR) when published by NOC.'
      ],
      donts: [
        'Never make up a fabricated ETR if the Network Operations Center hasn’t published one.',
        'Do not tell the customer "the tower is broken because of bad weather" without NOC confirmation.',
        'Never instruct an affected user to wipe their router configuration during a network-wide drop.'
      ]
    },
    quizQuestions: [
      {
        id: 'tsr-ko-q1',
        question: 'What is the very first step when a caller reports sudden total loss of data in an area?',
        options: [
          'Tell them their modem is defective',
          'Verify their postal code on the NOC Incident Map to check for active area outages',
          'Initiate an immediate factory reset',
          'Ask them to buy a new SIM card'
        ],
        correctIndex: 1,
        explanation: 'Checking the Incident Map saves time and prevents unnecessary individual device troubleshooting.'
      },
      {
        id: 'tsr-ko-q2',
        question: 'Why should you NOT advise a factory reset of the home gateway during a confirmed outage?',
        options: [
          'It is illegal to reset hardware',
          'The issue is upstream in the network; resetting wipes custom Wi-Fi credentials and won’t restore service',
          'It will short-circuit the neighborhood power',
          'Resetting increases the monthly bill'
        ],
        correctIndex: 1,
        explanation: 'Factory resets during an upstream outage create customer frustration without solving the network drop.'
      },
      {
        id: 'tsr-ko-q3',
        question: 'If the NOC has not published an Estimated Time of Restoration (ETR), what should you tell the caller?',
        options: [
          'Promise it will be fixed in 15 minutes',
          'Explain that crews are on-site investigating and offer to enroll them in automated SMS status alerts',
          'Tell them it will take at least 3 weeks',
          'Hang up the call'
        ],
        correctIndex: 1,
        explanation: 'Being honest while providing automated SMS progress tracking sets realistic expectations.'
      },
      {
        id: 'tsr-ko-q4',
        question: 'What temporary workaround can help customers with home broadband outages who have active mobile lines?',
        options: [
          'Suggesting Wi-Fi Hotspot tethering or Wi-Fi Calling where supported',
          'Telling them to stop working for the day',
          'Asking them to splice the fiber cable themselves',
          'Rebooting the desktop computer 10 times'
        ],
        correctIndex: 0,
        explanation: 'Suggesting tethering or alternative connection paths shows proactive problem-solving.'
      },
      {
        id: 'tsr-ko-q5',
        question: 'What tool should you use to register a customer for automatic restoration notice?',
        options: [
          'The Outage Notification Subscriber toggle on the customer profile',
          'Write a paper note on your desk',
          'Ask the customer to refresh their browser constantly',
          'Send a personal email from your private account'
        ],
        correctIndex: 0,
        explanation: 'The Outage Notification toggle subscribes the account to system-generated restoration alerts.'
      }
    ]
  },

  // SALES TOPICS
  {
    id: 'sales-new-plan',
    lobId: 'sales',
    title: 'New Plan Comparison & Value Positioning',
    teaser: 'Detailed comparison of Pomegran Unlimited Core, Plus, and Ultra tiers with streaming bundles.',
    updatedDate: 'Oct 14, 2026',
    readTime: '4 min read',
    isNew: true,
    summary: 'Positioning plans on value rather than price alone drives higher customer satisfaction and reduces churn. Understand the speed caps, hotspot allocations, and international roaming features.',
    keyPoints: [
      'Core Tier: 50GB premium data, 5GB hotspot, SD streaming ($45/mo).',
      'Plus Tier: 100GB premium data, 25GB hotspot, 4K streaming, free Canada/US roaming ($65/mo).',
      'Ultra Tier: Truly unlimited unthrottled data, 60GB hotspot, international roaming in 50 countries ($85/mo).',
      'Multi-line family discount reduces each line by $10/mo when 3 or more lines are active.'
    ],
    doAndDont: {
      dos: [
        'Ask about their daily usage habits (e.g., remote work, travel, streaming) before quoting a plan.',
        'Frame upgrades around peace of mind and convenience rather than gigabyte statistics.',
        'Highlight the multi-line savings when speaking to family or household accounts.'
      ],
      donts: [
        'Never jump straight to the most expensive tier without discovering the customer’s needs first.',
        'Do not hide speed caps or throttling thresholds; transparency builds long-term retention.',
        'Avoid slamming extra add-ons without verbal customer consent.'
      ]
    },
    quizQuestions: [
      {
        id: 'sales-np-q1',
        question: 'Which tier includes unlimited unthrottled data and roaming in 50 international destinations?',
        options: ['Pomegran Core', 'Pomegran Basic', 'Pomegran Ultra ($85/mo)', 'Pomegran Starter'],
        correctIndex: 2,
        explanation: 'The Ultra tier is designed for international travelers and heavy power users with 50-country roaming.'
      },
      {
        id: 'sales-np-q2',
        question: 'How much is the multi-line family discount per line when 3 or more lines are consolidated?',
        options: ['$2/mo per line', '$5/mo per line', '$10/mo discount per line', '$50 total one-time gift card'],
        correctIndex: 2,
        explanation: 'The multi-line discount saves $10 per line monthly on accounts with 3 or more active lines.'
      },
      {
        id: 'sales-np-q3',
        question: 'A customer works remotely from coffee shops and travels to Chicago twice a month. Which plan fits best?',
        options: ['Core tier', 'Plus tier ($65/mo) with 25GB hotspot & Canada/US roaming', 'Prepaid basic', 'Landline plan'],
        correctIndex: 1,
        explanation: 'The Plus tier provides generous 25GB tethering hotspot and seamless Canada/US travel coverage.'
      },
      {
        id: 'sales-np-q4',
        question: 'What is the risk of pushing an expensive plan before discovering customer usage needs?',
        options: [
          'Customers get happier immediately',
          'High buyer remorse leading to immediate cancellation or churn during the 15-day trial period',
          'No risk at all',
          'It increases network speed automatically'
        ],
        correctIndex: 1,
        explanation: 'Unmatched overselling leads to early churn and dissatisfaction; consultative discovery ensures retention.'
      },
      {
        id: 'sales-np-q5',
        question: 'How should you present streaming resolution limits on the Core plan?',
        options: [
          'Hide it and hope they don’t notice',
          'Transparently position Core as optimized for smartphone screen efficiency at 480p SD, and Plus for 4K lovers',
          'Tell them video streaming is blocked',
          'Blame the phone manufacturer'
        ],
        correctIndex: 1,
        explanation: 'Positioning resolution around screen size needs creates transparency and natural upsell momentum.'
      }
    ]
  },
  {
    id: 'sales-price-objections',
    lobId: 'sales',
    title: 'Handling Price Objections with Value Anchoring',
    teaser: 'Converting "it is too expensive" into an opportunity to showcase bundled savings and reliability.',
    updatedDate: 'Oct 11, 2026',
    readTime: '3 min read',
    isNew: false,
    summary: 'When prospects state "Competitor X is $15 cheaper," acknowledge their price consciousness, dissect what is included, and anchor the conversation on coverage quality and hidden fees.',
    keyPoints: [
      'Step 1: Empathize and isolate ("I respect you keeping an eye on monthly costs. Aside from price, how did our coverage compare?").',
      'Step 2: Uncover hidden fees in budget competitor plans (activation fees, low speed caps, lack of customer service).',
      'Step 3: Calculate the total cost of ownership including complimentary perks ($15 streaming credit + auto-pay discount).',
      'Step 4: Offer the 30-day money-back satisfaction guarantee to eliminate perceived risk.'
    ],
    doAndDont: {
      dos: [
        'Validate first: "It makes total sense to look for the best return on your dollar."',
        'Demonstrate that Pomegran includes 5G Ultra-Wideband access with zero hidden network access fees.',
        'Break down costs to a daily comparison: "That difference is about 50 cents a day for double the reliability."'
      ],
      donts: [
        'Never trash-talk the competitor in an unprofessional way.',
        'Do not immediately offer deep discounts without reinforcing value first.',
        'Never say: "Well, you get what you pay for."'
      ]
    },
    quizQuestions: [
      {
        id: 'sales-po-q1',
        question: 'What is the first step when a prospect says "Your plan is $15 more than Provider X"?',
        options: [
          'Hang up on them',
          'Validate their concern and ask an exploratory question to isolate if price is the only barrier',
          'Immediately cut the price in half',
          'Say the competitor is a scam'
        ],
        correctIndex: 1,
        explanation: 'Validation followed by exploratory questioning prevents defensiveness and uncovers genuine needs.'
      },
      {
        id: 'sales-po-q2',
        question: 'How does daily breakdown reframing help overcome price resistance?',
        options: [
          'It confuses the customer with math',
          'It makes the price gap feel manageable and tangible (e.g. 50 cents/day for superior reliability)',
          'It changes their bank account',
          'It avoids taxes'
        ],
        correctIndex: 1,
        explanation: 'Reframing small monthly deltas to daily equivalents contextualizes the true value difference.'
      },
      {
        id: 'sales-po-q3',
        question: 'What common hidden costs do budget providers often omit from advertised low headline rates?',
        options: [
          'Complimentary phones',
          'Network access surcharges, throttling below 3 Mbps, and paid customer support queues',
          'Free international roaming',
          'Higher quality customer service'
        ],
        correctIndex: 1,
        explanation: 'Budget providers often offset low base rates with throttling, access fees, and paid support lines.'
      },
      {
        id: 'sales-po-q4',
        question: 'Which closing phrase best removes customer commitment hesitation?',
        options: [
          '"You have to buy right now or this price disappears in 5 seconds."',
          '"With our 30-day satisfaction guarantee, you can test our network with zero risk and see the difference."',
          '"I cannot give you any more time to think."',
          '"Everyone else has already bought this plan."'
        ],
        correctIndex: 1,
        explanation: 'Risk reversal through guarantees makes saying yes frictionless for hesitant prospects.'
      },
      {
        id: 'sales-po-q5',
        question: 'Why should you avoid immediately offering a discretionary concession when a customer mentions price?',
        options: [
          'It shows you have no authority',
          'It implies the initial price was arbitrary or inflated, eroding product credibility',
          'The CRM disables all buttons',
          'It takes too much time'
        ],
        correctIndex: 1,
        explanation: 'Premature discounting devalues the product; establishing value before conceding price retains brand trust.'
      }
    ]
  },
  {
    id: 'sales-upgrade-offers',
    lobId: 'sales',
    title: 'Mid-Contract Upgrade Offers & Hardware Trade-Ins',
    teaser: 'Leveraging device trade-in equity, early upgrade waivers, and hardware financing options.',
    updatedDate: 'Oct 07, 2026',
    readTime: '3 min read',
    isNew: false,
    summary: 'Existing customers approaching month 18 of a 24-month agreement can take advantage of the Early Upgrade Program with waived remaining balance when trading in eligible smartphones.',
    keyPoints: [
      'Early upgrade eligibility begins after 18 consecutive on-time bill payments.',
      'Device condition must satisfy standard criteria: Power on, intact display glass, and iCloud/Google lock removed.',
      'Trade-in value applies as recurring monthly device credits over the new 24-month term.',
      'Always educate customers on transferring data and backing up prior to boxing their return device.'
    ],
    doAndDont: {
      dos: [
        'Check the customer’s CRM account status for active early upgrade banners before pitching.',
        'Clearly outline the 14-day trade-in return window to avoid lost promo clawbacks.',
        'Emphasize trade-in credit: "Your current model wipes out $400 off the new flagship."'
      ],
      donts: [
        'Do not guarantee top tier trade-in value if the customer mentions cracked screen glass.',
        'Never skip explaining that the return phone must be factory-reset before mailing.',
        'Do not add optional device insurance without transparent pricing confirmation.'
      ]
    },
    quizQuestions: [
      {
        id: 'sales-uo-q1',
        question: 'When does a customer become eligible for the Early Upgrade balance waiver?',
        options: [
          'On day 1 of their contract',
          'After 18 consecutive on-time monthly payments',
          'Only after 5 years',
          'Whenever they buy an accessory'
        ],
        correctIndex: 1,
        explanation: 'The Early Upgrade Program rewards account loyalty after 18 on-time payment cycles.'
      },
      {
        id: 'sales-uo-q2',
        question: 'Which of the following is an absolute requirement for a trade-in device to receive credit?',
        options: [
          'Original retail box and stickers',
          'Device must power on, screen must not be cracked, and activation locks (iCloud/FRP) must be removed',
          'Must be less than 2 months old',
          'Must have 100% battery capacity'
        ],
        correctIndex: 1,
        explanation: 'Phones must power on with intact screen and disabled activation locks to be processed.'
      },
      {
        id: 'sales-uo-q3',
        question: 'How are promotional trade-in credits distributed to the customer’s billing ledger?',
        options: [
          'Cash mailed in an envelope',
          'Equal monthly bill credits divided across the 24-month agreement term',
          'A single lottery ticket',
          'Only at the end of the 2-year period'
        ],
        correctIndex: 1,
        explanation: 'Trade-in promotions are amortized as equal monthly bill credits over the device term.'
      },
      {
        id: 'sales-uo-q4',
        question: 'How long does the customer have to ship back their old trade-in unit after receiving the new phone?',
        options: ['24 hours', '14 calendar days', '90 days', '1 year'],
        correctIndex: 1,
        explanation: 'Trade-in kits must be postmarked within 14 calendar days to protect the applied promotional credit.'
      },
      {
        id: 'sales-uo-q5',
        question: 'What is the risk of adding device protection insurance without verbal customer opt-in?',
        options: [
          'It is a compliance violation that causes billing disputes and commission chargebacks',
          'There is no risk',
          'The customer will thank you later',
          'It speeds up the shipping'
        ],
        correctIndex: 0,
        explanation: 'Unauthorized product slamming violates regulatory compliance and harms customer trust.'
      }
    ]
  },

  // ACTIVATION TOPICS
  {
    id: 'act-verification-steps',
    lobId: 'activation',
    title: 'Account Verification Steps & Document Triage',
    teaser: 'KYC protocols, verifying government photo ID, proof of address, and fraud prevention checks.',
    updatedDate: 'Oct 15, 2026',
    readTime: '3 min read',
    isNew: true,
    summary: 'Activating new accounts securely ensures compliant Know-Your-Customer (KYC) compliance. Learn how to review automated document scans, spot altered IDs, and approve orders cleanly.',
    keyPoints: [
      'Acceptable primary IDs: Valid Driver’s License, Passport, or Provincial ID card (must not be expired).',
      'Proof of address required if ID displays an old residence: Utility bill, lease, or bank statement from the last 60 days.',
      'Check that name, date of birth, and document expiry match the order registration letter for letter.',
      'Any suspected digital tampering (skewed fonts, mismatched barcodes) must be routed to Risk & Fraud.'
    ],
    doAndDont: {
      dos: [
        'Inspect photo clarity, checking that all 4 corners of the identity card are visible in the upload.',
        'Help customers take clear photos: "Ensure no light flash is reflecting off the laminate plastic."',
        'Complete the manual review queue within the 30-minute pending window.'
      ],
      donts: [
        'Never accept an expired passport or expired driver’s license.',
        'Do not accept school badges, gym passes, or social club cards as legal identity proof.',
        'Never bypass a fraud hold because the customer expresses urgency.'
      ]
    },
    quizQuestions: [
      {
        id: 'act-vs-q1',
        question: 'Which document qualifies as a primary acceptable identity verification for new account activation?',
        options: [
          'College student library card',
          'Valid unexpired Government-issued Driver’s License or Passport',
          'Gym membership card with photo',
          'A handwritten letter from a landlord'
        ],
        correctIndex: 1,
        explanation: 'Regulatory KYC guidelines mandate valid, unexpired government-issued photo credentials.'
      },
      {
        id: 'act-vs-q2',
        question: 'How recent must a proof of address document (e.g. utility bill) be to be accepted?',
        options: ['Within the last 60 days', 'Within the last 3 years', 'From any time in the past', 'Must be from yesterday'],
        correctIndex: 0,
        explanation: 'Address verification documents must have been issued within the previous 60 calendar days.'
      },
      {
        id: 'act-vs-q3',
        question: 'What is the required action when an uploaded ID shows blurred corners and glare over the birthdate?',
        options: [
          'Approve it anyway to save time',
          'Reject the specific document and send a friendly upload link with tips for glare-free lighting',
          'Delete the entire customer profile',
          'Call the police'
        ],
        correctIndex: 1,
        explanation: 'Providing helpful photo capture guidance gets a clean compliant document on the second attempt.'
      },
      {
        id: 'act-vs-q4',
        question: 'Why must the 4 physical corners of the identification card be visible in the scan?',
        options: [
          'To verify the card has not been digitally cropped from a template or pasted onto another background',
          'For decorative aesthetic reasons',
          'To check the color of the table',
          'It is not actually required'
        ],
        correctIndex: 0,
        explanation: 'Edge-to-edge capture allows anti-fraud algorithms to detect counterfeit digital manipulations.'
      },
      {
        id: 'act-vs-q5',
        question: 'If a customer requests expedited activation while flagged under manual fraud review, what should you do?',
        options: [
          'Bypass the review because they asked politely',
          'Explain that account security safeguards are underway and provide the expected review timeline',
          'Hang up on the customer',
          'Authorize the SIM card without checking'
        ],
        correctIndex: 1,
        explanation: 'Security reviews must never be overridden without Risk clearance, regardless of customer urgency.'
      }
    ]
  },
  {
    id: 'act-first-login',
    lobId: 'activation',
    title: 'First-Login Checklist & Digital Onboarding',
    teaser: 'Guiding new subscribers through eSIM profile downloads, app downloads, and paperless billing.',
    updatedDate: 'Oct 13, 2026',
    readTime: '3 min read',
    isNew: false,
    summary: 'A smooth first 24 hours cuts 60% of early remorse calls. Guide subscribers step-by-step through installing their eSIM profile, downloading the Pomegran App, and enabling auto-pay.',
    keyPoints: [
      'Step 1: Ensure device is connected to stable Wi-Fi before scanning the eSIM QR code.',
      'Step 2: Guide device prompt to label the new line (e.g., "Personal" or "Business").',
      'Step 3: Assist with downloading the Pomegran App and setting biometric login (FaceID / Fingerprint).',
      'Step 4: Verify paperless billing enrollment to ensure the $5/mo auto-pay discount activates.'
    ],
    doAndDont: {
      dos: [
        'Instruct the customer to remain on Wi-Fi during the 90-second cellular carrier handshake.',
        'Encourage sending a test SMS and placing a test call before finishing the call.',
        'Show how to check data usage in the Pomegran App home widget.'
      ],
      donts: [
        'Do not end the activation call while the eSIM profile says "Activating..." without confirmation.',
        'Never tell the customer to delete their previous physical SIM before cellular connectivity is verified.',
        'Avoid skipping the self-care app registration step.'
      ]
    },
    quizQuestions: [
      {
        id: 'act-fl-q1',
        question: 'What is essential before a customer scans their new eSIM activation QR code?',
        options: [
          'The device must be turned off',
          'The device must be connected to an active, reliable Wi-Fi network to download carrier credentials',
          'Airplane mode must be switched on permanently',
          'The battery must be below 10%'
        ],
        correctIndex: 1,
        explanation: 'eSIM profile downloads require active Wi-Fi data to reach the cellular carrier provisioning server.'
      },
      {
        id: 'act-fl-q2',
        question: 'Why should the customer keep their old SIM in the phone until the number transfer completes?',
        options: [
          'So their phone looks heavier',
          'Because the port authorization confirmation SMS will be sent to the old active carrier SIM',
          'It is required by the post office',
          'Old SIMs explode if removed early'
        ],
        correctIndex: 1,
        explanation: 'Port-out validation SMS messages are delivered to the currently active old provider line.'
      },
      {
        id: 'act-fl-q3',
        question: 'What quick test should the agent conduct before marking the onboarding call complete?',
        options: [
          'Ask the customer to place a test call and open a web page off Wi-Fi',
          'Ask the customer to play a video game',
          'Conduct a 30-minute survey',
          'Restart the phone 5 times'
        ],
        correctIndex: 0,
        explanation: 'Verifying voice and mobile data handshake on cellular confirms successful end-to-end setup.'
      },
      {
        id: 'act-fl-q4',
        question: 'How does enabling Auto-Pay during the first login checklist benefit the customer?',
        options: [
          'It triggers an automatic $5/mo recurring account discount and prevents late suspension',
          'It locks their bank account',
          'It raises their price by $10',
          'It has no effect'
        ],
        correctIndex: 0,
        explanation: 'Auto-Pay enrollment delivers a monthly discount while eliminating missed bill penalties.'
      },
      {
        id: 'act-fl-q5',
        question: 'Where can the new customer view real-time data balance and roaming switches?',
        options: [
          'By visiting a physical retail store each time',
          'Inside the Pomegran Account Self-Care mobile application',
          'On their paper statement 30 days later',
          'Only by calling technical support'
        ],
        correctIndex: 1,
        explanation: 'The self-care app gives customers direct access to monitor usage and toggle features.'
      }
    ]
  },
  {
    id: 'act-common-errors',
    lobId: 'activation',
    title: 'Common Activation Errors & Porting Fallbacks',
    teaser: 'Resolving Carrier Port Rejections, IMEI Compatibility Mismatches, and EID Typo Recovery.',
    updatedDate: 'Oct 09, 2026',
    readTime: '4 min read',
    isNew: false,
    summary: 'Porting delays and EID typos account for 80% of stalled activations. Learn the specific error codes (PORT_ERR_PASS, IMEI_NETWORK_LOCKED) and how to resolve them rapidly.',
    keyPoints: [
      'Error PORT_REJECT_ACCOUNT: Account number at previous carrier was entered with spaces or missing lead zeros.',
      'Error PORT_REJECT_PIN: Previous provider port-out security PIN was incorrect or expired.',
      'Error DEVICE_NETWORK_LOCKED: Phone is still carrier-locked by former provider; must be unlocked via former carrier.',
      'EID Mismatch: Re-issue an updated digital eSIM profile with copy-pasted 32-digit EID.'
    ],
    doAndDont: {
      dos: [
        'Remind customers that former carrier accounts must remain OPEN until the port transition finishes.',
        'Double-check the 32-digit EID by asking the customer to tap "Copy" in device settings to prevent typos.',
        'Use the "Resend Port Request" button once updated credentials are corrected in CRM.'
      ],
      donts: [
        'Never tell the customer to cancel their old plan with their old carrier before the number transfer occurs.',
        'Do not guess missing digits in an IMEI or SIM ICCID number.',
        'Never submit 5 consecutive rapid port requests without verifying the correct PIN first.'
      ]
    },
    quizQuestions: [
      {
        id: 'act-ce-q1',
        question: 'What happens if a customer calls their former carrier and cancels their plan BEFORE porting the number?',
        options: [
          'The port completes faster',
          'The phone number is released into disconnected quarantine and cannot be ported automatically',
          'They get a free phone',
          'The number transfers normally'
        ],
        correctIndex: 1,
        explanation: 'A line must be active with the donor carrier for regulatory transfer gateways to release the number.'
      },
      {
        id: 'act-ce-q2',
        question: 'What does error code "PORT_REJECT_PIN" signify in the activation dashboard?',
        options: [
          'The customer’s battery is flat',
          'The donor carrier rejected the transfer because the transfer PIN/password provided did not match',
          'Pomegran systems are offline',
          'The phone is stolen'
        ],
        correctIndex: 1,
        explanation: 'PORT_REJECT_PIN indicates an incorrect or expired port-out authorization PIN from the donor carrier.'
      },
      {
        id: 'act-ce-q3',
        question: 'A customer’s device displays "SIM Not Supported" after scanning the Pomegran eSIM. What is the root cause?',
        options: [
          'The customer needs a bigger screen',
          'The device is network-locked by the original selling provider and must be unlocked before accepting our eSIM',
          'The QR code has expired',
          'Pomegran towers do not support eSIM'
        ],
        correctIndex: 1,
        explanation: '"SIM Not Supported" indicates an active carrier network lock on the smartphone hardware.'
      },
      {
        id: 'act-ce-q4',
        question: 'How can agents ensure 100% accuracy when collecting the 32-digit EID number from modern smartphones?',
        options: [
          'Have the customer read 32 digits as fast as possible',
          'Guide the customer to Settings > About, long-press the EID number to copy, and paste into the portal chat or self-care form',
          'Guess the last 10 digits',
          'EID numbers are never required'
        ],
        correctIndex: 1,
        explanation: 'Long-pressing to copy the 32-digit EID eliminates human transcribing mistakes.'
      },
      {
        id: 'act-ce-q5',
        question: 'How long does a standard wireless-to-wireless number transfer typically take to complete once authorized?',
        options: ['10 to 60 minutes in most cases', '3 weeks', '6 months', 'Instantly in 2 seconds guaranteed'],
        correctIndex: 0,
        explanation: 'Wireless porting gateways usually complete the automated handshake in 10 to 60 minutes.'
      }
    ]
  },

  // CANQUEST TOPICS (Multi-Skill Queue: CSR, TSR, Sales)
  {
    id: 'can-csr-skills',
    lobId: 'canquest',
    title: 'Canquest CSR: Account Care & Billing Operations',
    teaser: 'Core customer service handling for Canquest queue subscribers: billing, changes, and verification.',
    updatedDate: 'Oct 21, 2026',
    readTime: '3 min read',
    isNew: true,
    summary: 'The Canquest queue handles multi-skilled inquiries. On the CSR front, agents manage billing breakdowns, account detail adjustments, service transfers, and policy clarifications for Canquest subscribers.',
    keyPoints: [
      'Step 1: Perform 2-factor customer verification before accessing Canquest account records.',
      'Step 2: Clarify the customer request (billing inquiry, payment arrangement, or account update).',
      'Step 3: Provide transparent itemized explanations for any balance changes, credits, or proration.',
      'Step 4: Check if the subscriber needs technical support or plan upgrades before concluding the call.'
    ],
    doAndDont: {
      dos: [
        'Confirm security verification swiftly before discussing billing details or account modifications.',
        'Break down any unexpected charges line-by-line so the customer understands the exact math.',
        'Offer self-serve mobile app access to view monthly statements and payment history.'
      ],
      donts: [
        'Never release customer PII or billing data without complete security verification.',
        'Do not rush customers through billing questions; explain proration clearly.',
        'Never assume a Canquest caller only has one issue—always ask if their service and connection are performing well.'
      ]
    },
    quizQuestions: [
      {
        id: 'can-csr-q1',
        question: 'What is the primary role of a Canquest queue agent when handling a CSR inquiry?',
        options: [
          'Transfer the call immediately to general care',
          'Handle customer service, billing, and account management directly as a multi-skilled agent',
          'Only answer technical questions',
          'Only process cancellations'
        ],
        correctIndex: 1,
        explanation: 'Canquest is a dedicated multi-skill queue where agents handle CSR, TSR, and Sales all within the same queue.'
      },
      {
        id: 'can-csr-q2',
        question: 'A Canquest subscriber notices a proration charge after upgrading mid-cycle. How do you explain it?',
        options: [
          'Tell them the system makes random errors',
          'Break down the remaining days on the old tier versus the new tier to show the exact difference',
          'Credit the full bill without checking',
          'Ask them to wait until next month'
        ],
        correctIndex: 1,
        explanation: 'Transparent itemized breakdown builds customer trust and clarifies how mid-billing cycle changes work.'
      },
      {
        id: 'can-csr-q3',
        question: 'When should a Canquest agent transition from a CSR billing question to a Sales recommendation?',
        options: [
          'Interrupt the customer immediately before resolving their billing question',
          'Only after resolving their primary CSR concern and discovering that their plan usage exceeds current limits',
          'Never offer sales in Canquest',
          'Only if the customer demands a supervisor'
        ],
        correctIndex: 1,
        explanation: 'Multi-skill agents resolve the customer’s immediate need first, then consultative sales can be introduced naturally.'
      },
      {
        id: 'can-csr-q4',
        question: 'What security step must precede any Canquest account modification?',
        options: [
          'Full two-factor identity verification per Canquest queue protocol',
          'Guessing their birthdate',
          'Asking their favorite color',
          'No verification is needed'
        ],
        correctIndex: 0,
        explanation: 'Strict 2FA verification protects account privacy and complies with telecom security regulations.'
      },
      {
        id: 'can-csr-q5',
        question: 'If a Canquest subscriber is calling about a billing question but also mentions their Wi-Fi is sluggish, what should you do?',
        options: [
          'Tell them you only do billing and hang up',
          'Resolve the billing inquiry first, then smoothly transition into TSR mode to diagnose their connection',
          'Transfer them across 3 different departments',
          'Tell them Wi-Fi is not your problem'
        ],
        correctIndex: 1,
        explanation: 'As a multi-skill Canquest agent, you provide end-to-end resolution across CSR and TSR in a single call.'
      }
    ]
  },
  {
    id: 'can-tsr-troubleshooting',
    lobId: 'canquest',
    title: 'Canquest TSR: Technical Triage & Connectivity Diagnostics',
    teaser: 'Step-by-step troubleshooting for Wi-Fi gateways, packet loss, and hardware resets.',
    updatedDate: 'Oct 21, 2026',
    readTime: '4 min read',
    isNew: false,
    summary: 'The technical support pillar in Canquest empowers agents to troubleshoot subscriber connectivity, gateway provisioning, Wi-Fi interference, and speed degradation without requiring transfers.',
    keyPoints: [
      'Diagnostic Step 1: Check gateway LED status (Power, Broadband/PON, Service, and Wi-Fi indicator lights).',
      'Diagnostic Step 2: Test both wired Ethernet and 5GHz Wi-Fi channels to isolate router vs environmental interference.',
      'Diagnostic Step 3: Run remote line health and signal-to-noise ratio (SNR) tests via the Canquest admin console.',
      'Diagnostic Step 4: Perform soft reboot or remote firmware refresh before considering hardware replacement.'
    ],
    doAndDont: {
      dos: [
        'Ask specific clarifying questions about device behavior: "Is the Service LED solid green, blinking amber, or off?"',
        'Check network maintenance maps for known outages in the customer’s postal code.',
        'Guide the customer through reboot steps with patience, explaining what each light sequence means.'
      ],
      donts: [
        'Never instruct a subscriber to paperclip pinhole factory reset without warning them about custom SSID wipes.',
        'Do not assume a slow connection is always line degradation before checking Wi-Fi channel crowding.',
        'Avoid technical jargon—use plain, reassuring terms.'
      ]
    },
    quizQuestions: [
      {
        id: 'can-tsr-q1',
        question: 'What is the first step when a Canquest subscriber reports "My internet is completely down"?',
        options: [
          'Dispatch an expensive truck technician immediately',
          'Check area outage board, then ask for gateway LED light status to pinpoint where the connection drops',
          'Tell them to purchase a new laptop',
          'Hang up and test later'
        ],
        correctIndex: 1,
        explanation: 'Confirming area status and checking LED states isolates whether the issue is line-level, gateway-level, or internal Wi-Fi.'
      },
      {
        id: 'can-tsr-q2',
        question: 'A customer has 500 Mbps fiber but speed tests show 35 Mbps on Wi-Fi from the basement. What is the likely cause?',
        options: [
          'Physical distance and concrete structural interference attenuating the Wi-Fi signal',
          'The fiber cable melted',
          'The customer has too many bookmarks',
          'Their email is full'
        ],
        correctIndex: 0,
        explanation: 'Environmental signal attenuation is standard for basement devices; mesh pods or repositioning resolves this.'
      },
      {
        id: 'can-tsr-q3',
        question: 'Why should factory resets only be used as a last resort in TSR?',
        options: [
          'Because it erases custom Wi-Fi network names, passwords, and static IP settings, disconnecting all smart home devices',
          'Because routers explode on reset',
          'Because it takes 24 hours',
          'It is actually always the first step'
        ],
        correctIndex: 0,
        explanation: 'Factory resets erase user configurations and cause downstream friction with connected devices.'
      },
      {
        id: 'can-tsr-q4',
        question: 'What is the role of SNR (Signal-to-Noise Ratio) in Canquest line diagnostics?',
        options: [
          'Measures how loud the customer is speaking',
          'Indicates the clarity of the broadband data signal against background line noise',
          'Calculates monthly billing interest',
          'Controls screen brightness'
        ],
        correctIndex: 1,
        explanation: 'A healthy SNR ensures stable packet transmission without recurring drops or high latency.'
      },
      {
        id: 'can-tsr-q5',
        question: 'Once a Canquest agent fixes the customer’s technical connectivity issue, what is the best closing practice?',
        options: [
          'Disconnect the call immediately',
          'Verify a live webpage loads on their device, summarize the fix, and confirm they have no lingering questions',
          'Transfer to another agent',
          'Tell them to restart again tomorrow'
        ],
        correctIndex: 1,
        explanation: 'Verification of active connectivity confirms full first-contact resolution.'
      }
    ]
  },
  {
    id: 'can-sales-consultation',
    lobId: 'canquest',
    title: 'Canquest Sales: Solutions, Speed Tiers & Plan Upgrades',
    teaser: 'Consultative selling in the Canquest queue: identifying subscriber needs, speed tiers, and add-ons.',
    updatedDate: 'Oct 21, 2026',
    readTime: '3 min read',
    isNew: false,
    summary: 'The sales pillar in the Canquest queue focuses on value-driven recommendations. Because Canquest agents also handle CSR and TSR, they have deep insight into the subscriber’s actual usage and can match the right plan, speed tier, and equipment upgrades.',
    keyPoints: [
      'Step 1: Perform usage discovery (how many people work from home, stream 4K, or play online games).',
      'Step 2: Connect current plan bottlenecks (like bandwidth caps or lower tiers) to customer daily pain points.',
      'Step 3: Present tiered options (Good, Better, Best) clearly highlighting value over raw cost.',
      'Step 4: Close with transparent summaries—no hidden activation fees or surprise charges.'
    ],
    doAndDont: {
      dos: [
        'Frame upgrades around benefits: "Upgrading to Gigabit fiber ensures your video conferences never freeze while the kids game downstairs."',
        'Ask open discovery questions: "How has your connection held up during peak evening hours?"',
        'Summarize the new monthly price clearly and confirm consent before submitting order changes.'
      ],
      donts: [
        'Never use high-pressure tactics or push plans the subscriber does not need.',
        'Do not hide one-time equipment or delivery fees.',
        'Never upgrade a customer before resolving any active technical service issues.'
      ]
    },
    quizQuestions: [
      {
        id: 'can-sales-q1',
        question: 'When is the ideal moment to introduce a plan upgrade to a Canquest subscriber?',
        options: [
          'Before they even tell you their name',
          'After resolving their initial reason for calling and identifying that their household usage exceeds their current plan',
          'While their internet connection is broken and unrepaired',
          'Never'
        ],
        correctIndex: 1,
        explanation: 'Consultative selling thrives when built on trust after resolving the customer’s immediate need.'
      },
      {
        id: 'can-sales-q2',
        question: 'A family of 5 has 3 people remote working and 2 streaming 4K video on a 50 Mbps plan with buffering. What is the consultative recommendation?',
        options: [
          'Tell them to stop using the internet',
          'Recommend upgrading to Canquest Ultra 500 Mbps or 1 Gbps with mesh Wi-Fi to eliminate household bandwidth congestion',
          'Downgrade them to 25 Mbps',
          'Charge them a penalty fee'
        ],
        correctIndex: 1,
        explanation: 'Matching speed tiers to actual concurrent multi-device usage solves chronic congestion.'
      },
      {
        id: 'can-sales-q3',
        question: 'Why is full pricing transparency essential during a Canquest sales interaction?',
        options: [
          'It builds long-term customer trust and prevents downstream billing remorse calls to CSR',
          'It is not important',
          'It lowers sales numbers',
          'To make calls longer'
        ],
        correctIndex: 0,
        explanation: 'Transparent billing breakdowns prevent billing disputes and maintain subscriber retention.'
      },
      {
        id: 'can-sales-q4',
        question: 'What advantage do Canquest agents have when recommending sales products compared to single-skill sales agents?',
        options: [
          'They know the customer’s full history across CSR, TSR diagnostics, and usage habits',
          'They can guess numbers better',
          'They work fewer hours',
          'There is no advantage'
        ],
        correctIndex: 0,
        explanation: 'Multi-skill queue agents have holistic visibility into customer service records and technical performance.'
      },
      {
        id: 'can-sales-q5',
        question: 'What should a Canquest agent do if a customer states they are satisfied with their current plan and do not want an upgrade?',
        options: [
          'Keep pushing for 10 more minutes',
          'Respect their decision gracefully, summarize the support provided, and invite them to reach out anytime',
          'Hang up on them',
          'Change their plan anyway'
        ],
        correctIndex: 1,
        explanation: 'Respecting customer choices builds goodwill and reinforces a customer-centric experience.'
      }
    ]
  },
];

// -------------------------------------------------------------
// REAL CUSTOMER SCENARIOS (2 per LOB, branching)
// -------------------------------------------------------------
export const SCENARIOS: Scenario[] = [
  // CSR SCENARIOS
  {
    id: 'csr-scen-1',
    lobId: 'csr',
    title: 'Angry Customer, Double Charge on Billing Statement',
    channel: 'Phone Call',
    customerName: 'Marcus Vance',
    customerMood: 'Extremely Frustrated',
    difficulty: 'Standard',
    setup: '"I was charged twice this month and nobody has fixed it. This is the third time I am calling customer care and every time someone promises me a callback that never happens! Fix this right now or I am reversing the charges at my bank!"',
    firstStep: {
      prompt: 'How do you respond to Marcus to take control and de-escalate?',
      options: [
        {
          id: 'opt-a',
          text: 'Apologise sincerely for the repeat calls, pull up the ledger immediately, confirm you can see the duplicate $84.50 charge, and explain you will start the refund directly on this call.',
          rating: 'best',
          points: 100,
          customerReaction: 'Marcus takes a deep breath. "Finally, someone who actually looked at my statement instead of passing me off. Thank you."',
          reason: 'Validates the customer frustration, confirms the exact error, and commits to immediate in-session resolution.',
          nextStepId: 'csr-scen-1-step2-best'
        },
        {
          id: 'opt-b',
          text: 'Explain that monthly billing cycle transitions can sometimes generate temporary authorization holds that settle automatically within 10 days.',
          rating: 'poor',
          points: 0,
          customerReaction: 'Marcus yells: "This is NOT an authorization hold, it is a posted transaction! Are you even listening to me?!"',
          reason: 'Minimizes the issue with generic billing theory, making the customer feel unheard and dismissed.',
          nextStepId: 'csr-scen-1-step2-poor'
        },
        {
          id: 'opt-c',
          text: 'Apologise for the previous dropped balls, open an escalation ticket with billing operations, and promise someone will call back within 48 hours.',
          rating: 'acceptable',
          points: 50,
          customerReaction: 'Marcus sighs: "That is what the last two people told me. How do I know this won\'t just disappear into a black hole again?"',
          reason: 'Polite, but passes the buck to another future callback when the agent has autonomy to resolve it now.',
          nextStepId: 'csr-scen-1-step2-acceptable'
        },
        {
          id: 'opt-d',
          text: 'Advise Marcus that since it is a bank charge issue, he should call his financial institution and file a dispute with Visa.',
          rating: 'poor',
          points: 0,
          customerReaction: 'Marcus hangs up the phone in fury and files a regulatory complaint against Pomegran.',
          reason: 'Deflects responsibility onto the customer and risks chargeback merchant fees and escalations.',
          nextStepId: 'csr-scen-1-step2-poor'
        }
      ]
    },
    secondSteps: {
      'csr-scen-1-step2-best': {
        prompt: 'You processed the $84.50 refund. How do you close the interaction and ensure long-term satisfaction?',
        options: [
          {
            id: 's2-best',
            text: 'Provide the exact refund reference number, explain it will reflect in 3-5 days, apply a courtesy $15 bill credit for his wasted time, and send an instant SMS confirmation.',
            rating: 'best',
            points: 100,
            customerReaction: '"I truly appreciate you going above and beyond. You turned this whole nightmare around. What was your name again?"',
            reason: 'Delivers transparent reference proof, compensates for time lost, and gives written peace of mind.'
          },
          {
            id: 's2-acc',
            text: 'Tell Marcus the refund is submitted and say goodbye.',
            rating: 'acceptable',
            points: 50,
            customerReaction: '"Okay, will I get an email or anything? I guess I just have to watch my bank account."',
            reason: 'Fixed the basic issue, but missed providing reference documentation and emotional reassurance.'
          },
          {
            id: 's2-poor',
            text: 'Ask Marcus if he wants to add a new tablet line to his account while he is on the line.',
            rating: 'poor',
            points: 0,
            customerReaction: '"Are you seriously trying to sell me something right now after you just overcharged me?! Incredible."',
            reason: 'Tone-deaf sales pitching immediately after a severe service recovery destroys rebuilt trust.'
          }
        ]
      },
      'csr-scen-1-step2-acceptable': {
        prompt: 'Marcus is skeptical of another escalation ticket. How do you salvage his trust?',
        options: [
          {
            id: 's2-salvage-best',
            text: 'Stop and say: "You know what, Marcus, you are right. You should not have to wait for another callback. I am going to reverse this charge directly right now under my agent authority."',
            rating: 'best',
            points: 100,
            customerReaction: '"Thank goodness. That is all I wanted from the start. Thank you for stepping up."',
            reason: 'Demonstrates situational adaptability and ownership over rigid ticketing habits.'
          },
          {
            id: 's2-salvage-poor',
            text: 'Reassure him that Tier 2 supervisor tickets are never ignored and give him a ticket number.',
            rating: 'poor',
            points: 0,
            customerReaction: '"I have three ticket numbers already! You guys are useless."',
            reason: 'Doubles down on a broken promise rather than taking real-time action.'
          }
        ]
      },
      'csr-scen-1-step2-poor': {
        prompt: 'The customer is enraged and threatening regulatory escalation. What is your immediate recovery move?',
        options: [
          {
            id: 's2-rec-best',
            text: 'Pause, reset calmly: "Marcus, I hear you and you are completely right. I spoke too soon before looking at the raw transaction. I see the duplicate $84.50 posted on Oct 3rd. Let me fix this right now."',
            rating: 'best',
            points: 100,
            customerReaction: '"Okay... at least you can see it. Just get my money back please."',
            reason: 'Swallows ego, validates the customer’s observation, and pivots to immediate resolution.'
          },
          {
            id: 's2-rec-poor',
            text: 'Warn him that profanity or elevated tone will force you to disconnect the call.',
            rating: 'poor',
            points: 0,
            customerReaction: 'Customer immediately escalates to executive complaints.',
            reason: 'Escalates conflict instead of de-escalating the emotional driver.'
          }
        ]
      }
    },
    idealPath: 'Option A (Acknowledge, verify charge, initiate refund immediately) → Step 2 Best (Provide refund tracking ID, $15 courtesy credit, and SMS confirmation).',
    takeaway: 'Frontline autonomy exists to solve straightforward financial errors immediately. Never defer to callbacks when you can issue the credit during the session.'
  },
  {
    id: 'csr-scen-2',
    lobId: 'csr',
    title: 'Delayed Replacement Device & Tracking Stalemate',
    channel: 'Inbound Chat',
    customerName: 'Elena Rostova',
    customerMood: 'Worried & Anxious',
    difficulty: 'Standard',
    setup: '"My replacement phone was supposed to arrive yesterday for my daughter’s birthday tomorrow, but the courier link still says \'Label Created\'. I cannot reach the courier and I am panicking. Can you find out where the package is?"',
    firstStep: {
      prompt: 'How do you respond to Elena in the chat session?',
      options: [
        {
          id: 'c2-opt-a',
          text: 'Empathize warmly with the birthday timeline, open the logistics portal to trace warehouse dispatch status, and explain that label creation means courier scan is pending.',
          rating: 'best',
          points: 100,
          customerReaction: '"Thank you for understanding! I just really need to know if it will get here in time."',
          reason: 'Validates the emotional stakes (daughter’s birthday) and accesses back-end logistics data.',
          nextStepId: 'csr-scen-2-step2'
        },
        {
          id: 'c2-opt-b',
          text: 'Inform Elena that once a package leaves the warehouse, Pomegran has no control over courier transit times and she must wait.',
          rating: 'poor',
          points: 0,
          customerReaction: '"If you can\'t help me with your own shipping partners, why do you have a support chat?!"',
          reason: 'Abdicates ownership and leaves a stressed parent without answers.',
          nextStepId: 'csr-scen-2-step2'
        },
        {
          id: 'c2-opt-c',
          text: 'Suggest she order a second phone on the website right now with overnight shipping just in case.',
          rating: 'acceptable',
          points: 50,
          customerReaction: '"I cannot afford to pay for two flagship phones at the same time!"',
          reason: 'Practical thought, but financially insensitive to the customer.',
          nextStepId: 'csr-scen-2-step2'
        }
      ]
    },
    secondSteps: {
      'csr-scen-2-step2': {
        prompt: 'You see the courier missed the evening pickup due to weather. The phone won’t arrive until 2 days from now. How do you resolve this for Elena?',
        options: [
          {
            id: 'c2-s2-best',
            text: 'Be transparent about the courier weather delay, locate an identical model in stock at her local Pomegran retail store 10 mins away, and arrange immediate same-day store pickup while re-routing the mailed package.',
            rating: 'best',
            points: 100,
            customerReaction: '"Oh wow, that is incredible! I can pick it up on my way home from work. You saved her birthday!"',
            reason: 'Delivers omnichannel problem solving that rescues the customer’s critical deadline.'
          },
          {
            id: 'c2-s2-acc',
            text: 'Explain the weather delay honestly, apologize, and offer a $20 bill credit for the missed delivery promise.',
            rating: 'acceptable',
            points: 50,
            customerReaction: '"The credit is nice, but I still don’t have a gift for my daughter tomorrow."',
            reason: 'Helpful and polite, but doesn’t solve the core logistical problem.'
          },
          {
            id: 'c2-s2-poor',
            text: 'Tell her delays happen and provide the courier’s 1-800 number to file a package grievance.',
            rating: 'poor',
            points: 0,
            customerReaction: '"Completely disappointed. I will be switching carriers after this."',
            reason: 'Fails to protect the customer relationship.'
          }
        ]
      }
    },
    idealPath: 'Option A (Empathize, investigate logistics portal) → Step 2 Best (Arrange same-day retail store pickup and redirect courier delivery).',
    takeaway: 'Think beyond standard delivery tracking: omnichannel store inventory can save critical customer deadlines.'
  },

  // TSR SCENARIOS
  {
    id: 'tsr-scen-1',
    lobId: 'tsr',
    title: 'Customer Locked Out of Account Before Major Deadline',
    channel: 'Phone Call',
    customerName: 'Dr. Aris Thorne',
    customerMood: 'Urgent & Stressed',
    difficulty: 'Challenging',
    setup: '"I am submitting a critical medical grant proposal in two hours. My account is locked out because I lost my authenticator app when I swapped phones this morning. I need access to my account right now to verify our corporate domain credentials!"',
    firstStep: {
      prompt: 'How do you handle the high-urgency lockout request without compromising security?',
      options: [
        {
          id: 't1-opt-a',
          text: 'Acknowledge the grant deadline urgency, calmly explain that security verification takes 2 minutes, and initiate the verified out-of-band SMS OTP to his registered phone number.',
          rating: 'best',
          points: 100,
          customerReaction: '"Yes, please! My phone is right in front of me, send the code."',
          reason: 'Validates the urgent context while strictly preserving multi-factor authentication security.',
          nextStepId: 'tsr-scen-1-step2'
        },
        {
          id: 't1-opt-b',
          text: 'Bypass the MFA check immediately and disable password protection because he is a verified doctor.',
          rating: 'poor',
          points: 0,
          customerReaction: 'Audit failure: Account security bypass triggers an instant compliance violation flag.',
          reason: 'Severe security failure; social engineering often uses medical or corporate deadlines as pretexts.',
          nextStepId: 'tsr-scen-1-step2'
        },
        {
          id: 't1-opt-c',
          text: 'Inform him that account lockouts have a mandatory 24-hour cooling off period and he must submit a paper ID form.',
          rating: 'poor',
          points: 0,
          customerReaction: '"A 24-hour cooling off period?! That grant is worth half a million dollars! Let me speak to your CEO!"',
          reason: 'Provides inaccurate policy information that causes panic when fast secondary methods exist.',
          nextStepId: 'tsr-scen-1-step2'
        }
      ]
    },
    secondSteps: {
      'tsr-scen-1-step2': {
        prompt: 'Dr. Thorne reads back the correct SMS code and verified secondary answers. His account is unlocked. How do you ensure he doesn’t get locked out again during his grant submission?',
        options: [
          {
            id: 't1-s2-best',
            text: 'Stay on the line while he completes login, assist him in pairing his new phone authenticator app, generate backup emergency recovery codes, and wish him success on the grant.',
            rating: 'best',
            points: 100,
            customerReaction: '"I am logged in and the new authenticator is active! You have been a lifesaver today. Truly."',
            reason: 'Closes the loop by testing in real-time and establishing backup authentication resilience.'
          },
          {
            id: 't1-s2-acc',
            text: 'Confirm access is restored and disconnect the call so you can take the next waiting customer.',
            rating: 'acceptable',
            points: 50,
            customerReaction: '"Wait, what if it locks me out again when I switch tabs? Oh well, I guess I\'ll find out."',
            reason: 'Solved the immediate blocker, but left the customer without verified backup codes.'
          }
        ]
      }
    },
    idealPath: 'Option A (Validate urgency, execute verified SMS OTP) → Step 2 Best (Stay on line, re-link authenticator, generate backup codes).',
    takeaway: 'Never compromise verification for urgency, but execute authenticated recovery swiftly and configure emergency backup codes.'
  },
  {
    id: 'tsr-scen-2',
    lobId: 'tsr',
    title: 'Intermittent Router Drops During Remote Work',
    channel: 'Inbound Chat',
    customerName: 'Devon Lee',
    customerMood: 'Annoyed & Sarcastic',
    difficulty: 'Standard',
    setup: '"Every day around 2 PM my Pomegran 5G Home Gateway drops connection for 5 minutes right in the middle of team Zoom meetings. Don\'t tell me to unplug it and plug it back in; I\'ve done that 20 times."',
    firstStep: {
      prompt: 'How do you begin diagnosing Devon’s recurring daily drops?',
      options: [
        {
          id: 't2-opt-a',
          text: 'Acknowledge that repetitive power cycling is frustrating, pull modem signal logs over the past 7 days, and inspect the 2 PM tower handover and channel interference metrics.',
          rating: 'best',
          points: 100,
          customerReaction: '"Thank you for actually checking the diagnostic logs instead of reading a script."',
          reason: 'Respects the customer’s troubleshooting experience and investigates telemetry data.',
          nextStepId: 'tsr-scen-2-step2'
        },
        {
          id: 't2-opt-b',
          text: 'Tell Devon that power cycling for 60 seconds is mandatory before you are allowed to open the diagnostic screen.',
          rating: 'poor',
          points: 0,
          customerReaction: '"I literally just said I did that. Forget it, I am calling a different ISP."',
          reason: 'Robotic adherence to scripts destroys credibility when the customer explicitly ruled out basic steps.',
          nextStepId: 'tsr-scen-2-step2'
        },
        {
          id: 't2-opt-c',
          text: 'Advise him that Zoom uses too much bandwidth and he should turn his video camera off during meetings.',
          rating: 'poor',
          points: 0,
          customerReaction: '"I am a software engineer, Zoom uses 3 Mbps on a 300 Mbps line. Are you serious?"',
          reason: 'Makes baseless technical claims that alienate knowledgeable customers.',
          nextStepId: 'tsr-scen-2-step2'
        }
      ]
    },
    secondSteps: {
      'tsr-scen-2-step2': {
        prompt: 'Logs show high RSRP fluctuations at 2 PM when solar blinds lower near the metal window casing, degrading signal by 18 dB. What is the permanent fix?',
        options: [
          {
            id: 't2-s2-best',
            text: 'Explain the physical attenuation finding clearly, guide Devon to relocate the gateway 4 feet to an interior shelf facing the south-east tower line of sight, and test connection latency.',
            rating: 'best',
            points: 100,
            customerReaction: '"Wow, that makes total sense—my automated blinds drop at 2 PM! Moved the router and my signal jumped to 4 bars. Incredible detective work!"',
            reason: 'Identifies the root environmental cause and empowers the customer with an effective solution.'
          },
          {
            id: 't2-s2-acc',
            text: 'Ship him an external mesh pod for $50.',
            rating: 'acceptable',
            points: 50,
            customerReaction: '"I guess I can try buying more hardware, but does it fix the gateway?"',
            reason: 'Hardware band-aid without addressing the physical placement blocker.'
          }
        ]
      }
    },
    idealPath: 'Option A (Consult diagnostic logs, skip scripted reboot) → Step 2 Best (Pinpoint physical attenuation and guide relocation).',
    takeaway: '5G home broadband is sensitive to physical obstructions. Diagnostic signal metrics pinpoint real environmental causes.'
  },

  // SALES SCENARIOS
  {
    id: 'sales-scen-1',
    lobId: 'sales',
    title: 'Prospect Says the Price is Too High Compared to Competitor',
    channel: 'Phone Call',
    customerName: 'Sanjay Patel',
    customerMood: 'Skeptical Buyer',
    difficulty: 'Standard',
    setup: '"Look, your Pomegran Plus plan is $65/mo. TelecomNova is advertising their Unlimited plan for $48/mo. That is a $17 difference every single month. Why on earth would I pay you guys extra?"',
    firstStep: {
      prompt: 'How do you respond to Sanjay’s direct price comparison?',
      options: [
        {
          id: 's1-opt-a',
          text: 'Acknowledge the price difference, ask how he uses his mobile daily, and examine what is actually included in TelecomNova’s $48 advertised tier.',
          rating: 'best',
          points: 100,
          customerReaction: '"Fair question. I travel between Montreal and Toronto every week for consulting, and I need tethering for my laptop on the train."',
          reason: 'Discovers critical usage patterns that turn headline price comparison into a value-driven assessment.',
          nextStepId: 'sales-scen-1-step2'
        },
        {
          id: 's1-opt-b',
          text: 'Tell Sanjay that TelecomNova is a terrible carrier with horrible coverage and drops every call.',
          rating: 'poor',
          points: 0,
          customerReaction: '"My brother uses them and loves them. You sound defensive."',
          reason: 'Unprofessional disparagement of competitors damages credibility.',
          nextStepId: 'sales-scen-1-step2'
        },
        {
          id: 's1-opt-c',
          text: 'Immediately offer to drop the Pomegran Plus plan price to $50 without asking questions.',
          rating: 'acceptable',
          points: 50,
          customerReaction: '"If you could do it for $50, why did you quote me $65 in the first place?"',
          reason: 'Premature discounting undermines the perceived value and trustworthiness of the pricing.',
          nextStepId: 'sales-scen-1-step2'
        }
      ]
    },
    secondSteps: {
      'sales-scen-1-step2': {
        prompt: 'Sanjay needs laptop tethering on commuter trains. TelecomNova throttles hotspot data to 512 Kbps and charges $12/day roaming outside provincial zones. How do you position Pomegran Plus?',
        options: [
          {
            id: 's1-s2-best',
            text: 'Highlight that Pomegran Plus includes 25GB of high-speed 5G hotspot and national rail corridor priority towers. With TelecomNova, adding high-speed tethering costs an extra $20/mo, making their plan more expensive ($68 vs $65).',
            rating: 'best',
            points: 100,
            customerReaction: '"I had no idea their hotspot was throttled to dial-up speeds. That would have killed my work on the train. Let’s set up Pomegran Plus."',
            reason: 'Ties the specific customer need to competitor hidden limitations, turning the price gap into net savings.'
          },
          {
            id: 's1-s2-acc',
            text: 'Reiterate that Pomegran has a nicer mobile app and great customer support.',
            rating: 'acceptable',
            points: 50,
            customerReaction: '"That\'s nice, but is it worth $17 more every month?"',
            reason: 'Vague soft benefits fail to justify concrete monetary differences.'
          }
        ]
      }
    },
    idealPath: 'Option A (Validate, ask usage questions) → Step 2 Best (Demonstrate total cost of ownership including unthrottled hotspot).',
    takeaway: 'Never compete on bare headline price. Discover how the customer works and uncover competitor throttling and surcharges.'
  },
  {
    id: 'sales-scen-2',
    lobId: 'sales',
    title: 'Competitor Offering Free Handset Switcher Promotion',
    channel: 'Inbound Chat',
    customerName: 'Claire Dubois',
    customerMood: 'Bargain Hunting',
    difficulty: 'Standard',
    setup: '"Carrier Z is offering a brand new smartphone for $0 down if I switch today. What can Pomegran offer me to stay and upgrade my family lines?"',
    firstStep: {
      prompt: 'How do you engage Claire to explore retention and family upgrades?',
      options: [
        {
          id: 's2-opt-a',
          text: 'Congratulate her on reaching upgrade eligibility, ask which device models her family is interested in, and review her current account equity to check for multi-line loyalty trade-in promotions.',
          rating: 'best',
          points: 100,
          customerReaction: '"We have 3 lines. My two teenagers want the latest model and I just want something with a reliable battery."',
          reason: 'Recognizes family account value and shifts focus to multi-device total package value.',
          nextStepId: 'sales-scen-2-step2'
        },
        {
          id: 's2-opt-b',
          text: 'Tell her that Carrier Z\'s phone is refurbished junk and Pomegran phones are superior.',
          rating: 'poor',
          points: 0,
          customerReaction: '"It\'s literally the exact same brand new Apple device. Why lie to me?"',
          reason: 'False claims ruin consultative integrity.',
          nextStepId: 'sales-scen-2-step2'
        }
      ]
    },
    secondSteps: {
      'sales-scen-2-step2': {
        prompt: 'Claire has 3 lines with paid-off devices in good condition. What offer structure provides the best outcome?',
        options: [
          {
            id: 's2-s2-best',
            text: 'Bundle the Multi-Line Family Discount ($30/mo savings across 3 lines) with our Trade-In Credit ($450 per phone), delivering new flagship hardware for $0 net monthly change over their current bill.',
            rating: 'best',
            points: 100,
            customerReaction: '"So I can get all three of us new phones without increasing my monthly bill at all?! That is fantastic, let\'s process it right now!"',
            reason: 'Combines multi-line discounts and hardware trade-in equity into a compelling zero-net-cost upgrade proposition.'
          },
          {
            id: 's2-s2-acc',
            text: 'Offer her a 10% discount on phone cases and screen protectors.',
            rating: 'poor',
            points: 0,
            customerReaction: '"I asked about phones, not plastic cases. I\'m switching to Carrier Z."',
            reason: 'Fails to address the core hardware comparison.'
          }
        ]
      }
    },
    idealPath: 'Option A (Discover family lineup and account equity) → Step 2 Best (Combine multi-line savings + trade-in equity to achieve zero net increase).',
    takeaway: 'Leverage multi-line scale: savings on plan bundles can offset device financing costs completely.'
  },

  // ACTIVATION SCENARIOS
  {
    id: 'act-scen-1',
    lobId: 'activation',
    title: 'Customer Cannot Complete Online Identity Verification',
    channel: 'Inbound Chat',
    customerName: 'Fatima Al-Mansoor',
    customerMood: 'Frustrated & Stuck',
    difficulty: 'Standard',
    setup: '"I have tried uploading my driver\'s license four times and your automated portal keeps rejecting it saying \'Image unreadable\'. I am trying to activate my new business line for work on Monday and this is ridiculous."',
    firstStep: {
      prompt: 'How do you troubleshoot Fatima’s document upload failure?',
      options: [
        {
          id: 'a1-opt-a',
          text: 'Acknowledge the frustration with automated scanners, inspect the backend ingestion logs to see the specific rejection trigger, and provide practical photo-capture coaching.',
          rating: 'best',
          points: 100,
          customerReaction: '"Thank you. It rejected it within 2 seconds every time without explaining what was wrong."',
          reason: 'Examines technical rejection logs rather than making the customer repeat blind attempts.',
          nextStepId: 'act-scen-1-step2'
        },
        {
          id: 'a1-opt-b',
          text: 'Tell her to keep trying until it works or drive to a retail store 40 miles away.',
          rating: 'poor',
          points: 0,
          customerReaction: '"If I wanted to drive 40 miles I wouldn\'t have ordered online! Cancel my order."',
          reason: 'Dismissive and forces unnecessary customer travel.',
          nextStepId: 'act-scen-1-step2'
        }
      ]
    },
    secondSteps: {
      'act-scen-1-step2': {
        prompt: 'The ingestion log shows: "REJECT_SPECULAR_GLARE_ON_BARCODE". The camera flash washes out the back barcode. How do you guide Fatima?',
        options: [
          {
            id: 'a1-s2-best',
            text: 'Explain that the scanner requires the PDF417 2D barcode on the back: "Turn off your phone flash, place the license on a dark non-reflective surface near natural daylight, and snap the photo from a slight angle to eliminate glare."',
            rating: 'best',
            points: 100,
            customerReaction: '"That worked immediately! Verified in 5 seconds. Thank you so much for explaining the barcode glare issue."',
            reason: 'Delivers actionable, precise guidance that solves the algorithmic barrier on the spot.'
          },
          {
            id: 'a1-s2-acc',
            text: 'Ask her to email you a photocopy of her passport instead.',
            rating: 'acceptable',
            points: 50,
            customerReaction: '"I don\'t have my passport with me right now, but I guess I can find it later."',
            reason: 'Workaround works, but causes unnecessary delay when the original ID can be captured properly.'
          }
        ]
      }
    },
    idealPath: 'Option A (Investigate backend rejection log) → Step 2 Best (Coach customer on disabling flash and angled lighting to pass barcode scan).',
    takeaway: 'Automated verification algorithms usually fail due to specular flash glare over micro-barcodes. Coach lighting angles.'
  },
  {
    id: 'act-scen-2',
    lobId: 'activation',
    title: 'eSIM Activation Error Code 403 on Brand New Device',
    channel: 'Phone Call',
    customerName: 'Liam O’Connor',
    customerMood: 'Confused & Impatient',
    difficulty: 'Standard',
    setup: '"I got my new phone in the mail, opened the activation letter, scanned the QR code with my camera, and it popped up with \'Unable to Complete Cellular Plan Change - Code 403\'. What does that even mean?"',
    firstStep: {
      prompt: 'How do you diagnose Liam’s eSIM Code 403 error?',
      options: [
        {
          id: 'a2-opt-a',
          text: 'Confirm that Code 403 indicates an EID profile mismatch or already-consumed single-use token, verify the phone IMEI/EID in CRM, and check Wi-Fi stability.',
          rating: 'best',
          points: 100,
          customerReaction: '"Got it. My Wi-Fi is working fine. Let me check the EID number in my settings."',
          reason: 'Accurately decodes carrier error telemetry and verifies device profile identity.',
          nextStepId: 'act-scen-2-step2'
        },
        {
          id: 'a2-opt-b',
          text: 'Tell Liam the phone is defective and he must box it up and return it to the warehouse.',
          rating: 'poor',
          points: 0,
          customerReaction: '"A brand new phone is broken out of the box?! Are you kidding me?"',
          reason: 'Misdiagnoses a simple software provisioning token error as broken hardware.',
          nextStepId: 'act-scen-2-step2'
        }
      ]
    },
    secondSteps: {
      'act-scen-2-step2': {
        prompt: 'Liam had scanned the QR code twice, which invalidated the single-use download token. How do you restore service in under 60 seconds?',
        options: [
          {
            id: 'a2-s2-best',
            text: 'Regenerate a fresh carrier eSIM profile in CRM, push it directly over-the-air to his device EID via Apple/Android push notification, and have him tap "Install Cellular Plan" on his screen.',
            rating: 'best',
            points: 100,
            customerReaction: '"A notification just popped up on my screen saying \'Pomegran Plan Ready to Install\'! Tapped it and now I have 5 bars of 5G! That was slick."',
            reason: 'Uses modern carrier push provisioning, bypassing paper QR codes for instant activation.'
          },
          {
            id: 'a2-s2-acc',
            text: 'Mail him a physical plastic SIM card that will arrive in 4 business days.',
            rating: 'poor',
            points: 0,
            customerReaction: '"4 days?! I bought an eSIM phone so I wouldn\'t have to wait for the mail!"',
            reason: 'Slow fallback when digital push provisioning solves it instantly.'
          }
        ]
      }
    },
    idealPath: 'Option A (Decode 403 token invalidation) → Step 2 Best (Push fresh eSIM profile over-the-air to device EID).',
    takeaway: 'eSIM QR codes are strictly single-use. If interrupted, generate a fresh digital push profile directly to the hardware EID.'
  },

  // CANQUEST SCENARIOS (Multi-Skill Queue: CSR, TSR, Sales)
  {
    id: 'can-scen-1',
    lobId: 'canquest',
    title: 'Canquest Multi-Skill: Resolving a Wi-Fi Drop and Upgrading Speed Tier (TSR & Sales)',
    channel: 'Phone Call',
    customerName: 'Geoffrey Ross',
    customerMood: 'Frustrated with Buffering',
    difficulty: 'Standard',
    setup: '"I am calling the Canquest queue because my internet keeps freezing during my afternoon team video calls. I pay for service and I need this fixed immediately."',
    firstStep: {
      prompt: 'As a multi-skilled Canquest agent handling this inbound call, how do you begin troubleshooting the connectivity problem (TSR)?',
      options: [
        {
          id: 'c1-opt-a',
          text: 'Calmly acknowledge the frustration, run a quick line health check on the Canquest admin tool, and ask him to describe the gateway LED status while testing wired vs 5GHz Wi-Fi.',
          rating: 'best',
          points: 100,
          customerReaction: 'Geoffrey says: "Thanks for checking right away. The Broadband light is solid green, but my laptop is connected to the 2.4GHz Wi-Fi network from two rooms away."',
          reason: 'Isolates whether the problem is line-level or Wi-Fi interference without unnecessary technician dispatches.',
          nextStepId: 'can-scen-1-step2'
        },
        {
          id: 'c1-opt-b',
          text: 'Immediately try to sell him a new $100 router before testing his current connection.',
          rating: 'poor',
          points: 0,
          customerReaction: 'Geoffrey snaps: "I called for help fixing what I already have, not for a sales pitch!"',
          reason: 'Pitching sales before diagnosing or fixing an active technical issue destroys customer trust.',
          nextStepId: 'can-scen-1-step2'
        },
        {
          id: 'c1-opt-c',
          text: 'Tell him to factory reset the router with a paperclip right now.',
          rating: 'acceptable',
          points: 50,
          customerReaction: 'The call disconnects as his VoIP line goes down during the reboot.',
          reason: 'Factory resetting without checking VoIP dependency or Wi-Fi channel band causes unnecessary friction.',
          nextStepId: 'can-scen-1-step2'
        }
      ]
    },
    secondSteps: {
      'can-scen-1-step2': {
        prompt: 'You guide Geoffrey to switch to the 5GHz network, and his speed test jumps from 15 Mbps to 180 Mbps with zero packet loss. He mentions his whole household has 4 remote workers now. How do you leverage your multi-skill training to recommend a better long-term solution (Sales)?',
        options: [
          {
            id: 'c1-s2-best',
            text: 'Congratulate him on the restored speed, note that 4 simultaneous remote workers will saturate their 150 Mbps plan during peak hours, and consultatively offer the Canquest Gigabit upgrade with Smart Mesh Pods for $10 more/month.',
            rating: 'best',
            points: 100,
            customerReaction: '"You fixed my immediate issue in 2 minutes AND for just $10 more all 4 of us can work smoothly without competing for bandwidth? Let’s upgrade right now!"',
            reason: 'Delivers full multi-skill value: first-contact technical resolution followed by a consultative, value-aligned plan upgrade.'
          },
          {
            id: 'c1-s2-acc',
            text: 'Say goodbye and hang up since the technical issue was resolved.',
            rating: 'acceptable',
            points: 50,
            customerReaction: '"Thanks for the fix, bye."',
            reason: 'Resolved the immediate issue, but missed the opportunity to solve his household’s chronic bandwidth bottleneck.'
          }
        ]
      }
    },
    idealPath: 'Option A (TSR Diagnostic: check gateway LEDs, test Wi-Fi band) → Step 2 Best (Consultative Sales: position Gigabit tier & Mesh pods for 4 remote workers).',
    takeaway: 'Canquest multi-skill agents resolve technical glitches first to earn trust, then recommend consultative plan upgrades that permanently solve household capacity issues.'
  },
  {
    id: 'can-scen-2',
    lobId: 'canquest',
    title: 'Canquest CSR: First-Month Billing Breakdown & Account Plan Alignment',
    channel: 'Inbound Chat',
    customerName: 'Chloe Tremblay',
    customerMood: 'Puzzled by Bill',
    difficulty: 'Standard',
    setup: '"Hi Canquest team! I just opened my first bill and it is $89 instead of the $65 monthly rate I was quoted when I signed up. Why is it higher?"',
    firstStep: {
      prompt: 'How do you handle Chloe’s first-month billing inquiry in the Canquest CSR queue?',
      options: [
        {
          id: 'ca2-opt-a',
          text: 'Warmly greet Chloe, verify her account, and clearly explain the one-time activation proration breakdown: the bill covers the partial first week ($14) plus the upcoming regular monthly advance cycle ($65) and taxes.',
          rating: 'best',
          points: 100,
          customerReaction: '"Oh! That makes total sense now—it covers the first 8 days plus next month. I was worried there was a permanent price hike!"',
          reason: 'Transparent mathematical breakdown reassures the customer and removes anxiety regarding ongoing rates.',
          nextStepId: 'can-scen-2-step2'
        },
        {
          id: 'ca2-opt-b',
          text: 'Tell her that bills are automated and cannot be explained over chat.',
          rating: 'poor',
          points: 0,
          customerReaction: '"If you can’t explain your own charges, why should I trust this company?"',
          reason: 'Refusing transparency causes severe customer dissatisfaction and escalations.',
          nextStepId: 'can-scen-2-step2'
        }
      ]
    },
    secondSteps: {
      'can-scen-2-step2': {
        prompt: 'Chloe understands the proration and asks if there is an easy way to automate payments and save money going forward. How do you respond?',
        options: [
          {
            id: 'ca2-s2-best',
            text: 'Assist her with setting up Auto-Pay via the Canquest mobile app, which applies a recurring $5/mo digital discount and sends monthly receipt statements directly to her email.',
            rating: 'best',
            points: 100,
            customerReaction: '"Setting up auto-pay cuts my bill to $60/mo? Done! Thank you so much for the thorough help today!"',
            reason: 'Multi-skill service excellence: resolves the question, enrolls customer in auto-pay, lowers ongoing cost, and prevents future delinquent payments.'
          },
          {
            id: 'ca2-s2-acc',
            text: 'Tell her she can mail a check each month if she prefers.',
            rating: 'acceptable',
            points: 50,
            customerReaction: '"Nobody uses checks anymore, but thanks anyway."',
            reason: 'Misses modern self-service options and customer retention benefits.'
          }
        ]
      }
    },
    idealPath: 'Option A (CSR Explanation: transparent itemized proration breakdown) → Step 2 Best (Account Alignment: enroll in Auto-Pay for $5/mo digital discount).',
    takeaway: 'First-bill confusion is common in multi-skill queues; clear proration explanations and auto-pay enrollment turn confusion into lasting customer satisfaction.'
  }
];

// -------------------------------------------------------------
// SOFT SKILLS ACADEMY (5 shared lessons)
// -------------------------------------------------------------
export const SOFT_SKILLS_LESSONS: SoftSkillLesson[] = [
  {
    id: 'soft-empathy',
    title: 'Empathy: The Foundation of Service',
    coreIdea: 'Acknowledge the feeling before solving the problem.',
    readTime: '3 min read',
    whyItMatters: 'Customers need to feel understood before they can absorb logic. Jumping straight to technical fixes when a customer is anxious feels cold and often triggers heightened defensive reactions.',
    techniqueSteps: [
      {
        stepNumber: 1,
        title: 'Listen for the emotion behind the facts',
        description: 'Notice vocal pace, sighing, words like "worried", "exhausted", or "unfair".'
      },
      {
        stepNumber: 2,
        title: 'Mirror the sentiment genuinely',
        description: 'Validate their reality: "I can hear how much stress this delay has caused your team."'
      },
      {
        stepNumber: 3,
        title: 'Bridge to action smoothly',
        description: 'Transition from empathy to problem-solving without using the word "but". Use "and" or "let\'s".'
      }
    ],
    sayThis: 'I can completely understand why that surprise charge was upsetting to see on your bill. Let\'s pull up the invoice together and get this sorted out right now.',
    notThis: 'Company billing policies state that all charges generated by the automated server are legally binding unless disputed within 14 calendar days.',
    quizQuestions: [
      {
        id: 'ss-emp-q1',
        question: 'Why should an agent acknowledge a customer\'s emotional state before presenting technical facts?',
        options: [
          'Because emotional brains cannot process analytical explanations until they feel acknowledged and safe',
          'To extend call duration',
          'It is a legal script requirement',
          'It allows you to put them on hold'
        ],
        correctIndex: 0,
        explanation: 'Psychological validation lowers adrenaline and allows customers to listen to logic and solutions.'
      },
      {
        id: 'ss-emp-q2',
        question: 'Which word should you avoid when bridging from an empathetic statement to a resolution plan?',
        options: ['"Let\'s"', '"And"', '"But" (e.g. "I understand, BUT company policy...")', '"Together"'],
        correctIndex: 2,
        explanation: 'The word "but" cancels out the empathy you expressed before it in the listener\'s mind.'
      }
    ]
  },
  {
    id: 'soft-listening',
    title: 'Active Listening & Precision Paraphrasing',
    coreIdea: 'Let the customer finish, then repeat back the key point.',
    readTime: '3 min read',
    whyItMatters: 'Interrupting a customer—even to help—makes them feel managed rather than heard. Precision paraphrasing demonstrates total attentiveness and catches misunderstandings before solutions are built.',
    techniqueSteps: [
      {
        stepNumber: 1,
        title: 'Practice the 3-second golden pause',
        description: 'When the customer stops speaking, wait 2 to 3 seconds to ensure they have finished their complete thought.'
      },
      {
        stepNumber: 2,
        title: 'Paraphrase the core objective',
        description: 'Summarize the essence: "So to make sure I have this exactly right, your primary priority is..."'
      },
      {
        stepNumber: 3,
        title: 'Seek confirmation',
        description: 'Close the loop with a brief check: "...is that accurate?" before initiating workflows.'
      }
    ],
    sayThis: 'So the main issue is that your roaming data cut out as soon as you crossed into Chicago, and you need that restored before your 2 PM meeting—is that right?',
    notThis: 'Yeah yeah, roaming issue, okay let me reset your SIM profile hold on.',
    quizQuestions: [
      {
        id: 'ss-list-q1',
        question: 'What is the purpose of the 3-second pause after a customer finishes speaking?',
        options: [
          'To check your personal phone',
          'To prevent accidental interruption and ensure the customer has truly finished their thought',
          'To run out the call time clock',
          'To mute the headset'
        ],
        correctIndex: 1,
        explanation: 'Allowing silence ensures callers finish complex thoughts without feeling rushed.'
      },
      {
        id: 'ss-list-q2',
        question: 'What is precision paraphrasing?',
        options: [
          'Repeating every single word verbatim like a parrot',
          'Distilling the customer\'s core problem and desired outcome in your own words and asking for confirmation',
          'Reading the script backwards',
          'Writing an essay in CRM'
        ],
        correctIndex: 1,
        explanation: 'Paraphrasing captures meaning and outcome, confirming alignment between agent and customer.'
      }
    ]
  },
  {
    id: 'soft-objection',
    title: 'Objection Handling: Understand, Reframe & Confirm',
    coreIdea: 'Understand, respond with value, then confirm.',
    readTime: '3 min read',
    whyItMatters: 'An objection is not a rejection; it is an invitation for more information. Meeting objections with defensiveness loses sales, while curious reframing uncovers what matters most to the buyer.',
    techniqueSteps: [
      {
        stepNumber: 1,
        title: 'Isolate the concern',
        description: 'Determine if this is the only barrier: "Aside from the monthly price difference, is there anything else holding you back?"'
      },
      {
        stepNumber: 2,
        title: 'Reframe around return on investment',
        description: 'Connect the feature directly to time saved, peace of mind, or hidden competitor costs avoided.'
      },
      {
        stepNumber: 3,
        title: 'Test agreement gently',
        description: 'Check how the reframed perspective lands: "Does looking at it from that angle make sense for your workflow?"'
      }
    ],
    sayThis: 'That is a very fair concern regarding the $15 difference. Here is how our unthrottled 5G hotspot saves you from paying $20 in airport Wi-Fi passes every month.',
    notThis: 'Our plan isn\'t expensive at all. Other companies charge way more if you actually knew their rates.',
    quizQuestions: [
      {
        id: 'ss-obj-q1',
        question: 'What does isolating an objection accomplish?',
        options: [
          'It proves the customer wrong',
          'It clarifies whether the stated objection is the genuine bottleneck or just a smoke screen for another concern',
          'It ends the sales call immediately',
          'It applies a mandatory coupon'
        ],
        correctIndex: 1,
        explanation: 'Isolating uncovers hidden hesitation so you don’t solve the wrong problem.'
      },
      {
        id: 'ss-obj-q2',
        question: 'How should you treat a price objection from an analytical prospect?',
        options: [
          'Argue that they are being cheap',
          'Acknowledge the budget focus and provide a concrete total-cost-of-ownership value comparison',
          'Hang up',
          'Offer free accessories without explanation'
        ],
        correctIndex: 1,
        explanation: 'Analytical buyers respect transparent mathematical comparisons that demonstrate long-term value.'
      }
    ]
  },
  {
    id: 'soft-ownership',
    title: 'Extreme Ownership: Saying What You Will Do & By When',
    coreIdea: 'Say what you will do and by when.',
    readTime: '3 min read',
    whyItMatters: 'Vague statements like "someone will look into this" breed mistrust and trigger repeat inbound calls. Extreme ownership means putting your name on the solution and giving precise timeframes.',
    techniqueSteps: [
      {
        stepNumber: 1,
        title: 'Use personal commitment language',
        description: 'Use "I will" instead of "the system should" or "someone in back-office will".'
      },
      {
        stepNumber: 2,
        title: 'Give a concrete deadline',
        description: 'Specify an exact time: "I will update you via SMS by 3:00 PM today."'
      },
      {
        stepNumber: 3,
        title: 'Document and schedule follow-through',
        description: 'Create a personal callback task or calendar alert before concluding the call.'
      }
    ],
    sayThis: 'I will personally submit this tower investigation ticket right now, monitor the NOC ticket log, and follow up with you via text by tomorrow at noon with their diagnostic findings.',
    notThis: 'I put in a ticket. If nobody contacts you in a couple of weeks, try calling back customer care.',
    quizQuestions: [
      {
        id: 'ss-own-q1',
        question: 'Which phrase demonstrates genuine personal ownership?',
        options: [
          '"It\'s in the queue somewhere, nothing I can do."',
          '"I will personally monitor this ticket and send you an SMS update by 4:00 PM today."',
          '"The warehouse usually takes forever with these things."',
          '"You should probably just submit a complaint online."'
        ],
        correctIndex: 1,
        explanation: 'Personal pronouns ("I will") paired with specific deadlines create accountability and customer confidence.'
      },
      {
        id: 'ss-own-q2',
        question: 'Why do vague promises like "someone will call you soon" increase repeat call volume?',
        options: [
          'They don\'t increase calls',
          'Customers have no expectation benchmark, so after 3 hours of silence they call back anxious and frustrated',
          'Because phone lines get crossed',
          'Agents love taking repeat calls'
        ],
        correctIndex: 1,
        explanation: 'Without clear deadlines, customer anxiety drives repeated status-check calls.'
      }
    ]
  },
  {
    id: 'soft-communication',
    title: 'Clear, Short & Positive Communication',
    coreIdea: 'Be clear, short and positive.',
    readTime: '3 min read',
    whyItMatters: 'Call center conversations move quickly. Bloated, jargon-heavy explanations confuse customers. Clear, structured, and positively framed communication speeds up comprehension and builds confidence.',
    techniqueSteps: [
      {
        stepNumber: 1,
        title: 'Chunk information into 2-3 numbered steps',
        description: 'The brain retains structured lists: "Here is what happens next in three steps: 1, 2, 3."'
      },
      {
        stepNumber: 2,
        title: 'Replace negative policy words with positive outcomes',
        description: 'Instead of "You cannot do that until you pay", say "As soon as your payment clears, access opens automatically."'
      },
      {
        stepNumber: 3,
        title: 'Eliminate technical acronym soup',
        description: 'Translate internal terms (ICCID, HLR, APN, BTS) into plain customer language (SIM number, network gateway).'
      }
    ],
    sayThis: 'Here is what happens next in two simple steps: First, you will get an email with a secure link to choose your password. Second, open the Pomegran App and sign in. You will be up and running in under two minutes.',
    notThis: 'Pursuant to standard provisioning protocol MS-409, the backend provisioning daemon must propagate through the LDAP directory before SSO authentication tokens can be instantiated.',
    quizQuestions: [
      {
        id: 'ss-comm-q1',
        question: 'How should complex technical instructions be structured for a customer?',
        options: [
          'In one long continuous uninterrupted paragraph',
          'Into 2 or 3 short, sequentially numbered action steps',
          'In code syntax',
          'By reading legal documentation'
        ],
        correctIndex: 1,
        explanation: 'Numbered micro-steps reduce cognitive load and help customers execute instructions accurately.'
      },
      {
        id: 'ss-comm-q2',
        question: 'Which of the following transforms negative framing into positive framing?',
        options: [
          'Negative: "You can\'t get the phone without credit approval." → Positive: "Once our quick credit check confirms your profile, we can ship your new phone immediately."',
          'Negative: "You can\'t do that." → Positive: "You really can\'t do that."',
          'Negative: "Don\'t call back." → Positive: "Stop calling."',
          'There is no difference between positive and negative framing'
        ],
        correctIndex: 0,
        explanation: 'Positive framing highlights the path to success rather than walling the customer off.'
      }
    ]
  }
];

// -------------------------------------------------------------
// MICROLEARNING VIDEOS
// -------------------------------------------------------------
export const VIDEOS: VideoItem[] = [
  {
    id: 'vid-all-welcome',
    lobId: 'all',
    title: 'Welcome to the Agent Hub: Navigation & Core Tools',
    duration: '2 min',
    description: 'A 2-minute visual tour of your new Pomegran workspace. Learn how to track topic quizzes, practice branching scenarios, and reach trainer support.',
    tags: ['Orientation', 'Tools', 'All LOBs'],
    url: 'PASTE_LINK_HERE',
    speaker: 'Sandrine Aziz, Training Lead',
    keyTakeaways: [
      'Access your LOB workspace in one click from the home screen.',
      'Test your comprehension with 5-question Hot Topic quizzes.',
      'Practice safe decision-making in Real Customer Scenarios before taking live calls.'
    ]
  },
  {
    id: 'vid-csr-billing',
    lobId: 'csr',
    title: 'Handling a Billing Complaint: De-escalation Masterclass',
    duration: '4 min',
    description: 'Watch a senior CSR demonstrate the HEAT framework on a live simulated double-charge complaint, de-escalating in under 180 seconds.',
    tags: ['Policy', 'Billing', 'Soft Skills'],
    url: 'PASTE_LINK_HERE',
    speaker: 'Marcus Sterling, Senior CSR Coach',
    keyTakeaways: [
      'Acknowledge the billing discrepancy before discussing timelines.',
      'Use frontline credit autonomy up to $50 without unnecessary supervisor transfers.',
      'Always confirm the customer understands next month’s expected bill.'
    ]
  },
  {
    id: 'vid-tsr-troubleshooting',
    lobId: 'tsr',
    title: 'Troubleshooting Login Issues & Zero-Knowledge Resets',
    duration: '5 min',
    description: 'Step-by-step walkthrough of identifying customer lockout states, resetting multi-factor tokens securely, and cache-clearing browser redirects.',
    tags: ['Tools', 'Security', 'Troubleshooting'],
    url: 'PASTE_LINK_HERE',
    speaker: 'Priya Patel, Senior Tier 2 Lead',
    keyTakeaways: [
      'Differentiate between brute-force lockouts and password expiration.',
      'Execute out-of-band SMS OTP verification without viewing customer passwords.',
      'Guide users to clear corrupted mobile session cookies.'
    ]
  },
  {
    id: 'vid-sales-objections',
    lobId: 'sales',
    title: 'Three-Step Objection Handling: Price vs Value Anchoring',
    duration: '3 min',
    description: 'Learn how top sales agents handle the "Competitor is $15 cheaper" objection by breaking down total cost of ownership and unthrottled hotspot limits.',
    tags: ['Sales', 'Soft Skills', 'Closing'],
    url: 'PASTE_LINK_HERE',
    speaker: 'David Kim, Commercial Sales Specialist',
    keyTakeaways: [
      'Never attack the competitor; discover how the prospect uses their phone daily.',
      'Highlight hidden throttling and roaming charges in budget plans.',
      'Close with confidence using the 30-day satisfaction guarantee.'
    ]
  },
  {
    id: 'vid-act-verification',
    lobId: 'activation',
    title: 'Completing Account Verification: Document Anti-Fraud Protocol',
    duration: '3 min',
    description: 'An interactive look at inspecting uploaded government photo IDs, spotting digital manipulation, and guiding customers to capture clear scans.',
    tags: ['Policy', 'Compliance', 'Onboarding'],
    url: 'PASTE_LINK_HERE',
    speaker: 'Amina Nour, Fraud & Activation Analyst',
    keyTakeaways: [
      'Inspect 4 card corners and barcode clarity.',
      'Coach customers on turning off camera flash to avoid barcode wash-out.',
      'Process pending manual reviews within the 30-minute operational SLA.'
    ]
  },
  {
    id: 'vid-can-retention',
    lobId: 'canquest',
    title: 'Having a Retention Conversation: The Power of Right-Sizing',
    duration: '4 min',
    description: 'How to save high-risk churn accounts by moving over-provisioned users to lower budget tiers or seasonal holds, retaining customer lifetime value.',
    tags: ['Retention', 'Canquest', 'Soft Skills'],
    url: 'PASTE_LINK_HERE',
    speaker: 'Jordan Vance, Retention Operations Manager',
    keyTakeaways: [
      'Discover the real departure driver before presenting retention discounts.',
      'Leverage seasonal account pauses ($5/mo) for students and travelers.',
      'Deliver dignified departures when cancellation is genuinely the right choice.'
    ]
  }
];

// -------------------------------------------------------------
// TRAINER CONTACT FORM CONFIG
// -------------------------------------------------------------
export const TRAINER_CONFIG = {
  requestTypes: [
    'Ask a question',
    'Request clarification',
    'Suggest a new topic'
  ] as const,
  modules: [
    'Hot Topics',
    'Real Customer Scenarios',
    'Soft Skills Academy',
    'Microlearning Videos',
    'Other'
  ] as const,
};
