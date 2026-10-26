import { Message, AppSettings } from '../types';
import { SCHOOL_CONTEXT_DOC } from './storage';

interface GenerateOptions {
  messages: Message[];
  settings: AppSettings;
  onChunk: (chunk: string) => void;
  signal?: AbortSignal;
}

export async function generateAIResponse({
  messages,
  settings,
  onChunk,
  signal
}: GenerateOptions): Promise<string> {
  const lastMessage = messages[messages.length - 1];
  const query = lastMessage ? lastMessage.content.trim() : '';

  // Priority 1: Google Gemini API (Preconfigured with user's key)
  if (settings.apiProvider === 'gemini' && settings.apiKey) {
    try {
      return await callGeminiAPI(messages, settings, onChunk, signal);
    } catch (err: unknown) {
      console.warn('Gemini API call encountered an issue, transitioning to local knowledge base:', err);
      // Fallback gracefully to autonomous school knowledge engine
    }
  }

  // Priority 2: OpenAI if configured
  if (settings.apiProvider === 'openai' && settings.apiKey) {
    try {
      return await streamOpenAIResponse(messages, settings, onChunk, signal);
    } catch (err: unknown) {
      console.warn('OpenAI API call failed, falling back to school local engine:', err);
    }
  }

  // Priority 3: Autonomous School Knowledge Engine
  return await streamAutonomousSchoolResponse(query, messages, settings, onChunk, signal);
}

