export interface RegularizationRequest {
  id: string
  studentId: string
  studentName: string
  subjectCode: string
  subjectName: string
  dateMissed: string
  reasonType: 'Medical Leave' | 'University Event' | 'Sports Competition' | 'Personal Emergency'
  explanation: string
  status: 'Pending Review' | 'Approved' | 'Rejected'
  remarks?: string
  submittedAt: string
}

export interface StudentAttendanceSummary {
  subjectId: string
  subjectCode: string
  subjectName: string
  instructor: string
  totalLectures: number
  attendedLectures: number
  percentage: number
  lastUpdated: string
}

export interface FacultyRosterStudent {
  id: string
  name: string
  rollNumber: string
  rollNo?: string
  status: 'Present' | 'Absent' | 'Late' | 'Excused' | 'Leave'
  attendancePercentage?: number
  attended?: number
  total?: number
}

export const demoDepartments = [
  { id: 'dept-cs', name: 'Computer Science & Engineering', code: 'CSE', head: 'Prof. Gaurav Mishra Sir' },
  { id: 'dept-ece', name: 'Electronics & Communication', code: 'ECE', head: 'Dr. Rajesh Gupta' },
  { id: 'dept-math', name: 'Applied Mathematics & Sciences', code: 'MTH', head: 'Prof. Arvind Nambiar' },
]

export const demoCourses = [
  { id: 'course-btech-cs', name: 'B.Tech Computer Science (Volume I-VIII)', department_id: 'dept-cs', duration_years: 4, credits: 164 },
  { id: 'course-btech-ai', name: 'B.Tech Artificial Intelligence & ML', department_id: 'dept-cs', duration_years: 4, credits: 160 },
  { id: 'course-btech-ece', name: 'B.Tech Electronics & VLSI', department_id: 'dept-ece', duration_years: 4, credits: 158 },
]

export const demoSubjects = [
  { id: 'sub-ds', name: 'Data Structures & Algorithms', code: 'CS201', course_id: 'course-btech-cs', semester: 3, credits: 4, instructor: 'Prof. D.P. Singh Sir', schedule: 'Mon/Wed 09:00 AM' },
  { id: 'sub-dbms', name: 'Advanced Database Systems', code: 'CS204', course_id: 'course-btech-cs', semester: 3, credits: 4, instructor: 'Prof. Nitin Kumar Sir', schedule: 'Tue/Thu 11:00 AM' },
  { id: 'sub-os', name: 'Operating Systems & Architecture', code: 'CS205', course_id: 'course-btech-cs', semester: 3, credits: 3, instructor: 'Prof. Shalu Pal Mam', schedule: 'Mon/Fri 02:00 PM' },
  { id: 'sub-math', name: 'Discrete Numerical Mathematics', code: 'MTH201', course_id: 'course-btech-cs', semester: 3, credits: 3, instructor: 'Prof. Gaurav Mishra Sir', schedule: 'Wed/Fri 10:30 AM' },
]

