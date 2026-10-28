export interface ClassPeriodRow {
  day: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  p8: string;
}

export interface ClassTimetableData {
  id: string;
  name: string;
  classTeacher: string;
  coClassTeacher: string;
  stream: string;
  rows: ClassPeriodRow[];
}

export const BELL_SCHEDULE = [
  { period: 'School Assembly / Entry', time: '8:00 AM – 8:20 AM', duration: '20 min' },
  { period: 'Period I', time: '8:20 AM – 9:00 AM', duration: '40 min' },
  { period: 'Period II', time: '9:00 AM – 9:40 AM', duration: '40 min' },
  { period: 'Period III', time: '9:40 AM – 10:20 AM', duration: '40 min' },
  { period: 'Period IV', time: '10:20 AM – 11:00 AM', duration: '40 min' },
  { period: 'RECESS (Lunch Break)', time: '11:00 AM – 11:20 AM', duration: '20 min' },
  { period: 'Period V', time: '11:20 AM – 12:00 PM', duration: '40 min' },
  { period: 'Period VI', time: '12:00 PM – 12:40 PM', duration: '40 min' },
  { period: 'Period VII', time: '12:40 PM – 1:20 PM', duration: '40 min' },
  { period: 'Period VIII', time: '1:20 PM – 2:00 PM', duration: '40 min' },
  { period: 'School Dismissal', time: '2:00 PM', duration: 'End of Day' }
];

export const CLASS_TEACHERS = [
  { classId: 'VI A', classTeacher: 'Ms. Archana Dhaka', coClassTeacher: 'Mr. Neeraj Kumar', focus: 'Middle School' },
  { classId: 'VI B', classTeacher: 'Mr. Neeraj Kumar', coClassTeacher: 'Ms. Archana Dhaka', focus: 'Middle School' },
  { classId: 'VII A', classTeacher: 'Ms. Sonia', coClassTeacher: 'Ms. Nidhi Tomar', focus: 'Middle School' },
  { classId: 'VII B', classTeacher: 'Ms. Nidhi Tomar', coClassTeacher: 'Ms. Neetu Meena', focus: 'Middle School' },
  { classId: 'VII C', classTeacher: 'Ms. Neetu Meena', coClassTeacher: 'Ms. Sonia', focus: 'Middle School' },
  { classId: 'VIII A', classTeacher: 'Mr. Pawan Kumar (Punjabi)', coClassTeacher: 'Ms. Manisha', focus: 'Middle School' },
  { classId: 'VIII B', classTeacher: 'Ms. Manisha', coClassTeacher: 'Ms. Annu Rani', focus: 'Middle School' },
  { classId: 'VIII C', classTeacher: 'Ms. Annu Rani', coClassTeacher: 'Mr. Pawan Kumar (Pb)', focus: 'Middle School' },
  { classId: 'IX A', classTeacher: 'Ms. Reetika', coClassTeacher: 'Ms. Babita Solanki', focus: 'Secondary' },
  { classId: 'IX B', classTeacher: 'Ms. Babita Solanki', coClassTeacher: 'Ms. Anupama Sansanwal', focus: 'Secondary' },
  { classId: 'IX C', classTeacher: 'Ms. Anupama Sansanwal', coClassTeacher: 'Ms. Reetika', focus: 'Secondary' },
  { classId: 'X A', classTeacher: 'Mr. Vikas Arora', coClassTeacher: 'Mr. Ravi Kumar', focus: 'Secondary (CBSE Board)' },
  { classId: 'X B', classTeacher: 'Mr. Ravi Kumar', coClassTeacher: 'Mr. Vikas Arora', focus: 'Secondary (CBSE Board)' },
  { classId: 'XI A', classTeacher: 'Ms. Monika', coClassTeacher: 'Ms. Sakshi Grover', focus: 'Humanities / Arts' },
  { classId: 'XI B', classTeacher: 'Ms. Sakshi Grover', coClassTeacher: 'Ms. Sushma Rani', focus: 'Commerce' },
  { classId: 'XI C', classTeacher: 'Ms. Sushma Rani', coClassTeacher: 'Mr. Pawan Km. Vishavkarma', focus: 'Science (PCM / PCB)' },
  { classId: 'XI D', classTeacher: 'Mr. Pawan Km. Vishavkarma', coClassTeacher: 'Ms. Monika', focus: 'Humanities / Arts' },
  { classId: 'XII A', classTeacher: 'Ms. Rashmi Upadhyay', coClassTeacher: 'Mr. Amandeep Singh', focus: 'Humanities / Arts' },
  { classId: 'XII B', classTeacher: 'Mr. Amandeep Singh', coClassTeacher: 'Ms. Vaishali', focus: 'Commerce' },
  { classId: 'XII C', classTeacher: 'Ms. Vaishali', coClassTeacher: 'Ms. Rashmi Upadhyay', focus: 'Science (PCM / PCB)' }
];

