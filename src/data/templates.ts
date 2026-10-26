import { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
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
    category: 'academics',
    description: 'Science, Commerce and Humanities subject combinations',
    prompt: 'What streams and subject combinations are offered in Class 11 and 12 at CM Shri School Karampura? ',
    icon: 'BookOpen'
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
    id: 'fee-structure',
    title: 'Fee Structure & Free Policy',
    command: '/fees',
    category: 'policy',
    description: '100% Free Education under Delhi Government policy',
    prompt: 'What are the school fees, admission charges, and benefits provided under the Delhi Govt CM Shri Centre of Excellence initiative? ',
    icon: 'ShieldCheck'
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
