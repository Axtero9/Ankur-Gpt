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

## 6. OFFICIAL CLASS-WISE TIME TABLE & TEACHER DIRECTORY (SESSION 2026-27)
CM SHRI SCHOOL, KARAMPURA, INDUSTRIAL AREA - 1516068

### ⏰ DAILY BELL SCHEDULE & PERIOD TIMINGS:
- School Assembly / Entry: 8:00 AM – 8:20 AM
- Period I: 8:20 am – 9:00 am (40 mins) [NIPUN Bharat / Foundation / Ind. in Society / History / English / Math]
- Period II: 9:00 am – 9:40 am (40 mins)
- Period III: 9:40 am – 10:20 am (40 mins)
- Period IV: 10:20 am – 11:00 am (40 mins)
- RECESS (Lunch Break): 11:00 am – 11:20 am (20 mins break)
- Period V: 11:20 am – 12:00 pm (40 mins)
- Period VI: 12:00 pm – 12:40 pm (40 mins)
- Period VII: 12:40 pm – 1:20 pm (40 mins)
- Period VIII: 1:20 pm – 2:00 pm (40 mins)
- School Dismissal: 2:00 PM

### 👨‍🏫 CLASS TEACHERS & CO-CLASS TEACHERS DIRECTORY:
- **Class VI A:** Class Teacher: Ms. Archana Dhaka | Co-Class Teacher: Mr. Neeraj Kumar
- **Class VI B:** Class Teacher: Mr. Neeraj Kumar | Co-Class Teacher: Ms. Archana Dhaka
- **Class VII A:** Class Teacher: Ms. Sonia | Co-Class Teacher: Ms. Nidhi Tomar
- **Class VII B:** Class Teacher: Ms. Nidhi Tomar | Co-Class Teacher: Ms. Neetu Meena
- **Class VII C:** Class Teacher: Ms. Neetu Meena | Co-Class Teacher: Ms. Sonia
- **Class VIII A:** Class Teacher: Mr. Pawan Kumar (Punjabi) | Co-Class Teacher: Ms. Manisha
- **Class VIII B:** Class Teacher: Ms. Manisha | Co-Class Teacher: Ms. Annu Rani
- **Class VIII C:** Class Teacher: Ms. Annu Rani | Co-Class Teacher: Mr. Pawan Kumar (Pb)
- **Class IX A:** Class Teacher: Ms. Reetika | Co-Class Teacher: Ms. Babita Solanki
- **Class IX B:** Class Teacher: Ms. Babita Solanki | Co-Class Teacher: Ms. Anupama Sansanwal
- **Class IX C:** Class Teacher: Ms. Anupama Sansanwal | Co-Class Teacher: Ms. Reetika
- **Class X A:** Class Teacher: Mr. Vikas Arora | Co-Class Teacher: Mr. Ravi Kumar
- **Class X B:** Class Teacher: Mr. Ravi Kumar | Co-Class Teacher: Mr. Vikas Arora
- **Class XI A (Humanities):** Class Teacher: Ms. Monika | Co-Class Teacher: Ms. Sakshi Grover
- **Class XI B (Commerce):** Class Teacher: Ms. Sakshi Grover | Co-Class Teacher: Ms. Sushma Rani
- **Class XI C (Science):** Class Teacher: Ms. Sushma Rani | Co-Class Teacher: Mr. Pawan Km. Vishavkarma
- **Class XI D (Humanities):** Class Teacher: Mr. Pawan Km. Vishavkarma | Co-Class Teacher: Ms. Monika
- **Class XII A (Humanities):** Class Teacher: Ms. Rashmi Upadhyay | Co-Class Teacher: Mr. Amandeep Singh
- **Class XII B (Commerce):** Class Teacher: Mr. Amandeep Singh | Co-Class Teacher: Ms. Vaishali
- **Class XII C (Science):** Class Teacher: Ms. Vaishali | Co-Class Teacher: Ms. Rashmi Upadhyay

### 👩‍🏫 SUBJECT FACULTY DIRECTORY:
- **Mathematics:** Ms. Reetika, Ms. Annu Rani, Mr. Neeraj Kumar, Ms. Sakshi Grover, Mr. Vijay
- **Physics:** Ms. Sushma Rani
- **Chemistry:** Ms. Trishtha
- **Biology:** Ms. Vaishali
- **General Science:** Ms. Sonia, Ms. Parul, Ms. Nidhi, Ms. Sushma Rani, Ms. Trishtha, Ms. Vaishali
- **Computer Science, CT & AI, IT:** Mr. Rahul (CT & AI), Mr. Amandeep Singh (CS / IT), Mr. Ashish (IT)
- **English:** Ms. Suvechcha, Mr. Ravi Kumar, Ms. Manisha, Ms. Meenu
- **Spoken English:** Ms. Prerna
- **Spanish (Foreign Language):** Ms. Vanshika (Taught in Classes VI, VII, VIII)
- **Hindi:** Mr. Vikas Arora, Mr. Ramesh, Ms. Babita Solanki, Ms. Anupama Sansanwal
- **Sanskrit:** Ms. Neetu Meena, Ms. Nishtha
- **Punjabi:** Mr. Pawan Kumar (Punjabi), Ms. Nishtha
- **Urdu:** Mr. Taufique
- **History:** Ms. Alpana
- **Political Science:** Ms. Ranju
- **Economics:** Mr. Pawan Km. Vishavkarma
- **Accountancy & Business Studies:** Ms. Shalini
- **Home Science:** Ms. Rashmi Upadhyay, Ms. Nidhi
- **Social Science:** Ms. Archana Dhaka, Mr. Sundeep, Mr. Narinder, Ms. Anupama Sansanwal
- **Physical Education & Sports:** Ms. Monika, Mr. Prakash
- **Art Education & Drawing:** Mr. Manoj
- **Library:** Mr. Ajay
- **Kaushal Bodh (Skill Education):** Ms. Divya, Ms. Archana, Mr. Taufique, Ms. Rashmi, Mr. Vikas
- **Health & Well-being / SOL:** Supported across all classes

### 🌟 SPECIAL CURRICULUM INITIATIVES:
1. **JEE / NEET Coaching & SOL:** Integrated directly into weekly timetable for Class XI-C and XII-C (Science) by Ms. Sushma Rani, Ms. Vaishali, and Ms. Trishtha on Wednesdays, Thursdays, and Saturdays.
2. **CUET (Common University Entrance Test) Prep:** Scheduled for Class 11 and 12 across Humanities, Commerce, and Science on Wednesdays and Thursdays.
3. **Foreign Language (Spanish):** Regular Spanish language classes by Ms. Vanshika in Class 6, 7, and 8.
4. **CT & AI (Computational Thinking & Artificial Intelligence):** Computer science lab sessions by Mr. Rahul and Mr. Amandeep.
5. **Kaushal Bodh:** Hands-on vocational/skill training.
6. **Rashtraneeti:** National policy, values, and civic duty on Saturdays Period I.
7. **NIPUN Bharat & NEEEV:** Foundational literacy, numeracy, and targeted remedial sessions.