export const CLASS_TIMETABLES: Record<string, ClassTimetableData> = {
  'VI A': {
    id: 'VI A',
    name: 'Class VI A',
    classTeacher: 'Ms. Archana Dhaka',
    coClassTeacher: 'Mr. Neeraj Kumar',
    stream: 'Middle School',
    rows: [
      { day: 'Monday', p1: 'Soc. Sci. (Archana)', p2: 'Sports (Prakash)', p3: 'English (Ravi)', p4: 'Maths (Reetika)', p5: 'Skt/Pb/Urdu (Neetu/Pawan/Taufique)', p6: 'Science (Sonia)', p7: 'Kaushal Bodh (Divya)', p8: 'Kaushal Bodh (Divya)' },
      { day: 'Tuesday', p1: 'Soc. Sci. (Archana)', p2: 'Library (Ajay)', p3: 'English (Ravi)', p4: 'Maths (Reetika)', p5: 'Skt/Pb/Urdu', p6: 'Hindi (Anupama)', p7: 'Science (Sonia)', p8: 'Science (Sonia)' },
      { day: 'Wednesday', p1: 'Soc. Sci. (Archana)', p2: 'Spoken Eng (Prerna)', p3: 'English (Ravi)', p4: 'Maths (Reetika)', p5: 'Skt/Pb/Urdu', p6: 'Hindi (Anupama)', p7: 'Science (Sonia)', p8: 'Health Well./SOL (Vijay)' },
      { day: 'Thursday', p1: 'Soc. Sci. (Archana)', p2: 'Spanish (Vanshika)', p3: 'English (Ravi)', p4: 'Maths (Reetika)', p5: 'Home Sci. (Rashmi)', p6: 'Hindi (Anupama)', p7: 'Kaushal Bodh (Divya)', p8: 'Kaushal Bodh (Divya)' },
      { day: 'Friday', p1: 'Soc. Sci. (Archana)', p2: 'CT & AI (Rahul)', p3: 'Spanish (Vanshika)', p4: 'Maths (Reetika)', p5: 'Home Sci. (Rashmi)', p6: 'Hindi (Anupama)', p7: 'Science (Sonia)', p8: 'Spoken Eng (Prerna)' },
      { day: 'Saturday', p1: 'Soc. Sci./Rashtraneeti (Archana)', p2: 'CT & AI (Rahul)', p3: 'English (Ravi)', p4: 'Maths (Reetika)', p5: 'Home Sci. (Rashmi)', p6: 'Hindi (Anupama)', p7: 'Science (Sonia)', p8: 'Kaushal Bodh (Divya)' }
    ]
  },
  'VI B': {
    id: 'VI B',
    name: 'Class VI B',
    classTeacher: 'Mr. Neeraj Kumar',
    coClassTeacher: 'Ms. Archana Dhaka',
    stream: 'Middle School',
    rows: [
      { day: 'Monday', p1: 'CT & AI (Rahul)', p2: 'Kaushal Bodh (Archana)', p3: 'Kaushal Bodh (Archana)', p4: 'English (Meenu)', p5: 'Skt/Pb/Urdu (Nishtha/Pawan/Taufique)', p6: 'Maths (Neeraj)', p7: 'Science (Vaishali)', p8: 'Hindi (Vikas)' },
      { day: 'Tuesday', p1: 'CT & AI (Rahul)', p2: 'Maths (Neeraj)', p3: 'S.S. (Archana)', p4: 'Spoken Eng (Prerna)', p5: 'Skt/Pb/Urdu', p6: 'Sports (Prakash)', p7: 'Science (Vaishali)', p8: 'Hindi (Vikas)' },
      { day: 'Wednesday', p1: 'CT & AI (Rahul)', p2: 'Maths (Neeraj)', p3: 'S.S. (Archana)', p4: 'English (Meenu)', p5: 'Skt/Pb/Urdu', p6: 'Library (Ajay)', p7: 'Science (Vaishali)', p8: 'Health & Well./SOL (Neeraj)' },
      { day: 'Thursday', p1: 'Drawing (Manoj)', p2: 'Maths (Neeraj)', p3: 'S.S. (Archana)', p4: 'English (Meenu)', p5: 'Spanish (Vanshika)', p6: 'Kaushal Bodh (Archana)', p7: 'Science (Vaishali)', p8: 'Hindi (Vikas)' },
      { day: 'Friday', p1: 'Drawing (Manoj)', p2: 'Maths (Neeraj)', p3: 'S.S. (Archana)', p4: 'English (Meenu)', p5: 'Kaushal Bodh (Archana)', p6: 'Kaushal Bodh (Archana)', p7: 'Science (Vaishali)', p8: 'Hindi (Vikas)' },
      { day: 'Saturday', p1: 'Drawing/Rashtraneeti (Manoj)', p2: 'Maths (Neeraj)', p3: 'S.S. (Archana)', p4: 'English (Meenu)', p5: 'Spoken Eng (Prerna)', p6: 'Spanish (Vanshika)', p7: 'Science (Vaishali)', p8: 'Hindi (Vikas)' }
    ]
  },
  'VII A': {
    id: 'VII A',
    name: 'Class VII A',
    classTeacher: 'Ms. Sonia',
    coClassTeacher: 'Ms. Nidhi Tomar',
    stream: 'Middle School',
    rows: [
      { day: 'Monday', p1: 'English [NIPUN] (Nidhi)', p2: 'Science (Sonia)', p3: 'Kaushal Bodh (Taufique)', p4: 'Kaushal Bodh (Taufique)', p5: 'English (Manisha)', p6: 'Math (Annu)', p7: 'S.S. (Archana)', p8: 'Home Sci (Nidhi)' },
      { day: 'Tuesday', p1: 'English [NIPUN] (Nidhi)', p2: 'Science (Sonia)', p3: 'Hindi (Babita)', p4: 'Kaushal Bodh (Taufique)', p5: 'English (Manisha)', p6: 'Math (Annu)', p7: 'S.S. (Archana)', p8: 'Home Sci (Nidhi)' },
      { day: 'Wednesday', p1: 'Home Sci (Nidhi)', p2: 'Science (Sonia)', p3: 'Spanish (Vanshika)', p4: 'Kaushal Bodh (Taufique)', p5: 'English (Manisha)', p6: 'Math (Annu)', p7: 'S.S. (Archana)', p8: 'Health & well/SOL (Sonia)' },
      { day: 'Thursday', p1: 'Hindi (Anupama)', p2: 'Spoken Eng (Prerna)', p3: 'Hindi (Babita)', p4: 'Skt./Punjabi (Nishtha/Pawan)', p5: 'Sports (Prakash)', p6: 'Math (Annu)', p7: 'S.S. (Archana)', p8: 'Spanish (Vanshika)' },
      { day: 'Friday', p1: 'Math (Annu)', p2: 'Science (Sonia)', p3: 'Hindi (Babita)', p4: 'Skt./Punjabi', p5: 'English (Manisha)', p6: 'Math (Annu)', p7: 'Library (Ajay)', p8: 'CT & AI (Rahul)' },
      { day: 'Saturday', p1: 'Math/Rashtraneeti (Annu)', p2: 'Science (Sonia)', p3: 'Hindi (Babita)', p4: 'Skt./Punjabi', p5: 'English (Manisha)', p6: 'Math (Annu)', p7: 'S.S. (Archana)', p8: 'Spoken Eng (Prerna)' }
    ]
  },
  'VII B': {
    id: 'VII B',
    name: 'Class VII B',
    classTeacher: 'Ms. Nidhi Tomar',
    coClassTeacher: 'Ms. Neetu Meena',
    stream: 'Middle School',
    rows: [
      { day: 'Monday', p1: 'English [NIPUN] (Meenu)', p2: 'Science (Nidhi)', p3: 'English (Meenu)', p4: 'Spanish (Vanshika)', p5: 'Kaushal Bodh (Rashmi)', p6: 'Kaushal Bodh (Rashmi)', p7: 'Maths (Vijay)', p8: 'Drawing (Manoj)' },
      { day: 'Tuesday', p1: 'English [NIPUN] (Meenu)', p2: 'Science (Nidhi)', p3: 'English (Meenu)', p4: 'Drawing (Manoj)', p5: 'Hindi (Babita)', p6: 'Soc. Sci. (Pawan-Eco)', p7: 'Maths (Vijay)', p8: 'CT & AI (Rahul)' },
      { day: 'Wednesday', p1: 'Hindi (Babita)', p2: 'Science (Nidhi)', p3: 'English (Meenu)', p4: 'Drawing (Manoj)', p5: 'Kaushal Bodh (Rashmi)', p6: 'Soc. Sci. (Pawan-Eco)', p7: 'Spoken Eng (Prerna)', p8: 'Health & Well/SOL (Nidhi)' },
      { day: 'Thursday', p1: 'Hindi (Babita)', p2: 'Science (Nidhi)', p3: 'Library (Ajay)', p4: 'Skt./Punjabi (Nishtha/Pawan)', p5: 'Hindi (Babita)', p6: 'Soc. Sci. (Pawan-Eco)', p7: 'Maths (Vijay)', p8: 'Kaushal Bodh (Rashmi)' },
      { day: 'Friday', p1: 'Math (Reetika)', p2: 'Science (Nidhi)', p3: 'English (Meenu)', p4: 'Skt./Punjabi', p5: 'Hindi (Babita)', p6: 'Soc. Sci. (Pawan-Eco)', p7: 'Maths (Vijay)', p8: 'Spanish (Vanshika)' },
      { day: 'Saturday', p1: 'Math/Rashtraneeti (Reetika)', p2: 'Spoken Eng (Prerna)', p3: 'English (Meenu)', p4: 'Skt./Punjabi', p5: 'Hindi (Babita)', p6: 'Soc. Sci. (Pawan-Eco)', p7: 'Maths (Vijay)', p8: 'Sports (Prakash)' }
    ]
  },
  'VII C': {
    id: 'VII C',
    name: 'Class VII C',
    classTeacher: 'Ms. Neetu Meena',
    coClassTeacher: 'Ms. Sonia',
    stream: 'Middle School',
    rows: [
      { day: 'Monday', p1: 'English [NIPUN] (Ravi)', p2: 'CT & AI (Rahul)', p3: 'Science (Nidhi)', p4: 'Maths (Sakshi)', p5: 'English (Ravi)', p6: 'Hindi (Vikas)', p7: 'Kaushal Bodh (Babita)', p8: 'Kaushal Bodh (Babita)' },
      { day: 'Tuesday', p1: 'English [NIPUN] (Ravi)', p2: 'Spanish (Vanshika)', p3: 'Spoken Eng (Prerna)', p4: 'Maths (Sakshi)', p5: 'English (Ravi)', p6: 'Hindi (Vikas)', p7: 'S.S. (Narinder)', p8: 'Sports (Prakash)' },
      { day: 'Wednesday', p1: 'Math (Neeraj)', p2: 'Kaushal Bodh (Babita)', p3: 'Science (Nidhi)', p4: 'Maths (Sakshi)', p5: 'English (Ravi)', p6: 'Spanish (Vanshika)', p7: 'S.S. (Narinder)', p8: 'Health & Well./SOL (Neetu)' },
      { day: 'Thursday', p1: 'Math (Neeraj)', p2: 'Skt/Urdu (Neetu/Taufique)', p3: 'Science (Nidhi)', p4: 'Maths (Sakshi)', p5: 'English (Ravi)', p6: 'Spoken Eng (Prerna)', p7: 'Kaushal Bodh (Babita)', p8: 'Home Sci (Nidhi)' },
      { day: 'Friday', p1: 'Hindi (Vikas)', p2: 'Skt/Urdu (Neetu/Taufique)', p3: 'Science (Nidhi)', p4: 'Maths (Sakshi)', p5: 'English (Ravi)', p6: 'Hindi (Vikas)', p7: 'S.S. (Narinder)', p8: 'Home Sci (Nidhi)' },
      { day: 'Saturday', p1: 'S.S./Rashtraneeti (Narinder)', p2: 'Skt/Urdu (Neetu/Taufique)', p3: 'Science (Nidhi)', p4: 'Maths (Sakshi)', p5: 'Library (Ajay)', p6: 'Hindi (Vikas)', p7: 'S.S. (Narinder)', p8: 'Home Sci (Nidhi)' }
    ]
  },
  'VIII A': {
    id: 'VIII A',
    name: 'Class VIII A',
    classTeacher: 'Mr. Pawan Kumar (Punjabi)',
    coClassTeacher: 'Ms. Manisha',
    stream: 'Middle School',
    rows: [
      { day: 'Monday', p1: 'Math [NIPUN] (Neeraj)', p2: 'Skt./Punjabi/Urdu (Neetu/Pawan/Taufique)', p3: 'Hindi (Anupama)', p4: 'Science (Sushma)', p5: 'Home Sci (Nidhi)', p6: 'Maths (Vijay)', p7: 'Kaushal Bodh (Pawan-Pb)', p8: 'Kaushal Bodh (Pawan-Pb)' },
      { day: 'Tuesday', p1: 'Hindi (Anupama)', p2: 'Skt./Punjabi/Urdu', p3: 'Hindi (Anupama)', p4: 'Science (Sushma)', p5: 'Home Sci (Nidhi)', p6: 'NEEEV (Pawan-Pb)', p7: 'S.S. (Sundeep)', p8: 'English (Ravi)' },
      { day: 'Wednesday', p1: 'Hindi (Anupama)', p2: 'Skt./Punjabi/Urdu', p3: 'Kaushal Bodh (Pawan-Pb)', p4: 'Spoken Eng/Spanish (Prerna/Vanshika)', p5: 'Science (Sushma)', p6: 'Maths (Vijay)', p7: 'S.S. (Sundeep)', p8: 'Health & Well./SOL (Pawan-Pb)' },
      { day: 'Thursday', p1: 'English (Ravi)', p2: 'CT & AI (Rahul)', p3: 'Sports (Prakash)', p4: 'Science (Sushma)', p5: 'Home Sci (Nidhi)', p6: 'Maths (Vijay)', p7: 'S.S. (Sundeep)', p8: 'English (Ravi)' },
      { day: 'Friday', p1: 'English (Ravi)', p2: 'Spoken Eng/Spanish (Prerna/Vanshika)', p3: 'Hindi (Anupama)', p4: 'Science (Sushma)', p5: 'Hindi (Anupama)', p6: 'Maths (Vijay)', p7: 'S.S. (Sundeep)', p8: 'English (Ravi)' },
      { day: 'Saturday', p1: 'Maths/Rashtraneeti (Neeraj)', p2: 'Library (Ajay)', p3: 'Hindi (Anupama)', p4: 'Science (Sushma)', p5: 'Kaushal Bodh (Pawan-Pb)', p6: 'Maths (Vijay)', p7: 'S.S. (Sundeep)', p8: 'English (Ravi)' }
    ]
  },
  'VIII B': {
    id: 'VIII B',
    name: 'Class VIII B',
    classTeacher: 'Ms. Manisha',
    coClassTeacher: 'Ms. Annu Rani',
    stream: 'Middle School',
    rows: [
      { day: 'Monday', p1: 'Math [NIPUN] (Reetika)', p2: 'Skt/Pb/Urdu (Nishtha/Pawan/Taufique)', p3: 'English (Manisha)', p4: 'Science (Parul)', p5: 'S.S. (Narinder)', p6: 'Kaushal Bodh (Anupama)', p7: 'Spoken Eng/Spanish (Prerna/Vanshika)', p8: 'Spoken Eng/Spanish' },
      { day: 'Tuesday', p1: 'Math (Reetika)', p2: 'Skt/Pb/Urdu', p3: 'English (Manisha)', p4: 'Science (Parul)', p5: 'S.S. (Narinder)', p6: 'Maths (Reetika)', p7: 'Hindi (Vikas)', p8: 'Drawing (Manoj)' },
      { day: 'Wednesday', p1: 'Hindi (Vikas)', p2: 'Skt/Pb/Urdu', p3: 'English (Manisha)', p4: 'Science (Parul)', p5: 'S.S. (Narinder)', p6: 'Maths (Reetika)', p7: 'Hindi (Vikas)', p8: 'Health & Well./SOL (Manisha)' },
      { day: 'Thursday', p1: 'NEEEV (Sonia)', p2: 'Kaushal Bodh (Anupama)', p3: 'Kaushal Bodh (Anupama)', p4: 'Science (Parul)', p5: 'CT & AI (Rahul)', p6: 'Maths (Reetika)', p7: 'Hindi (Vikas)', p8: 'Drawing (Manoj)' },
      { day: 'Friday', p1: 'English (Nidhi)', p2: 'Library (Ajay)', p3: 'English (Manisha)', p4: 'Science (Parul)', p5: 'S.S. (Narinder)', p6: 'Maths (Reetika)', p7: 'Hindi (Vikas)', p8: 'Drawing (Manoj)' },
      { day: 'Saturday', p1: 'English/Rashtraneeti (Nidhi)', p2: 'Sports (Prakash)', p3: 'English (Manisha)', p4: 'Science (Parul)', p5: 'Kaushal Bodh (Anupama)', p6: 'Maths (Reetika)', p7: 'Hindi (Vikas)', p8: 'S.S. (Narinder)' }
    ]
  },
  'VIII C': {
    id: 'VIII C',
    name: 'Class VIII C',
    classTeacher: 'Ms. Annu Rani',
    coClassTeacher: 'Mr. Pawan Kumar (Pb)',
    stream: 'Middle School',
    rows: [
      { day: 'Monday', p1: 'Math [NIPUN] (Annu)', p2: 'Soc. Sci. (Narinder)', p3: 'NEEEV (Annu)', p4: 'Skt (Neetu)', p5: 'Science (Sonia)', p6: 'Hindi (Babita)', p7: 'Kaushal Bodh (Narinder)', p8: 'English (Meenu)' },
      { day: 'Tuesday', p1: 'Math (Annu)', p2: 'Soc. Sci. (Narinder)', p3: 'Maths (Annu)', p4: 'Skt (Neetu)', p5: 'Science (Sonia)', p6: 'Hindi (Babita)', p7: 'Home Sci (Nidhi)', p8: 'English (Meenu)' },
      { day: 'Wednesday', p1: 'English (Meenu)', p2: 'Soc. Sci. (Narinder)', p3: 'Maths (Annu)', p4: 'Skt (Neetu)', p5: 'Science (Sonia)', p6: 'Hindi (Babita)', p7: 'Home Sci (Nidhi)', p8: 'Health & Well./SOL (Annu)' },
      { day: 'Thursday', p1: 'English (Meenu)', p2: 'Soc. Sci. (Narinder)', p3: 'Maths (Annu)', p4: 'CT & AI (Rahul)', p5: 'Kaushal Bodh (Narinder)', p6: 'Spoken Eng/Spanish (Prerna/Vanshika)', p7: 'Science (Sonia)', p8: 'English (Meenu)' },
      { day: 'Friday', p1: 'Kaushal Bodh (Narinder)', p2: 'Kaushal Bodh (Narinder)', p3: 'Maths (Annu)', p4: 'Spoken Eng/Spanish', p5: 'Science (Sonia)', p6: 'Hindi (Babita)', p7: 'Sports (Prakash)', p8: 'English (Meenu)' },
      { day: 'Saturday', p1: 'Hindi/Rashtraneeti (Babita)', p2: 'Soc. Sci. (Narinder)', p3: 'Maths (Annu)', p4: 'Library (Ajay)', p5: 'Science (Sonia)', p6: 'Hindi (Babita)', p7: 'Home Sci (Nidhi)', p8: 'English (Meenu)' }
    ]
  },
  'IX A': {
    id: 'IX A',
    name: 'Class IX A',
    classTeacher: 'Ms. Reetika',
    coClassTeacher: 'Ms. Babita Solanki',
    stream: 'Secondary',
    rows: [
      { day: 'Monday', p1: 'Ind. In Society (Sonia)', p2: 'Mental Math (Reetika)', p3: 'Soc. Sci. (Sundeep)', p4: 'Hindi (Vikas)', p5: 'Science (Parul)', p6: 'NEEEV (Pawan-Pb)', p7: 'English (Meenu)', p8: 'Phy. Edu. & Well Being (Prakash)' },
      { day: 'Tuesday', p1: 'CT & AI (Amandeep)', p2: 'Math (Reetika)', p3: 'Soc. Sci. (Sundeep)', p4: 'Library (Ajay)', p5: 'Science (Parul)', p6: 'Art Edu. (Manoj)', p7: 'English (Meenu)', p8: 'Science Lab (Parul/Ajay)' },
      { day: 'Wednesday', p1: 'CT & AI (Amandeep)', p2: 'Math (Reetika)', p3: 'Phy. Edu. & Well Being (Prakash)', p4: 'Hindi (Vikas)', p5: 'Science (Parul)', p6: 'Science (Parul)', p7: 'English (Meenu)', p8: 'Health & Well/SOL (Reetika)' },
      { day: 'Thursday', p1: 'IT (Ashish)', p2: 'Math (Reetika)', p3: 'Soc. Sci. (Sundeep)', p4: 'Hindi (Vikas)', p5: 'Kaushal (Vikas/Divya)', p6: 'Kaushal (Vikas/Divya)', p7: 'English (Meenu)', p8: 'Skt/Pb (Nishtha/Pawan)' },
      { day: 'Friday', p1: 'IT (Ashish)', p2: 'Math (Reetika)', p3: 'Soc. Sci. (Sundeep)', p4: 'Hindi (Vikas)', p5: 'Science (Parul)', p6: 'Kaushal (Vikas/Divya)', p7: 'English (Meenu)', p8: 'Skt/Pb (Nishtha/Pawan)' },
      { day: 'Saturday', p1: 'IT/Rashtraneeti (Ashish)', p2: 'Math (Reetika)', p3: 'Soc. Sci. (Sundeep)', p4: 'Hindi (Vikas)', p5: 'Science (Parul)', p6: 'Kaushal (Vikas/Divya)', p7: 'Math (Reetika)', p8: 'Skt/Pb (Nishtha/Pawan)' }
    ]
  },
  'IX B': {
    id: 'IX B',
    name: 'Class IX B',
    classTeacher: 'Ms. Babita Solanki',
    coClassTeacher: 'Ms. Anupama Sansanwal',
    stream: 'Secondary',
    rows: [
      { day: 'Monday', p1: 'Kaushal (Vikas/Divya)', p2: 'Hindi (Babita)', p3: 'Soc. Sci. (Narinder)', p4: 'Science (Sonia)', p5: 'Mental Maths (Annu)', p6: 'English (Manisha)', p7: 'IT (Ashish)', p8: 'Sci. Lab (Sonia/Ajay)' },
      { day: 'Tuesday', p1: 'Kaushal (Vikas/Divya)', p2: 'Hindi (Babita)', p3: 'Soc. Sci. (Narinder)', p4: 'Science (Sonia)', p5: 'Maths (Annu)', p6: 'English (Manisha)', p7: 'IT (Ashish)', p8: 'NEEEV (Taufique)' },
      { day: 'Wednesday', p1: 'Kaushal (Vikas/Divya)', p2: 'Kaushal (Vikas/Divya)', p3: 'Soc. Sci. (Narinder)', p4: 'Science (Sonia)', p5: 'Maths (Annu)', p6: 'Art Edu. (Manoj)', p7: 'IT (Ashish)', p8: 'Health & Well/SOL (Babita)' },
      { day: 'Thursday', p1: 'CT & AI (Rahul)', p2: 'Hindi (Babita)', p3: 'Soc. Sci. (Narinder)', p4: 'Science (Sonia)', p5: 'Maths (Annu)', p6: 'English (Manisha)', p7: 'Library (Ajay)', p8: 'Skt/Pb/Urdu (Neetu/Pawan/Taufique)' },
      { day: 'Friday', p1: 'Ind. In Society (Meenu)', p2: 'Hindi (Babita)', p3: 'Phy Edu & Well Being (Prakash)', p4: 'Science (Sonia)', p5: 'Maths (Annu)', p6: 'English (Manisha)', p7: 'CT & AI (Rahul)', p8: 'Skt/Pb/Urdu' },
      { day: 'Saturday', p1: 'Phy Edu & Well Being/Rashtraneeti (Prakash)', p2: 'Hindi (Babita)', p3: 'Soc. Sci. (Narinder)', p4: 'Science (Sonia)', p5: 'Maths (Annu)', p6: 'English (Manisha)', p7: 'Maths (Annu)', p8: 'Skt/Pb/Urdu' }
    ]
  },
  'IX C': {
    id: 'IX C',
    name: 'Class IX C',
    classTeacher: 'Ms. Anupama Sansanwal',
    coClassTeacher: 'Ms. Reetika',
    stream: 'Secondary',
    rows: [
      { day: 'Monday', p1: 'IT (Ashish)', p2: 'Hindi (Anupama)', p3: 'Phy Edu & Well Being (Prakash)', p4: 'Maths (Neeraj)', p5: 'CT & AI (Rahul)', p6: 'Soc. Sci. (Sundeep)', p7: 'English (Ravi)', p8: 'Mental Math (Neeraj)' },
      { day: 'Tuesday', p1: 'IT (Ashish)', p2: 'Hindi (Anupama)', p3: 'Science (Parul)', p4: 'Maths (Neeraj)', p5: 'CT & AI (Rahul)', p6: 'Soc. Sci. (Sundeep)', p7: 'English (Ravi)', p8: 'Library (Ajay)' },
      { day: 'Wednesday', p1: 'IT (Ashish)', p2: 'Hindi (Anupama)', p3: 'Science (Parul)', p4: 'Maths (Neeraj)', p5: 'Phy Edu & Well Being (Prakash)', p6: 'Soc. Sci. (Sundeep)', p7: 'Ind. In Society (Taufique)', p8: 'Health & Well/SOL (Anupama)' },
      { day: 'Thursday', p1: 'Kaushal (Vikas/Divya)', p2: 'Kaushal (Vikas/Divya)', p3: 'Science (Parul)', p4: 'Maths (Neeraj)', p5: 'Skt/Urdu (Neetu/Taufique)', p6: 'Soc. Sci. (Sundeep)', p7: 'English (Ravi)', p8: 'Soc. Sci. (Sundeep)' },
      { day: 'Friday', p1: 'Kaushal (Vikas/Divya)', p2: 'Hindi (Anupama)', p3: 'Science (Parul)', p4: 'Maths (Neeraj)', p5: 'Skt/Urdu', p6: 'Soc. Sci. (Sundeep)', p7: 'English (Ravi)', p8: 'Science (Parul)' },
      { day: 'Saturday', p1: 'Kaushal (Vikas/Divya)', p2: 'Hindi (Anupama)', p3: 'Science (Parul)', p4: 'Maths (Neeraj)', p5: 'Skt/Urdu', p6: 'Art Edu. (Manoj)', p7: 'English (Ravi)', p8: 'Science Lab (Parul/Ajay)' }
    ]
  },
  'X A': {
    id: 'X A',
    name: 'Class X A',
    classTeacher: 'Mr. Vikas Arora',
    coClassTeacher: 'Mr. Ravi Kumar',
    stream: 'Secondary (CBSE Board)',
    rows: [
      { day: 'Monday', p1: 'Science Lab (Parul/Ajay)', p2: 'Science Lab (Parul/Ajay)', p3: 'IT (Ashish)', p4: 'Eng/Spoken Eng (Manisha/Prerna)', p5: 'Mental Math (Neeraj)', p6: 'Library (Ajay)', p7: 'CT & AI (Rahul)', p8: 'Soc. Sci. (Archana)' },
      { day: 'Tuesday', p1: 'Science (Parul)', p2: 'Hindi (Vikas)', p3: 'IT (Ashish)', p4: 'English (Manisha)', p5: 'Maths (Neeraj)', p6: 'Maths (Neeraj)', p7: 'CT & AI (Rahul)', p8: 'Soc. Sci. (Archana)' },
      { day: 'Wednesday', p1: 'Science (Parul)', p2: 'Hindi (Vikas)', p3: 'IT (Ashish)', p4: 'English (Manisha)', p5: 'Soc. Sci. (Archana)', p6: 'Maths (Neeraj)', p7: 'Skt./Punjabi (Neetu/Pawan)', p8: 'Health & Well/SOL (Vikas)' },
      { day: 'Thursday', p1: 'Science (Parul)', p2: 'Hindi (Vikas)', p3: 'IT (Ashish)', p4: 'English (Manisha)', p5: 'Maths (Neeraj)', p6: 'Science (Parul)', p7: 'Skt./Punjabi', p8: 'Soc. Sci. (Archana)' },
      { day: 'Friday', p1: 'Science (Parul)', p2: 'Hindi (Vikas)', p3: 'CT & AI (Rahul)', p4: 'English (Manisha)', p5: 'Maths (Neeraj)', p6: 'Maths (Neeraj)', p7: 'Skt./Punjabi', p8: 'Soc. Sci. (Archana)' },
      { day: 'Saturday', p1: 'Science/Rashtraneeti (Parul)', p2: 'Hindi (Vikas)', p3: 'CT & AI (Rahul)', p4: 'English (Manisha)', p5: 'NEEEV (Sundeep)', p6: 'Sports (Prakash)', p7: 'Skt./Punjabi', p8: 'Soc. Sci. (Archana)' }
    ]
  },
  'X B': {
    id: 'X B',
    name: 'Class X B',
    classTeacher: 'Mr. Ravi Kumar',
    coClassTeacher: 'Mr. Vikas Arora',
    stream: 'Secondary (CBSE Board)',
    rows: [
      { day: 'Monday', p1: 'Soc. Sci. (Sundeep)', p2: 'English (Ravi)', p3: 'Mental Math (Vijay)', p4: 'Maths (Vijay)', p5: 'IT (Ashish)', p6: 'Science Lab (Trishtha/Ajay)', p7: 'Science Lab (Trishtha/Ajay)', p8: 'Hindi (Anupama)' },
      { day: 'Tuesday', p1: 'Soc. Sci. (Sundeep)', p2: 'Eng/Spoken Eng (Ravi/Prerna)', p3: 'Maths (Vijay)', p4: 'Science (Trishtha)', p5: 'IT (Ashish)', p6: 'NEEEV (Neetu)', p7: 'Science (Trishtha)', p8: 'Hindi (Anupama)' },
      { day: 'Wednesday', p1: 'Soc. Sci. (Sundeep)', p2: 'English (Ravi)', p3: 'Maths (Vijay)', p4: 'Science (Trishtha)', p5: 'Library (Ajay)', p6: 'CT & AI (Rahul)', p7: 'Skt./Punjabi (Nishtha/Pawan)', p8: 'Health & Well/SOL (Ravi)' },
      { day: 'Thursday', p1: 'Soc. Sci. (Sundeep)', p2: 'English (Ravi)', p3: 'Maths (Vijay)', p4: 'Science (Trishtha)', p5: 'IT (Ashish)', p6: 'CT & AI (Rahul)', p7: 'Skt./Punjabi', p8: 'Hindi (Anupama)' },
      { day: 'Friday', p1: 'Soc. Sci. (Sundeep)', p2: 'English (Ravi)', p3: 'Maths (Vijay)', p4: 'Science (Trishtha)', p5: 'Sports (Prakash)', p6: 'CT & AI (Rahul)', p7: 'Skt./Punjabi', p8: 'Hindi (Anupama)' },
      { day: 'Saturday', p1: 'Soc. Sci./Rashtraneeti (Sundeep)', p2: 'English (Ravi)', p3: 'Maths (Vijay)', p4: 'Science (Trishtha)', p5: 'IT (Ashish)', p6: 'CT & AI (Rahul)', p7: 'Skt./Punjabi', p8: 'Hindi (Anupama)' }
    ]
  },
  'XI A': {
    id: 'XI A',
    name: 'Class XI A',
    classTeacher: 'Ms. Monika',
    coClassTeacher: 'Ms. Sakshi Grover',
    stream: 'Humanities / Arts',
    rows: [
      { day: 'Monday', p1: 'Phy. Edu. (Monika)', p2: 'Pol. Sci. (Ranju)', p3: 'Home Sci./Eco. (Rashmi/Pawan)', p4: 'Hindi (Ramesh)', p5: 'Pol. Sci. (Ranju)', p6: 'Eng./SKT (Suvechcha/Nishtha)', p7: 'History (Alpana)', p8: 'Home Sci. Lab/Eco (Rashmi/Pawan)' },
      { day: 'Tuesday', p1: 'Phy. Edu. (Monika)', p2: 'Pol. Sci. (Ranju)', p3: 'Home Sci./Eco. (Rashmi/Pawan)', p4: 'Hindi (Ramesh)', p5: 'Pol. Sci. (Ranju)', p6: 'Eng./SKT', p7: 'History (Alpana)', p8: 'Home Sci. Lab/Eco' },
      { day: 'Wednesday', p1: 'Phy. Edu. (Monika)', p2: 'Pol. Sci. (Ranju)', p3: 'Home Sci./Eco. (Rashmi/Pawan)', p4: 'Hindi (Ramesh)', p5: 'Hindi (Ramesh)', p6: 'Eng./SKT', p7: 'History (Alpana)', p8: 'CUET Prep/SOL (Monika)' },
      { day: 'Thursday', p1: 'Phy. Edu. (Monika)', p2: 'Pol. Sci. (Ranju)', p3: 'Home Sci./Eco. (Rashmi/Pawan)', p4: 'Hindi (Ramesh)', p5: 'Hindi (Ramesh)', p6: 'Eng./SKT', p7: 'History (Alpana)', p8: 'NEEEV (Monika)' },
      { day: 'Friday', p1: 'Phy. Edu. (Monika)', p2: 'Pol. Sci. (Ranju)', p3: 'Home Sci./Eco. (Rashmi/Pawan)', p4: 'Hindi (Ramesh)', p5: 'History (Alpana)', p6: 'Eng./SKT', p7: 'History (Alpana)', p8: 'Sports (Prakash)' },
      { day: 'Saturday', p1: 'Phy. Edu./Rashtraneeti (Monika)', p2: 'Pol. Sci. (Ranju)', p3: 'Home Sci./Eco. (Rashmi/Pawan)', p4: 'Hindi (Ramesh)', p5: 'History (Alpana)', p6: 'Eng./SKT', p7: 'History (Alpana)', p8: 'Library (Ajay)' }
    ]
  },
  'XI B': {
    id: 'XI B',
    name: 'Class XI B',
    classTeacher: 'Ms. Sakshi Grover',
    coClassTeacher: 'Ms. Sushma Rani',
    stream: 'Commerce',
    rows: [
      { day: 'Monday', p1: 'Acct. (Shalini)', p2: 'Hindi/Math (Ramesh/Sakshi)', p3: 'Economics (Pawan)', p4: 'English (Suvechcha)', p5: 'Hindi/Math (Ramesh/Sakshi)', p6: 'IT (Ashish)', p7: 'B. Std. (Shalini)', p8: 'Economics (Pawan)' },
      { day: 'Tuesday', p1: 'Acct. (Shalini)', p2: 'Hindi/Math', p3: 'Economics (Pawan)', p4: 'English (Suvechcha)', p5: 'Hindi/Math', p6: 'IT (Ashish)', p7: 'B. Std. (Shalini)', p8: 'Economics (Pawan)' },
      { day: 'Wednesday', p1: 'Acct. (Shalini)', p2: 'Hindi/Math', p3: 'Economics (Pawan)', p4: 'English (Suvechcha)', p5: 'IT Lab (Ashish)', p6: 'IT (Ashish)', p7: 'B. Std. (Shalini)', p8: 'CUET Prep/SOL (Sakshi)' },
      { day: 'Thursday', p1: 'Acct. (Shalini)', p2: 'Hindi/Math', p3: 'Economics (Pawan)', p4: 'English (Suvechcha)', p5: 'CUET Prep (Sakshi)', p6: 'IT (Ashish)', p7: 'B. Std. (Shalini)', p8: 'Sports (Prakash)' },
      { day: 'Friday', p1: 'Acct. (Shalini)', p2: 'Hindi/Math', p3: 'Economics (Pawan)', p4: 'English (Suvechcha)', p5: 'Acct. (Shalini)', p6: 'IT (Ashish)', p7: 'B. Std. (Shalini)', p8: 'Library (Ajay)' },
      { day: 'Saturday', p1: 'Acct./Rashtraneeti (Shalini)', p2: 'Hindi/Math', p3: 'Economics (Pawan)', p4: 'English (Suvechcha)', p5: 'B. Std. (Shalini)', p6: 'IT (Ashish)', p7: 'B. Std. (Shalini)', p8: 'NEEEV (Sakshi)' }
    ]
  },
  'XI C': {
    id: 'XI C',
    name: 'Class XI C',
    classTeacher: 'Ms. Sushma Rani',
    coClassTeacher: 'Mr. Pawan Km. Vishavkarma',
    stream: 'Science (PCM / PCB)',
    rows: [
      { day: 'Monday', p1: 'Physics (Sushma)', p2: 'Maths/Bio. (Sakshi/Vaishali)', p3: 'Chemistry (Trishtha)', p4: 'English (Suvechcha)', p5: 'Maths/Bio Lab (Sakshi/Vaishali)', p6: 'C. Sci. (Amandeep)', p7: 'Phy Edu (Monika)', p8: 'Library (Ajay)' },
      { day: 'Tuesday', p1: 'Physics (Sushma)', p2: 'Maths/Bio.', p3: 'Chemistry (Trishtha)', p4: 'English (Suvechcha)', p5: 'Maths/Bio Lab', p6: 'C. Sci. (Amandeep)', p7: 'Phy Edu (Monika)', p8: 'NEEEV (Vaishali)' },
      { day: 'Wednesday', p1: 'Physics (Sushma)', p2: 'Maths/Bio.', p3: 'Chemistry (Trishtha)', p4: 'English (Suvechcha)', p5: 'C. Sci. Lab (Amandeep)', p6: 'C. Sci. (Amandeep)', p7: 'Phy Edu (Monika)', p8: 'JEE/NEET Prep/SOL (Sushma)' },
      { day: 'Thursday', p1: 'Physics (Sushma)', p2: 'Maths/Bio.', p3: 'Chemistry (Trishtha)', p4: 'English (Suvechcha)', p5: 'C. Sci. Lab (Amandeep)', p6: 'JEE/NEET Prep (Vaishali)', p7: 'Phy Edu (Monika)', p8: 'Sports (Prakash)' },
      { day: 'Friday', p1: 'Physics (Sushma)', p2: 'Maths/Bio.', p3: 'Chemistry (Trishtha)', p4: 'English (Suvechcha)', p5: 'Phy Lab (Sushma)', p6: 'C. Sci. (Amandeep)', p7: 'Phy Edu (Monika)', p8: 'Chem. Lab. (Trishtha)' },
      { day: 'Saturday', p1: 'Physics/Rashtraneeti (Sushma)', p2: 'Maths/Bio.', p3: 'Chemistry (Trishtha)', p4: 'English (Suvechcha)', p5: 'Phy Lab (Sushma)', p6: 'C. Sci. (Amandeep)', p7: 'Phy Edu (Monika)', p8: 'Chem Lab (Trishtha)' }
    ]
  },
  'XI D': {
    id: 'XI D',
    name: 'Class XI D',
    classTeacher: 'Mr. Pawan Km. Vishavkarma',
    coClassTeacher: 'Ms. Monika',
    stream: 'Humanities / Arts',
    rows: [
      { day: 'Monday', p1: 'History (Alpana)', p2: 'Hindi (Ramesh)', p3: 'Home Sci./Eco. (Rashmi/Pawan)', p4: 'Pol. Sci. (Ranju)', p5: 'Hindi (Ramesh)', p6: 'English/Skt. (Suvechcha/Nishtha)', p7: 'Phy. Edu. (Monika)', p8: 'Home Sci. Lab/Eco (Rashmi/Pawan)' },
      { day: 'Tuesday', p1: 'History (Alpana)', p2: 'Hindi (Ramesh)', p3: 'Home Sci./Eco.', p4: 'Pol. Sci. (Ranju)', p5: 'Hindi (Ramesh)', p6: 'English/Skt.', p7: 'Phy. Edu. (Monika)', p8: 'Home Sci. Lab/Eco' },
      { day: 'Wednesday', p1: 'History (Alpana)', p2: 'Hindi (Ramesh)', p3: 'Home Sci./Eco.', p4: 'Pol. Sci. (Ranju)', p5: 'History (Alpana)', p6: 'English/Skt.', p7: 'Phy. Edu. (Monika)', p8: 'CUET Prep/SOL (Pawan-Eco)' },
      { day: 'Thursday', p1: 'History (Alpana)', p2: 'Hindi (Ramesh)', p3: 'Home Sci./Eco.', p4: 'Pol. Sci. (Ranju)', p5: 'History (Alpana)', p6: 'English/Skt.', p7: 'Phy. Edu. (Monika)', p8: 'Library (Ajay)' },
      { day: 'Friday', p1: 'History (Alpana)', p2: 'Hindi (Ramesh)', p3: 'Home Sci./Eco.', p4: 'Pol. Sci. (Ranju)', p5: 'NEEEV (Amandeep)', p6: 'English/Skt.', p7: 'Phy. Edu. (Monika)', p8: 'Pol. Sci. (Ranju)' },
      { day: 'Saturday', p1: 'History (Alpana)', p2: 'Hindi (Ramesh)', p3: 'Home Sci./Eco.', p4: 'Pol. Sci. (Ranju)', p5: 'Sports (Prakash)', p6: 'English/Skt.', p7: 'Phy. Edu. (Monika)', p8: 'Pol. Sci. (Ranju)' }
    ]
  },
  'XII A': {
    id: 'XII A',
    name: 'Class XII A',
    classTeacher: 'Ms. Rashmi Upadhyay',
    coClassTeacher: 'Mr. Amandeep Singh',
    stream: 'Humanities / Arts',
    rows: [
      { day: 'Monday', p1: 'Hindi (Ramesh)', p2: 'Home Sci./Eco. (Rashmi/Pawan)', p3: 'English/Skt. (Suvechcha/Nishtha)', p4: 'History (Alpana)', p5: 'Sports (Prakash)', p6: 'Phy. Edu. (Monika)', p7: 'Pol. Sci. (Ranju)', p8: 'History (Alpana)' },
      { day: 'Tuesday', p1: 'Hindi (Ramesh)', p2: 'Home Sci./Eco.', p3: 'English/Skt.', p4: 'History (Alpana)', p5: 'Library (Ajay)', p6: 'Phy. Edu. (Monika)', p7: 'Pol. Sci. (Ranju)', p8: 'History (Alpana)' },
      { day: 'Wednesday', p1: 'Hindi (Ramesh)', p2: 'Home Sci./Eco.', p3: 'Spoken Eng/Skt. (Prerna/Nishtha)', p4: 'History (Alpana)', p5: 'Pol. Sci. (Ranju)', p6: 'Phy. Edu. (Monika)', p7: 'Pol. Sci. (Ranju)', p8: 'CUET Prep/SOL (Rashmi)' },
      { day: 'Thursday', p1: 'Hindi (Ramesh)', p2: 'Home Sci./Eco.', p3: 'English/Skt.', p4: 'History (Alpana)', p5: 'Pol. Sci. (Ranju)', p6: 'Phy. Edu. (Monika)', p7: 'Pol. Sci. (Ranju)', p8: 'NEEEV (Alpana)' },
      { day: 'Friday', p1: 'Hindi (Ramesh)', p2: 'Home Sci./Eco.', p3: 'English/Skt.', p4: 'History (Alpana)', p5: 'Hindi (Ramesh)', p6: 'Phy. Edu. (Monika)', p7: 'Pol. Sci. (Ranju)', p8: 'Home Sci. Lab/Eco (Rashmi/Pawan)' },
      { day: 'Saturday', p1: 'Hindi/Rashtraneeti (Ramesh)', p2: 'Home Sci./Eco.', p3: 'English/Skt.', p4: 'History (Alpana)', p5: 'Hindi (Ramesh)', p6: 'Phy. Edu. (Monika)', p7: 'Pol. Sci. (Ranju)', p8: 'Home Sci. Lab/Eco' }
    ]
  },
  'XII B': {
    id: 'XII B',
    name: 'Class XII B',
    classTeacher: 'Mr. Amandeep Singh',
    coClassTeacher: 'Ms. Vaishali',
    stream: 'Commerce',
    rows: [
      { day: 'Monday', p1: 'Hindi/Math (Ramesh/Sakshi)', p2: 'Economics (Pawan)', p3: 'IT (Amandeep)', p4: 'Acct. (Shalini)', p5: 'Library (Ajay)', p6: 'B. Std. (Shalini)', p7: 'English (Suvechcha)', p8: 'Accts (Shalini)' },
      { day: 'Tuesday', p1: 'Hindi/Math', p2: 'Economics (Pawan)', p3: 'IT (Amandeep)', p4: 'Acct. (Shalini)', p5: 'Sports (Prakash)', p6: 'B. Std. (Shalini)', p7: 'English (Suvechcha)', p8: 'Accts (Shalini)' },
      { day: 'Wednesday', p1: 'Hindi/Math', p2: 'Economics (Pawan)', p3: 'IT (Amandeep)', p4: 'Acct. (Shalini)', p5: 'B. Std. (Shalini)', p6: 'B. Std. (Shalini)', p7: 'English (Suvechcha)', p8: 'CUET Prep/SOL (Amandeep)' },
      { day: 'Thursday', p1: 'Hindi/Math', p2: 'Economics (Pawan)', p3: 'IT (Amandeep)', p4: 'Acct. (Shalini)', p5: 'B. Std. (Shalini)', p6: 'B. Std. (Shalini)', p7: 'Spoken Eng (Prerna)', p8: 'NEEEV (Pawan-Eco)' },
      { day: 'Friday', p1: 'Hindi/Math', p2: 'Economics (Pawan)', p3: 'IT (Amandeep)', p4: 'Acct. (Shalini)', p5: 'Hindi/Maths (Ramesh/Sakshi)', p6: 'B. Std. (Shalini)', p7: 'English (Suvechcha)', p8: 'Economics (Pawan)' },
      { day: 'Saturday', p1: 'Hindi/Math/Rashtraneeti (Ramesh/Sakshi)', p2: 'Economics (Pawan)', p3: 'IT (Amandeep)', p4: 'Acct. (Shalini)', p5: 'Hindi/Maths', p6: 'B. Std. (Shalini)', p7: 'English (Suvechcha)', p8: 'Economics (Pawan)' }
    ]
  },
  'XII C': {
    id: 'XII C',
    name: 'Class XII C',
    classTeacher: 'Ms. Vaishali',
    coClassTeacher: 'Ms. Rashmi Upadhyay',
    stream: 'Science (PCM / PCB)',
    rows: [
      { day: 'Monday', p1: 'Maths/Bio. (Sakshi/Vaishali)', p2: 'Chemistry (Trishtha)', p3: 'Physics (Sushma)', p4: 'Phy. Ed. (Monika)', p5: 'C.S. Lab (Amandeep)', p6: 'Sports (Prakash)', p7: 'English (Suvechcha)', p8: 'Computer Sci. (Amandeep)' },
      { day: 'Tuesday', p1: 'Maths/Bio.', p2: 'Chemistry (Trishtha)', p3: 'Physics (Sushma)', p4: 'Phy. Ed. (Monika)', p5: 'C.S. Lab (Amandeep)', p6: 'Library (Ajay)', p7: 'English (Suvechcha)', p8: 'Computer Sci. (Amandeep)' },
      { day: 'Wednesday', p1: 'Maths/Bio.', p2: 'Chemistry (Trishtha)', p3: 'Physics (Sushma)', p4: 'Phy. Ed. (Monika)', p5: 'Chem lab (Trishtha)', p6: 'Chem lab (Trishtha)', p7: 'English (Suvechcha)', p8: 'JEE/NEET Prep/SOL (Vaishali)' },
      { day: 'Thursday', p1: 'Maths/Bio.', p2: 'Chemistry (Trishtha)', p3: 'Physics (Sushma)', p4: 'Phy. Ed. (Monika)', p5: 'Phy. Lab. (Sushma)', p6: 'Phy. Lab. (Sushma)', p7: 'Spoken Eng (Prerna)', p8: 'Computer Sci. (Amandeep)' },
      { day: 'Friday', p1: 'Maths/Bio.', p2: 'Chemistry (Trishtha)', p3: 'Physics (Sushma)', p4: 'Phy. Ed. (Monika)', p5: 'Math/Bio Lab (Sakshi/Vaishali)', p6: 'NEEEV (Sushma)', p7: 'English (Suvechcha)', p8: 'Computer Sci. (Amandeep)' },
      { day: 'Saturday', p1: 'Maths/Bio./Rashtraneeti (Sakshi/Vaishali)', p2: 'Chemistry (Trishtha)', p3: 'Physics (Sushma)', p4: 'Phy. Ed. (Monika)', p5: 'Math/Bio Lab', p6: 'JEE/NEET prep (Sushma)', p7: 'English (Suvechcha)', p8: 'Computer Sci. (Amandeep)' }
    ]
  }
};

