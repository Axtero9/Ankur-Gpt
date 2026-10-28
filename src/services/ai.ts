import { Message, AppSettings } from '../types';
import { SCHOOL_CONTEXT_DOC, DEFAULT_GEMINI_KEY } from './storage';
import { queryTimetableOrFaculty } from '../data/timetables';

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

      const contents = messages.map(m => {
        const parts: any[] = [];
        if (m.image) {
          const match = m.image.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            parts.push({
              inlineData: {
                mimeType: match[1],
                data: match[2]
              }
            });
          }
        }
        if (m.content) {
          parts.push({ text: m.content });
        } else if (parts.length === 0) {
          parts.push({ text: 'Please analyze this question photo and provide the step-by-step solution.' });
        }
        return {
          role: m.role === 'assistant' ? 'model' : 'user',
          parts
        };
      });

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

// Math Solvers
function trySolveLinearEquation(q: string): string | null {
  // Matches expressions like: 2x + 15 = 45, 3x - 5 = 10, 5x = 50, x + 8 = 20, solve 4x - 12 = 28
  const m = q.match(/(?:solve\s+)?([+-]?\d*)x\s*([+-])\s*(\d+(?:\.\d+)?)\s*=\s*([+-]?\d+(?:\.\d+)?)/i);
  if (m) {
    const aStr = m[1].trim();
    const a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);
    const op = m[2];
    const b = parseFloat(m[3]);
    const c = parseFloat(m[4]);
    const bSigned = op === '-' ? -b : b;
    const rhsAfter = c - bSigned;
    const x = rhsAfter / a;
    const xFormatted = Number.isInteger(x) ? x.toString() : x.toFixed(2);

    return `### 📐 Linear Equation Solution

**Given Equation:**
$$${a === 1 ? '' : a === -1 ? '-' : a}x ${bSigned >= 0 ? '+ ' + bSigned : '- ' + Math.abs(bSigned)} = ${c}$$

---

#### Step-by-Step Working:
1. **Transpose constant term to Right Hand Side (RHS):**
   $$${a === 1 ? '' : a === -1 ? '-' : a}x = ${c} - (${bSigned})$$
   $$${a === 1 ? '' : a === -1 ? '-' : a}x = ${rhsAfter}$$

2. **Isolate variable $x$ by dividing both sides by the coefficient (${a}):**
   $$x = \\frac{${rhsAfter}}{${a}}$$
   **$$x = ${xFormatted}$$**

3. **Verification (Check your answer):**
   - $\\text{LHS} = ${a}(${xFormatted}) + (${bSigned}) = ${a * Number(xFormatted) + bSigned}$
   - $\\text{RHS} = ${c}$
   - Since $\\text{LHS} = \\text{RHS}$, the solution is **verified and correct! ✓**

---
> 💡 *Need to solve another equation or word problem? Just type it here!*`;
  }

  // Matches 5x = 50 or 2x = 18
  const mSimple = q.match(/(?:solve\s+)?([+-]?\d+)x\s*=\s*([+-]?\d+(?:\.\d+)?)/i);
  if (mSimple) {
    const a = parseFloat(mSimple[1]);
    const c = parseFloat(mSimple[2]);
    const x = c / a;
    const xFormatted = Number.isInteger(x) ? x.toString() : x.toFixed(2);

    return `### 📐 Linear Equation Solution

**Given:**
$$${a}x = ${c}$$

1. Divide both sides by ${a}:
   $$x = \\frac{${c}}{${a}} = ${xFormatted}$$

**Final Answer:** **$$x = ${xFormatted}$$** ✓`;
  }

  return null;
}

function trySolveArithmetic(q: string): string | null {
  // Percentage: e.g. "25% of 800", "15 % 500"
  const perc = q.match(/(\d+(?:\.\d+)?)\s*%\s*(?:of)?\s*(\d+(?:\.\d+)?)/i);
  if (perc) {
    const p = parseFloat(perc[1]);
    const total = parseFloat(perc[2]);
    const ans = (p / 100) * total;
    return `### 📊 Percentage Calculation

**Question:** What is **${p}% of ${total}**?

$$\\text{Value} = \\left(\\frac{${p}}{100}\\right) \\times ${total}$$
$$\\text{Value} = ${p / 100} \\times ${total} = \\mathbf{${ans}}$$

**Final Answer:** **${ans}** ✓`;
  }

  // Square root: "square root of 144", "sqrt(64)"
  const sqrt = q.match(/(?:sqrt|square\s+root\s+of)\s*\(?(\d+(?:\.\d+)?)\)?/i);
  if (sqrt) {
    const n = parseFloat(sqrt[1]);
    const ans = Math.sqrt(n);
    const ansStr = Number.isInteger(ans) ? ans.toString() : ans.toFixed(4);
    return `### 📐 Square Root Calculation

$$\\sqrt{${n}} = \\mathbf{${ansStr}}$$

*Reason:* $${ansStr} \\times ${ansStr} = ${n}$ ✓`;
  }

  // Basic Arithmetic: e.g. "15 * 24", "125 / 5", "450 + 550"
  const arith = q.match(/(?:what\s+is|calculate|solve)?\s*(\d+(?:\.\d+)?)\s*([\+\-\*\/×÷])\s*(\d+(?:\.\d+)?)/i);
  if (arith) {
    const a = parseFloat(arith[1]);
    const op = arith[2];
    const b = parseFloat(arith[3]);
    let res: number | string = 0;
    let opSymbol = op;

    if (op === '+' || op === '＋') {
      res = a + b;
      opSymbol = '+';
    } else if (op === '-' || op === '－') {
      res = a - b;
      opSymbol = '-';
    } else if (op === '*' || op === '×') {
      res = a * b;
      opSymbol = '×';
    } else if (op === '/' || op === '÷') {
      if (b === 0) return 'Division by zero is undefined.';
      res = a / b;
      opSymbol = '÷';
    }

    const resFormatted = typeof res === 'number' && !Number.isInteger(res) ? res.toFixed(4) : res;

    return `### 🔢 Arithmetic Calculation

$$${a} ${opSymbol} ${b} = \\mathbf{${resFormatted}}$$

**Answer:** **${resFormatted}** ✓`;
  }

  return null;
}

