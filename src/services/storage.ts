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
Medium of Instruction: Bilingual (English & Hindi)
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
Landmark / Google Maps: https://www.google.com/maps/place/Government+Co+Ed+Sr+Secondary+School+Industrial+Area+Karam+Pura/@28.6632984,77.1416647,17z
Geographic Coordinates: Latitude 28.6632984, Longitude 77.1416647
Official Office Phone: 011-25455229 / 011-25100677
Emergency / Alternate Phone: +91 9818016205
Official Email: school1516068@yahoo.com
Zone Email: 1516104zone16@gmail.com
Central Administrative Portal: https://www.edudel.nic.in (Directorate of Education, Delhi)

## 3. ADMISSION PROCESS, ELIGIBILITY & DATES
- Directorate of Education Centralized Online Admissions at https://www.edudel.nic.in.
- Entry Grades:
  * Class 6: Vacant seats (approx 35 seats for general category).
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
    id: 'gemini-flash-latest',
    name: 'AnkurGPT (Gemini 3.8)',
    code: 'AnkurGPT',
    provider: 'gemini',
    description: 'Official Gemini 3.8 Flash model for CM Shri Karampura',
    badge: 'DEFAULT',
    speed: '65 tok/s',
    contextWindow: '1M'
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'AnkurGPT Lite',
    code: 'Ankur-Lite',
    provider: 'gemini',
    description: 'Ultra-low latency model for rapid school answers',
    badge: 'FAST',
    speed: '85 tok/s',
    contextWindow: '1M'
  },
  {
    id: 'gemini-pro-latest',
    name: 'AnkurGPT Pro',
    code: 'Ankur-Pro',
    provider: 'gemini',
    description: 'Deep reasoning for syllabus and streams',
    badge: 'PRO',
    speed: '45 tok/s',
    contextWindow: '2M'
  }
];

export const DEFAULT_SYSTEM_PROMPT = `You are AnkurGPT, the official AI Assistant for GOVERNMENT CO-ED SENIOR SECONDARY SCHOOL, CM SHRI SCHOOL, KARAMPURA, INDUSTRIAL AREA, NEW DELHI (School ID: 1516068, CBSE Affiliation: 2766038).

Your purpose is to assist students, parents, teachers, and visitors with accurate, clear, and polite information about the school.

Core School Facts:
- Official Name: Government Co-Educational Senior Secondary School, CM Shri School Karampura Industrial Area
- Popular Name: CM Shri School Karampura
- Status: One of 75 CM Shri Schools (Centres of Excellence) by the Government of NCT of Delhi
- Directorate of Education School ID: 1516068
- CBSE Affiliation: 2766038 (Affiliated up to 2028)
- Address: Industrial Area, Karampura, New Delhi, West Delhi, Delhi – 110015 (Zone 16, District West-A)
- Contact: Office Phone: 011-25455229 / 011-25100677 | Emergency: +91 9818016205 | Email: school1516068@yahoo.com
- Principal: Sh. Harish Kumar / Sh. Hari Krishan
- Admissions: Centralized online via https://www.edudel.nic.in for Class 6 (vacant seats), Class 9 (Aptitude Test), and Class 11 (Stream Allocation Test).
- Fees: 100% FREE education under the Delhi Govt CM Shri initiative. Zero admission or tuition fees.
- Streams in Class 11/12: Science, Commerce, and Humanities/Arts.
- Facilities: 32 Classrooms, AI Smart Classrooms, 3 Science Labs, Computer ICT Lab, 7,969 Library books, 2,512 sq.m playground, Mid-Day Meals.

Response Guidelines:
1. Always maintain a helpful, welcoming, and respectful tone like ChatGPT.
2. Provide answers in English or Hindi/Hinglish depending on what language the user asks in.
3. Format responses using clean markdown: clear headings, bullet points, and tables.
4. When talking about admissions, always highlight the official portal: https://www.edudel.nic.in and the School ID 1516068.
5. If someone asks for location or contact, provide the complete address, phone number, and Google Maps reference.`;

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  soundEnabled: false, // Default off for pure ChatGPT feel
  glyphLighting: false,
  nothingDotMode: false,
  selectedModel: 'gemini-flash-latest',
  temperature: 0.7,
  streamSpeed: 'fast',
  apiProvider: 'gemini',
  apiKey: (import.meta as any).env?.VITE_GEMINI_API_KEY || '',
  apiEndpoint: '',
  systemPrompt: DEFAULT_SYSTEM_PROMPT
};

// ZERO MOCK MESSAGES - Starts completely clean and empty like the screenshot
const CLEAN_INITIAL_CONVERSATION: Conversation[] = [
  {
    id: 'chat-init-1',
    title: 'New chat',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    model: 'gemini-flash-latest',
    messages: [] // COMPLETELY EMPTY
  }
];

const STORAGE_KEYS = {
  CONVERSATIONS: 'chatgpt_clean_v6',
  ACTIVE_ID: 'chatgpt_active_id_v6',
  SETTINGS: 'chatgpt_settings_v6'
};

// Purge any old legacy keys that contained mock messages
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
      'chatgpt_school_active_id_v4'
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
      // If any old mock message exists in parsed array, wipe it clean
      const hasMock = parsed.some((c: any) =>
        c.messages?.some((m: any) =>
          typeof m.content === 'string' &&
          (m.content.includes('AnkurGPT') || m.content.includes('Manifesto') || m.content.includes('What makes AnkurGPT different'))
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
      if (!parsed.apiKey || parsed.apiKey === '') {
        parsed.apiKey = DEFAULT_SETTINGS.apiKey;
        parsed.apiProvider = 'gemini';
      }
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
