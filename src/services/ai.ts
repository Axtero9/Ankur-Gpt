import { Message, AppSettings } from '../types';
import { SCHOOL_CONTEXT_DOC, DEFAULT_GEMINI_KEY } from './storage';

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
  const effectiveKey = settings.apiKey || DEFAULT_GEMINI_KEY;

  // Priority 1: Google Gemini API (High-speed multi-model failover)
  if (effectiveKey) {
    try {
      return await callGeminiAPIWithFailover(messages, settings, effectiveKey, onChunk, signal);
    } catch (err: unknown) {
      console.warn('Gemini API call encountered an issue, transitioning to intelligent local engine:', err);
    }
  }

  // Priority 2: OpenAI if configured
  if (settings.apiProvider === 'openai' && settings.apiKey) {
    try {
      return await streamOpenAIResponse(messages, settings, onChunk, signal);
    } catch (err: unknown) {
      console.warn('OpenAI API call failed, falling back to local engine:', err);
    }
  }

  // Priority 3: Conversational Autonomous Engine
  return await streamAutonomousSchoolResponse(query, messages, settings, onChunk, signal);
}

// Gemini API with automatic model failover (tries Lite, 3.5, 3.1 so 503 spikes never break the UX)
async function callGeminiAPIWithFailover(
  messages: Message[],
  settings: AppSettings,
  apiKey: string,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<string> {
  // Order of candidate models to try
  const candidateModels = [
    settings.selectedModel || 'gemini-flash-lite-latest',
    'gemini-flash-lite-latest',
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-flash-latest'
  ];

  // Remove duplicates while preserving order
  const uniqueModels = Array.from(new Set(candidateModels));

  let lastError: Error | null = null;

  for (const model of uniqueModels) {
    if (signal?.aborted) throw new Error('Aborted');

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const contents = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const fullSystemInstruction = `${settings.systemPrompt}\n\nSchool Ground Truth Knowledge:\n${SCHOOL_CONTEXT_DOC}`;

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.warn(`Model ${model} returned HTTP ${res.status}:`, errorText);
        lastError = new Error(`HTTP ${res.status}`);
        continue; // try next candidate model
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        lastError = new Error('Empty response');
        continue;
      }

      // Stream text smoothly with typewriter effect matching user's streamSpeed
      const delay = settings.streamSpeed === 'fast' ? 5 : settings.streamSpeed === 'instant' ? 0 : 12;
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
    } catch (e: any) {
      if (signal?.aborted) throw e;
      lastError = e;
    }
  }

  throw lastError || new Error('All Gemini models unavailable');
}