### 📅 COMPLETE CLASS-BY-CLASS SCHEDULES:
- **Class VI A (CT: Ms. Archana Dhaka, Co-CT: Mr. Neeraj Kumar):**
  * Mon: I: Soc.Sci(Archana), II: Sports(Prakash), III: English(Ravi), IV: Maths(Reetika) | Recess (11:00-11:20) | V: Skt/Pb/Urdu(Neetu/Pawan/Taufique), VI: Science(Sonia), VII: Kaushal Bodh(Divya), VIII: Kaushal Bodh(Divya)
  * Tue: I: Soc.Sci(Archana), II: Library(Ajay), III: English(Ravi), IV: Maths(Reetika) | Recess | V: Skt/Pb/Urdu, VI: Hindi(Anupama), VII: Science(Sonia), VIII: Science(Sonia)
  * Wed: I: Soc.Sci(Archana), II: Spoken Eng(Prerna), III: English(Ravi), IV: Maths(Reetika) | Recess | V: Skt/Pb/Urdu, VI: Hindi(Anupama), VII: Science(Sonia), VIII: Health Well/SOL(Vijay)
  * Thu: I: Soc.Sci(Archana), II: Spanish(Vanshika), III: English(Ravi), IV: Maths(Reetika) | Recess | V: Home Sci(Rashmi), VI: Hindi(Anupama), VII: Kaushal Bodh(Divya), VIII: Kaushal Bodh(Divya)
  * Fri: I: Soc.Sci(Archana), II: CT&AI(Rahul), III: Spanish(Vanshika), IV: Maths(Reetika) | Recess | V: Home Sci(Rashmi), VI: Hindi(Anupama), VII: Science(Sonia), VIII: Spoken Eng(Prerna)
  * Sat: I: Soc.Sci/Rashtraneeti(Archana), II: CT&AI(Rahul), III: English(Ravi), IV: Maths(Reetika) | Recess | V: Home Sci(Rashmi), VI: Hindi(Anupama), VII: Science(Sonia), VIII: Kaushal Bodh(Divya)

- **Class VI B (CT: Mr. Neeraj Kumar, Co-CT: Ms. Archana Dhaka):**
  * Mon: I: CT&AI(Rahul), II-III: Kaushal Bodh(Archana), IV: English(Meenu) | Recess | V: Skt/Pb/Urdu(Nishtha/Pawan/Taufique), VI: Maths(Neeraj), VII: Science(Vaishali), VIII: Hindi(Vikas)
  * Tue: I: CT&AI(Rahul), II: Maths(Neeraj), III: S.S.(Archana), IV: Spoken Eng(Prerna) | Recess | V: Skt/Pb/Urdu, VI: Sports(Prakash), VII: Science(Vaishali), VIII: Hindi(Vikas)
  * Wed: I: CT&AI(Rahul), II: Maths(Neeraj), III: S.S.(Archana), IV: English(Meenu) | Recess | V: Skt/Pb/Urdu, VI: Library(Ajay), VII: Science(Vaishali), VIII: Health Well/SOL(Neeraj)
  * Thu: I: Drawing(Manoj), II: Maths(Neeraj), III: S.S.(Archana), IV: English(Meenu) | Recess | V: Spanish(Vanshika), VI: Kaushal Bodh(Archana), VII: Science(Vaishali), VIII: Hindi(Vikas)
  * Fri: I: Drawing(Manoj), II: Maths(Neeraj), III: S.S.(Archana), IV: English(Meenu) | Recess | V-VI: Kaushal Bodh(Archana), VII: Science(Vaishali), VIII: Hindi(Vikas)
  * Sat: I: Drawing/Rashtraneeti(Manoj), II: Maths(Neeraj), III: S.S.(Archana), IV: English(Meenu) | Recess | V: Spoken Eng(Prerna), VI: Spanish(Vanshika), VII: Science(Vaishali), VIII: Hindi(Vikas)

- **Class VII A (CT: Ms. Sonia, Co-CT: Ms. Nidhi Tomar):**
  * Mon: I: English(Nidhi), II: Science(Sonia), III-IV: Kaushal Bodh(Taufique) | Recess | V: English(Manisha), VI: Math(Annu), VII: S.S.(Archana), VIII: Home Sci(Nidhi)
  * Tue: I: English(Nidhi), II: Science(Sonia), III: Hindi(Babita), IV: Kaushal Bodh(Taufique) | Recess | V: English(Manisha), VI: Math(Annu), VII: S.S.(Archana), VIII: Home Sci(Nidhi)
  * Wed: I: Home Sci(Nidhi), II: Science(Sonia), III: Spanish(Vanshika), IV: Kaushal Bodh(Taufique) | Recess | V: English(Manisha), VI: Math(Annu), VII: S.S.(Archana), VIII: Health Well/SOL(Sonia)
  * Thu: I: Hindi(Anupama), II: Spoken Eng(Prerna), III: Hindi(Babita), IV: Skt/Punjabi(Nishtha/Pawan) | Recess | V: Sports(Prakash), VI: Math(Annu), VII: S.S.(Archana), VIII: Spanish(Vanshika)
  * Fri: I: Math(Annu), II: Science(Sonia), III: Hindi(Babita), IV: Skt/Punjabi(Nishtha/Pawan) | Recess | V: English(Manisha), VI: Math(Annu), VII: Library(Ajay), VIII: CT&AI(Rahul)
  * Sat: I: Math/Rashtraneeti(Annu), II: Science(Sonia), III: Hindi(Babita), IV: Skt/Punjabi(Nishtha/Pawan) | Recess | V: English(Manisha), VI: Math(Annu), VII: S.S.(Archana), VIII: Spoken Eng(Prerna)

- **Class VII B (CT: Ms. Nidhi Tomar, Co-CT: Ms. Neetu Meena):**
  * Mon: I: English(Meenu), II: Science(Nidhi), III: English(Meenu), IV: Spanish(Vanshika) | Recess | V-VI: Kaushal Bodh(Rashmi), VII: Maths(Vijay), VIII: Drawing(Manoj)
  * Tue: I: English(Meenu), II: Science(Nidhi), III: English(Meenu), IV: Drawing(Manoj) | Recess | V: Hindi(Babita), VI: Soc.Sci(Pawan-Eco), VII: Maths(Vijay), VIII: CT&AI(Rahul)
  * Wed: I: Hindi(Babita), II: Science(Nidhi), III: English(Meenu), IV: Drawing(Manoj) | Recess | V: Kaushal Bodh(Rashmi), VI: Soc.Sci(Pawan-Eco), VII: Spoken Eng(Prerna), VIII: Health Well/SOL(Nidhi)
  * Thu: I: Hindi(Babita), II: Science(Nidhi), III: Library(Ajay), IV: Skt/Punjabi(Nishtha/Pawan) | Recess | V: Hindi(Babita), VI: Soc.Sci(Pawan-Eco), VII: Maths(Vijay), VIII: Kaushal Bodh(Rashmi)
  * Fri: I: Math(Reetika), II: Science(Nidhi), III: English(Meenu), IV: Skt/Punjabi | Recess | V: Hindi(Babita), VI: Soc.Sci(Pawan-Eco), VII: Maths(Vijay), VIII: Spanish(Vanshika)
  * Sat: I: Math/Rashtraneeti(Reetika), II: Spoken Eng(Prerna), III: English(Meenu), IV: Skt/Punjabi | Recess | V: Hindi(Babita), VI: Soc.Sci(Pawan-Eco), VII: Maths(Vijay), VIII: Sports(Prakash)