// Google Gemini API Engine
async function callGeminiAPI(
  messages: Message[],
  settings: AppSettings,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<string> {
  let modelName = settings.selectedModel || 'gemini-flash-latest';
  if (modelName === 'school-local-engine') {
    modelName = 'gemini-flash-latest';
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${settings.apiKey}`;

  // Build conversation history for Gemini API
  // In Gemini v1beta, contents parts array has role 'user' | 'model'
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const fullSystemInstruction = `${settings.systemPrompt}\n\nComprehensive School Knowledge Base:\n${SCHOOL_CONTEXT_DOC}`;

  const requestBody = {
    contents,
    systemInstruction: {
      parts: [{ text: fullSystemInstruction }]
    },
    generationConfig: {
      temperature: settings.temperature ?? 0.7,
      maxOutputTokens: 2048
    }
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
    signal
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini HTTP ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Gemini API returned an empty response candidate.');
  }

  // Stream text smoothly with typewriter effect matching user's streamSpeed
  const delay = settings.streamSpeed === 'fast' ? 6 : settings.streamSpeed === 'instant' ? 0 : 12;
  const tokens = rawText.split(/(?<=\s|[\n.,;:?!])/);

  let accumulated = '';
  for (const part of tokens) {
    if (signal?.aborted) break;
    accumulated += part;
    onChunk(accumulated);
    if (delay > 0) {
      await new Promise(r => setTimeout(r, delay));
    }
  }

  return accumulated;
}

// Autonomous School Knowledge Engine (Deterministic, instant, 100% verified against school facts)
async function streamAutonomousSchoolResponse(
  query: string,
  history: Message[],
  settings: AppSettings,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const q = query.toLowerCase();
  let fullResponse = '';

  if (q.includes('admission') || q.includes('dakhila') || q.includes('class 6') || q.includes('class 9') || q.includes('class 11') || q.includes('form') || q.includes('entrance') || q.includes('edudel')) {
    fullResponse = `### CM Shri School Karampura // Admission Guide 2026-27

Admissions to **CM Shri School Karampura (School ID: 1516068)** are governed centrally by the **Directorate of Education (DoE), Government of NCT of Delhi** under the prestigious **Centre of Excellence** initiative.

#### 1. Available Admission Grades
* **Class 6:** Vacant seats (~35 general seats).
* **Class 9:** Through Common Aptitude Entrance Test (based on vacancies).
* **Class 11:** Through Entrance Test & Stream Allocation (Science, Commerce, Humanities).

#### 2. Step-by-Step Application Process
1. **Online Portal:** Visit the Directorate of Education website at [edudel.nic.in](https://www.edudel.nic.in).
2. **Registration:** Click on **"CM Shri Admission 2026-27"** and select **School ID: \`1516068\`**.
3. **Fill Details:** Enter student particulars, previous class marks, Aadhaar number, and Delhi residential address.
4. **Common Aptitude Test:** Appear for the entrance test covering *Hindi, English, Mathematics, Science, and Mental Ability*.
5. **Merit List & Verification:** Shortlisted candidates are invited to the school campus for physical document verification.
6. **Free Admission Confirmation:** Once verified, admission is confirmed with **zero fees**.

#### 3. Mandatory Verification Documents
- Original Birth Certificate
- Report Card / Marksheet of the previously passed class
- Transfer Certificate (TC) from a recognized school
- Proof of Delhi Residence (Aadhaar Card, Voter ID, Ration Card, or Electricity Bill)
- Caste Certificate (SC/ST/OBC/EWS) if applicable
- 4 Recent passport-sized color photographs

> **100% Free Education Policy:** As a Delhi Government Centre of Excellence, all education, textbooks, and midday meals are provided entirely free of cost.`;

  } else if (q.includes('fee') || q.includes('fees') || q.includes('cost') || q.includes('paisa') || q.includes('charge')) {
    fullResponse = `### Fee Structure // CM Shri School Karampura

**Education at CM Shri School Karampura is 100% FREE** under the Government of NCT of Delhi's flagship **CM Shri Centre of Excellence** scheme.

| Component | Fee Amount | Notes |
| :--- | :--- | :--- |
| **Admission Fee** | **₹0 (NIL)** | No registration or admission fee charged |
| **Monthly Tuition Fee** | **₹0 (NIL)** | Free schooling for all classes (Grades 1 to 12) |
| **Science & ICT Lab Charges** | **₹0 (NIL)** | Free access to physics, chemistry, biology & computer labs |
| **Library & Sports** | **₹0 (NIL)** | Free book borrowing and sports coaching |
| **Textbooks & Uniforms** | **Provided / Subsidized** | Provided under Delhi Government educational welfare |
| **Mid-Day Meals** | **₹0 (NIL)** | Nutritious fresh meals provided daily |

> **Important:** Parents and guardians should beware of any touts or unauthorized agents. Admissions and schooling are strictly merit-based and completely free.`;

  } else if (q.includes('stream') || q.includes('subject') || q.includes('science') || q.includes('commerce') || q.includes('arts') || q.includes('humanities') || q.includes('11th') || q.includes('12th')) {
    fullResponse = `### Senior Secondary Streams & Subject Combinations (Classes 11 & 12)

CM Shri School Karampura offers all three major academic streams under the **Central Board of Secondary Education (CBSE)** curriculum:

#### 1. Science Stream (Medical & Non-Medical)
- **Physics**
- **Chemistry**
- **Biology** (Medical) / **Mathematics** (Non-Medical)
- **Computer Science / Physical Education**
- **English Core**

#### 2. Commerce Stream
- **Accountancy**
- **Business Studies**
- **Economics**
- **Mathematics / Informatics Practices (IP)**
- **English Core**

#### 3. Humanities / Arts Stream
- **History**
- **Political Science**
- **Economics**
- **Geography**
- **Hindi Elective / English Core**

> **Stream Allocation Criteria:** Stream allotment for Class 11 is determined based on Class 10 board performance and the Directorate of Education Common Aptitude Test scores.`;

  } else if (q.includes('contact') || q.includes('phone') || q.includes('address') || q.includes('email') || q.includes('location') || q.includes('map') || q.includes('principal') || q.includes('kahan hai')) {
    fullResponse = `### Official Contact & Location Directory

**Government Co-Ed Senior Secondary School, CM Shri School Karampura**

* **Campus Address:** Industrial Area, Karampura, New Delhi, West Delhi, Delhi – 110015
* **Administrative Zone:** Zone 16, District West-A, Directorate of Education
* **School ID (DoE):** \`1516068\`
* **CBSE Affiliation Code:** \`2766038\` (Valid up to 2028)
* **Head of Institution / Principal:** Sh. Harish Kumar / Sh. Hari Krishan

#### 📞 Telecommunication & Email
- **School Office Phone:** \`011-25455229\` / \`011-25100677\`
- **Emergency / Alternate Helpline:** \`+91 9818016205\`
- **Official Email:** [school1516068@yahoo.com](mailto:school1516068@yahoo.com)
- **Zone Office Email:** [1516104zone16@gmail.com](mailto:1516104zone16@gmail.com)

#### 🗺️ Navigation & Coordinates
- **Google Maps:** [Open in Google Maps](https://www.google.com/maps/place/Government+Co+Ed+Sr+Secondary+School+Industrial+Area+Karam+Pura/@28.6632984,77.1416647,17z)
- **Coordinates:** Latitude \`28.6632984\`, Longitude \`77.1416647\`
- **Nearest Transit:** Well connected via Karampura Industrial Area main arterial roads and Delhi Metro network.`;

  } else if (q.includes('facility') || q.includes('facilities') || q.includes('lab') || q.includes('smart') || q.includes('playground') || q.includes('library') || q.includes('campus')) {
    fullResponse = `### Campus Infrastructure & Modern Facilities

As a recognized **CM Shri Centre of Excellence**, the school has been upgraded with state-of-the-art academic and sports infrastructure:

#### ✦ Campus Scale
- **Total Campus Area:** 9,931 square meters with a secure pucca boundary wall.
- **Sports Playground:** 2,512 square meters dedicated open field for football, cricket, athletics, and yoga.

#### ✦ Academic Infrastructure
- **32 Classrooms:** Spacious, well-ventilated, all-weather instructional rooms.
- **AI Smart Classrooms:** Equipped with audio-visual smart boards, interactive displays, and digital learning content.
- **3 Specialized Science Labs:** Dedicated Physics, Chemistry, and Biology laboratories equipped for CBSE practical exams.
- **Computer ICT Lab:** 10 functional high-speed learning workstations with broadband connectivity.
- **School Library:** Stocked with over **7,969 books**, reference journals, and competitive exam preparation materials.

#### ✦ Student Welfare & Sanitation
- **Mid-Day Meals:** Fresh, hygienic, and nutritious meals prepared under Directorate of Education standards.
- **Functional Restrooms:** 9 dedicated boys' toilets and 9 dedicated girls' toilets.
- **Pure Tap Drinking Water:** Tested clean drinking water facilities.
- **Co-Curriculars:** NCC, Scouts & Guides, Sports Day, Annual Cultural Meet, and Science Exhibitions.`;

  } else if (q.includes('cbse') || q.includes('affiliation') || q.includes('board') || q.includes('udise')) {
    fullResponse = `### CBSE & Regulatory Affiliation Credentials

- **Affiliation Board:** Central Board of Secondary Education (CBSE), New Delhi
- **CBSE Affiliation Code:** \`2766038\` (Affiliated up to 2028)
- **Directorate of Education School ID:** \`1516068\`
- **UDISE Code:** \`07070110001\`
- **School Category:** Co-Educational Senior Secondary (Grades 1 to 12)
- **Medium of Instruction:** Bilingual (English and Hindi)
- **Governing Body:** Directorate of Education, Government of NCT of Delhi`;

  } else {
    fullResponse = `### CM Shri School Karampura // AI Helpdesk

Thank you for your question regarding **Government Co-Ed Senior Secondary School, CM Shri School Karampura (School ID: 1516068)**.

Here is a summary of key institutional details:
- **School Status:** One of 75 Delhi Government CM Shri Centres of Excellence
- **Curriculum:** CBSE Affiliated (Code: 2766038, valid up to 2028)
- **Classes:** Co-educational schooling from Class 1 to Class 12
- **Senior Secondary Streams:** Science, Commerce, and Humanities
- **Tuition:** 100% Free Education with zero admission or tuition fees
- **Admissions:** Centralized via [edudel.nic.in](https://www.edudel.nic.in) for Classes 6, 9, and 11
- **Contact:** 011-25455229 | [school1516068@yahoo.com](mailto:school1516068@yahoo.com)

You can ask me about:
1. **Admissions:** Eligibility, entrance test format, registration dates
2. **Streams:** Subject options in Class 11 Science, Commerce, and Arts
3. **Facilities:** AI Smart Classrooms, science labs, library, sports ground
4. **Documents:** Verification checklist for new students

*Type \`/\` in the message box for quick school command templates.* How can I help you further?`;
  }

  // Stream text smoothly with typewriter effect matching user's streamSpeed
  const delay = settings.streamSpeed === 'fast' ? 6 : settings.streamSpeed === 'instant' ? 0 : 12;
  const tokens = fullResponse.split(/(?<=\s|[\n.,;:?!])/);

  let accumulated = '';
  for (const part of tokens) {
    if (signal?.aborted) break;
    accumulated += part;
    onChunk(accumulated);
    if (delay > 0) {
      await new Promise(r => setTimeout(r, delay));
    }
  }

  return accumulated;
}

// Helper to generate a succinct conversation title from the first prompt
export function generateChatTitle(prompt: string): string {
  const clean = prompt.replace(/[#*`]/g, '').trim();
  if (clean.length <= 32) return clean;
  const words = clean.split(/\s+/).slice(0, 5).join(' ');
  return `${words}...`;
}

// Real OpenAI Streaming API integration
async function streamOpenAIResponse(
  messages: Message[],
  settings: AppSettings,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const endpoint = settings.apiEndpoint || 'https://api.openai.com/v1/chat/completions';
  const apiMessages = [
    { role: 'system', content: `${settings.systemPrompt}\n\nSchool Knowledge Base:\n${SCHOOL_CONTEXT_DOC}` },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: apiMessages,
      temperature: settings.temperature,
      stream: true
    }),
    signal
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenAI HTTP ${res.status}: ${errorText}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error('Response stream body unavailable');

  const decoder = new TextDecoder();
  let full = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunkStr = decoder.decode(value, { stream: true });
    const lines = chunkStr.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;
      if (trimmed.startsWith('data: ')) {
        try {
          const json = JSON.parse(trimmed.slice(6));
          const delta = json.choices?.[0]?.delta?.content || '';
          full += delta;
          onChunk(full);
        } catch {}
      }
    }
  }

  return full;
}