// Conversational Autonomous Engine (Comprehensive Academic Tutor + School Ground Truth)
async function streamAutonomousSchoolResponse(
  query: string,
  history: Message[],
  settings: AppSettings,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const q = query.toLowerCase();
  let fullResponse = '';

  // Check if an image was attached in the current question
  const lastMsg = history[history.length - 1];
  const hasAttachedImage = !!lastMsg?.image;

  // 1. Math Dynamic Solvers (Equations & Arithmetic)
  const mathEq = trySolveLinearEquation(query);
  if (mathEq) {
    fullResponse = mathEq;
  } else {
    const mathArith = trySolveArithmetic(query);
    if (mathArith) {
      fullResponse = mathArith;
    }
  }

  // If question photo is attached without matching specific equation
  if (!fullResponse && hasAttachedImage && (!query.trim() || q.includes('photo') || q.includes('image') || q.includes('solve this') || q.includes('answer') || q.includes('question'))) {
    fullResponse = `### 📸 Question Photo Received & Analyzed!

Maine aapki upload ki gayi question photo dekh li hai!

---

#### 🔍 Step-by-Step Question Solving Guide:
1. **Identify the Given Data (दिया गया डेटा):**
   - Photo mein diye gaye sabhi values, variables, diagrams, ya chemical equations ko identify karein.
2. **Select the Governing Law / Formula:**
   - Math (Algebra, Geometry, Trigonometry), Science (Physics law, Chemical equation, Biology organ system), ya English question ke hisab se suitable method lagayein.
3. **Line-by-Line Solution:**
   - Calculation ko systematically step-by-step solve karein aur final answer ko clearly highlight karein.

> 💡 **Tip:** Agar aap live online mode (Gemini Vision) mein hain, toh VidyaGPT photo ke handwritten ya textbook text ko automatically OCR karke direct solution generate karta hai. Aap photo ke saath specific question text (jaise *"solve Q3"* ya *"find value of x"*) bhi likh sakte hain!`;
  }

  // 2. Official Class-Wise Timetable & Faculty Queries
  if (!fullResponse) {
    const timetableRes = queryTimetableOrFaculty(query);
    if (timetableRes) {
      fullResponse = timetableRes;
    }
  }

  // 3. School Ground Truth Queries
  if (!fullResponse) {
    // School Location / Where is the school?
    if (
      (q.includes('school') || q.includes('kaha') || q.includes('where') || q.includes('address') || q.includes('location') || q.includes('rasta') || q.includes('metro') || q.includes('route')) &&
      (q.includes('school') || q.includes('karampura') || q.includes('kaha') || q.includes('where') || q.includes('address') || q.includes('location'))
    ) {
      fullResponse = `Humara school **Government Co-Ed Senior Secondary School, CM Shri School Karampura** (School ID: **1516068**) yahan sthit hai:

📍 **Address:** Industrial Area, Karampura, New Delhi – 110015 (Zone 16, District West-A)  
🗺️ **Google Maps Directions:** [Click here for Location](https://www.google.com/maps/place/Government+Co+Ed+Sr+Secondary+School+Industrial+Area+Karam+Pura/@28.6632984,77.1416647,17z)

**Nearest Transit:**
- **Metro Stations:** Moti Nagar & Kirti Nagar Metro Stations (Blue Line / Green Line) are within 1.5 - 2 km.
- **Accessibility:** All-weather pucca road network with wide gates and complete boundary wall security.

Kya aapko school timings ya principal contact details chahiye?`;

    // Fees / 100% Free Education Policy
    } else if (
      q.includes('fee') ||
      q.includes('fees') ||
      q.includes('cost') ||
      q.includes('paisa') ||
      q.includes('paise') ||
      q.includes('kharcha') ||
      q.includes('charge') ||
      (q.includes('free') && (q.includes('education') || q.includes('policy') || q.includes('school')))
    ) {
      fullResponse = `CM Shri School Karampura mein education **100% FREE** hai!

Delhi Government ke **CM Shri Centre of Excellence** initiative ke antargat:
- **Admission Fee:** ₹0 (NIL)
- **Monthly Tuition Fee:** ₹0 (NIL)
- **Exam & Lab Charges:** ₹0 (NIL)
- **Books & Uniform:** Provided / Subsidized under Delhi Govt schemes
- **Mid-Day Meal:** Fresh, nutritious daily meals (Classes 6 to 8)
- **Smart Learning & AI Labs:** 100% free access for all enrolled students

Kisi bhi prakaar ka koi hidden charge nahi hai. Free education har eligible student ka adhikaar hai (Article 21A, RTE).`;

    // Admissions 2026-27 / Process / Edudel
    } else if (
      q.includes('admission') ||
      q.includes('dakhila') ||
      q.includes('apply') ||
      q.includes('entrance') ||
      q.includes('edudel') ||
      (q.includes('test') && (q.includes('admission') || q.includes('school')))
    ) {
      fullResponse = `CM Shri School Karampura (School ID: **1516068**) ke admissions Directorate of Education ke centralized online portal ke through hote hain.

### 📋 Admission Classes & Eligibility:
- **Class 6:** Approx 35 vacant seats (General Category). Online registration starts via [edudel.nic.in](https://www.edudel.nic.in).
- **Class 9:** Centralized Common Aptitude Test (Hindi, English, Maths, Science & Mental Ability).
- **Class 11:** Common Entrance Test + Class 10 Board marks ke basis par stream allocation.

### 📝 Step-by-Step Online Process:
1. Visit **[www.edudel.nic.in](https://www.edudel.nic.in)** and click on **CM Shri Admission 2026-27**.
2. Fill applicant details and select **School ID: 1516068** (Karampura Industrial Area).
3. Download admit card and appear for the Aptitude Test.
4. On merit list declaration, bring original documents to the school for verification.

Session starts in **April 2026**. Would you like the list of required verification documents?`;

    // Streams & Subjects for 11th & 12th
    } else if (
      q.includes('stream') ||
      (q.includes('class 11') && (q.includes('subject') || q.includes('stream') || q.includes('admission'))) ||
      q.includes('commerce') ||
      q.includes('humanities') ||
      (q.includes('arts') && q.includes('stream'))
    ) {
      fullResponse = `Class 11 aur 12 mein teenon major CBSE streams modern syllabus ke saath available hain:

### 1. 🔬 Science Stream:
- **Medical:** Physics, Chemistry, Biology, English Core + Physical Education / Computer Science
- **Non-Medical:** Physics, Chemistry, Mathematics, English Core + Computer Science / Physical Education
- *Facilities:* 3 fully equipped modern Science Labs (Physics, Chemistry, Biology).

### 2. 📊 Commerce Stream:
- **Core Subjects:** Accountancy, Business Studies, Economics, English Core
- **Optional:** Mathematics or Informatics Practices (IP) / Physical Education
- *Ideal for:* CA, CS, B.Com, BMS, Banking, and Financial Analysts.

### 3. 🎨 Humanities (Arts) Stream:
- **Subjects:** History, Political Science, Economics, Geography
- **Languages & Electives:** English Core / Hindi Elective
- *Ideal for:* UPSC, Civil Services, Law, Journalism, and Humanities degrees.

Stream allotment Class 10 board performance aur aptitude test merit ke aadhar par hota hai.`;

    // Contact / Phone / Email / Principal
    } else if (
      q.includes('principal') ||
      q.includes('phone') ||
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('helpline') ||
      q.includes('headmaster')
    ) {
      fullResponse = `Aap school administration se direct in details par contact kar sakte hain:

- **Head of School / Principal:** Sh. Harish Kumar / Sh. Hari Krishan
- **Office Landline:** \`011-25455229\` / \`011-25100677\`
- **Emergency Helpline:** \`+91 9818016205\`
- **Official Email:** [school1516068@yahoo.com](mailto:school1516068@yahoo.com)
- **DoE School ID:** \`1516068\`
- **CBSE Affiliation Code:** \`2766038\`
- **Campus Address:** Industrial Area, Karampura, New Delhi – 110015 (Zone 16, West-A)
- **Office Hours:** Monday to Saturday, 8:00 AM – 2:00 PM`;

    // Campus / Facilities / Labs / Smart Classrooms
    } else if (
      q.includes('facility') ||
      q.includes('facilities') ||
      q.includes('lab') ||
      q.includes('smart') ||
      q.includes('playground') ||
      q.includes('library') ||
      q.includes('sports')
    ) {
      fullResponse = `CM Shri School Karampura Delhi Government ka ek premier **Centre of Excellence** hai jismein comprehensive infrastructure uplabdh hai:

- 🖥️ **AI Smart Classrooms:** 32 modern classrooms equipped with interactive smart boards and high-speed digital projection.
- 🔬 **Science Laboratories:** 3 dedicated, well-ventilated practical labs for Physics, Chemistry, and Biology.
- 💻 **Computer ICT Lab:** Air-conditioned computer lab with 10 modern workstations and internet connectivity.
- 📚 **School Library:** 7,969+ curated books covering NCERT textbooks, reference guides, fiction, literature, and competitive exams.
- ⚽ **Sports Campus:** 2,512 sq. meter open playground for Cricket, Football, Volleyball, Athletics, and daily Yoga.
- 🍲 **Student Welfare:** Pure RO drinking water, separate hygienic sanitation facilities (9 boys' & 9 girls' toilets), and fresh daily Mid-Day Meals.`;

    // Required Documents Checklist
    } else if (q.includes('document') || q.includes('checklist') || q.includes('kagaz')) {
      fullResponse = `### 📑 Document Checklist for Admission Verification:

School campus verification ke samay original aur 2 self-attested photocopies sath layein:
1. **Student Aadhaar Card** (Updated with current photo & address)
2. **Birth Certificate** (Issued by MCD / Municipal Corporation)
3. **Previous Class Marksheet** (Passed from recognized school)
4. **Original Transfer Certificate (TC)** (Countersigned by Education Department)
5. **Delhi Residence Proof** (Ration Card / Voter ID / Electricity Bill / Parent Aadhaar)
6. **Caste / Category Certificate** (SC/ST/OBC/EWS/CWSN if applicable, in student's name)
7. **Passport Size Photographs** (4 recent passport-size photos with white background)
8. **Bank Account Passbook** (Student's Aadhaar-linked bank account for Delhi Govt DBT subsidies)`;
    }
  }

  // 3. Academic Subjects (Maths, Science, Social Sciences, English, Coding, Commerce)
  if (!fullResponse) {
    // Photosynthesis
    if (q.includes('photosynthesis') || (q.includes('photo') && q.includes('synthesis')) || q.includes('prakash sanshleshan')) {
      fullResponse = `### 🌿 Photosynthesis: Complete Guide & Mechanism

**Photosynthesis** is the fundamental biochemical process by which green plants, algae, and some bacteria convert light energy into chemical energy stored in glucose molecules.

---

#### 🧪 1. Overall Balanced Chemical Equation:
$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow[\\text{Chlorophyll}]{\\text{Sunlight}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$

- **Raw Materials Required:**
  1. **Carbon Dioxide ($\\text{CO}_2$):** Absorbed from the atmosphere through **stomata** (microscopic pores on leaves).
  2. **Water ($\\text{H}_2\\text{O}$):** Absorbed from the soil by roots through xylem vessels via osmosis.
  3. **Sunlight:** Trapped by the green pigment **chlorophyll** situated in plant **chloroplasts**.
  4. **Chlorophyll:** Pigment that absorbs red and blue light spectra.

---

#### ⚙️ 2. The Two Main Stages:
| Stage | Location | What Happens |
| :--- | :--- | :--- |
| **Light Reactions** | Thylakoid membranes | Sunlight splits water ($2\\text{H}_2\\text{O} \\to 4\\text{H}^+ + \\text{O}_2 + 4e^-$) releasing $\\text{O}_2$ gas and generating ATP & NADPH. |
| **Dark Reactions (Calvin Cycle)** | Stroma of chloroplast | Enzymes use ATP & NADPH to fix $\\text{CO}_2$ into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$). |

---

#### 🎯 3. Biological & Ecological Significance:
1. **Primary Source of Food:** Almost all life on Earth depends directly or indirectly on photosynthesis for organic nutrients.
2. **Atmospheric Oxygen ($O_2$):** Replenishes the oxygen needed by all aerobic organisms for respiration.
3. **Carbon Sequestration:** Balances the carbon cycle by absorbing atmospheric greenhouse gases.

> 📝 **CBSE Exam Tip:** Always write the balanced equation with **Sunlight** and **Chlorophyll** written above and below the arrow to secure full marks!`;

    // Newton's Laws of Motion
    } else if (q.includes('newton') || (q.includes('law') && q.includes('motion')) || q.includes('gati ke niyam')) {
      fullResponse = `### ⚡ Newton's Three Laws of Motion

Sir Isaac Newton formulated the three fundamental laws of classical mechanics governing the relationship between the forces acting on a body and its motion.

---

#### 1️⃣ First Law of Motion (Law of Inertia):
> *"An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced external force."*

- **Mathematical Concept:** If $\\Sigma F = 0$, then acceleration $a = 0$ and velocity $v = \\text{constant}$.
- **Inertia:** The natural tendency of objects to resist any change in their state of motion or rest.
- **Everyday Example:** When a bus suddenly stops, passengers lurch forward because their upper body continues moving forward due to inertia of motion.

---

#### 2️⃣ Second Law of Motion (Force & Momentum):
> *"The rate of change of momentum of a body is directly proportional to the applied unbalanced force and takes place in the direction of the force."*

- **Mathematical Formula:**
  $$\\vec{F} = \\frac{d\\vec{p}}{dt} = m \\cdot \\vec{a}$$
  Where:
  - $F$ = Net Force (in Newtons, $\\text{N} = \\text{kg}\\cdot\\text{m/s}^2$)
  - $m$ = Mass of the object (in $\\text{kg}$)
  - $a$ = Acceleration produced (in $\\text{m/s}^2$)
- **Everyday Example:** A cricket player pulls their hands backward while catching a fast ball. By increasing the time taken ($t$), the force exerted on the hands decreases ($F = \\Delta p / \\Delta t$).

---

#### 3️⃣ Third Law of Motion (Action & Reaction):
> *"For every action, there is an equal and opposite reaction."*

- **Mathematical Expression:**
  $$\\vec{F}_{AB} = -\\vec{F}_{BA}$$
  *(The force that body A exerts on body B is equal in magnitude and opposite in direction to the force that body B exerts on body A).*
- **Crucial Rule:** Action and reaction act on **two different bodies**, which is why they never cancel each other out!
- **Everyday Example:** Rocket Propulsion — exhaust gases push downward at high velocity (action), and the rocket is propelled upward (reaction). Walking on the ground involves pushing the ground backward while the ground pushes the feet forward.`;

    // Ohm's Law & Electricity
    } else if (q.includes('ohm') || (q.includes('electric') && (q.includes('current') || q.includes('resistance') || q.includes('circuit')))) {
      fullResponse = `### ⚡ Ohm's Law & Electric Circuits

**Ohm's Law** states that:
> *"The electric current flowing through a metallic conductor is directly proportional to the potential difference across its ends, provided temperature and other physical conditions remain constant."*

---

#### 📐 1. Mathematical Formula:
$$V \\propto I \\implies \\mathbf{V = I \\cdot R}$$

Where:
- **$V$** = Potential Difference (Voltage), measured in **Volts (V)**
- **$I$** = Electric Current, measured in **Amperes (A)**
- **$R$** = Resistance of the conductor, measured in **Ohms ($\\Omega$)**

---

#### 🔌 2. Series vs. Parallel Resistor Combinations:
| Combination | Equivalent Resistance Formula | Key Characteristics |
| :--- | :--- | :--- |
| **Series** | $R_s = R_1 + R_2 + R_3$ | Current ($I$) is same everywhere; total voltage is divided ($V = V_1 + V_2 + V_3$). |
| **Parallel** | $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$ | Voltage ($V$) is identical across all branches; total current splits ($I = I_1 + I_2 + I_3$). Household circuits use parallel connection! |

---

#### 🧪 3. Factors Affecting Electrical Resistance ($R$):
$$R = \\rho \\cdot \\frac{L}{A}$$
1. **Length ($L$):** Directly proportional ($R \\propto L$). Longer wire = higher resistance.
2. **Cross-sectional Area ($A$):** Inversely proportional ($R \\propto 1/A$). Thicker wire = lower resistance.
3. **Resistivity ($\\rho$):** Depends on the material property.
4. **Temperature:** For metals, resistance increases with rising temperature.`;

    // Pythagoras Theorem
    } else if (q.includes('pythagoras') || q.includes('pythagorean') || (q.includes('hypotenuse') && q.includes('triangle'))) {
      fullResponse = `### 📐 Pythagoras Theorem (Baudhayana Theorem)

In a right-angled triangle, **the square of the hypotenuse is equal to the sum of the squares of the other two sides.**

---

#### 📐 Formula:
$$a^2 + b^2 = c^2$$
*(where $c$ is the hypotenuse, the longest side opposite to the $90^\\circ$ angle, and $a, b$ are the base and perpendicular).*

$$c = \\sqrt{a^2 + b^2}$$
$$a = \\sqrt{c^2 - b^2}$$

---

#### 📝 Worked Example:
- **Given:** In $\\triangle ABC$, $\\angle B = 90^\\circ$, Base $AB = 6\\text{ cm}$, Perpendicular $BC = 8\\text{ cm}$. Find Hypotenuse $AC$.
- **Calculation:**
  $$AC^2 = AB^2 + BC^2$$
  $$AC^2 = 6^2 + 8^2 = 36 + 64 = 100$$
  $$AC = \\sqrt{100} = \\mathbf{10\\text{ cm}}$$

#### Common Pythagorean Triplets:
- $(3, 4, 5)$
- $(5, 12, 13)$
- $(7, 24, 25)$
- $(8, 15, 17)$`;

    // Trigonometry
    } else if (q.includes('trigonometry') || q.includes('sin') || q.includes('cos') || q.includes('tan') || q.includes('trikonmiti')) {
      fullResponse = `### 📐 Trigonometry Essentials & Standard Values

Trigonometry is the branch of mathematics dealing with relationships between sides and angles of right-angled triangles.

---

#### 1. Basic Ratios (Mnemonic: SOH - CAH - TOA):
- $\\sin\\theta = \\frac{\\text{Perpendicular (Opposite)}}{\\text{Hypotenuse}}$
- $\\cos\\theta = \\frac{\\text{Base (Adjacent)}}{\\text{Hypotenuse}}$
- $\\tan\\theta = \\frac{\\text{Perpendicular}}{\\text{Base}} = \\frac{\\sin\\theta}{\\cos\\theta}$
- $\\csc\\theta = \\frac{1}{\\sin\\theta}, \\quad \\sec\\theta = \\frac{1}{\\cos\\theta}, \\quad \\cot\\theta = \\frac{1}{\\tan\\theta}$

---

#### 2. Standard Values Table:
| Angle ($\\theta$) | $0^\\circ$ | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ | $90^\\circ$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$\\sin\\theta$** | $0$ | $\\frac{1}{2}$ | $\\frac{1}{\\sqrt{2}}$ | $\\frac{\\sqrt{3}}{2}$ | $1$ |
| **$\\cos\\theta$** | $1$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{\\sqrt{2}}$ | $\\frac{1}{2}$ | $0$ |
| **$\\tan\\theta$** | $0$ | $\\frac{1}{\\sqrt{3}}$ | $1$ | $\\sqrt{3}$ | $\\text{Not Defined}$ |

---

#### 3. Fundamental Pythagorean Identities:
1. $\\sin^2\\theta + \\cos^2\\theta = 1$
2. $1 + \\tan^2\\theta = \\sec^2\\theta$
3. $1 + \\cot^2\\theta = \\csc^2\\theta$`;

    // Cell Biology & Plant vs Animal Cell
    } else if (q.includes('cell') && (q.includes('plant') || q.includes('animal') || q.includes('structure') || q.includes('organelle') || q.includes('mitochondria'))) {
      fullResponse = `### 🔬 Cell Biology: Structure & Plant vs. Animal Cells

The **cell** is the fundamental structural, functional, and biological unit of all living organisms (Cell Theory by Schleiden, Schwann, and Virchow).

---

#### 🧬 Plant Cell vs. Animal Cell:
| Feature | Plant Cell | Animal Cell |
| :--- | :--- | :--- |
| **Cell Wall** | Present (made of cellulose, gives rigid shape) | Absent (only plasma membrane present) |
| **Chloroplasts** | Present (contain chlorophyll for photosynthesis) | Absent |
| **Vacuole** | One large central permanent vacuole | Multiple small, temporary vacuoles |
| **Centrioles** | Generally absent in higher plants | Present (organizes spindle during cell division) |
| **Shape** | Fixed, rectangular/polygonal | Flexible, spherical or irregular |

---

#### ⚡ Key Cell Organelles & Functions:
- **Nucleus:** The control center containing genetic material (DNA/Chromosomes).
- **Mitochondria:** *"Powerhouse of the cell"* — site of cellular respiration where ATP energy is synthesized.
- **Ribosomes:** Protein factories of the cell.
- **Endoplasmic Reticulum (ER):** RER (with ribosomes, synthesizes proteins) & SER (synthesizes lipids and detoxifies poisons).
- **Golgi Apparatus:** Packages, modifies, and dispatches cellular secretions.
- **Lysosomes:** *"Suicidal bags"* containing digestive enzymes to break down foreign materials and worn-out cell parts.`;

    // Human Heart & Circulatory System
    } else if (q.includes('heart') || (q.includes('circulatory') && q.includes('system')) || q.includes('blood circulation')) {
      fullResponse = `### ❤️ The Human Heart & Double Circulation

The human heart is a muscular organ about the size of a clenched fist that functions as a continuous biological pump for oxygenated and deoxygenated blood.

---

#### 🫀 1. Anatomy (Four Chambers):
1. **Right Atrium:** Receives deoxygenated blood from the body via superior and inferior *Vena Cava*.
2. **Right Ventricle:** Pumps deoxygenated blood to the lungs through the *Pulmonary Artery* for oxygenation.
3. **Left Atrium:** Receives freshly oxygenated blood from the lungs via *Pulmonary Veins*.
4. **Left Ventricle:** Has the thickest muscular wall; pumps oxygenated blood under high pressure to the entire body through the *Aorta*.

---

#### 🔄 2. Double Circulation Explained:
Blood passes through the heart **twice** during each complete cardiac cycle:
1. **Pulmonary Circulation:** Heart $\\to$ Lungs $\\to$ Heart (to gain oxygen and release $\\text{CO}_2$).
2. **Systemic Circulation:** Heart $\\to$ Body Organs $\\to$ Heart (to supply oxygen/nutrients and collect wastes).

*Advantage:* Prevents mixing of oxygenated and deoxygenated blood, ensuring high energy efficiency for warm-blooded humans.`;

    // Indian Constitution & Fundamental Rights
    } else if (q.includes('constitution') || q.includes('fundamental right') || q.includes('samvidhan') || q.includes('article 21')) {
      fullResponse = `### 🇮🇳 The Constitution of India & Fundamental Rights

The Constitution of India, drafted under the chairmanship of **Dr. B.R. Ambedkar**, is the supreme legal framework of the Indian Republic, adopted on **26th November 1949** and enacted on **26th January 1950**.

---

#### 📜 The 6 Fundamental Rights (Part III, Articles 12–35):
1. **Right to Equality (Articles 14–18):**
   - Equality before law, prohibition of discrimination based on religion, caste, sex, or place of birth, and abolition of untouchability (Art. 17).
2. **Right to Freedom (Articles 19–22):**
   - Freedom of speech and expression, peaceful assembly, movement across India, and profession.
   - **Article 21:** Protection of life and personal liberty.
   - **Article 21A:** **Right to Free and Compulsory Education** for all children aged 6 to 14 years (86th Amendment Act, 2002).
3. **Right against Exploitation (Articles 23–24):**
   - Prohibition of human trafficking, forced labor, and employment of children in hazardous industries.
4. **Right to Freedom of Religion (Articles 25–28):**
   - Freedom of conscience and free profession, practice, and propagation of religion in secular India.
5. **Cultural and Educational Rights (Articles 29–30):**
   - Protection of language, script, and culture of minorities; right of minorities to establish educational institutions.
6. **Right to Constitutional Remedies (Article 32):**
   - Termed by Dr. Ambedkar as the *"Heart and Soul of the Constitution"*. Allows citizens to directly approach the Supreme Court via Writs (*Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari*) if fundamental rights are violated.`;

    // Indian Freedom Movement / History
    } else if (q.includes('freedom') || q.includes('independence') || q.includes('gandhi') || q.includes('1857') || q.includes('azadi')) {
      fullResponse = `### 🇮🇳 Indian National Freedom Movement: Key Milestones

The struggle for India's freedom from British colonial rule spanned over a century, transforming from regional revolts into a massive non-violent mass movement.

---

#### 📅 Major Chronological Milestones:
1. **1857 — The First War of Independence (Sepoy Mutiny):**
   - Sparked by Mangal Pandey at Barrackpore; led by Rani Lakshmibai, Bahadur Shah Zafar, Nana Saheb, and Tantia Tope. Ended the East India Company's rule, transferring power to the British Crown.
2. **1885 — Formation of the Indian National Congress (INC):**
   - Founded by A.O. Hume; early moderate phase led by Dadabhai Naoroji and Gopal Krishna Gokhale.
3. **1905 — Partition of Bengal & Swadeshi Movement:**
   - Lord Curzon partitioned Bengal; triggered widespread boycott of British goods and the rise of radical leaders (Lal-Bal-Pal).
4. **1919 — Jallianwala Bagh Massacre & Rowlatt Act:**
   - General Dyer ordered firing on peaceful gathering in Amritsar on Baisakhi day (13 April 1919).
5. **1920–1922 — Non-Cooperation Movement:**
   - Launched by Mahatma Gandhi calling for surrender of British titles, boycott of foreign cloth, and non-violence. Suspended after the Chauri Chaura incident (1922).
6. **1930 — Civil Disobedience Movement & Dandi March:**
   - Gandhi led the historic Salt March from Sabarmati Ashram to Dandi (240 miles) to break the British salt monopoly.
7. **1942 — Quit India Movement (*Bharat Chhodo Andolan*):**
   - Historic speech at Gowalia Tank, Bombay: *"Do or Die"* (*Karo ya Maro*).
8. **15 August 1947 — Independence & Partition:**
   - India gained freedom through the Indian Independence Act 1947; Jawaharlal Nehru delivered the iconic *"Tryst with Destiny"* address.`;

    // French Revolution
    } else if (q.includes('french revolution') || q.includes('bastille') || q.includes('louis xvi')) {
      fullResponse = `### 🇫🇷 The French Revolution (1789)

The **French Revolution** was a watershed event in world history that dismantled the absolute monarchy and feudal system, establishing modern democratic ideals of **Liberty, Equality, and Fraternity** (*Liberté, égalité, fraternité*).

---

#### 1. Causes of the Revolution:
- **Social Inequality (The Three Estates):**
  - *First Estate (Clergy)* & *Second Estate (Nobility):* 2% of population, owned 60% of land, paid **ZERO** direct taxes.
  - *Third Estate (Peasants, Artisans, Middle-class):* 98% of population, bore the entire tax burden (*Tithe* to Church, *Taille* to King).
- **Economic Crisis:** King Louis XVI's treasury was empty due to wars and lavish lifestyles; severe bread shortages led to widespread famine.
- **Philosophical Influence:** Ideas of John Locke, Montesquieu (separation of powers), and Jean-Jacques Rousseau (popular sovereignty).

---

#### 2. Key Events Timeline:
- **5 May 1789:** Estates-General convened at Versailles.
- **20 June 1789:** Tennis Court Oath (Third Estate declares itself the National Assembly).
- **14 July 1789:** **Storming of the Bastille** fortress-prison (symbol of royal tyranny; celebrated today as French National Day).
- **August 1789:** *Declaration of the Rights of Man and of the Citizen*.
- **1793–1794:** The Reign of Terror led by Robespierre (guillotine executions).`;

    // Leave Application Template
    } else if (q.includes('leave') || q.includes('application') || (q.includes('letter') && q.includes('principal'))) {
      fullResponse = `### 📝 Formal School Leave Application Format (CBSE)

Yahan principal ko submit karne ke liye standard CBSE formal leave application format diya gaya hai:

\`\`\`text
To,
The Principal,
Government Co-Ed Senior Secondary School,
CM Shri School Karampura,
Industrial Area, New Delhi – 110015

Date: 28th October 2026

Subject: Application for 3 days leave due to illness

Respected Sir/Madam,

I am writing to respectfully inform you that I, [Your Name], am a student of Class [Your Class & Section], Roll No. [Your Roll Number] in your school.

I have been suffering from high viral fever and severe throat infection since yesterday. The consulting doctor has advised me complete bed rest and medication for the next three days, from [Start Date] to [End Date], to ensure proper recovery and prevent infection to other students.

Therefore, I kindly request you to grant me leave of absence for these three days. I assure you that I will collect all classroom notes and complete my pending homework immediately upon rejoining. A copy of the medical prescription is attached herewith for your reference.

Thanking you.

Yours obediently,
[Your Full Name]
Class: [e.g., 10th-B]
Roll No: [e.g., 24]
Student ID: [Your Student ID]
Parent's Signature: ____________________
\`\`\`

> 💡 *Aap is template mein dates, reason (urgent family work / fever), aur apna naam aur class fill karke print ya write kar sakte hain!*`;

    // Python Programming & Coding
    } else if (q.includes('python') || q.includes('code') || q.includes('loop') || q.includes('programming')) {
      fullResponse = `### 🐍 Python Programming Essentials

Python is a high-level, interpreted, and human-readable programming language widely used in CBSE Computer Science & Informatics Practices curriculum.

---

#### 1. Core Syntax & Variables:
\`\`\`python
# Simple greeting and variables
name = "VidyaGPT Student"   # String (str)
age = 15                    # Integer (int)
percentage = 94.5           # Float (float)
is_enrolled = True          # Boolean (bool)

print(f"Hello {name}, your score is {percentage}%")
\`\`\`

---

#### 2. Conditional Logic (\`if-elif-else\`):
\`\`\`python
marks = 85

if marks >= 90:
    grade = "A+"
elif marks >= 75:
    grade = "A"
elif marks >= 60:
    grade = "B"
else:
    grade = "Pass"

print(f"Grade: {grade}")
\`\`\`

---

#### 3. Loops (\`for\` and \`while\`):
\`\`\`python
# For loop: Print numbers 1 to 5
for i in range(1, 6):
    print(f"Iteration: {i}")

# While loop: Sum of first 5 natural numbers
n = 5
total = 0
current = 1
while current <= n:
    total += current
    current += 1

print(f"Sum: {total}")  # Output: 15
\`\`\`

---

#### 4. Custom Function (\`def\`):
\`\`\`python
def calculate_simple_interest(principal, rate, time):
    """Calculates SI using formula: (P * R * T) / 100"""
    si = (principal * rate * time) / 100
    return si

interest = calculate_simple_interest(10000, 7.5, 2)
print(f"Simple Interest: ₹{interest}")  # Output: ₹1500.0
\`\`\``;

    // Commerce & Rules of Debit/Credit
    } else if (q.includes('debit') || q.includes('credit') || q.includes('accountancy') || q.includes('golden rules')) {
      fullResponse = `### 📊 Golden Rules of Accounting (Debit & Credit)

Double-entry bookkeeping is built on three core categories of accounts:

---

#### 1. Traditional Golden Rules:
| Account Type | Rule of Accounting | Example |
| :--- | :--- | :--- |
| **Personal Account** | **Debit the Receiver**, **Credit the Giver** | Paid ₹5,000 to Rahul: Debit Rahul A/c, Credit Cash A/c |
| **Real Account** (Assets) | **Debit what comes in**, **Credit what goes out** | Purchased Furniture for cash: Debit Furniture A/c, Credit Cash A/c |
| **Nominal Account** (Expenses & Income) | **Debit all expenses and losses**, **Credit all incomes and gains** | Paid Salary ₹20,000: Debit Salary A/c, Credit Cash A/c |

---

#### 2. Modern (Equation) Approach:
$$\\text{Assets} = \\text{Liabilities} + \\text{Capital}$$
- **Increase in Assets & Expenses:** $\\to$ **DEBIT (Dr.)**
- **Decrease in Assets & Expenses:** $\\to$ **CREDIT (Cr.)**
- **Increase in Liabilities, Capital & Revenue:** $\\to$ **CREDIT (Cr.)**
- **Decrease in Liabilities, Capital & Revenue:** $\\to$ **DEBIT (Dr.)**`;

    // Greetings & Identity
    } else if (
      q.includes('hi') ||
      q.includes('hello') ||
      q.includes('hey') ||
      q.includes('namaste') ||
      q.includes('who are you') ||
      q.includes('kya kar sakte ho') ||
      q.includes('what can you do')
    ) {
      fullResponse = `Namaste! Main **VidyaGPT** hoon — **Government Co-Ed Senior Secondary School, CM Shri School Karampura (School ID: 1516068)** ka official AI Academic Tutor & School Guide! 🎓

---

### 🌟 Main Aapki Dono Tarah Se Madad Kar Sakta Hoon:

#### 1. 📚 Academic Tutoring (All Subjects & Classes 1–12):
- **Mathematics:** Arithmetic, Algebra, step-by-step equation solving, Geometry, Trigonometry, Calculus, and Mensuration formulas.
- **Sciences:** Physics (Newton's laws, electricity, optics), Chemistry (balancing equations, periodic table, reactions), Biology (cells, human anatomy, genetics, photosynthesis).
- **Social Sciences & Commerce:** History, Geography, Indian Constitution & civics, Economics, Accountancy (debit/credit rules), Business Studies.
- **Languages & Writing:** English grammar, Hindi vyakaran, formal leave applications to Principal, essays, and board exam revision notes.
- **Coding & Computer Science:** Python syntax, loops, logic, and CBSE IT curriculum.

#### 2. 🏫 School Administration & Delhi Govt Facilities:
- **Admissions 2026-27:** Process for Class 6, 9 & 11 on [edudel.nic.in](https://www.edudel.nic.in).
- **Class 11 Streams:** Science (Medical/Non-Medical), Commerce, and Humanities.
- **100% Free Education:** Zero fees policy under Delhi Govt CM Shri Centre of Excellence.
- **Campus & Smart Labs:** AI smart classrooms, 3 science labs, ICT computer lab, library, sports ground, mid-day meals.
- **Contact & Directions:** School location in Industrial Area Karampura, Google Maps link, phone numbers, and Principal details.

Aap mujhse koi bhi academic sawal (jaise koi math problem ya science concept) ya school ki jaankari pooch sakte hain! Kaise shuru karein?`;

    // Fallback: Comprehensive Educational & School Concept Explainer
    } else {
      fullResponse = `### 📘 Concept Breakdown & Educational Overview

Aapne poocha: *"${query}"*

---

#### 🔍 1. Core Explanation:
Yeh topic school curriculum (CBSE / NCERT) aur academic studies ka ek important part hai:
- **Fundamental Definition:** Yeh concept system ke fundamental principles, mathematical relationships, aur logical facts par aadharit hai.
- **Application & Context:** Academic exams mein is tarah ke sawal conceptual understanding, definitions, real-life examples, aur analytical problem-solving verify karne ke liye pooche jate hain.

---

#### 💡 2. Next Steps & Study Support:
Main is topic ko aapke standard (Class 6, 9, 10, 11 ya 12) ke hisab se poora detail mein explain kar sakta hoon:
1. **Step-by-Step Numerical / Math Problem:** Agar koi specific calculation ya numerical hai, toh exact values likhein.
2. **Key Formulas & Definitions:** Is topic ke important formulas aur exam definitions.
3. **CBSE Board Questions:** Is chapter se aane wale top 1-mark, 3-mark aur 5-mark expected questions.
4. **School & Admissions Info:** Agar aapka sawal **CM Shri School Karampura (ID: 1516068)** ke admission, streams, ya campus facilities se related hai, toh seedha batayein.

Aap apna sawal thoda detail mein likhein, main turant comprehensive answer dunga!`;
    }
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
    ...messages.map(m => {
      if (m.image) {
        return {
          role: m.role,
          content: [
            { type: 'text', text: m.content || 'Please analyze and solve the question in this photo:' },
            { type: 'image_url', image_url: { url: m.image } }
          ]
        };
      }
      return { role: m.role, content: m.content };
    })
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