- **Class VII C (CT: Ms. Neetu Meena, Co-CT: Ms. Sonia):**
  * Mon: I: English(Ravi), II: CT&AI(Rahul), III: Science(Nidhi), IV: Maths(Sakshi) | Recess | V: English(Ravi), VI: Hindi(Vikas), VII-VIII: Kaushal Bodh(Babita)
  * Tue: I: English(Ravi), II: Spanish(Vanshika), III: Spoken Eng(Prerna), IV: Maths(Sakshi) | Recess | V: English(Ravi), VI: Hindi(Vikas), VII: S.S.(Narinder), VIII: Sports(Prakash)
  * Wed: I: Math(Neeraj), II: Kaushal Bodh(Babita), III: Science(Nidhi), IV: Maths(Sakshi) | Recess | V: English(Ravi), VI: Spanish(Vanshika), VII: S.S.(Narinder), VIII: Health Well/SOL(Neetu)
  * Thu: I: Math(Neeraj), II: Skt/Urdu(Neetu/Taufique), III: Science(Nidhi), IV: Maths(Sakshi) | Recess | V: English(Ravi), VI: Spoken Eng(Prerna), VII: Kaushal Bodh(Babita), VIII: Home Sci(Nidhi)
  * Fri: I: Hindi(Vikas), II: Skt/Urdu(Neetu/Taufique), III: Science(Nidhi), IV: Maths(Sakshi) | Recess | V: English(Ravi), VI: Hindi(Vikas), VII: S.S.(Narinder), VIII: Home Sci(Nidhi)
  * Sat: I: S.S./Rashtraneeti(Narinder), II: Skt/Urdu(Neetu/Taufique), III: Science(Nidhi), IV: Maths(Sakshi) | Recess | V: Library(Ajay), VI: Hindi(Vikas), VII: S.S.(Narinder), VIII: Home Sci(Nidhi)

- **Class VIII A (CT: Mr. Pawan Kumar-Pb, Co-CT: Ms. Manisha):**
  * Mon: I: Math(Neeraj), II: Skt/Pb/Urdu(Neetu/Pawan/Taufique), III: Hindi(Anupama), IV: Science(Sushma) | Recess | V: Home Sci(Nidhi), VI: Maths(Vijay), VII-VIII: Kaushal Bodh(Pawan-Pb)
  * Tue: I: Hindi(Anupama), II: Skt/Pb/Urdu, III: Hindi(Anupama), IV: Science(Sushma) | Recess | V: Home Sci(Nidhi), VI: NEEEV(Pawan-Pb), VII: S.S.(Sundeep), VIII: English(Ravi)
  * Wed: I: Hindi(Anupama), II: Skt/Pb/Urdu, III: Kaushal Bodh(Pawan-Pb), IV: Spoken Eng/Spanish(Prerna/Vanshika) | Recess | V: Science(Sushma), VI: Maths(Vijay), VII: S.S.(Sundeep), VIII: Health Well/SOL(Pawan-Pb)
  * Thu: I: English(Ravi), II: CT&AI(Rahul), III: Sports(Prakash), IV: Science(Sushma) | Recess | V: Home Sci(Nidhi), VI: Maths(Vijay), VII: S.S.(Sundeep), VIII: English(Ravi)
  * Fri: I: English(Ravi), II: Spoken Eng/Spanish(Prerna/Vanshika), III: Hindi(Anupama), IV: Science(Sushma) | Recess | V: Hindi(Anupama), VI: Maths(Vijay), VII: S.S.(Sundeep), VIII: English(Ravi)
  * Sat: I: Maths/Rashtraneeti(Neeraj), II: Library(Ajay), III: Hindi(Anupama), IV: Science(Sushma) | Recess | V: Kaushal Bodh(Pawan-Pb), VI: Maths(Vijay), VII: S.S.(Sundeep), VIII: English(Ravi)

- **Class VIII B (CT: Ms. Manisha, Co-CT: Ms. Annu Rani):**
  * Mon: I: Math(Reetika), II: Skt/Pb/Urdu(Nishtha/Pawan/Taufique), III: English(Manisha), IV: Science(Parul) | Recess | V: S.S.(Narinder), VI: Kaushal Bodh(Anupama), VII-VIII: Spoken Eng/Spanish(Prerna/Vanshika)
  * Tue: I: Math(Reetika), II: Skt/Pb/Urdu, III: English(Manisha), IV: Science(Parul) | Recess | V: S.S.(Narinder), VI: Maths(Reetika), VII: Hindi(Vikas), VIII: Drawing(Manoj)
  * Wed: I: Hindi(Vikas), II: Skt/Pb/Urdu, III: English(Manisha), IV: Science(Parul) | Recess | V: S.S.(Narinder), VI: Maths(Reetika), VII: Hindi(Vikas), VIII: Health Well/SOL(Manisha)
  * Thu: I: NEEEV(Sonia), II-III: Kaushal Bodh(Anupama), IV: Science(Parul) | Recess | V: CT&AI(Rahul), VI: Maths(Reetika), VII: Hindi(Vikas), VIII: Drawing(Manoj)
  * Fri: I: English(Nidhi), II: Library(Ajay), III: English(Manisha), IV: Science(Parul) | Recess | V: S.S.(Narinder), VI: Maths(Reetika), VII: Hindi(Vikas), VIII: Drawing(Manoj)
  * Sat: I: English/Rashtraneeti(Nidhi), II: Sports(Prakash), III: English(Manisha), IV: Science(Parul) | Recess | V: Kaushal Bodh(Anupama), VI: Maths(Reetika), VII: Hindi(Vikas), VIII: S.S.(Narinder)

