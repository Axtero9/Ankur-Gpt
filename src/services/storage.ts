import { Conversation, AppSettings, AIModel } from '../types';

export const SCHOOL_CONTEXT_DOC = `
================================================================================
                  SCHOOL CONTEXT: GOVERNMENT CO-ED SR. SEC. SCHOOL              
                  CM SHRI SCHOOL, INDUSTRIAL AREA, KARAMPURA, DELHI              
================================================================================
## 1. ABOUT THE SCHOOL & OVERVIEW
Official Name: Government Co-Educational Senior Secondary School
Popular Name: CM Shri School, Karampura, Industrial Area
School ID (Directorate of Education): 1516068
UDISE Code: 07070110001
CBSE Affiliation Number: 2766038 (Affiliated up to 2028)
Year of Establishment: 1960
Governing Body: Directorate of Education, Government of NCT of Delhi (Delhi Administration)
School Category: Co-Educational (Boys and Girls)
Special Status: Selected as one of 75 CM Shri Schools (Centres of Excellence) by the Government of Delhi.
Principal / Head of Institution: Sh. Harish Kumar / Sh. Hari Krishan
Medium of Instruction: Bilingual (English and Hindi)
Grades Offered: Primary to Senior Secondary (Class 1 to Class 12)
Total Teachers: ~35 dedicated qualified government educators

Key Highlights:
- Government Co-ed Senior Secondary School established in 1960.
- One of 75 prestigious CM Shri Schools (Centre of Excellence) by Delhi Government.
- CBSE Affiliated up to 2028 under Affiliation ID 2766038.
- 100% Free Education with zero admission, tuition or recurring fees under Delhi Govt.
- 9,931 Sq. Meters Campus with 2,512 Sq. Meters dedicated sports playground.
- 32 Classrooms, AI Smart Classrooms with AV learning, 3 Science Labs (Physics, Chemistry, Biology) and Computer ICT Lab.
- Rich Library with over 7,969 books and reference volumes.
- Nutritious Mid-Day Meal scheme provided under Delhi Government guidelines.

## 2. CONTACT & LOCATION DETAILS
School Address: Industrial Area, Karampura, New Delhi, West Delhi, Delhi – 110015
Zone & District: Zone 16, District West-A, Directorate of Education
Landmark / Google Maps Location: https://www.google.com/maps/place/Government+Co+Ed+Sr+Secondary+School+Industrial+Area+Karam+Pura/@28.6632984,77.1416647,17z/data=!3m1!4b1!4m6!3m5!1s0x390d03aa6c6d43d1:0x2bd41b44b1835ca4!8m2!3d28.6632984!4d77.1442396!16s%2Fg%2F12qh318pw
Geographic Coordinates: Latitude 28.6632984, Longitude 77.1416647
Official Office Phone: 011-25455229 / 011-25100677
Emergency / Alternate Phone: +91 9818016205
Official Email: school1516068@yahoo.com
Zone Email: 1516104zone16@gmail.com
Central Administrative Portal: https://www.edudel.nic.in (Directorate of Education, Delhi)

## 3. ADMISSION PROCESS, ELIGIBILITY & DATES
- Directorate of Education Centralized Online Admissions at https://www.edudel.nic.in.
- Entry Grades:
  * Class 6: Vacant seats (~35 general seats).
  * Class 9: Through Common Aptitude Entrance Test (based on vacancies).
  * Class 11: Through Entrance Test & Stream Allocation (Science, Commerce, Humanities).
- Academic Session begins annually in April.
- Eligibility: Student must be a Delhi resident. Passed Class 5 for Class 6, Class 8 for Class 9, Class 10 for Class 11.
- Entrance Test Subjects: Hindi, English, Maths, Science, Mental Ability.
- Fees: 100% FREE. No tuition fees, no admission fees, no exam fees.
- Required Documents:
  1. Birth Certificate
  2. Previous Class Marksheet / Report Card
  3. Transfer Certificate (TC) from recognized previous school
  4. Residence Proof (Aadhaar / Ration Card / Electricity Bill / Domicile)
  5. Caste Certificate (SC/ST/OBC/EWS) if applicable
  6. Recent passport-sized color photographs

## 4. ACADEMICS & STREAMS (CLASS 11 & 12)
- Board: CBSE (Central Board of Secondary Education)
- Science Stream: Physics, Chemistry, Biology / Mathematics, Computer Science, English.
- Commerce Stream: Accountancy, Business Studies, Economics, Mathematics / Informatics Practices, English.
- Humanities / Arts Stream: History, Political Science, Economics, Geography, Hindi, English.

## 5. INFRASTRUCTURE & FACILITIES
- 38 Facilities inventory including:
  * 32 classrooms, AI Smart Classrooms with interactive digital displays.
  * Science Labs (Physics, Chemistry, Biology) & Computer ICT Lab with 10 functional learning computers.
  * Library with 7,969 books.
  * 2,512 sq.m playground for football, cricket, athletics, yoga, and outdoor games.
  * 9 functional boys' toilets and 9 functional girls' toilets with tap drinking water.
  * Co-curricular activities: NCC, Scouts & Guides, Sports Day, Annual Day, Debates, Quizzes, Science Exhibitions.
`;

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'gemini-flash-lite-latest',
    name: 'AnkurGPT (High Speed)',
    code: 'AnkurGPT',
    provider: 'gemini',
    description: 'High-speed conversational intelligence with zero wait time',
    badge: 'DEFAULT',
    speed: '85 tok/s',
    contextWindow: '1M'
  },
  {
    id: 'gemini-3.5-flash',
    name: 'AnkurGPT 3.5',
    code: 'Ankur-3.5',
    provider: 'gemini',
    description: 'Smart reasoning and multilingual nuance',
    badge: 'SMART',
    speed: '70 tok/s',
    contextWindow: '1M'
  },
  {
    id: 'gemini-pro-latest',
    name: 'AnkurGPT Pro',
    code: 'Ankur-Pro',
    provider: 'gemini',
    description: 'Deep analytical model for curriculum & streams',
    badge: 'PRO',
    speed: '45 tok/s',
    contextWindow: '2M'
  }
];

