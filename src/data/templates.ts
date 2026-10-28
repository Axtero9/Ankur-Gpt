import { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  // Academic & Curriculum Templates
  {
    id: 'solve-math',
    title: 'Solve Math Step-by-Step',
    command: '/math',
    category: 'academics',
    description: 'Detailed step-by-step solutions with formulas and working',
    prompt: 'Solve this mathematics problem step-by-step, showing all formulas, intermediate calculations, and the final answer: ',
    icon: 'Calculator'
  },
  {
    id: 'explain-science',
    title: 'Science Concept Explainer',
    command: '/science',
    category: 'academics',
    description: 'Physics, Chemistry & Biology simplified with examples',
    prompt: 'Explain this science concept in detail with key definitions, formulas, chemical equations or diagrams, and real-life applications: ',
    icon: 'Atom'
  },
  {
    id: 'revision-notes',
    title: 'Chapter Revision Notes',
    command: '/notes',
    category: 'academics',
    description: 'Summary, key formulas & high-frequency exam questions',
    prompt: 'Create high-yield chapter revision notes, important definitions, formulas, and top board exam questions with answers for: ',
    icon: 'BookOpen'
  },
  {
    id: 'leave-letter',
    title: 'School Leave Application',
    command: '/letter',
    category: 'academics',
    description: 'Formal CBSE letter to Principal for sick or urgent leave',
    prompt: 'Draft a formal school leave application to the Principal of Government Co-Ed Sr. Sec. School Karampura for: ',
    icon: 'FileText'
  },
  {
    id: 'exam-practice',
    title: 'CBSE Practice Questions',
    command: '/exam',
    category: 'academics',
    description: 'MCQs, short and long answer questions with marking scheme',
    prompt: 'Generate CBSE board-style practice questions with detailed model answers and marking scheme for: ',
    icon: 'HelpCircle'
  },
  {
    id: 'coding-python',
    title: 'Python & Computer Science',
    command: '/code',
    category: 'academics',
    description: 'Programming logic, clean Python code & explanations',
    prompt: 'Explain this programming concept with clean Python code, step-by-step logic, and comments: ',
    icon: 'Code'
  },
  // School & Administrative Templates
  {
    id: 'admission-process',
    title: 'Admissions 2026-27',
    command: '/admission',
    category: 'admission',
    description: 'Centralized process for Class 6, 9 & 11 via edudel.nic.in',
    prompt: 'Explain the complete step-by-step admission process for CM Shri School Karampura for 2026-27, including eligibility, test subjects, and timeline: ',
    icon: 'GraduationCap'
  },
  {
    id: 'streams-class11',
    title: 'Class 11 Streams & Subjects',
    command: '/streams',
    category: 'admission',
    description: 'Science, Commerce and Humanities subject combinations',
    prompt: 'What streams and subject combinations are offered in Class 11 and 12 at CM Shri School Karampura? ',
    icon: 'BookOpen'
  },
  {
    id: 'fee-structure',
    title: 'Fee Structure & Free Policy',
    command: '/fees',
    category: 'policy',
    description: '100% Free Education under Delhi Government policy',
    prompt: 'What are the school fees, admission charges, and benefits provided under the Delhi Govt CM Shri Centre of Excellence initiative? ',
    icon: 'ShieldCheck'
  },
  {
    id: 'contact-location',
    title: 'Contact, Address & Location',
    command: '/contact',
    category: 'contact',
    description: 'School phone, email, Google Maps link, and Principal info',
    prompt: 'Provide the official contact numbers, email address, campus location, and Principal details for CM Shri School Karampura: ',
    icon: 'MapPin'
  },
  {
    id: 'campus-facilities',
    title: 'AI Smart Labs & Facilities',
    command: '/facilities',
    category: 'facilities',
    description: 'AI classrooms, science labs, library & sports campus',
    prompt: 'Give a comprehensive overview of the modern infrastructure, AI smart classrooms, labs, library, and sports ground at CM Shri School Karampura: ',
    icon: 'Sparkles'
  },
  {
    id: 'required-docs',
    title: 'Document Checklist',
    command: '/documents',
    category: 'admission',
    description: 'Aadhaar, birth certificate, marksheet, TC & caste proof',
    prompt: 'What is the full checklist of original and photocopy documents required for admission verification at CM Shri School Karampura? ',
    icon: 'FileCheck'
  }
];