- **Class VIII C (CT: Ms. Annu Rani, Co-CT: Mr. Pawan Kumar-Pb):**
  * Mon: I: Math(Annu), II: Soc.Sci(Narinder), III: NEEEV(Annu), IV: Skt(Neetu) | Recess | V: Science(Sonia), VI: Hindi(Babita), VII: Kaushal Bodh(Narinder), VIII: English(Meenu)
  * Tue: I: Math(Annu), II: Soc.Sci(Narinder), III: Maths(Annu), IV: Skt(Neetu) | Recess | V: Science(Sonia), VI: Hindi(Babita), VII: Home Sci(Nidhi), VIII: English(Meenu)
  * Wed: I: English(Meenu), II: Soc.Sci(Narinder), III: Maths(Annu), IV: Skt(Neetu) | Recess | V: Science(Sonia), VI: Hindi(Babita), VII: Home Sci(Nidhi), VIII: Health Well/SOL(Annu)
  * Thu: I: English(Meenu), II: Soc.Sci(Narinder), III: Maths(Annu), IV: CT&AI(Rahul) | Recess | V: Kaushal Bodh(Narinder), VI: Spoken Eng/Spanish(Prerna/Vanshika), VII: Science(Sonia), VIII: English(Meenu)
  * Fri: I-II: Kaushal Bodh(Narinder), III: Maths(Annu), IV: Spoken Eng/Spanish(Prerna/Vanshika) | Recess | V: Science(Sonia), VI: Hindi(Babita), VII: Sports(Prakash), VIII: English(Meenu)
  * Sat: I: Hindi/Rashtraneeti(Babita), II: Soc.Sci(Narinder), III: Maths(Annu), IV: Library(Ajay) | Recess | V: Science(Sonia), VI: Hindi(Babita), VII: Home Sci(Nidhi), VIII: English(Meenu)

- **Class IX A (CT: Ms. Reetika, Co-CT: Ms. Babita Solanki):**
  * Mon: I: Ind. In Society(Sonia), II: Mental Math(Reetika), III: Soc.Sci(Sundeep), IV: Hindi(Vikas) | Recess | V: Science(Parul), VI: NEEEV(Pawan-Pb), VII: English(Meenu), VIII: Phy.Edu.&Well Being(Prakash)
  * Tue: I: CT&AI(Amandeep), II: Math(Reetika), III: Soc.Sci(Sundeep), IV: Library(Ajay) | Recess | V: Science(Parul), VI: Art Edu(Manoj), VII: English(Meenu), VIII: Science Lab(Parul/Ajay)
  * Wed: I: CT&AI(Amandeep), II: Math(Reetika), III: Phy.Edu(Prakash), IV: Hindi(Vikas) | Recess | V-VI: Science(Parul), VII: English(Meenu), VIII: Health Well/SOL(Reetika)
  * Thu: I: IT(Ashish), II: Math(Reetika), III: Soc.Sci(Sundeep), IV: Hindi(Vikas) | Recess | V-VI: Kaushal(Vikas/Divya), VII: English(Meenu), VIII: Skt/Pb(Nishtha/Pawan)
  * Fri: I: IT(Ashish), II: Math(Reetika), III: Soc.Sci(Sundeep), IV: Hindi(Vikas) | Recess | V: Science(Parul), VI: Kaushal(Vikas/Divya), VII: English(Meenu), VIII: Skt/Pb
  * Sat: I: IT/Rashtraneeti(Ashish), II: Math(Reetika), III: Soc.Sci(Sundeep), IV: Hindi(Vikas) | Recess | V: Science(Parul), VI: Kaushal(Vikas/Divya), VII: Math(Reetika), VIII: Skt/Pb

- **Class IX B (CT: Ms. Babita Solanki, Co-CT: Ms. Anupama Sansanwal):**
  * Mon: I: Kaushal(Vikas/Divya), II: Hindi(Babita), III: Soc.Sci(Narinder), IV: Science(Sonia) | Recess | V: Mental Maths(Annu), VI: English(Manisha), VII: IT(Ashish), VIII: Sci.Lab(Sonia/Ajay)
  * Tue: I: Kaushal(Vikas/Divya), II: Hindi(Babita), III: Soc.Sci(Narinder), IV: Science(Sonia) | Recess | V: Maths(Annu), VI: English(Manisha), VII: IT(Ashish), VIII: NEEEV(Taufique)
  * Wed: I-II: Kaushal(Vikas/Divya), III: Soc.Sci(Narinder), IV: Science(Sonia) | Recess | V: Maths(Annu), VI: Art Edu(Manoj), VII: IT(Ashish), VIII: Health Well/SOL(Babita)
  * Thu: I: CT&AI(Rahul), II: Hindi(Babita), III: Soc.Sci(Narinder), IV: Science(Sonia) | Recess | V: Maths(Annu), VI: English(Manisha), VII: Library(Ajay), VIII: Skt/Pb/Urdu(Neetu/Pawan/Taufique)
  * Fri: I: Ind. In Society(Meenu), II: Hindi(Babita), III: Phy Edu(Prakash), IV: Science(Sonia) | Recess | V: Maths(Annu), VI: English(Manisha), VII: CT&AI(Rahul), VIII: Skt/Pb/Urdu
  * Sat: I: Phy Edu/Rashtraneeti(Prakash), II: Hindi(Babita), III: Soc.Sci(Narinder), IV: Science(Sonia) | Recess | V: Maths(Annu), VI: English(Manisha), VII: Maths(Annu), VIII: Skt/Pb/Urdu

- **Class IX C (CT: Ms. Anupama Sansanwal, Co-CT: Ms. Reetika):**
  * Mon: I: IT(Ashish), II: Hindi(Anupama), III: Phy Edu(Prakash), IV: Maths(Neeraj) | Recess | V: CT&AI(Rahul), VI: Soc.Sci(Sundeep), VII: English(Ravi), VIII: Mental Math(Neeraj)
  * Tue: I: IT(Ashish), II: Hindi(Anupama), III: Science(Parul), IV: Maths(Neeraj) | Recess | V: CT&AI(Rahul), VI: Soc.Sci(Sundeep), VII: English(Ravi), VIII: Library(Ajay)
  * Wed: I: IT(Ashish), II: Hindi(Anupama), III: Science(Parul), IV: Maths(Neeraj) | Recess | V: Phy Edu(Prakash), VI: Soc.Sci(Sundeep), VII: Ind. In Society(Taufique), VIII: Health Well/SOL(Anupama)
  * Thu: I-II: Kaushal(Vikas/Divya), III: Science(Parul), IV: Maths(Neeraj) | Recess | V: Skt/Urdu(Neetu/Taufique), VI: Soc.Sci(Sundeep), VII: English(Ravi), VIII: Soc.Sci(Sundeep)
  * Fri: I: Kaushal(Vikas/Divya), II: Hindi(Anupama), III: Science(Parul), IV: Maths(Neeraj) | Recess | V: Skt/Urdu, VI: Soc.Sci(Sundeep), VII: English(Ravi), VIII: Science(Parul)
  * Sat: I: Kaushal(Vikas/Divya), II: Hindi(Anupama), III: Science(Parul), IV: Maths(Neeraj) | Recess | V: Skt/Urdu, VI: Art Edu(Manoj), VII: English(Ravi), VIII: Science Lab(Parul/Ajay)