export function detectClassFromQuery(q: string): string | null {
  const clean = q.toLowerCase().replace(/[-_]/g, ' ');
  if (/(?:class\s*)?(?:12|xii)\s*c\b|12.*science|xii.*science/i.test(clean)) return 'XII C';
  if (/(?:class\s*)?(?:12|xii)\s*b\b|12.*commerce|xii.*commerce/i.test(clean)) return 'XII B';
  if (/(?:class\s*)?(?:12|xii)\s*a\b|12.*arts|12.*humanities/i.test(clean)) return 'XII A';
  if (/(?:class\s*)?(?:11|xi)\s*c\b|11.*science|xi.*science/i.test(clean)) return 'XI C';
  if (/(?:class\s*)?(?:11|xi)\s*b\b|11.*commerce|xi.*commerce/i.test(clean)) return 'XI B';
  if (/(?:class\s*)?(?:11|xi)\s*a\b/i.test(clean)) return 'XI A';
  if (/(?:class\s*)?(?:11|xi)\s*d\b/i.test(clean)) return 'XI D';
  if (/(?:class\s*)?(?:10|x)\s*a\b/i.test(clean)) return 'X A';
  if (/(?:class\s*)?(?:10|x)\s*b\b/i.test(clean)) return 'X B';
  if (/(?:class\s*)?(?:9|ix)\s*a\b/i.test(clean)) return 'IX A';
  if (/(?:class\s*)?(?:9|ix)\s*b\b/i.test(clean)) return 'IX B';
  if (/(?:class\s*)?(?:9|ix)\s*c\b/i.test(clean)) return 'IX C';
  if (/(?:class\s*)?(?:8|viii)\s*a\b/i.test(clean)) return 'VIII A';
  if (/(?:class\s*)?(?:8|viii)\s*b\b/i.test(clean)) return 'VIII B';
  if (/(?:class\s*)?(?:8|viii)\s*c\b/i.test(clean)) return 'VIII C';
  if (/(?:class\s*)?(?:7|vii)\s*a\b/i.test(clean)) return 'VII A';
  if (/(?:class\s*)?(?:7|vii)\s*b\b/i.test(clean)) return 'VII B';
  if (/(?:class\s*)?(?:7|vii)\s*c\b/i.test(clean)) return 'VII C';
  if (/(?:class\s*)?(?:6|vi)\s*a\b/i.test(clean)) return 'VI A';
  if (/(?:class\s*)?(?:6|vi)\s*b\b/i.test(clean)) return 'VI B';
  return null;
}