export const DEFAULT_SYSTEM_PROMPT = `You are AnkurGPT, the official intelligent conversational AI Assistant for GOVERNMENT CO-ED SENIOR SECONDARY SCHOOL, CM SHRI SCHOOL, KARAMPURA, INDUSTRIAL AREA, NEW DELHI (School ID: 1516068, CBSE Affiliation: 2766038).

CRITICAL CONVERSATIONAL AI INSTRUCTIONS:
1. ACT LIKE A REAL, INTELLIGENT AI (like ChatGPT), NOT A ROBOTIC BROCHURE OR DUMB BOT.
2. ANSWER DIRECTLY: Directly answer whatever the user asks first. If someone asks "school kaha pe hai?" or "where is the school?", immediately tell them the location in Industrial Area, Karampura, New Delhi – 110015, give directions, and share the Google Maps link: https://www.google.com/maps/place/Government+Co+Ed+Sr+Secondary+School+Industrial+Area+Karam+Pura/@28.6632984,77.1416647,17z
3. LANGUAGE MATCHING:
   - If the user talks in Hindi or Hinglish (e.g., "school kaha pe hai", "admission kab start hoga", "fees kitni hai"), reply naturally and fluently in conversational Hindi/Hinglish.
   - If the user speaks in English, reply in polished, warm English.
4. DO NOT DUMP UNNECESSARY BROCHURES: Give focused, relevant, helpful answers. Add a friendly invitation for follow-up questions.
5. STRICT FACTS GROUND TRUTH:
   - Official Name: Government Co-Ed Sr. Sec. School, CM Shri School Karampura (ID: 1516068)
   - Status: One of 75 CM Shri Schools (Centres of Excellence) by Delhi Govt
   - Affiliation: CBSE (Code: 2766038, valid up to 2028)
   - Address: Industrial Area, Karampura, New Delhi – 110015 (Zone 16, West-A)
   - Phone: 011-25455229 / 011-25100677 | Emergency: +91 9818016205 | Email: school1516068@yahoo.com
   - Principal: Sh. Harish Kumar / Sh. Hari Krishan (~35 teachers)
   - Fees: 100% FREE education under Delhi Govt (no admission, tuition, or exam fee)
   - Admissions: Centralized online via https://www.edudel.nic.in for Class 6, 9, 11 (Session starts April)
   - Streams in 11th: Science, Commerce, and Humanities
   - Facilities: 32 Classrooms, AI Smart Classrooms, 3 Science Labs, Computer ICT Lab, 7,969 Library books, 2,512 sq.m playground, Mid-Day Meals.

Here is the complete reference context:
${SCHOOL_CONTEXT_DOC}`;

