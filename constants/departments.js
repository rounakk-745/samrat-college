import { Monitor, FlaskConical, Calculator } from 'lucide-react';

export const DEPARTMENTS = [
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications (BCA)',
    icon: Monitor,
    desc: "Focusing on Software Development, Cloud Computing, and AI.",
    features: [
      "State-of-the-art Mac Labs", 
      "Industry Partnerships with IBM", 
      "Hackathon Club"
    ],
    hod: "Dr. Anjali Desai"
  },
  {
    id: 'bsc',
    name: 'Bachelor of Science (BSc)',
    icon: FlaskConical,
    desc: "Specializations in Physics, Chemistry, and Mathematics with research focus.",
    features: [
      "Advanced Research Labs", 
      "Field Trips & Industrial Visits", 
      "Published Faculty"
    ],
    hod: "Dr. S.K. Patra"
  },
  {
    id: 'bcom',
    name: 'Bachelor of Commerce (BCom)',
    icon: Calculator,
    desc: "Excellence in Accounting, Finance, and Business Management.",
    features: [
      "Tally & GST Certification", 
      "Banking Simulation Lab", 
      "Entrepreneurship Cell"
    ],
    hod: "Prof. Mehta"
  }
];