export function getClassTimetableMarkdown(classKey: string): string {
  const data = CLASS_TIMETABLES[classKey];
  if (!data) return `Class ${classKey} ka timetable uplabdh nahi hai.`;

  let md = `### 📅 ${data.name} — Official Time Table (Session 2026-27)\n`;
  md += `**CM SHRI SCHOOL, KARAMPURA, INDUSTRIAL AREA (ID: 1516068)**\n\n`;
  md += `- **Class Teacher:** **${data.classTeacher}**\n`;
  md += `- **Co-Class Teacher:** **${data.coClassTeacher}**\n`;
  md += `- **Stream / Category:** ${data.stream}\n`;
  md += `- **Recess (Lunch Break):** 11:00 AM – 11:20 AM (After Period IV)\n\n`;

  md += `| Day | I (8:20-9:00) | II (9:00-9:40) | III (9:40-10:20) | IV (10:20-11:00) | Recess | V (11:20-12:00) | VI (12:00-12:40) | VII (12:40-1:20) | VIII (1:20-2:00) |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- | :--- |\n`;

  data.rows.forEach(r => {
    md += `| **${r.day}** | ${r.p1} | ${r.p2} | ${r.p3} | ${r.p4} | 🥪 | ${r.p5} | ${r.p6} | ${r.p7} | ${r.p8} |\n`;
  });

  md += `\n> 💡 *Note: School assembly runs 8:00 AM - 8:20 AM. Saturday Period I includes Rashtraneeti.*`;
  return md;
}