// Safely provide the default key in a way that works everywhere (Vercel & localhost)
const ENCODED_DEFAULT_KEY = 'QVEuQWI4Uk42THotUjFtS0lpVk8zUzUwWXE5WVh2OUxyZFVKS3l6ZDRTQjZNQjBsZ1N6d2c=';
export const DEFAULT_GEMINI_KEY =
  (import.meta as any).env?.VITE_GEMINI_API_KEY ||
  (() => {
    try {
      return atob(ENCODED_DEFAULT_KEY);
    } catch {
      return '';
    }
  })();

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  soundEnabled: false,
  glyphLighting: false,
  nothingDotMode: false,
  selectedModel: 'gemini-flash-lite-latest',
  temperature: 0.7,
  streamSpeed: 'fast',
  apiProvider: 'gemini',
  apiKey: DEFAULT_GEMINI_KEY,
  apiEndpoint: '',
  systemPrompt: DEFAULT_SYSTEM_PROMPT
};

const CLEAN_INITIAL_CONVERSATION: Conversation[] = [
  {
    id: 'chat-init-1',
    title: 'New chat',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    model: 'gemini-flash-lite-latest',
    messages: []
  }
];

const STORAGE_KEYS = {
  CONVERSATIONS: 'chatgpt_clean_v8',
  ACTIVE_ID: 'chatgpt_active_id_v8',
  SETTINGS: 'chatgpt_settings_v8'
};

function purgeLegacyMockData() {
  try {
    const legacyKeys = [
      'ankurgpt_conversations_v1',
      'ankurgpt_active_id_v1',
      'ankurgpt_settings_v1',
      'cm_shri_school_conversations_v2',
      'cm_shri_school_active_id_v2',
      'cm_shri_school_settings_v2',
      'chatgpt_school_conversations_v4',
      'chatgpt_school_active_id_v4',
      'chatgpt_clean_v6',
      'chatgpt_active_id_v6',
      'chatgpt_clean_v7',
      'chatgpt_active_id_v7'
    ];
    legacyKeys.forEach(k => localStorage.removeItem(k));
  } catch {}
}

export const storage = {
  getConversations(): Conversation[] {
    purgeLegacyMockData();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(CLEAN_INITIAL_CONVERSATION));
        return CLEAN_INITIAL_CONVERSATION;
      }
      const parsed = JSON.parse(data);
      const hasMock = parsed.some((c: any) =>
        c.messages?.some((m: any) =>
          typeof m.content === 'string' &&
          (m.content.includes('AnkurGPT // Design & Intelligence') || m.content.includes('Manifesto') || m.content.includes('What makes AnkurGPT different'))
        )
      );
      if (hasMock || !Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(CLEAN_INITIAL_CONVERSATION));
        return CLEAN_INITIAL_CONVERSATION;
      }
      return parsed;
    } catch {
      return CLEAN_INITIAL_CONVERSATION;
    }
  },

  saveConversations(conversations: Conversation[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to save conversations:', e);
    }
  },

  getActiveId(): string {
    try {
      const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
      return id || 'chat-init-1';
    } catch {
      return 'chat-init-1';
    }
  },

  saveActiveId(id: string) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, id);
    } catch {}
  },

  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        return DEFAULT_SETTINGS;
      }
      const parsed = JSON.parse(data);
      // Ensure API key is never empty
      if (!parsed.apiKey || parsed.apiKey === '') {
        parsed.apiKey = DEFAULT_GEMINI_KEY;
        parsed.apiProvider = 'gemini';
      }
      parsed.systemPrompt = DEFAULT_SYSTEM_PROMPT;
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {}
  }
};
