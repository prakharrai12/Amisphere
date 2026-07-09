export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "13.0.5"
    }
    public: {
        Tables: {
            announcements: {
                Row: {
                    author_id: string | null
                    content: string
                    created_at: string
                    id: string
                    target_role: Database["public"]["Enums"]["user_role"] | null
                    title: string
                }
                Insert: {
                    author_id?: string | null
                    content: string
                    created_at?: string
                    id?: string
                    target_role?: Database["public"]["Enums"]["user_role"] | null
                    title: string
                }
                Update: {
                    author_id?: string | null
                    content?: string
                    created_at?: string
                    id?: string
                    target_role?: Database["public"]["Enums"]["user_role"] | null
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "announcements_author_id_fkey"
                        columns: ["author_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            assignments: {
                Row: {
                    attachment_url: string | null
                    created_at: string
                    description: string | null
                    due_date: string
                    faculty_id: string | null
                    id: string
                    subject_id: string | null
                    title: string
                }
                Insert: {
                    attachment_url?: string | null
                    created_at?: string
                    description?: string | null
                    due_date: string
                    faculty_id?: string | null
                    id?: string
                    subject_id?: string | null
                    title: string
                }
                Update: {
                    attachment_url?: string | null
                    created_at?: string
                    description?: string | null
                    due_date: string
                    faculty_id?: string | null
                    id?: string
                    subject_id?: string | null
                    title: string
                }
                Relationships: [
                    {
                        foreignKeyName: "assignments_faculty_id_fkey"
                        columns: ["faculty_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "assignments_subject_id_fkey"
                        columns: ["subject_id"]
                        isOneToOne: false
                        referencedRelation: "subjects"
                        referencedColumns: ["id"]
                    },
                ]
            }
            attendance: {
                Row: {
                    created_at: string
                    date: string
                    id: string
                    marked_by: string | null
                    status: string
                    student_id: string | null
                    subject_id: string | null
                }
                Insert: {
                    created_at?: string
                    date: string
                    id?: string
                    marked_by?: string | null
                    status: string
                    student_id?: string | null
                    subject_id?: string | null
                }
                Update: {
                    created_at?: string
                    date?: string
                    id?: string
                    marked_by?: string | null
                    status?: string
                    student_id?: string | null
                    subject_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "attendance_marked_by_fkey"
                        columns: ["marked_by"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "attendance_student_id_fkey"
                        columns: ["student_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "attendance_subject_id_fkey"
                        columns: ["subject_id"]
                        isOneToOne: false
                        referencedRelation: "subjects"
                        referencedColumns: ["id"]
                    },
                ]
            }
            courses: {
                Row: {
                    created_at: string
                    department_id: string | null
                    duration_years: number
                    id: string
                    name: string
                }
                Insert: {
                    created_at?: string
                    department_id?: string | null
                    duration_years?: number
                    id?: string
                    name: string
                }
                Update: {
                    created_at?: string
                    department_id?: string | null
                    duration_years?: number
                    id?: string
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "courses_department_id_fkey"
                        columns: ["department_id"]
                        isOneToOne: false
                        referencedRelation: "departments"
                        referencedColumns: ["id"]
                    },
                ]
            }
            daily_class_reports: {
                Row: {
                    created_at: string
                    date: string
                    faculty_id: string | null
                    id: string
                    remarks: string | null
                    subject_id: string | null
                    topics_covered: string
                }
                Insert: {
                    created_at?: string
                    date: string
                    faculty_id?: string | null
                    id?: string
                    remarks?: string | null
                    subject_id?: string | null
                    topics_covered: string
                }
                Update: {
                    created_at?: string
                    date?: string
                    faculty_id?: string | null
                    id?: string
                    remarks?: string | null
                    subject_id?: string | null
                    topics_covered?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "daily_class_reports_faculty_id_fkey"
                        columns: ["faculty_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "daily_class_reports_subject_id_fkey"
                        columns: ["subject_id"]
                        isOneToOne: false
                        referencedRelation: "subjects"
                        referencedColumns: ["id"]
                    },
                ]
            }
            departments: {
                Row: {
                    code: string
                    created_at: string
                    head_of_department_id: string | null
                    id: string
                    name: string
                }
                Insert: {
                    code: string
                    created_at?: string
                    head_of_department_id?: string | null
                    id?: string
                    name: string
                }
                Update: {
                    code?: string
                    created_at?: string
                    head_of_department_id?: string | null
                    id?: string
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "departments_head_of_department_id_fkey"
                        columns: ["head_of_department_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            enrollments: {
                Row: {
                    academic_year: string
                    course_id: string | null
                    created_at: string
                    current_semester: number | null
                    id: string
                    status: string | null
                    student_id: string | null
                }
                Insert: {
                    academic_year: string
                    course_id?: string | null
                    created_at?: string
                    current_semester?: number | null
                    id?: string
                    status?: string | null
                    student_id?: string | null
                }
                Update: {
                    academic_year?: string
                    course_id?: string | null
                    created_at?: string
                    current_semester?: number | null
                    id?: string
                    status?: string | null
                    student_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "enrollments_course_id_fkey"
                        columns: ["course_id"]
                        isOneToOne: false
                        referencedRelation: "courses"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "enrollments_student_id_fkey"
                        columns: ["student_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            faculty_subjects: {
                Row: {
                    academic_year: string
                    faculty_id: string | null
                    id: string
                    subject_id: string | null
                }
                Insert: {
                    academic_year: string
                    faculty_id?: string | null
                    id?: string
                    subject_id?: string | null
                }
                Update: {
                    academic_year?: string
                    faculty_id?: string | null
                    id?: string
                    subject_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "faculty_subjects_faculty_id_fkey"
                        columns: ["faculty_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "faculty_subjects_subject_id_fkey"
                        columns: ["subject_id"]
                        isOneToOne: false
                        referencedRelation: "subjects"
                        referencedColumns: ["id"]
                    },
                ]
            }
            subjects: {
                Row: {
                    code: string
                    course_id: string | null
                    created_at: string
                    credits: number
                    id: string
                    name: string
                    semester: number
                }
                Insert: {
                    code: string
                    course_id?: string | null
                    created_at?: string
                    credits?: number
                    id?: string
                    name: string
                    semester: number
                }
                Update: {
                    code?: string
                    course_id?: string | null
                    created_at?: string
                    credits?: number
                    id?: string
                    name?: string
                    semester?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "subjects_course_id_fkey"
                        columns: ["course_id"]
                        isOneToOne: false
                        referencedRelation: "courses"
                        referencedColumns: ["id"]
                    },
                ]
            }
            submissions: {
                Row: {
                    assignment_id: string | null
                    feedback: string | null
                    file_url: string | null
                    grade: number | null
                    id: string
                    student_id: string | null
                    submitted_at: string
                }
                Insert: {
                    assignment_id?: string | null
                    feedback?: string | null
                    file_url?: string | null
                    grade?: number | null
                    id?: string
                    student_id?: string | null
                    submitted_at?: string
                }
                Update: {
                    assignment_id?: string | null
                    feedback?: string | null
                    file_url?: string | null
                    grade?: number | null
                    id?: string
                    student_id?: string | null
                    submitted_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "submissions_assignment_id_fkey"
                        columns: ["assignment_id"]
                        isOneToOne: false
                        referencedRelation: "assignments"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "submissions_student_id_fkey"
                        columns: ["student_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    email: string
                    full_name: string
                    id: string
                    phone_number: string | null
                    role: Database["public"]["Enums"]["user_role"]
                    updated_at: string
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    email: string
                    full_name: string
                    id: string
                    phone_number?: string | null
                    role?: Database["public"]["Enums"]["user_role"]
                    updated_at?: string
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    email?: string
                    full_name?: string
                    id?: string
                    phone_number?: string | null
                    role?: Database["public"]["Enums"]["user_role"]
                    updated_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            user_role: "admin" | "faculty" | "student" | "staff" | "parent"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

type DatabaseSchema = Exclude<keyof Database, "__InternalSupabase">

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: DatabaseSchema },
    TableName extends PublicTableNameOrOptions extends { schema: DatabaseSchema }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: DatabaseSchema }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: DatabaseSchema },
    TableName extends PublicTableNameOrOptions extends { schema: DatabaseSchema }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: DatabaseSchema }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: DatabaseSchema },
    TableName extends PublicTableNameOrOptions extends { schema: DatabaseSchema }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: DatabaseSchema }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: DatabaseSchema },
    EnumName extends PublicEnumNameOrOptions extends { schema: DatabaseSchema }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: DatabaseSchema }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

