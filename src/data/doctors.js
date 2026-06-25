// client/src/data/doctors.js
// Sample doctor data for design/demo purposes. Replace with real doctors later
// by editing this file, or by switching pages to fetch from the backend API.

const maleAvatars = [
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?w=400&q=80',
];
const femaleAvatars = [
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
];

const doctors = [
  { id: 1, hospitalId: 4, name: 'Dr. Abdirahman Hassan Nur', specialty: 'Cardiology', subSpecialty: 'Interventional Cardiology', yearsExperience: 19, price: 25, rating: 4.9, reviews: 412, bio: 'Leads the cardiac catheterization program and has performed over 1,200 angioplasties.', days: 'Sun,Mon,Tue,Wed', start: '08:00', end: '15:00', award: 'best-heart-surgeon' },
  { id: 2, hospitalId: 4, name: 'Dr. Faduma Ali Warsame', specialty: 'Cardiology', subSpecialty: 'Pediatric Cardiology', yearsExperience: 12, price: 22, rating: 4.8, reviews: 298, bio: 'Specializes in congenital heart conditions in children and infants.', days: 'Mon,Tue,Thu', start: '09:00', end: '16:00', award: null },
  { id: 3, hospitalId: 10, name: 'Dr. Mohamed Yusuf Adan', specialty: 'Neurology', subSpecialty: 'Neurosurgery', yearsExperience: 22, price: 30, rating: 5.0, reviews: 567, bio: 'Somalia\'s most senior neurosurgeon, trained in Cairo and Istanbul, known for complex brain tumor removal.', days: 'Sun,Mon,Wed,Thu', start: '08:00', end: '14:00', award: 'best-brain-surgeon' },
  { id: 4, hospitalId: 10, name: 'Dr. Hodan Ahmed Jama', specialty: 'Neurology', subSpecialty: 'Stroke & Cerebrovascular', yearsExperience: 14, price: 24, rating: 4.8, reviews: 341, bio: 'Runs the hospital\'s dedicated stroke response unit.', days: 'Sat,Sun,Mon,Tue', start: '08:30', end: '15:30', award: null },
  { id: 5, hospitalId: 1, name: 'Dr. Ahmed Warsame Ali', specialty: 'General Medicine', subSpecialty: 'Internal Medicine', yearsExperience: 16, price: 12, rating: 4.7, reviews: 689, bio: 'Over 16 years treating chronic and acute conditions for families across Wadajir.', days: 'Mon,Tue,Wed,Thu,Sun', start: '08:00', end: '16:00', award: 'most-patients-served' },
  { id: 6, hospitalId: 1, name: 'Dr. Hodan Ali Mohamud', specialty: 'Pediatrics', subSpecialty: 'Child Healthcare', yearsExperience: 11, price: 14, rating: 4.9, reviews: 523, bio: 'Beloved pediatrician known for her gentle approach with anxious children.', days: 'Sat,Sun,Mon,Tue', start: '09:00', end: '15:00', award: 'best-pediatrician' },
  { id: 7, hospitalId: 1, name: 'Dr. Khalid Omar Hussein', specialty: 'General Surgery', subSpecialty: 'Trauma Surgery', yearsExperience: 18, price: 28, rating: 4.7, reviews: 245, bio: 'Leads emergency trauma response at Banadir Hospital.', days: 'Mon,Wed,Fri', start: '07:00', end: '15:00', award: null },
  { id: 8, hospitalId: 2, name: 'Dr. Mohamed Abdullahi Sheikh', specialty: 'General Surgery', subSpecialty: 'Trauma & Emergency', yearsExperience: 21, price: 26, rating: 4.8, reviews: 378, bio: 'One of the most experienced trauma surgeons in Mogadishu.', days: 'Sun,Mon,Tue,Wed,Thu', start: '07:00', end: '14:00', award: null },
  { id: 9, hospitalId: 2, name: 'Dr. Amina Yusuf Farah', specialty: 'Orthopedics', subSpecialty: 'Joint Replacement', yearsExperience: 13, price: 20, rating: 4.6, reviews: 201, bio: 'Specializes in hip and knee replacement surgery.', days: 'Mon,Tue,Thu', start: '08:00', end: '14:00', award: null },
  { id: 10, hospitalId: 2, name: 'Dr. Yusuf Ibrahim Nur', specialty: 'Maternity', subSpecialty: 'Obstetrics', yearsExperience: 17, price: 18, rating: 4.7, reviews: 412, bio: 'Has delivered over 4,000 babies safely across two decades of practice.', days: 'Sat,Sun,Mon,Wed', start: '08:00', end: '16:00', award: null },
  { id: 11, hospitalId: 3, name: 'Dr. Fartun Abdi Roble', specialty: 'Pediatrics', subSpecialty: 'Vaccination & Immunology', yearsExperience: 9, price: 10, rating: 4.8, reviews: 287, bio: 'Runs the clinic\'s child vaccination program, reaching hundreds of families monthly.', days: 'Mon,Tue,Wed', start: '09:00', end: '15:00', award: null },
  { id: 12, hospitalId: 3, name: 'Dr. Said Mohamed Elmi', specialty: 'Family Medicine', subSpecialty: 'General Practice', yearsExperience: 8, price: 8, rating: 4.5, reviews: 156, bio: 'A trusted family doctor known for taking time with every patient.', days: 'Sun,Mon,Tue,Thu', start: '08:30', end: '14:30', award: null },
  { id: 13, hospitalId: 5, name: 'Dr. Abdulkadir Hassan Warsame', specialty: 'General Medicine', subSpecialty: 'Outpatient Care', yearsExperience: 25, price: 11, rating: 4.6, reviews: 334, bio: 'A senior physician who has practiced at De Martino for over two decades.', days: 'Mon,Tue,Wed,Thu', start: '08:00', end: '15:00', award: null },
  { id: 14, hospitalId: 5, name: 'Dr. Halima Nur Abdi', specialty: 'Radiology', subSpecialty: 'Diagnostic Imaging', yearsExperience: 10, price: 15, rating: 4.5, reviews: 98, bio: 'Specializes in ultrasound and X-ray diagnostics.', days: 'Sun,Mon,Wed', start: '08:00', end: '14:00', award: null },
  { id: 15, hospitalId: 6, name: 'Dr. Omar Said Aden', specialty: 'Nephrology', subSpecialty: 'Kidney Care & Dialysis', yearsExperience: 15, price: 22, rating: 4.7, reviews: 187, bio: 'Oversees the largest dialysis unit serving Karaan district.', days: 'Sat,Sun,Mon,Tue,Wed', start: '08:00', end: '16:00', award: null },
  { id: 16, hospitalId: 6, name: 'Dr. Zahra Mohamed Hirsi', specialty: 'Internal Medicine', subSpecialty: 'Diabetes Care', yearsExperience: 12, price: 16, rating: 4.6, reviews: 211, bio: 'Helps patients manage diabetes and related chronic conditions.', days: 'Mon,Tue,Thu', start: '09:00', end: '15:00', award: null },
  { id: 17, hospitalId: 7, name: 'Dr. Ibrahim Aden Mire', specialty: 'Pulmonology', subSpecialty: 'Respiratory & TB Care', yearsExperience: 20, price: 18, rating: 4.4, reviews: 145, bio: 'Has led the hospital\'s tuberculosis treatment program for almost two decades.', days: 'Sun,Mon,Tue', start: '08:00', end: '14:00', award: null },
  { id: 18, hospitalId: 8, name: 'Dr. Sahra Abdullahi Warsame', specialty: 'Orthopedics', subSpecialty: 'Sports Medicine', yearsExperience: 11, price: 24, rating: 4.9, reviews: 356, bio: 'The go-to doctor for athletes recovering from sports injuries in Mogadishu.', days: 'Mon,Wed,Thu,Sat', start: '09:00', end: '17:00', award: 'best-orthopedic-surgeon' },
  { id: 19, hospitalId: 8, name: 'Dr. Jamal Hassan Diriye', specialty: 'Physiotherapy', subSpecialty: 'Rehabilitation', yearsExperience: 9, price: 12, rating: 4.6, reviews: 178, bio: 'Designs recovery programs for post-surgery and accident patients.', days: 'Sun,Mon,Tue,Wed', start: '08:00', end: '16:00', award: null },
  { id: 20, hospitalId: 9, name: 'Dr. Asha Mohamed Ismail', specialty: 'Gynecology', subSpecialty: "Women's Health", yearsExperience: 18, price: 20, rating: 4.9, reviews: 467, bio: 'Widely regarded as one of the most trusted gynecologists in the city.', days: 'Sat,Sun,Mon,Tue,Wed', start: '08:00', end: '16:00', award: 'best-womens-health-doctor' },
  { id: 21, hospitalId: 9, name: 'Dr. Najma Ali Gedi', specialty: 'Maternity', subSpecialty: 'Prenatal Care', yearsExperience: 10, price: 16, rating: 4.7, reviews: 233, bio: 'Focuses on prenatal monitoring and safe delivery planning.', days: 'Mon,Tue,Thu,Sun', start: '08:30', end: '15:30', award: null },
  { id: 22, hospitalId: 10, name: 'Dr. Cabdullahi Nuur Farah', specialty: 'Neurology', subSpecialty: 'Epilepsy & Seizure Disorders', yearsExperience: 13, price: 21, rating: 4.6, reviews: 134, bio: 'Treats epilepsy and movement disorders using modern diagnostic tools.', days: 'Tue,Wed,Thu', start: '09:00', end: '15:00', award: null },
  { id: 23, hospitalId: 10, name: 'Dr. Maryan Said Nur', specialty: 'Intensive Care', subSpecialty: 'Critical Care Medicine', yearsExperience: 16, price: 28, rating: 4.8, reviews: 189, bio: 'Heads the ICU team handling the hospital\'s most critical cases.', days: 'Sun,Mon,Wed,Fri', start: '07:00', end: '19:00', award: 'top-critical-care-doctor' },
  { id: 24, hospitalId: 11, name: 'Dr. Cali Xasan Yare', specialty: 'Ophthalmology', subSpecialty: 'Cataract Surgery', yearsExperience: 14, price: 15, rating: 4.7, reviews: 298, bio: 'Has performed over 3,000 cataract surgeries, many through free community camps.', days: 'Mon,Tue,Wed,Thu', start: '08:00', end: '14:00', award: 'most-surgeries-performed' },
  { id: 25, hospitalId: 11, name: 'Dr. Ifrah Mohamed Du\'ale', specialty: 'Optometry', subSpecialty: 'Vision Care', yearsExperience: 7, price: 9, rating: 4.5, reviews: 112, bio: 'Provides eye exams and vision correction for patients of all ages.', days: 'Sat,Sun,Mon', start: '09:00', end: '15:00', award: null },
  { id: 26, hospitalId: 12, name: 'Dr. Bashir Ahmed Roble', specialty: 'Dentistry', subSpecialty: 'General & Family Dentistry', yearsExperience: 12, price: 10, rating: 4.6, reviews: 401, bio: 'Friendly, patient-first dentist popular with families in Hodan.', days: 'Sun,Mon,Wed,Thu', start: '08:30', end: '14:30', award: null },
  { id: 27, hospitalId: 12, name: 'Dr. Sumaya Hassan Olow', specialty: 'Orthodontics', subSpecialty: 'Braces & Alignment', yearsExperience: 8, price: 14, rating: 4.7, reviews: 167, bio: 'Specializes in braces and bite correction for teens and adults.', days: 'Mon,Tue,Thu', start: '09:00', end: '15:00', award: null },
  { id: 28, hospitalId: 4, name: 'Dr. Warsame Cabdi Maxamed', specialty: 'Oncology', subSpecialty: 'Cancer Treatment', yearsExperience: 17, price: 26, rating: 4.8, reviews: 256, bio: 'Leads the oncology unit, one of the few in the country offering chemotherapy.', days: 'Mon,Tue,Wed', start: '08:00', end: '14:00', award: null },
  { id: 29, hospitalId: 1, name: 'Dr. Hibo Aden Warsame', specialty: 'Maternity', subSpecialty: 'High-Risk Pregnancy', yearsExperience: 20, price: 19, rating: 4.9, reviews: 612, bio: 'Has managed thousands of high-risk pregnancies with an excellent safety record.', days: 'Sat,Sun,Mon,Tue,Wed', start: '07:30', end: '15:30', award: 'most-deliveries-performed' },
  { id: 30, hospitalId: 6, name: 'Dr. Cabdiraxman Salaad Nuur', specialty: 'Internal Medicine', subSpecialty: 'General Internal Medicine', yearsExperience: 10, price: 13, rating: 4.5, reviews: 143, bio: 'Treats a wide range of adult illnesses with a focus on preventive care.', days: 'Sun,Mon,Tue', start: '08:00', end: '14:00', award: null },
  { id: 31, hospitalId: 2, name: 'Dr. Filsan Maxamed Cali', specialty: 'Pediatrics', subSpecialty: 'Neonatal Care', yearsExperience: 9, price: 13, rating: 4.7, reviews: 198, bio: 'Cares for newborns in the hospital\'s neonatal unit.', days: 'Mon,Wed,Fri,Sun', start: '08:00', end: '16:00', award: null },
  { id: 32, hospitalId: 8, name: 'Dr. Cabdullahi Xuseen Maxamuud', specialty: 'Radiology', subSpecialty: 'MRI & CT Imaging', yearsExperience: 11, price: 17, rating: 4.6, reviews: 122, bio: 'Operates the hospital\'s MRI and CT scanning department.', days: 'Tue,Wed,Thu', start: '09:00', end: '15:00', award: null },
];