- **Class X A (CT: Mr. Vikas Arora, Co-CT: Mr. Ravi Kumar):**
  * Mon: I-II: Science Lab(Parul/Ajay), III: IT(Ashish), IV: Eng/Spoken Eng(Manisha/Prerna) | Recess | V: Mental Math(Neeraj), VI: Library(Ajay), VII: CT&AI(Rahul), VIII: Soc.Sci(Archana)
  * Tue: I: Science(Parul), II: Hindi(Vikas), III: IT(Ashish), IV: English(Manisha) | Recess | V-VI: Maths(Neeraj), VII: CT&AI(Rahul), VIII: Soc.Sci(Archana)
  * Wed: I: Science(Parul), II: Hindi(Vikas), III: IT(Ashish), IV: English(Manisha) | Recess | V: Soc.Sci(Archana), VI: Maths(Neeraj), VII: Skt/Punjabi(Neetu/Pawan), VIII: Health Well/SOL(Vikas)
  * Thu: I: Science(Parul), II: Hindi(Vikas), III: IT(Ashish), IV: English(Manisha) | Recess | V: Maths(Neeraj), VI: Science(Parul), VII: Skt/Punjabi, VIII: Soc.Sci(Archana)
  * Fri: I: Science(Parul), II: Hindi(Vikas), III: CT&AI(Rahul), IV: English(Manisha) | Recess | V-VI: Maths(Neeraj), VII: Skt/Punjabi, VIII: Soc.Sci(Archana)
  * Sat: I: Science/Rashtraneeti(Parul), II: Hindi(Vikas), III: CT&AI(Rahul), IV: English(Manisha) | Recess | V: NEEEV(Sundeep), VI: Sports(Prakash), VII: Skt/Punjabi, VIII: Soc.Sci(Archana)

- **Class X B (CT: Mr. Ravi Kumar, Co-CT: Mr. Vikas Arora):**
  * Mon: I: Soc.Sci(Sundeep), II: English(Ravi), III: Mental Math(Vijay), IV: Maths(Vijay) | Recess | V: IT(Ashish), VI-VII: Science Lab(Trishtha/Ajay), VIII: Hindi(Anupama)
  * Tue: I: Soc.Sci(Sundeep), II: Eng/Spoken Eng(Ravi/Prerna), III: Maths(Vijay), IV: Science(Trishtha) | Recess | V: IT(Ashish), VI: NEEEV(Neetu), VII: Science(Trishtha), VIII: Hindi(Anupama)
  * Wed: I: Soc.Sci(Sundeep), II: English(Ravi), III: Maths(Vijay), IV: Science(Trishtha) | Recess | V: Library(Ajay), VI: CT&AI(Rahul), VII: Skt/Punjabi(Nishtha/Pawan), VIII: Health Well/SOL(Ravi)
  * Thu: I: Soc.Sci(Sundeep), II: English(Ravi), III: Maths(Vijay), IV: Science(Trishtha) | Recess | V: IT(Ashish), VI: CT&AI(Rahul), VII: Skt/Punjabi, VIII: Hindi(Anupama)
  * Fri: I: Soc.Sci(Sundeep), II: English(Ravi), III: Maths(Vijay), IV: Science(Trishtha) | Recess | V: Sports(Prakash), VI: CT&AI(Rahul), VII: Skt/Punjabi, VIII: Hindi(Anupama)
  * Sat: I: Soc.Sci/Rashtraneeti(Sundeep), II: English(Ravi), III: Maths(Vijay), IV: Science(Trishtha) | Recess | V: IT(Ashish), VI: CT&AI(Rahul), VII: Skt/Punjabi, VIII: Hindi(Anupama)

- **Class XI A (Humanities/Arts - CT: Ms. Monika, Co-CT: Ms. Sakshi Grover):**
  * Mon: I: Phy.Edu(Monika), II: Pol.Sci(Ranju), III: Home Sci/Eco(Rashmi/Pawan), IV: Hindi(Ramesh) | Recess | V: Pol.Sci(Ranju), VI: Eng/SKT(Suvechcha/Nishtha), VII: History(Alpana), VIII: Home Sci Lab/Eco(Rashmi/Pawan)
  * Tue: I: Phy.Edu(Monika), II: Pol.Sci(Ranju), III: Home Sci/Eco(Rashmi/Pawan), IV: Hindi(Ramesh) | Recess | V: Pol.Sci(Ranju), VI: Eng/SKT, VII: History(Alpana), VIII: Home Sci Lab/Eco
  * Wed: I: Phy.Edu(Monika), II: Pol.Sci(Ranju), III: Home Sci/Eco(Rashmi/Pawan), IV-V: Hindi(Ramesh) | Recess | VI: Eng/SKT, VII: History(Alpana), VIII: CUET Prep/SOL(Monika)
  * Thu: I: Phy.Edu(Monika), II: Pol.Sci(Ranju), III: Home Sci/Eco(Rashmi/Pawan), IV-V: Hindi(Ramesh) | Recess | VI: Eng/SKT, VII: History(Alpana), VIII: NEEEV(Monika)
  * Fri: I: Phy.Edu(Monika), II: Pol.Sci(Ranju), III: Home Sci/Eco(Rashmi/Pawan), IV: Hindi(Ramesh) | Recess | V: History(Alpana), VI: Eng/SKT, VII: History(Alpana), VIII: Sports(Prakash)
  * Sat: I: Phy.Edu/Rashtraneeti(Monika), II: Pol.Sci(Ranju), III: Home Sci/Eco(Rashmi/Pawan), IV: Hindi(Ramesh) | Recess | V: History(Alpana), VI: Eng/SKT, VII: History(Alpana), VIII: Library(Ajay)

- **Class XI B (Commerce - CT: Ms. Sakshi Grover, Co-CT: Ms. Sushma Rani):**
  * Mon: I: Acct.(Shalini), II: Hindi/Math(Ramesh/Sakshi), III: Economics(Pawan), IV: English(Suvechcha) | Recess | V: Hindi/Math, VI: IT(Ashish), VII: B.Std.(Shalini), VIII: Economics(Pawan)
  * Tue: I: Acct.(Shalini), II: Hindi/Math, III: Economics(Pawan), IV: English(Suvechcha) | Recess | V: Hindi/Math, VI: IT(Ashish), VII: B.Std.(Shalini), VIII: Economics(Pawan)
  * Wed: I: Acct.(Shalini), II: Hindi/Math, III: Economics(Pawan), IV: English(Suvechcha) | Recess | V: IT Lab(Ashish), VI: IT(Ashish), VII: B.Std.(Shalini), VIII: CUET Prep/SOL(Sakshi)
  * Thu: I: Acct.(Shalini), II: Hindi/Math, III: Economics(Pawan), IV: English(Suvechcha) | Recess | V: CUET Prep(Sakshi), VI: IT(Ashish), VII: B.Std.(Shalini), VIII: Sports(Prakash)
  * Fri: I: Acct.(Shalini), II: Hindi/Math, III: Economics(Pawan), IV: English(Suvechcha) | Recess | V: Acct.(Shalini), VI: IT(Ashish), VII: B.Std.(Shalini), VIII: Library(Ajay)
  * Sat: I: Acct./Rashtraneeti(Shalini), II: Hindi/Math, III: Economics(Pawan), IV: English(Suvechcha) | Recess | V: B.Std.(Shalini), VI: IT(Ashish), VII: B.Std.(Shalini), VIII: NEEEV(Sakshi)

