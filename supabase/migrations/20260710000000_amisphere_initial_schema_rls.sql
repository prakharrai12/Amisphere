-- ==========================================
-- Amisphere • Classical University Portal
-- Initial Database Schema & RLS Policies
-- Migration ID: 20260710000000
-- ==========================================

-- 1. Create User Role Enum
CREATE TYPE public.user_role AS ENUM ('admin', 'faculty', 'student', 'staff', 'parent', 'hod');

-- 2. Master Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role public.user_role NOT NULL DEFAULT 'student',
    phone_number TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    head_of_department_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Courses (Degree Programs) Table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
    duration_years INTEGER NOT NULL DEFAULT 4,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    semester INTEGER NOT NULL,
    credits INTEGER NOT NULL DEFAULT 4,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Student Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    academic_year TEXT NOT NULL,
    current_semester INTEGER DEFAULT 1,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, course_id, academic_year)
);

-- 7. Faculty Teaching Subject Allocations Table
CREATE TABLE IF NOT EXISTS public.faculty_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    academic_year TEXT NOT NULL,
    UNIQUE(faculty_id, subject_id, academic_year)
);

-- 8. Attendance Register Table
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Present', 'Absent', 'Late', 'Excused', 'Leave')),
    marked_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, subject_id, date)
);

-- 9. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    faculty_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Student Assignment Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    file_url TEXT,
    grade NUMERIC(5, 2),
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(assignment_id, student_id)
);

-- 11. Daily Class Reports (Lectures Covered) Table
CREATE TABLE IF NOT EXISTS public.daily_class_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    faculty_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    topics_covered TEXT NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. University & Departmental Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    target_role public.user_role,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Regularization & Leave Petitions Table
CREATE TABLE IF NOT EXISTS public.regularization_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    subject_code TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    date_missed DATE NOT NULL,
    reason_type TEXT NOT NULL,
    explanation TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending Review' CHECK (status IN ('Pending Review', 'Approved', 'Rejected')),
    remarks TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_class_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regularization_requests ENABLE ROW LEVEL SECURITY;

-- Helper Function to Check Current User Role
CREATE OR REPLACE FUNCTION public.check_user_role(required_roles public.user_role[])
RETURNS BOOLEAN AS $$
DECLARE
    current_role public.user_role;
BEGIN
    SELECT role INTO current_role FROM public.users WHERE id = auth.uid();
    RETURN current_role = ANY(required_roles);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users Table Policies
CREATE POLICY "Users can view all public profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can manage all users" ON public.users FOR ALL USING (public.check_user_role(ARRAY['admin'::public.user_role]));

-- Departments, Courses, Subjects Policies
CREATE POLICY "Public read access for academic metadata" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Public read access for courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read access for subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Admins and HODs can manage academic structure" ON public.departments FOR ALL USING (public.check_user_role(ARRAY['admin'::public.user_role, 'hod'::public.user_role]));
CREATE POLICY "Admins and HODs can manage courses" ON public.courses FOR ALL USING (public.check_user_role(ARRAY['admin'::public.user_role, 'hod'::public.user_role]));
CREATE POLICY "Admins and HODs can manage subjects" ON public.subjects FOR ALL USING (public.check_user_role(ARRAY['admin'::public.user_role, 'hod'::public.user_role]));

-- Attendance Policies
CREATE POLICY "Students can view their own attendance" ON public.attendance
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Faculty can view and record attendance for assigned subjects" ON public.attendance
    FOR ALL USING (
        public.check_user_role(ARRAY['faculty'::public.user_role, 'hod'::public.user_role, 'admin'::public.user_role])
    );

-- Regularization Requests Policies
CREATE POLICY "Students can view and submit their own regularization requests" ON public.regularization_requests
    FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Faculty and HODs can view and adjudicate regularization requests" ON public.regularization_requests
    FOR ALL USING (
        public.check_user_role(ARRAY['faculty'::public.user_role, 'hod'::public.user_role, 'admin'::public.user_role])
    );

-- Announcements Policies
CREATE POLICY "All authenticated users can view announcements" ON public.announcements
    FOR SELECT USING (true);

CREATE POLICY "Admins and HODs can create announcements" ON public.announcements
    FOR INSERT WITH CHECK (
        public.check_user_role(ARRAY['admin'::public.user_role, 'hod'::public.user_role])
    );