// Conversational Autonomous Engine (Natural, responsive, human-like answers when offline)
async function streamAutonomousSchoolResponse(
  query: string,
  history: Message[],
  settings: AppSettings,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const q = query.toLowerCase();
  let fullResponse = '';

  // Location / Where is the school?
  if (
    q.includes('kaha') ||
    q.includes('kahan') ||
    q.includes('where') ||
    q.includes('address') ||
    q.includes('location') ||
    q.includes('rasta') ||
    q.includes('metro') ||
    q.includes('route')
  ) {
    fullResponse = `Humara school **Industrial Area, Karampura, New Delhi – 110015** (Zone 16, District West-A) mein sthit hai.

Aap Google Maps par direct directions ke liye is link par click kar sakte hain:
📍 [Google Maps Directions](https://www.google.com/maps/place/Government+Co+Ed+Sr+Secondary+School+Industrial+Area+Karam+Pura/@28.6632984,77.1416647,17z)

School all-weather pucca road se easily accessible hai aur Delhi Metro network se well-connected hai. Kya aapko school tak pahunchne ka nearest metro station ya timings janna hai?`;

  // Fees / Cost / Free?
  } else if (
    q.includes('fee') ||
    q.includes('fees') ||
    q.includes('cost') ||
    q.includes('paisa') ||
    q.includes('paise') ||
    q.includes('kharcha') ||
    q.includes('charge') ||
    q.includes('free')
  ) {
    fullResponse = `CM Shri School Karampura mein education **100% FREE** hai!

Delhi Government ke **CM Shri Centre of Excellence** initiative ke antargat:
- **Admission Fee:** ₹0 (NIL)
- **Monthly Tuition Fee:** ₹0 (NIL)
- **Exam & Lab Charges:** ₹0 (NIL)
- **Books & Uniform:** Provided / Subsidized under Delhi Govt schemes
- **Mid-Day Meal:** Free nutritious daily meals

Kisi bhi prakaar ka koi hidden charge nahi hai. Kya aapko admission process ya eligibility ke baare mein janna hai?`;

  // Admissions / Process / Dates
  } else if (
    q.includes('admission') ||
    q.includes('dakhila') ||
    q.includes('apply') ||
    q.includes('entrance') ||
    q.includes('edudel') ||
    q.includes('test') ||
    q.includes('class 6') ||
    q.includes('class 9') ||
    q.includes('class 11')
  ) {
    fullResponse = `CM Shri School Karampura (School ID: **1516068**) ke admissions Directorate of Education ke centralized online system ke through hote hain.

**Admission Classes:**
- **Class 6:** Approx 35 vacant seats (General category)
- **Class 9:** Centralized Common Aptitude Test ke score par
- **Class 11:** Aptitude Test aur stream allocation (Science, Commerce, Humanities) ke basis par

**Apply Kaise Karein?**
1. [edudel.nic.in](https://www.edudel.nic.in) par jayein aur **CM Shri Admission 2026-27** link par click karein.
2. Form mein student details aur School ID **1516068** select karein.
3. Entrance test (Hindi, English, Maths, Science, Mental Ability) appear karein.
4. Merit list aane par school campus mein document verification ke baad free admission confirm ho jata hai.

Session April se start hota hai. Kya aapko required documents ki list chahiye?`;

  // Streams & Subjects for 11th & 12th
  } else if (
    q.includes('stream') ||
    q.includes('subject') ||
    q.includes('science') ||
    q.includes('commerce') ||
    q.includes('arts') ||
    q.includes('humanities') ||
    q.includes('11th') ||
    q.includes('12th')
  ) {
    fullResponse = `Class 11 aur 12 mein teenon major CBSE streams available hain:

1. **Science Stream:**
   - Physics, Chemistry, Biology (Medical) / Mathematics (Non-Medical)
   - Computer Science / Physical Education, English Core

2. **Commerce Stream:**
   - Accountancy, Business Studies, Economics
   - Mathematics / Informatics Practices (IP), English Core

3. **Humanities / Arts Stream:**
   - History, Political Science, Economics, Geography
   - Hindi Elective / English Core

Stream allotment Class 10 ke marks aur DoE Aptitude Test ke basis par kiya jata hai. Aap kaunsi stream lene ki soch rahe hain?`;

  // Contact / Phone / Email / Principal
  } else if (
    q.includes('contact') ||
    q.includes('phone') ||
    q.includes('number') ||
    q.includes('email') ||
    q.includes('principal') ||
    q.includes('head')
  ) {
    fullResponse = `Aap school administration se in details par direct contact kar sakte hain:

- **Principal / Head of Institution:** Sh. Harish Kumar / Sh. Hari Krishan
- **Office Phone:** \`011-25455229\` / \`011-25100677\`
- **Emergency Helpline:** \`+91 9818016205\`
- **Official Email:** [school1516068@yahoo.com](mailto:school1516068@yahoo.com)
- **Campus Address:** Industrial Area, Karampura, New Delhi – 110015 (Zone 16, West-A)
- **DoE School ID:** 1516068 | **CBSE Code:** 2766038

Kya aapko kisi specific department ya teacher se baat karni hai?`;

  // Campus / Facilities / Labs / Playground
  } else if (
    q.includes('facility') ||
    q.includes('facilities') ||
    q.includes('lab') ||
    q.includes('smart') ||
    q.includes('playground') ||
    q.includes('library') ||
    q.includes('sports') ||
    q.includes('ground')
  ) {
    fullResponse = `CM Shri School Karampura ek modern **Centre of Excellence** hai jismein top-tier facilities hain:

- **Campus & Sports:** 9,931 sq. meter campus with a 2,512 sq. meter open sports ground (cricket, football, athletics, yoga).
- **AI Smart Classrooms:** 32 classrooms equipped with interactive smart boards aur digital learning screens.
- **Laboratories:** 3 well-equipped Science Labs (Physics, Chemistry, Biology) + Computer ICT Lab (10 workstations).
- **Library:** 7,969+ academic aur competitive exam books ka collection.
- **Student Welfare:** Fresh Mid-Day Meals, 9 functional boys' & 9 girls' toilets, pure tap drinking water.
- **Activities:** NCC, Scouts & Guides, Sports Day, Annual Day aur Science Exhibitions.`;

  // Greetings / Hi / Hello
  } else if (
    q.includes('hi') ||
    q.includes('hello') ||
    q.includes('hey') ||
    q.includes('namaste') ||
    q.includes('who are you')
  ) {
    fullResponse = `Namaste! Main **AnkurGPT** hoon — Government Co-Ed Senior Secondary School, CM Shri School Karampura (School ID: **1516068**) ka official AI Assistant.

Main aapki admissions (Class 6, 9, 11), Class 11 ke streams, free fee structure, campus facilities, ya school contact details mein madad kar sakta hoon.

Aap mujhse school ke baare mein kuch bhi pooch sakte hain. Kaise madad karun aapki?`;

  // Fallback direct answer
  } else {
    fullResponse = `Aapne poocha: *"${query}"*

Main **CM Shri School Karampura (ID: 1516068)** ka official AI Assistant hoon.

Aap mujhse school ke baare mein direct pooch sakte hain:
- **Location & Contact:** School kaha hai, phone number, principal details
- **Admissions 2026-27:** Class 6, 9 aur 11 ke online application aur test
- **Streams & Subjects:** Class 11 Science, Commerce, aur Humanities
- **Facilities:** AI Smart Classrooms, science labs, library aur sports ground
- **100% Free Education:** Zero fees policy

Aap apna sawal thoda detail mein likhein, main turant direct answer dunga!`;
  }

  // Stream smoothly
  const delay = settings.streamSpeed === 'fast' ? 5 : settings.streamSpeed === 'instant' ? 0 : 10;
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

// Generate Succinct Title
export function generateChatTitle(prompt: string): string {
  const clean = prompt.replace(/[#*`]/g, '').trim();
  if (clean.length <= 30) return clean;
  const words = clean.split(/\s+/).slice(0, 5).join(' ');
  return `${words}...`;
}

// OpenAI API integration
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