- **Class XI C (Science - CT: Ms. Sushma Rani, Co-CT: Mr. Pawan Km. Vishavkarma):**
  * Mon: I: Physics(Sushma), II: Maths/Bio(Sakshi/Vaishali), III: Chemistry(Trishtha), IV: English(Suvechcha) | Recess | V: Maths/Bio lab(Sakshi/Vaishali), VI: C.Sci(Amandeep), VII: Phy Edu(Monika), VIII: Library(Ajay)
  * Tue: I: Physics(Sushma), II: Maths/Bio, III: Chemistry(Trishtha), IV: English(Suvechcha) | Recess | V: Maths/Bio lab, VI: C.Sci(Amandeep), VII: Phy Edu(Monika), VIII: NEEEV(Vaishali)
  * Wed: I: Physics(Sushma), II: Maths/Bio, III: Chemistry(Trishtha), IV: English(Suvechcha) | Recess | V: C.Sci Lab(Amandeep), VI: C.Sci(Amandeep), VII: Phy Edu(Monika), VIII: JEE/NEET Prep/SOL(Sushma)
  * Thu: I: Physics(Sushma), II: Maths/Bio, III: Chemistry(Trishtha), IV: English(Suvechcha) | Recess | V: C.Sci Lab(Amandeep), VI: JEE/NEET Prep(Vaishali), VII: Phy Edu(Monika), VIII: Sports(Prakash)
  * Fri: I: Physics(Sushma), II: Maths/Bio, III: Chemistry(Trishtha), IV: English(Suvechcha) | Recess | V: Phy Lab(Sushma), VI: C.Sci(Amandeep), VII: Phy Edu(Monika), VIII: Chem. Lab(Trishtha)
  * Sat: I: Physics/Rashtraneeti(Sushma), II: Maths/Bio, III: Chemistry(Trishtha), IV: English(Suvechcha) | Recess | V: Phy Lab(Sushma), VI: C.Sci(Amandeep), VII: Phy Edu(Monika), VIII: Chem Lab(Trishtha)

- **Class XI D (Humanities/Arts - CT: Mr. Pawan Km. Vishavkarma, Co-CT: Ms. Monika):**
  * Mon: I: History(Alpana), II: Hindi(Ramesh), III: Home Sci/Eco(Rashmi/Pawan), IV: Pol.Sci(Ranju) | Recess | V: Hindi(Ramesh), VI: English/Skt(Suvechcha/Nishtha), VII: Phy.Edu(Monika), VIII: Home Sci Lab/Eco
  * Tue: I: History(Alpana), II: Hindi(Ramesh), III: Home Sci/Eco, IV: Pol.Sci(Ranju) | Recess | V: Hindi(Ramesh), VI: English/Skt, VII: Phy.Edu(Monika), VIII: Home Sci Lab/Eco
  * Wed: I: History(Alpana), II: Hindi(Ramesh), III: Home Sci/Eco, IV: Pol.Sci(Ranju) | Recess | V: History(Alpana), VI: English/Skt, VII: Phy.Edu(Monika), VIII: CUET Prep/SOL(Pawan-Eco)
  * Thu: I: History(Alpana), II: Hindi(Ramesh), III: Home Sci/Eco, IV: Pol.Sci(Ranju) | Recess | V: History(Alpana), VI: English/Skt, VII: Phy.Edu(Monika), VIII: Library(Ajay)
  * Fri: I: History(Alpana), II: Hindi(Ramesh), III: Home Sci/Eco, IV: Pol.Sci(Ranju) | Recess | V: NEEEV(Amandeep), VI: English/Skt, VII: Phy.Edu(Monika), VIII: Pol.Sci(Ranju)
  * Sat: I: History(Alpana), II: Hindi(Ramesh), III: Home Sci/Eco, IV: Pol.Sci(Ranju) | Recess | V: Sports(Prakash), VI: English/Skt, VII: Phy.Edu(Monika), VIII: Pol.Sci(Ranju)

- **Class XII A (Humanities/Arts - CT: Ms. Rashmi Upadhyay, Co-CT: Mr. Amandeep Singh):**
  * Mon: I: Hindi(Ramesh), II: Home Sci/Eco(Rashmi/Pawan), III: English/Skt(Suvechcha/Nishtha), IV: History(Alpana) | Recess | V: Sports(Prakash), VI: Phy.Edu(Monika), VII: Pol.Sci(Ranju), VIII: History(Alpana)
  * Tue: I: Hindi(Ramesh), II: Home Sci/Eco, III: English/Skt, IV: History(Alpana) | Recess | V: Library(Ajay), VI: Phy.Edu(Monika), VII: Pol.Sci(Ranju), VIII: History(Alpana)
  * Wed: I: Hindi(Ramesh), II: Home Sci/Eco, III: Spoken Eng/Skt(Prerna/Nishtha), IV: History(Alpana) | Recess | V: Pol.Sci(Ranju), VI: Phy.Edu(Monika), VII: Pol.Sci(Ranju), VIII: CUET Prep/SOL(Rashmi)
  * Thu: I: Hindi(Ramesh), II: Home Sci/Eco, III: English/Skt, IV: History(Alpana) | Recess | V-VII: Pol.Sci(Ranju), VI: Phy.Edu(Monika), VIII: NEEEV(Alpana)
  * Fri: I: Hindi(Ramesh), II: Home Sci/Eco, III: English/Skt, IV: History(Alpana) | Recess | V: Hindi(Ramesh), VI: Phy.Edu(Monika), VII: Pol.Sci(Ranju), VIII: Home Sci Lab/Eco
  * Sat: I: Hindi/Rashtraneeti(Ramesh), II: Home Sci/Eco, III: English/Skt, IV: History(Alpana) | Recess | V: Hindi(Ramesh), VI: Phy.Edu(Monika), VII: Pol.Sci(Ranju), VIII: Home Sci Lab/Eco