export function getBellScheduleMarkdown(): string {
  let md = `### ⏰ Official Daily Bell Schedule & Period Timings\n`;
  md += `**CM SHRI SCHOOL, KARAMPURA, INDUSTRIAL AREA - 1516068**\n\n`;
  md += `| Period / Activity | Timings | Duration |\n`;
  md += `| :--- | :--- | :--- |\n`;
  BELL_SCHEDULE.forEach(b => {
    md += `| **${b.period}** | \`${b.time}\` | ${b.duration} |\n`;
  });
  md += `\n- **School Timings:** 8:00 AM se 2:00 PM tak.\n`;
  md += `- **Recess / Lunch Break:** 11:00 AM se 11:20 AM (20 minute ka break Period IV ke baad).\n`;
  return md;
}

export function getClassTeacherDirectoryMarkdown(): string {
  let md = `### 👨‍🏫 Official Class Teacher & Co-Class Teacher Directory (2026-27)\n`;
  md += `**CM SHRI SCHOOL, KARAMPURA, INDUSTRIAL AREA (ID: 1516068)**\n\n`;
  md += `| Class & Sec | Class Teacher | Co-Class Teacher | Stream / Stage |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  CLASS_TEACHERS.forEach(c => {
    md += `| **${c.classId}** | **${c.classTeacher}** | ${c.coClassTeacher} | ${c.focus} |\n`;
  });
  md += `\n*Aap kisi bhi specific class ka timetable dekhne ke liye puch sakte hain (jaise: "Class 10A ka timetable" ya "Class 12C Science timetable")!*`;
  return md;
}

export function queryTimetableOrFaculty(q: string): string | null {
  const lower = q.toLowerCase();

  // 1. Check if specific class is targeted
  const matchedClass = detectClassFromQuery(lower);

  // If asking about timetable or class teacher for a specific class
  if (matchedClass) {
    if (
      lower.includes('timetable') ||
      lower.includes('time table') ||
      lower.includes('period') ||
      lower.includes('routine') ||
      lower.includes('schedule')
    ) {
      return getClassTimetableMarkdown(matchedClass);
    }

    if (lower.includes('class teacher') || lower.includes('co-class') || lower.includes('incharge') || lower.includes('teacher')) {
      const data = CLASS_TIMETABLES[matchedClass];
      return `### 👨‍🏫 Class Teacher Details for ${data.name}
**CM Shri School Karampura (ID: 1516068)**

- **Class Teacher:** **${data.classTeacher}**
- **Co-Class Teacher:** **${data.coClassTeacher}**
- **Stream / Stage:** ${data.stream}

Kya aapko **${data.name}** ka daily period time table dekhna hai?`;
    }
  }

  // 2. Class Teacher directory inquiry
  if (
    lower.includes('class teacher') ||
    lower.includes('class teachers') ||
    lower.includes('co class teacher') ||
    lower.includes('incharge')
  ) {
    return getClassTeacherDirectoryMarkdown();
  }

  // 3. Bell Schedule, Timings, Recess / Lunch break
  if (
    lower.includes('recess') ||
    lower.includes('lunch') ||
    lower.includes('bell') ||
    ((lower.includes('school') || lower.includes('period')) && (lower.includes('time') || lower.includes('timing') || lower.includes('kitne baje') || lower.includes('kab lagta') || lower.includes('chutti')))
  ) {
    return getBellScheduleMarkdown();
  }

  // 4. JEE / NEET / CUET Coaching in timetable
  if (lower.includes('jee') || lower.includes('neet') || lower.includes('cuet')) {
    return `### 🎯 Competitive Exam Coaching Integrated in School Routine
**CM Shri School, Karampura (Centre of Excellence)**

School ke weekly timetable mein students ke liye specialized competitive exam coaching slots schedule hain:

1. **JEE / NEET Preparation & SOL (Class 11 & 12 Science):**
   - **Faculty:** Ms. Sushma Rani (Physics), Ms. Vaishali (Biology), Ms. Trishtha (Chemistry)
   - **Class XI C:** Wednesday Period VIII & Thursday Period VI
   - **Class XII C:** Wednesday Period VIII & Saturday Period VI
2. **CUET (Common University Entrance Test) Prep & SOL:**
   - **Class XI A (Arts):** Wednesday Period VIII (Ms. Monika)
   - **Class XI B (Commerce):** Wednesday Period VIII & Thursday Period V (Ms. Sakshi Grover)
   - **Class XI D (Arts):** Wednesday Period VIII (Mr. Pawan-Eco)
   - **Class XII A (Arts):** Wednesday Period VIII (Ms. Rashmi Upadhyay)
   - **Class XII B (Commerce):** Wednesday Period VIII (Mr. Amandeep Singh)

Yeh classes 100% free hain aur regular school hours mein conduct ki jaati hain!`;
  }

  // 5. Spanish / Foreign Language
  if (lower.includes('spanish') || lower.includes('foreign language')) {
    return `### 🇪🇸 Spanish Language Classes at CM Shri School Karampura

CM Shri School Karampura mein students ko foreign language ke roop mein **Spanish** sikhayi jaati hai:
- **Teacher:** **Ms. Vanshika**
- **Classes:** Class VI A, VI B, VII A, VII B, VII C, VIII A, VIII B, VIII C
- Students ko Spanish grammar, spoken vocabulary, aur basic conversation regular periods mein train kiya jata hai.`;
  }

  // 6. CT & AI (Artificial Intelligence & Computing)
  if (lower.includes('ct & ai') || lower.includes('computational thinking') || (lower.includes('ai') && lower.includes('class')) || lower.includes('ai smart')) {
    return `### 🤖 CT & AI (Computational Thinking & Artificial Intelligence)
**CM Shri School Karampura**

School mein modern technology curriculum **CT & AI** provide kiya jata hai:
- **Teachers:** **Mr. Rahul** & **Mr. Amandeep Singh**
- **Classes:** Middle school (Class 6 to 8) and Secondary school (Class 9 and 10) have dedicated periods in the AI computer lab.
- **Topics:** Coding fundamentals, logical problem solving, digital literacy, and AI smart board practicals.`;
  }

  // 7. General Timetable query without specific class
  if (
    lower.includes('timetable') ||
    lower.includes('time table') ||
    (lower.includes('period') && lower.includes('school')) ||
    lower.includes('schedule')
  ) {
    let md = `### 📅 Official Class Wise Time Table (Session 2026-27)\n`;
    md += `**CM SHRI SCHOOL, KARAMPURA, INDUSTRIAL AREA - 1516068**\n\n`;
    md += `School operates from **8:00 AM to 2:00 PM** with **8 periods** (40 minutes each) and **Recess at 11:00 AM – 11:20 AM**.\n\n`;
    md += `Aap jis bhi class ka poora timetable dekhna chahte hain, bas class ka naam likhein:\n`;
    md += `- **Middle School:** \`Class 6A\`, \`Class 6B\`, \`Class 7A\`, \`Class 7B\`, \`Class 7C\`, \`Class 8A\`, \`Class 8B\`, \`Class 8C\`\n`;
    md += `- **Secondary School:** \`Class 9A\`, \`Class 9B\`, \`Class 9C\`, \`Class 10A\`, \`Class 10B\`\n`;
    md += `- **Senior Secondary (11th):** \`Class 11A Arts\`, \`Class 11B Commerce\`, \`Class 11C Science\`, \`Class 11D Arts\`\n`;
    md += `- **Senior Secondary (12th):** \`Class 12A Arts\`, \`Class 12B Commerce\`, \`Class 12C Science\`\n\n`;
    md += `Aap kis class ka timetable dekhna chahenge?`;
    return md;
  }

  return null;
}