export const demoWeeklyTimetable = [
  { id: 't-1', day: 'Monday', timeSlot: '09:00 - 10:30 AM', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', room: 'Hall III (North Wing)', instructor: 'Prof. D.P. Singh Sir', type: 'Lecture' },
  { id: 't-2', day: 'Monday', timeSlot: '11:00 - 01:00 PM', subjectCode: 'CS201-L', subjectName: 'Data Structures Practical', room: 'Computing Lab B', instructor: 'Prof. D.P. Singh Sir', type: 'Practical' },
  { id: 't-3', day: 'Monday', timeSlot: '02:00 - 03:30 PM', subjectCode: 'CS205', subjectName: 'Operating Systems', room: 'Lecture Room 204', instructor: 'Prof. Shalu Pal Mam', type: 'Lecture' },
  
  { id: 't-4', day: 'Tuesday', timeSlot: '09:00 - 10:30 AM', subjectCode: 'MTH201', subjectName: 'Discrete Numerical Mathematics', room: 'Hall I (Main)', instructor: 'Prof. Gaurav Mishra Sir', type: 'Lecture' },
  { id: 't-5', day: 'Tuesday', timeSlot: '11:00 - 12:30 PM', subjectCode: 'CS204', subjectName: 'Advanced Database Systems', room: 'Room 302', instructor: 'Prof. Nitin Kumar Sir', type: 'Lecture' },
  { id: 't-6', day: 'Tuesday', timeSlot: '02:00 - 04:00 PM', subjectCode: 'CS204-L', subjectName: 'Database Systems Lab', room: 'Oracle Lab 1', instructor: 'Prof. Nitin Kumar Sir', type: 'Practical' },
  
  { id: 't-7', day: 'Wednesday', timeSlot: '09:00 - 10:30 AM', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', room: 'Hall III (North Wing)', instructor: 'Prof. D.P. Singh Sir', type: 'Lecture' },
  { id: 't-8', day: 'Wednesday', timeSlot: '10:30 - 12:00 PM', subjectCode: 'MTH201', subjectName: 'Discrete Numerical Mathematics', room: 'Hall I (Main)', instructor: 'Prof. Gaurav Mishra Sir', type: 'Lecture' },
  { id: 't-9', day: 'Wednesday', timeSlot: '02:30 - 04:00 PM', subjectCode: 'CS-SEM', subjectName: 'Research Methodology Colloquium', room: 'Audit Hall A', instructor: 'Prof. Gaurav Mishra Sir', type: 'Colloquium' },

  { id: 't-10', day: 'Thursday', timeSlot: '11:00 - 12:30 PM', subjectCode: 'CS204', subjectName: 'Advanced Database Systems', room: 'Room 302', instructor: 'Prof. Nitin Kumar Sir', type: 'Lecture' },
  { id: 't-11', day: 'Thursday', timeSlot: '02:00 - 03:30 PM', subjectCode: 'CS205', subjectName: 'Operating Systems', room: 'Lecture Room 204', instructor: 'Prof. Shalu Pal Mam', type: 'Lecture' },
  
  { id: 't-12', day: 'Friday', timeSlot: '10:30 - 12:00 PM', subjectCode: 'MTH201', subjectName: 'Discrete Numerical Mathematics', room: 'Hall I (Main)', instructor: 'Prof. Gaurav Mishra Sir', type: 'Lecture' },
  { id: 't-13', day: 'Friday', timeSlot: '02:00 - 03:30 PM', subjectCode: 'CS205', subjectName: 'Operating Systems', room: 'Lecture Room 204', instructor: 'Prof. Shalu Pal Mam', type: 'Lecture' },
]

export const initialAttendanceSummary: StudentAttendanceSummary[] = [
  { subjectId: 'sub-ds', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', instructor: 'Prof. D.P. Singh Sir', totalLectures: 32, attendedLectures: 30, percentage: 93.8, lastUpdated: 'Today, 10:30 AM' },
  { subjectId: 'sub-dbms', subjectCode: 'CS204', subjectName: 'Advanced Database Systems', instructor: 'Prof. Nitin Kumar Sir', totalLectures: 28, attendedLectures: 25, percentage: 89.3, lastUpdated: 'Yesterday' },
  { subjectId: 'sub-os', subjectCode: 'CS205', subjectName: 'Operating Systems & Architecture', instructor: 'Prof. Shalu Pal Mam', totalLectures: 26, attendedLectures: 19, percentage: 73.1, lastUpdated: '2 days ago' },
  { subjectId: 'sub-math', subjectCode: 'MTH201', subjectName: 'Discrete Numerical Mathematics', instructor: 'Prof. Gaurav Mishra Sir', totalLectures: 30, attendedLectures: 28, percentage: 93.3, lastUpdated: '3 days ago' },
]

export const initialRegularizationRequests: RegularizationRequest[] = [
  {
    id: 'req-101',
    studentId: 'student-1',
    studentName: 'Prakhar Rai (Enrollment: A2040522104)',
    subjectCode: 'CS205',
    subjectName: 'Operating Systems & Architecture',
    dateMissed: '2026-07-04',
    reasonType: 'Medical Leave',
    explanation: 'Suffering from acute viral fever. Medical certificate from Campus Health Centre attached.',
    status: 'Pending Review',
    submittedAt: '2026-07-05 14:20'
  },
  {
    id: 'req-102',
    studentId: 'student-1',
    studentName: 'Prakhar Rai (Enrollment: A2040522104)',
    subjectCode: 'CS204',
    subjectName: 'Advanced Database Systems',
    dateMissed: '2026-06-28',
    reasonType: 'University Event',
    explanation: 'Represented Amity University at the National Hackathon Championship in New Delhi.',
    status: 'Approved',
    remarks: 'Verified by Dean Student Welfare office. Attendance granted.',
    submittedAt: '2026-06-29 09:15'
  },
  {
    id: 'req-103',
    studentId: 'student-2',
    studentName: 'Rishabh Gusain (Enrollment: A2040522119)',
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithms',
    dateMissed: '2026-07-03',
    reasonType: 'Sports Competition',
    explanation: 'Participated in the Inter-University Tennis Tournament finals.',
    status: 'Pending Review',
    submittedAt: '2026-07-06 11:45'
  }
]

export const initialRosterStudents: FacultyRosterStudent[] = [
  { id: 'student-1', name: 'Prakhar Rai', rollNumber: 'A2040522104', rollNo: 'A2040522104', status: 'Present', attendancePercentage: 94, attended: 30, total: 32 },
  { id: 'student-2', name: 'Rishabh Gusain', rollNumber: 'A2040522119', rollNo: 'A2040522119', status: 'Present', attendancePercentage: 91, attended: 29, total: 32 },
  { id: 'student-3', name: 'Naitik Sharma', rollNumber: 'A2040522132', rollNo: 'A2040522132', status: 'Absent', attendancePercentage: 75, attended: 24, total: 32 },
  { id: 'student-4', name: 'Mounish Kumar', rollNumber: 'A2040522145', rollNo: 'A2040522145', status: 'Present', attendancePercentage: 97, attended: 31, total: 32 },
  { id: 'student-5', name: 'Mohit Sharma', rollNumber: 'A2040522160', rollNo: 'A2040522160', status: 'Late', attendancePercentage: 84, attended: 27, total: 32 },
  { id: 'student-6', name: 'Jagdeep Singh', rollNumber: 'A2040522177', rollNo: 'A2040522177', status: 'Present', attendancePercentage: 88, attended: 28, total: 32 },
  { id: 'student-7', name: 'Vansh Tyagi', rollNumber: 'A2040522188', rollNo: 'A2040522188', status: 'Excused', attendancePercentage: 81, attended: 26, total: 32 },
]

export const demoClassRoster = initialRosterStudents

export const demoFeeLedger = {
  academicYear: '2026 - 2027 (Odd Semester III)',
  status: 'PAID & VERIFIED',
  receiptNo: 'AMZ-REC-2026-88492',
  dueDate: 'August 10, 2026',
  totalAmount: '₹1,45,000',
  breakdown: [
    { head: 'Tuition Fee (Volume III B.Tech CSE)', amount: '₹1,15,000', status: 'Settled' },
    { head: 'Academic & Laboratory Development Fee', amount: '₹18,000', status: 'Settled' },
    { head: 'Central Library & Digital Archives Fee', amount: '₹7,000', status: 'Settled' },
    { head: 'Student Welfare & Examination Fee', amount: '₹5,000', status: 'Settled' },
  ],
  transactions: [
    { date: 'July 01, 2026', ref: 'TXN-HDFC-99283401', mode: 'Net Banking', amount: '₹1,45,000', status: 'Successful' },
    { date: 'January 12, 2026', ref: 'TXN-ICICI-44182903', mode: 'Demand Draft', amount: '₹1,45,000', status: 'Archived (Sem II)' },
  ]
}

export const demoSalaryDetails = {
  facultyName: 'Prof. D.P. Singh Sir',
  designation: 'Associate Professor, Computer Science',
  employeeCode: 'EMP-AU-2018-409',
  month: 'June 2026 Disbursement',
  netSalary: '₹1,28,450',
  earnings: [
    { component: 'Basic Pay (University Scale III)', amount: '₹74,000' },
    { component: 'Academic Grade Pay (AGP)', amount: '₹16,000' },
    { component: 'Dearness Allowance (DA @ 38%)', amount: '₹34,200' },
    { component: 'House Rent Allowance (HRA @ 24%)', amount: '₹21,600' },
    { component: 'Research & Book Grant', amount: '₹4,500' },
  ],
  deductions: [
    { component: 'Provident Fund (EPF 12%)', amount: '₹10,800' },
    { component: 'Tax Deducted at Source (TDS)', amount: '₹10,250' },
    { component: 'University Group Insurance', amount: '₹800' },
  ]
}

export const demoFacultyDirectory = [
  { id: 'f-1', name: 'Prof. D.P. Singh Sir', department: 'Computer Science', designation: 'Associate Professor', email: 'dpsingh@amisphere.edu', office: 'Room 402, North Academic Block', hours: 'Mon & Wed 03:30 - 05:00 PM', phone: '+91 (011) 4567-8901' },
  { id: 'f-2', name: 'Prof. Nitin Kumar Sir', department: 'Computer Science', designation: 'Assistant Professor', email: 'nkumar@amisphere.edu', office: 'Oracle Lab 2, Tech Centre', hours: 'Tue & Thu 02:00 - 03:30 PM', phone: '+91 (011) 4567-8902' },
  { id: 'f-3', name: 'Prof. Shalu Pal Mam', department: 'Computer Science', designation: 'Senior Professor & Research Lead', email: 'spal@amisphere.edu', office: 'Room 510, R&D Wing', hours: 'Fri 11:00 - 01:00 PM', phone: '+91 (011) 4567-8903' },
  { id: 'f-4', name: 'Prof. Gaurav Mishra Sir', department: 'Computer Science', designation: 'Head of Department (HOD)', email: 'hod@amisphere.edu', office: 'HOD Secretariat, Block E', hours: 'Mon-Fri 10:00 - 11:30 AM (By Appointment)', phone: '+91 (011) 4567-8900' },
]

export const demoAnnouncements = [
  { id: 'ann-1', title: 'Proclamation regarding Mid-Semester Examinations Volume I', date: 'July 08, 2026', author: 'Office of the Controller of Examinations', body: 'All students enrolled in undergraduate and postgraduate programs are hereby directed to verify their attendance eligibility (minimum 75% required across all registered courses). Students failing to meet attendance norms must submit regularization requests to their respective Heads of Department on or before July 18, 2026.' },
  { id: 'ann-2', title: 'Central Library Hours Extension for Monsoon Semester', date: 'July 05, 2026', author: 'Chief University Librarian', body: 'The Central Library & Rare Manuscripts Archive shall remain open until 11:30 PM daily to facilitate scholarly research and project dissertations. Students must present their Amisphere RFID cards at the main turnstiles.' },
  { id: 'ann-3', title: 'Annual Amity Innovation Colloquium Registration', date: 'July 01, 2026', author: 'Dean Research & Publications', body: 'Submissions are invited for the 14th National Colloquium on Artificial Intelligence and Classical Engineering. Selected papers will be published in the University Annals.' },
]

export const demoFacultySalary = {
  slipId: 'PAY-AU-2026-06-409',
  month: 'June 2026 Disbursed',
  status: 'COMPTROLLER VERIFIED',
  netSalary: '₹1,28,450',
  totalEarnings: '₹1,50,300',
  totalDeductions: '₹21,850',
  earnings: [
    { head: 'Basic Pay (University Scale III)', amount: '₹74,000' },
    { head: 'Academic Grade Pay (AGP)', amount: '₹16,000' },
    { head: 'Dearness Allowance (DA @ 38%)', amount: '₹34,200' },
    { head: 'House Rent Allowance (HRA @ 24%)', amount: '₹21,600' },
    { head: 'Research & Book Grant', amount: '₹4,500' },
  ],
  deductions: [
    { head: 'Provident Fund (EPF 12%)', amount: '₹10,800' },
    { head: 'Tax Deducted at Source (TDS)', amount: '₹10,250' },
    { head: 'University Group Insurance Fund', amount: '₹800' },
  ]
}