- **Class XII B (Commerce - CT: Mr. Amandeep Singh, Co-CT: Ms. Vaishali):**
  * Mon: I: Hindi/Math(Ramesh/Sakshi), II: Economics(Pawan), III: IT(Amandeep), IV: Acct.(Shalini) | Recess | V: Library(Ajay), VI: B.Std.(Shalini), VII: English(Suvechcha), VIII: Accts(Shalini)
  * Tue: I: Hindi/Math, II: Economics(Pawan), III: IT(Amandeep), IV: Acct.(Shalini) | Recess | V: Sports(Prakash), VI: B.Std.(Shalini), VII: English(Suvechcha), VIII: Accts(Shalini)
  * Wed: I: Hindi/Math, II: Economics(Pawan), III: IT(Amandeep), IV: Acct.(Shalini) | Recess | V-VI: B.Std.(Shalini), VII: English(Suvechcha), VIII: CUET Prep/SOL(Amandeep)
  * Thu: I: Hindi/Math, II: Economics(Pawan), III: IT(Amandeep), IV: Acct.(Shalini) | Recess | V-VI: B.Std.(Shalini), VII: Spoken Eng(Prerna), VIII: NEEEV(Pawan-Eco)
  * Fri: I: Hindi/Math, II: Economics(Pawan), III: IT(Amandeep), IV: Acct.(Shalini) | Recess | V: Hindi/Maths, VI: B.Std.(Shalini), VII: English(Suvechcha), VIII: Economics(Pawan)
  * Sat: I: Hindi/Math/Rashtraneeti(Ramesh/Sakshi), II: Economics(Pawan), III: IT(Amandeep), IV: Acct.(Shalini) | Recess | V: Hindi/Maths, VI: B.Std.(Shalini), VII: English(Suvechcha), VIII: Economics(Pawan)

- **Class XII C (Science - CT: Ms. Vaishali, Co-CT: Ms. Rashmi Upadhyay):**
  * Mon: I: Maths/Bio(Sakshi/Vaishali), II: Chemistry(Trishtha), III: Physics(Sushma), IV: Phy.Ed(Monika) | Recess | V: C.S. Lab(Amandeep), VI: Sports(Prakash), VII: English(Suvechcha), VIII: Computer Sci(Amandeep)
  * Tue: I: Maths/Bio, II: Chemistry(Trishtha), III: Physics(Sushma), IV: Phy.Ed(Monika) | Recess | V: C.S. Lab(Amandeep), VI: Library(Ajay), VII: English(Suvechcha), VIII: Computer Sci(Amandeep)
  * Wed: I: Maths/Bio, II: Chemistry(Trishtha), III: Physics(Sushma), IV: Phy.Ed(Monika) | Recess | V-VI: Chem Lab(Trishtha), VII: English(Suvechcha), VIII: JEE/NEET Prep/SOL(Vaishali)
  * Thu: I: Maths/Bio, II: Chemistry(Trishtha), III: Physics(Sushma), IV: Phy.Ed(Monika) | Recess | V-VI: Phy. Lab(Sushma), VII: Spoken Eng(Prerna), VIII: Computer Sci(Amandeep)
  * Fri: I: Maths/Bio, II: Chemistry(Trishtha), III: Physics(Sushma), IV: Phy.Ed(Monika) | Recess | V: Math/Bio Lab(Sakshi/Vaishali), VI: NEEEV(Sushma), VII: English(Suvechcha), VIII: Computer Sci(Amandeep)
  * Sat: I: Maths/Bio/Rashtraneeti(Sakshi/Vaishali), II: Chemistry(Trishtha), III: Physics(Sushma), IV: Phy.Ed(Monika) | Recess | V: Math/Bio Lab, VI: JEE/NEET prep(Sushma), VII: English(Suvechcha), VIII: Computer Sci(Amandeep)
`;

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'gemini-flash-lite-latest',
    name: 'VidyaGPT (High Speed)',
    code: 'VidyaGPT',
    provider: 'gemini',
    description: 'Instant answers for homework, formulas, school info & revision',
    badge: 'DEFAULT',
    speed: '85 tok/s',
    contextWindow: '1M'
  },
  {
    id: 'gemini-3.5-flash',
    name: 'VidyaGPT 3.5 (Smart Tutor)',
    code: 'Vidya-3.5',
    provider: 'gemini',
    description: 'Deep conceptual explanations in Maths, Science & Humanities',
    badge: 'SMART',
    speed: '70 tok/s',
    contextWindow: '1M'
  },
  {
    id: 'gemini-pro-latest',
    name: 'VidyaGPT Pro (Curriculum & Board Prep)',
    code: 'Vidya-Pro',
    provider: 'gemini',
    description: 'Advanced step-by-step problem solver, essay writer & board exam prep',
    badge: 'PRO',
    speed: '45 tok/s',
    contextWindow: '2M'
  }
];

export const DEFAULT_SYSTEM_PROMPT = `You are VidyaGPT, an intelligent, empathetic, and comprehensive dual-purpose AI Assistant:
1. MASTER ACADEMIC TUTOR: Expert across ALL academic subjects, CBSE/NCERT curriculum, state boards, ICSE, and competitive exams (Classes 1 to 12 and beyond).
2. OFFICIAL SCHOOL GUIDE: Authoritative guide for GOVERNMENT CO-ED SENIOR SECONDARY SCHOOL, CM SHRI SCHOOL, KARAMPURA, INDUSTRIAL AREA, NEW DELHI (School ID: 1516068, CBSE Affiliation: 2766038).

=========================================
CORE DIRECTIVE 1: ACADEMIC TUTORING & EXCELLENCE (ANSWER EVERYTHING ACADEMIC)
=========================================
You teach and solve EVERYTHING academic-related across all subjects and grades:
- MATHEMATICS:
  * Arithmetic, Algebra, Polynomials, Linear & Quadratic Equations, Arithmetic Progressions (AP), Coordinate Geometry, Trigonometry, Circles, Triangles & Geometry Theorems, Surface Areas & Volumes (Mensuration), Statistics (Mean, Median, Mode), Probability, Calculus (Limits, Derivatives, Integrals), Vectors, Matrices, and Determinants.
  * Always provide step-by-step solutions: state the given data, write the applicable formula/theorem, show line-by-line calculations, and clearly highlight the final answer.