export default doctors;

export function getDoctorById(id) {
  return doctors.find((d) => d.id === Number(id));
}

export function getDoctorsByHospital(hospitalId) {
  return doctors.filter((d) => d.hospitalId === Number(hospitalId));
}

export function getDoctorsBySpecialty(specialty) {
  if (!specialty) return doctors;
  return doctors.filter((d) => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
}

export function getAvatarForIndex(i) {
  const pool = i % 3 === 0 ? femaleAvatars : maleAvatars;
  return pool[i % pool.length];
}

export const specialties = [...new Set(doctors.map((d) => d.specialty))].sort();

export const awardDefinitions = {
  'best-heart-surgeon': { title: 'Best Heart Surgeon', icon: 'heart' },
  'best-brain-surgeon': { title: 'Best Brain Surgeon', icon: 'brain' },
  'most-patients-served': { title: 'Most Patients Served', icon: 'users' },
  'best-pediatrician': { title: 'Best Pediatrician of the Year', icon: 'baby' },
  'best-orthopedic-surgeon': { title: 'Best Orthopedic Surgeon', icon: 'bone' },
  'best-womens-health-doctor': { title: "Excellence in Women's Health", icon: 'heart-pulse' },
  'top-critical-care-doctor': { title: 'Top Critical Care Doctor', icon: 'activity' },
  'most-surgeries-performed': { title: 'Most Surgeries Performed', icon: 'scissors' },
  'most-deliveries-performed': { title: 'Most Safe Deliveries', icon: 'baby' },
};

export function getAwardedDoctors() {
  return doctors.filter((d) => d.award);
}
