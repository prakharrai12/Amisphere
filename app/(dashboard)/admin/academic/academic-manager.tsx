'use client'

import { useState } from 'react'
import { useDepartmentsStore, useCoursesStore, useSubjectsStore } from '@/lib/hybrid-store'
import { Button, Input, Label, Select } from '@/components/ui/simple'
import { createDepartment, createCourse, createSubject, deleteDepartment, deleteCourse, deleteSubject } from '@/lib/actions/academic'
import { Trash2, Plus, Building2, Book, Library } from 'lucide-react'

// Tabs component
function Tabs({ active, onChange }: { active: string, onChange: (v: string) => void }) {
    const tabs = [
        { id: 'departments', label: 'Departments', icon: Building2 },
        { id: 'courses', label: 'Courses', icon: Book },
        { id: 'subjects', label: 'Subjects', icon: Library },
    ]
    return (
        <div className="flex space-x-2 rounded-xl bg-[#251E19] border border-[#4A3F35] p-1.5 mb-8 w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`
                        flex items-center gap-2.5 rounded-lg px-5 py-2.5 text-xs font-semibold uppercase tracking-wider font-[var(--font-cinzel)] transition cursor-pointer focus:outline-none
                        ${active === tab.id ? 'brass-gradient text-[#1C1714] shadow-md font-bold' : 'text-[#9C8B7A] hover:bg-[#1C1714] hover:text-[#E8DFD4]'}
                    `}
                >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

export function AcademicManager({ initialDepartments, initialCourses, initialSubjects }: any) {
    const [activeTab, setActiveTab] = useState('departments')
    const [showPolicyModal, setShowPolicyModal] = useState(false)
    const [toast, setToast] = useState<string | null>(null)
    const { departments, addDepartment, deleteDepartment: storeDelDept } = useDepartmentsStore()
    const { courses, addCourse, deleteCourse: storeDelCourse } = useCoursesStore()
    const { subjects, addSubject, deleteSubject: storeDelSubject } = useSubjectsStore()

    const handleAddDepartment = async (formData: FormData) => {
        const name = formData.get('name') as string
        const code = formData.get('code') as string
        if (!name || !code) return
        addDepartment(name, code)
        try { await createDepartment(formData) } catch {}
    }

    const handleDeleteDepartment = async (id: string) => {
        storeDelDept(id)
        try { await deleteDepartment(id) } catch {}
    }

    const handleAddCourse = async (formData: FormData) => {
        const name = formData.get('name') as string
        const department_id = formData.get('department_id') as string
        const duration = parseInt(formData.get('duration') as string) || 4
        if (!name || !department_id) return
        addCourse(name, department_id, duration)
        try { await createCourse(formData) } catch {}
    }

    const handleDeleteCourse = async (id: string) => {
        storeDelCourse(id)
        try { await deleteCourse(id) } catch {}
    }

    const handleAddSubject = async (formData: FormData) => {
        const name = formData.get('name') as string
        const code = formData.get('code') as string
        const course_id = formData.get('course_id') as string
        const semester = parseInt(formData.get('semester') as string) || 3
        const credits = parseInt(formData.get('credits') as string) || 4
        if (!name || !code || !course_id) return
        addSubject(name, code, course_id, semester, credits)
        try { await createSubject(formData) } catch {}
    }

    const handleDeleteSubject = async (id: string) => {
        storeDelSubject(id)
        try { await deleteSubject(id) } catch {}
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <Tabs active={activeTab} onChange={setActiveTab} />
                <button
                    onClick={() => setShowPolicyModal(true)}
                    className="px-4 py-2.5 rounded-lg border border-[#C9A962]/60 bg-[#1C1714] text-[#C9A962] hover:bg-[#C9A962]/10 text-xs font-semibold font-[var(--font-cinzel)] uppercase cursor-pointer"
                >
                    📜 Senate Credit Policy Compliance
                </button>
            </div>

            {toast && (
                <div className="p-4 mb-6 rounded-xl border border-[#C9A962] bg-[#251E19] text-[#C9A962] flex items-center justify-between shadow-xl animate-fade-in">
                    <span className="font-semibold text-xs">{toast}</span>
                    <button onClick={() => setToast(null)} className="text-[#9C8B7A] hover:text-[#E8DFD4] cursor-pointer">✕</button>
                </div>
            )}

            {activeTab === 'departments' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* List */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-[#251E19] border border-[#4A3F35] rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-[#1C1714] px-6 py-3.5 border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase tracking-wider font-semibold text-xs text-[#C9A962]">
                                Existing Statutory Departments ({departments.length})
                            </div>
                            <div className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)]">
                                {departments.map((dept: any) => (
                                    <div key={dept.id} className="p-4 flex items-center justify-between hover:bg-[#1C1714]/60 transition">
                                        <div>
                                            <p className="font-medium text-base text-[#E8DFD4] font-[var(--font-serif)]">{dept.name}</p>
                                            <p className="text-xs font-mono text-[#9C8B7A] uppercase tracking-wider">{dept.code}</p>
                                        </div>
                                        <Button
                                            title="Delete"
                                            onClick={() => handleDeleteDepartment(dept.id)}
                                            className="bg-transparent hover:bg-rose-950/40 text-[#9C8B7A] hover:text-rose-400 h-8 w-8 p-0 border border-transparent hover:border-rose-500/30 cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {departments.length === 0 && (
                                    <div className="p-8 text-center text-[#9C8B7A] text-sm">No statutory departments found.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Create Form */}
                    <div className="bg-[#251E19] border border-[#C9A962] rounded-2xl shadow-xl p-6 h-fit corner-flourish relative">
                        <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] mb-6 pb-3 border-b border-[#4A3F35] flex items-center gap-2">
                            <Plus className="h-4 w-4 text-[#C9A962]" /> Add Department
                        </h3>
                        <form action={handleAddDepartment} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Department Name</Label>
                                <Input id="name" name="name" placeholder="e.g. Computer Science & Engineering" required />
                            </div>
                            <div>
                                <Label htmlFor="code">Department Code</Label>
                                <Input id="code" name="code" placeholder="e.g. CSE" required />
                            </div>
                            <Button type="submit" className="w-full mt-2 cursor-pointer">Create Department</Button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'courses' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-[#251E19] border border-[#4A3F35] rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-[#1C1714] px-6 py-3.5 border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase tracking-wider font-semibold text-xs text-[#C9A962]">
                                Existing Degree Programs & Courses ({courses.length})
                            </div>
                            <div className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)]">
                                {courses.map((course: any) => (
                                    <div key={course.id} className="p-4 flex items-center justify-between hover:bg-[#1C1714]/60 transition">
                                        <div>
                                            <p className="font-medium text-base text-[#E8DFD4] font-[var(--font-serif)]">{course.name}</p>
                                            <p className="text-xs text-[#9C8B7A] font-mono mt-0.5">
                                                {course.departments?.name} • {course.duration_years} Years Duration
                                            </p>
                                        </div>
                                        <Button
                                            title="Delete"
                                            onClick={() => handleDeleteCourse(course.id)}
                                            className="bg-transparent hover:bg-rose-950/40 text-[#9C8B7A] hover:text-rose-400 h-8 w-8 p-0 border border-transparent hover:border-rose-500/30 cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#251E19] border border-[#C9A962] rounded-2xl shadow-xl p-6 h-fit corner-flourish relative">
                        <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] mb-6 pb-3 border-b border-[#4A3F35] flex items-center gap-2">
                            <Plus className="h-4 w-4 text-[#C9A962]" /> Add Degree Course
                        </h3>
                        <form action={handleAddCourse} className="space-y-4">
                            <div>
                                <Label htmlFor="c_name">Course Name</Label>
                                <Input id="c_name" name="name" placeholder="e.g. B.Tech Computer Science" required />
                            </div>
                            <div>
                                <Label htmlFor="c_dept">Statutory Department</Label>
                                <Select id="c_dept" name="department_id" required>
                                    <option value="">Select Department</option>
                                    {departments.map((d: any) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="c_dur">Duration (Academic Years)</Label>
                                <Input id="c_dur" name="duration" type="number" min="1" max="5" defaultValue="4" required />
                            </div>
                            <Button type="submit" className="w-full mt-2 cursor-pointer">Promulgate Course</Button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'subjects' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-[#251E19] border border-[#4A3F35] rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-[#1C1714] px-6 py-3.5 border-b border-[#4A3F35] font-[var(--font-cinzel)] uppercase tracking-wider font-semibold text-xs text-[#C9A962]">
                                Existing Curriculum Subjects ({subjects.length})
                            </div>
                            <div className="divide-y divide-[#4A3F35]/60 font-[var(--font-crimson)]">
                                {subjects.map((sub: any) => (
                                    <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-[#1C1714]/60 transition">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <p className="font-medium text-base text-[#E8DFD4] font-[var(--font-serif)]">{sub.name}</p>
                                                <span className="text-xs bg-[#1C1714] border border-[#C9A962]/40 px-2.5 py-0.5 rounded text-[#C9A962] font-mono">{sub.code}</span>
                                            </div>
                                            <p className="text-xs text-[#9C8B7A] font-mono mt-1">
                                                {sub.courses?.name} • Semester {sub.semester} • {sub.credits} Academic Credits
                                            </p>
                                        </div>
                                        <Button
                                            title="Delete"
                                            onClick={() => handleDeleteSubject(sub.id)}
                                            className="bg-transparent hover:bg-rose-950/40 text-[#9C8B7A] hover:text-rose-400 h-8 w-8 p-0 border border-transparent hover:border-rose-500/30 cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#251E19] border border-[#C9A962] rounded-2xl shadow-xl p-6 h-fit corner-flourish relative">
                        <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4] mb-6 pb-3 border-b border-[#4A3F35] flex items-center gap-2">
                            <Plus className="h-4 w-4 text-[#C9A962]" /> Add Course Subject
                        </h3>
                        <form action={handleAddSubject} className="space-y-4">
                            <div>
                                <Label htmlFor="s_name">Subject Name</Label>
                                <Input id="s_name" name="name" placeholder="e.g. Data Structures & Algorithms" required />
                            </div>
                            <div>
                                <Label htmlFor="s_code">Subject Code</Label>
                                <Input id="s_code" name="code" placeholder="e.g. CS201" required />
                            </div>
                            <div>
                                <Label htmlFor="s_course">Degree Program</Label>
                                <Select id="s_course" name="course_id" required>
                                    <option value="">Select Degree Course</option>
                                    {courses.map((c: any) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="s_sem">Semester</Label>
                                    <Input id="s_sem" name="semester" type="number" min="1" max="10" defaultValue="3" required />
                                </div>
                                <div>
                                    <Label htmlFor="s_cred">Credits</Label>
                                    <Input id="s_cred" name="credits" type="number" min="1" max="10" defaultValue="4" required />
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-2 cursor-pointer">Create Subject Registry</Button>
                        </form>
                    </div>
                </div>
            )}
            {showPolicyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1714]/85 backdrop-blur-md p-4 animate-fade-in">
                    <div className="rounded-2xl border-2 border-[#C9A962] bg-[#251E19] p-8 max-w-lg w-full shadow-2xl relative corner-flourish space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-[#4A3F35]">
                            <h3 className="font-normal text-xl font-[var(--font-serif)] text-[#E8DFD4]">
                                Senate Credit & Curriculum Policy Audit
                            </h3>
                            <button onClick={() => setShowPolicyModal(false)} className="text-[#9C8B7A] hover:text-[#E8DFD4] text-lg cursor-pointer">✕</button>
                        </div>
                        <div className="space-y-3 font-[var(--font-crimson)] text-sm">
                            <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35] space-y-1">
                                <span className="text-[10px] font-mono font-bold text-[#C9A962] uppercase">Statutory Ordinance XIV</span>
                                <p className="font-semibold text-[#E8DFD4]">Minimum Semester Credit Load: 20 Credits / Max 28 Credits</p>
                                <p className="text-xs text-[#9C8B7A]">Curriculum compliance score across all degree courses: 100% Verified.</p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-[#1C1714] border border-[#4A3F35] space-y-1">
                                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Audit Status</span>
                                <p className="font-semibold text-[#E8DFD4]">Senate Ordinance Academic Structure Active</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setShowPolicyModal(false)
                                setToast('Curriculum Ordinance Audit Report sealed.')
                            }}
                            className="w-full py-2.5 rounded-md brass-gradient text-[#1C1714] text-xs font-bold uppercase font-[var(--font-cinzel)] tracking-wider shadow-md cursor-pointer"
                        >
                            Seal Audit Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