- NATURAL SCIENCES:
  * PHYSICS: Motion, Laws of Motion, Work, Energy & Power, Gravitation, Sound, Light (Reflection & Refraction, Lens/Mirror formulas), Human Eye, Electricity (Ohm's Law, series/parallel circuits), Magnetic Effects of Electric Current, Electromagnetic Induction, Thermodynamics, Waves, Modern Physics.
  * CHEMISTRY: Chemical Reactions & Balancing Equations, Acids, Bases & Salts, Metals and Non-Metals, Carbon and Its Compounds, Periodic Classification & Periodic Trends, Mole Concept & Stoichiometry, Atomic Structure (Bohr, Quantum numbers), Chemical Bonding, Organic Chemistry mechanisms, Solutions, Electrochemistry.
  * BIOLOGY: Life Processes (Photosynthesis, Nutrition, Respiration, Transportation, Excretion), Control & Coordination, Reproduction, Heredity & Evolution, Cell Biology (Plant vs Animal cells, Organelles, Mitosis/Meiosis), Human Physiology (Circulatory, Nervous, Digestive, Endocrine), Ecology, Environment & Biodiversity.
- SOCIAL SCIENCES & HUMANITIES:
  * HISTORY: Indian History (Ancient, Medieval, Modern), 1857 Revolt, Indian National Movement & Freedom Struggle (Gandhi, Non-Cooperation, Civil Disobedience, Quit India), World History (French Revolution, Russian Revolution, Nazism, World Wars).
  * GEOGRAPHY: Physical Features of India, Drainage & Rivers, Climate & Monsoons, Resources & Development, Agriculture, Minerals, Solar System, Earth's layers.
  * POLITICAL SCIENCE / CIVICS: Indian Constitution, Preamble, Fundamental Rights (Articles 14-32) & Duties, Article 21A (Right to Free Education), Democracy & Electoral Politics, Parliament, Judiciary, Federalism.
  * ECONOMICS: Micro & Macroeconomics, Sectors of Indian Economy, Money & Credit, Globalization, Law of Demand and Supply, Inflation, GDP, National Income, Budgeting.
- COMMERCE & BUSINESS:
  * Accountancy: Golden rules of debit/credit, Journal entries, Ledgers, Trial balance, Balance sheet, Depreciation, Cash Flow.
  * Business Studies: Management principles (Fayol & Taylor), Marketing mix, Financial management, Consumer protection.
- LANGUAGES & WRITING (English & Hindi):
  * Grammar & Vyakaran: Tenses, Active/Passive Voice, Direct/Indirect Speech, Parts of speech, Sandhi, Samas, Muhavare, Ras, Alankar.
  * Writing Skills: Formal letters (especially school leave applications, fee concession requests to Principal), informal letters, essays, articles, speeches, debates, precis writing.
  * Literature: Summaries, character analysis, poetic devices, themes, and chapter questions.
- COMPUTER SCIENCE & IT:
  * Python programming (syntax, variables, loops, functions, data structures: lists, tuples, dicts), SQL queries, web basics (HTML/CSS), computer networks, and cybersecurity.
- EXAM STRATEGY & BOARD PREP:
  * NCERT solutions, previous year question trends (PYQs), marking scheme tips, formula cheat sheets, revision timetables, and memory mnemonics.

=========================================
CORE DIRECTIVE 2: CM SHRI SCHOOL KARAMPURA OFFICIAL GUIDE
=========================================
You possess complete ground truth knowledge for Government Co-Ed Sr. Sec. School, CM Shri School Karampura:
- Official Name: Government Co-Ed Senior Secondary School, CM Shri School Karampura
- Directorate of Education (DoE) School ID: 1516068
- CBSE Affiliation Number: 2766038 (Recognized up to Senior Secondary level, valid through 2028)
- School Status: Selected under Delhi Government's flagship CM Shri Schools initiative (Centres of Excellence)
- Address & Location: Industrial Area, Karampura, New Delhi – 110015 (Zone 16, District West-A)
- Google Maps: https://www.google.com/maps/place/Government+Co+Ed+Sr+Secondary+School+Industrial+Area+Karam+Pura/@28.6632984,77.1416647,17z
- Contact Numbers: Office: 011-25455229 / 011-25100677 | Emergency / Helpline: +91 9818016205
- Official Email: school1516068@yahoo.com
- Leadership: Principal / Head of School: Sh. Harish Kumar / Sh. Hari Krishan (supported by ~35 qualified teachers)
- 100% FREE Education: Under Delhi Govt policy, admission, tuition, exams, labs, library, textbooks, uniforms, and mid-day meals are completely FREE of cost (₹0 fees).
- Admissions: Centralized online via https://www.edudel.nic.in for Class 6, Class 9, and Class 11.
- Class 11 & 12 Streams:
  * Science: Physics, Chemistry, Biology (Medical) or Mathematics (Non-Medical), Computer Science / Physical Education, English Core.
  * Commerce: Accountancy, Business Studies, Economics, Mathematics / Informatics Practices (IP), English Core.
  * Humanities (Arts): History, Political Science, Economics, Geography, Hindi Elective / English Core.
- Infrastructure: 9,931 sq. meter campus, 32 classrooms equipped with AI Smart interactive screens, 3 Science Labs, Computer ICT Lab, 7,969+ library books, 2,512 sq. meter open playground, Mid-Day Meal program.
- Official Class-Wise Timetable & Teacher Directory:
  * You have the full, official Class-Wise Time Table for all sections (Classes VI A to XII C).
  * Bell Timings: 8 Periods from 8:20 AM to 2:00 PM (40 mins each), with RECESS / Lunch Break from 11:00 AM to 11:20 AM (20 mins).
  * Class Teachers & Co-Class Teachers for all classes (e.g. VI A: Ms. Archana Dhaka, VI B: Mr. Neeraj Kumar, VII A: Ms. Sonia, VII B: Ms. Nidhi Tomar, VII C: Ms. Neetu Meena, VIII A: Mr. Pawan Kumar, VIII B: Ms. Manisha, VIII C: Ms. Annu Rani, IX A: Ms. Reetika, IX B: Ms. Babita Solanki, IX C: Ms. Anupama Sansanwal, X A: Mr. Vikas Arora, X B: Mr. Ravi Kumar, XI A: Ms. Monika, XI B: Ms. Sakshi Grover, XI C: Ms. Sushma Rani, XI D: Mr. Pawan Km., XII A: Ms. Rashmi Upadhyay, XII B: Mr. Amandeep Singh, XII C: Ms. Vaishali).
  * Specialized Programs in Routine: JEE/NEET Prep & SOL for XI-C & XII-C Science, CUET Prep for XI & XII, Spanish by Ms. Vanshika, CT & AI by Mr. Rahul & Mr. Amandeep, Kaushal Bodh skill training, and Rashtraneeti on Saturdays.
  * When a user asks about their timetable, periods, recess, or teachers, provide exact, authoritative, structured details.

=========================================
CONVERSATIONAL AI RULES
=========================================
1. BE RESPONSIVE & HELPFUL: Directly answer whatever the user asks. If it's an academic question, teach and explain thoroughly with examples. If it's a school question, provide accurate facts and links. If it combines both, address both smoothly.
2. LANGUAGE FLEXIBILITY:
   - If asked in Hindi or Hinglish, answer naturally, warmly, and fluently in conversational Hindi/Hinglish.
   - If asked in English, answer in polished, articulate English.
3. CLEAR FORMATTING: Use Markdown headings, bold key terms, LaTeX math expressions, bullet points, tables, and code snippets to make complex topics effortless to learn.
4. DO NOT BE RESTRICTIVE: Never refuse an academic question or claim you only answer school questions. You are a complete academic tutor and school guide.

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
          (m.content.includes('VidyaGPT // Design & Intelligence') || m.content.includes('AnkurGPT // Design & Intelligence') || m.content.includes('Manifesto') || m.content.includes('What makes VidyaGPT different') || m.content.includes('What makes AnkurGPT different'))
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
