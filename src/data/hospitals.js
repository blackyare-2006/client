// client/src/data/hospitals.js
// Sample hospital data for design/demo purposes. Replace with real data later
// by editing this file, or by switching pages to fetch from the backend API
// (see services/api.js getClinics()).

const hospitals = [
  {
    id: 1,
    name: 'Banadir Hospital',
    district: 'Wadajir',
    address: 'Wadajir District, Mogadishu',
    phone: '+252 61 200 1001',
    founded: 1977,
    rating: 4.7,
    reviewCount: 1284,
    famousFor: 'Maternity & Newborn Care',
    description:
      "One of Mogadishu's largest public referral hospitals, Banadir Hospital has served the Banaadir region for over four decades. It is best known for its maternity ward, which delivers more newborns than any other facility in the city, and its 24-hour emergency department.",
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    ],
    bedCount: 320,
    departments: ['Maternity', 'Emergency', 'Pediatrics', 'General Surgery', 'Internal Medicine'],
    stats: { patientsPerMonth: 9400, doctorsOnStaff: 64, yearsOfService: 49 },
  },
  {
    id: 2,
    name: 'Medina Hospital',
    district: 'Hodan',
    address: 'Hodan District, Mogadishu',
    phone: '+252 61 200 1002',
    founded: 1991,
    rating: 4.6,
    reviewCount: 956,
    famousFor: 'Trauma & Surgery',
    description:
      'Medina Hospital built its reputation during difficult years as one of the few facilities able to provide consistent trauma and surgical care in the city. Today it runs a modern surgical wing alongside general and maternity services.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    ],
    bedCount: 210,
    departments: ['General Surgery', 'Trauma & Emergency', 'Maternity', 'Orthopedics'],
    stats: { patientsPerMonth: 6800, doctorsOnStaff: 41, yearsOfService: 35 },
  },
  {
    id: 3,
    name: 'SOS Mogadishu Clinic',
    district: 'Bondhere',
    address: 'Bondhere District, Mogadishu',
    phone: '+252 61 200 1003',
    founded: 2006,
    rating: 4.5,
    reviewCount: 612,
    famousFor: "Children's Health",
    description:
      'Part of a wider community health network, SOS Mogadishu Clinic focuses heavily on pediatric and family medicine, offering vaccination programs and affordable consultations for families across Bondhere.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
      'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80',
    ],
    bedCount: 80,
    departments: ['Pediatrics', 'Family Medicine', 'Vaccination', 'Nutrition'],
    stats: { patientsPerMonth: 3100, doctorsOnStaff: 18, yearsOfService: 20 },
  },
  {
    id: 4,
    name: 'Erdogan Hospital',
    district: 'Yaqshid',
    address: 'Yaqshid District, Mogadishu',
    phone: '+252 61 200 1004',
    founded: 2015,
    rating: 4.9,
    reviewCount: 1872,
    famousFor: 'Heart Surgery & Cardiology',
    description:
      'Built as a joint development project, this large modern training hospital is widely regarded as the most advanced facility in Mogadishu, with the only dedicated cardiac catheterization lab in the city and a strong cardiology and cardiac surgery program.',
    image: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    ],
    bedCount: 350,
    departments: ['Cardiology', 'Cardiac Surgery', 'Oncology', 'Neurology', 'Radiology'],
    stats: { patientsPerMonth: 11200, doctorsOnStaff: 88, yearsOfService: 11 },
    featured: true,
  },
  {
    id: 5,
    name: 'De Martino Hospital',
    district: 'Hamar Weyne',
    address: 'Hamar Weyne District, Mogadishu',
    phone: '+252 61 200 1005',
    founded: 1934,
    rating: 4.4,
    reviewCount: 743,
    famousFor: 'Oldest Hospital in the City',
    description:
      'Mogadishu\'s oldest operating hospital, De Martino has been a fixture of Hamar Weyne since the colonial era and now runs a general medicine and outpatient program for the historic city center.',
    image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    ],
    bedCount: 140,
    departments: ['General Medicine', 'Outpatient Care', 'Radiology', 'Laboratory'],
    stats: { patientsPerMonth: 4200, doctorsOnStaff: 27, yearsOfService: 92 },
  },
  {
    id: 6,
    name: 'Daru-Shifa Hospital',
    district: 'Karaan',
    address: 'Karaan District, Mogadishu',
    phone: '+252 61 200 1006',
    founded: 2009,
    rating: 4.6,
    reviewCount: 588,
    famousFor: 'Dialysis & Kidney Care',
    description:
      "Daru-Shifa runs the largest dialysis unit in Karaan and the surrounding districts, alongside a growing internal medicine department serving patients with chronic conditions.",
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
      'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80',
    ],
    bedCount: 95,
    departments: ['Nephrology', 'Dialysis', 'Internal Medicine', 'Diabetes Care'],
    stats: { patientsPerMonth: 2700, doctorsOnStaff: 22, yearsOfService: 17 },
  },
  {
    id: 7,
    name: 'Forlanini Hospital',
    district: 'Wardhiigleey',
    address: 'Wardhiigleey District, Mogadishu',
    phone: '+252 61 200 1007',
    founded: 1968,
    rating: 4.3,
    reviewCount: 401,
    famousFor: 'Tuberculosis & Respiratory Care',
    description:
      "Historically Mogadishu's center for respiratory illness treatment, Forlanini continues to run dedicated TB and chest disease programs alongside general outpatient services.",
    image: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
      'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80',
    ],
    bedCount: 110,
    departments: ['Pulmonology', 'Infectious Disease', 'General Medicine'],
    stats: { patientsPerMonth: 2300, doctorsOnStaff: 19, yearsOfService: 58 },
  },
  {
    id: 8,
    name: 'Shaafi Specialist Hospital',
    district: 'Hodan',
    address: 'Hodan District, Mogadishu',
    phone: '+252 61 200 1008',
    founded: 2012,
    rating: 4.8,
    reviewCount: 1033,
    famousFor: 'Orthopedics & Sports Injuries',
    description:
      'A private specialist hospital known for orthopedic surgery, joint replacement, and physiotherapy, Shaafi has become the go-to facility for sports injuries and post-accident rehabilitation.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
      'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=800&q=80',
    ],
    bedCount: 150,
    departments: ['Orthopedics', 'Physiotherapy', 'Sports Medicine', 'Radiology'],
    stats: { patientsPerMonth: 4900, doctorsOnStaff: 33, yearsOfService: 14 },
    featured: true,
  },
  {
    id: 9,
    name: 'Madina Maternity & Women\'s Hospital',
    district: 'Wadajir',
    address: 'Wadajir District, Mogadishu',
    phone: '+252 61 200 1009',
    founded: 2003,
    rating: 4.7,
    reviewCount: 879,
    famousFor: "Women's Health",
    description:
      "A dedicated women's hospital offering gynecology, prenatal care, and maternity services, with a strong record on safe delivery outcomes across the Wadajir district.",
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    ],
    bedCount: 130,
    departments: ['Gynecology', 'Maternity', 'Prenatal Care', 'Family Planning'],
    stats: { patientsPerMonth: 3600, doctorsOnStaff: 24, yearsOfService: 23 },
  },
  {
    id: 10,
    name: 'Hayat National Hospital',
    district: 'Abdiaziz',
    address: 'Abdiaziz District, Mogadishu',
    phone: '+252 61 200 1010',
    founded: 2017,
    rating: 4.8,
    reviewCount: 1502,
    famousFor: 'Neurology & Brain Surgery',
    description:
      "One of the newest hospitals in the capital, Hayat National runs Somalia's most advanced neurology department, including a dedicated stroke unit and neurosurgery program.",
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=800&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    ],
    bedCount: 280,
    departments: ['Neurology', 'Neurosurgery', 'Stroke Unit', 'Intensive Care'],
    stats: { patientsPerMonth: 7700, doctorsOnStaff: 56, yearsOfService: 9 },
    featured: true,
  },
  {
    id: 11,
    name: 'Al-Nur Eye Hospital',
    district: 'Karaan',
    address: 'Karaan District, Mogadishu',
    phone: '+252 61 200 1011',
    founded: 2008,
    rating: 4.6,
    reviewCount: 690,
    famousFor: 'Eye Care & Cataract Surgery',
    description:
      'Al-Nur runs free and low-cost cataract surgery camps across Banaadir and is the main referral point for eye conditions in the eastern districts of the city.',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    ],
    bedCount: 60,
    departments: ['Ophthalmology', 'Cataract Surgery', 'Optometry'],
    stats: { patientsPerMonth: 2900, doctorsOnStaff: 14, yearsOfService: 18 },
  },
  {
    id: 12,
    name: 'Hodan Dental & Oral Health Center',
    district: 'Hodan',
    address: 'Hodan District, Mogadishu',
    phone: '+252 61 200 1012',
    founded: 2014,
    rating: 4.5,
    reviewCount: 524,
    famousFor: 'Dentistry',
    description:
      "The largest dedicated dental center in the city, offering everything from routine checkups to oral surgery, with a strong focus on affordable family dental care.",
    image: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    ],
    bedCount: 40,
    departments: ['Dentistry', 'Oral Surgery', 'Orthodontics'],
    stats: { patientsPerMonth: 2100, doctorsOnStaff: 12, yearsOfService: 12 },
  },
];

export default hospitals;

export function getHospitalById(id) {
  return hospitals.find((h) => h.id === Number(id));
}

export function getFeaturedHospitals() {
  return hospitals.filter((h) => h.featured);
}

export function getHospitalsByDistrict(district) {
  if (!district) return hospitals;
  return hospitals.filter((h) => h.district.toLowerCase().includes(district.toLowerCase()));
}

export const districts = [...new Set(hospitals.map((h) => h.district))];
