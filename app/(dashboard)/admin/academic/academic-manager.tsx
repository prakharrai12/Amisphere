'use client'

import { useState } from 'react'
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
        <div className="flex space-x-1 rounded-xl bg-gray-200/50 p-1 mb-6 w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`
                        flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                        ${active === tab.id ? 'bg-white shadow text-blue-700' : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'}
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

    return (
        <div>
            <Tabs active={activeTab} onChange={setActiveTab} />

            {activeTab === 'departments' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* List */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 font-medium text-sm text-gray-500">
                                Existing Departments
                            </div>
                            <div className="divide-y divide-gray-100">
                                {initialDepartments.map((dept: any) => (
                                    <div key={dept.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                                        <div>
                                            <p className="font-medium text-gray-900">{dept.name}</p>
                                            <p className="text-sm text-gray-500">{dept.code}</p>
                                        </div>
                                        <form action={() => deleteDepartment(dept.id)}>
                                            <Button title="Delete" className="bg-transparent hover:bg-red-50 text-gray-400 hover:text-red-500 h-8 w-8 p-0">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                ))}
                                {initialDepartments.length === 0 && (
                                    <div className="p-8 text-center text-gray-400">No departments found.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Create Form */}
                    <div className="bg-white border rounded-xl shadow-sm p-6 h-fit">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Department
                        </h3>
                        <form action={async (formData) => {
                            await createDepartment(formData)
                            // Optionally reset form here
                        }} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Department Name</Label>
                                <Input id="name" name="name" placeholder="e.g. Computer Science" required />
                            </div>
                            <div>
                                <Label htmlFor="code">Code</Label>
                                <Input id="code" name="code" placeholder="e.g. CSE" required />
                            </div>
                            <Button type="submit" className="w-full">Create Department</Button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'courses' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 font-medium text-sm text-gray-500">
                                Existing Courses
                            </div>
                            <div className="divide-y divide-gray-100">
                                {initialCourses.map((course: any) => (
                                    <div key={course.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                                        <div>
                                            <p className="font-medium text-gray-900">{course.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {course.departments?.name} • {course.duration_years} Years
                                            </p>
                                        </div>
                                        <form action={() => deleteCourse(course.id)}>
                                            <Button title="Delete" className="bg-transparent hover:bg-red-50 text-gray-400 hover:text-red-500 h-8 w-8 p-0">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl shadow-sm p-6 h-fit">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Course
                        </h3>
                        <form action={createCourse} className="space-y-4">
                            <div>
                                <Label htmlFor="c_name">Course Name</Label>
                                <Input id="c_name" name="name" placeholder="e.g. B.Tech CSE" required />
                            </div>
                            <div>
                                <Label htmlFor="c_dept">Department</Label>
                                <Select id="c_dept" name="department_id" required>
                                    <option value="">Select Department</option>
                                    {initialDepartments.map((d: any) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="c_dur">Duration (Years)</Label>
                                <Input id="c_dur" name="duration" type="number" min="1" max="5" defaultValue="4" required />
                            </div>
                            <Button type="submit" className="w-full">Create Course</Button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'subjects' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 font-medium text-sm text-gray-500">
                                Existing Subjects
                            </div>
                            <div className="divide-y divide-gray-100">
                                {initialSubjects.map((sub: any) => (
                                    <div key={sub.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-900">{sub.name}</p>
                                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-mono">{sub.code}</span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {sub.courses?.name} • Sem {sub.semester} • {sub.credits} Credits
                                            </p>
                                        </div>
                                        <form action={() => deleteSubject(sub.id)}>
                                            <Button title="Delete" className="bg-transparent hover:bg-red-50 text-gray-400 hover:text-red-500 h-8 w-8 p-0">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl shadow-sm p-6 h-fit">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Subject
                        </h3>
                        <form action={createSubject} className="space-y-4">
                            <div>
                                <Label htmlFor="s_name">Subject Name</Label>
                                <Input id="s_name" name="name" placeholder="e.g. Data Structures" required />
                            </div>
                            <div>
                                <Label htmlFor="s_code">Subject Code</Label>
                                <Input id="s_code" name="code" placeholder="e.g. CS201" required />
                            </div>
                            <div>
                                <Label htmlFor="s_course">Course</Label>
                                <Select id="s_course" name="course_id" required>
                                    <option value="">Select Course</option>
                                    {initialCourses.map((c: any) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="s_sem">Semester</Label>
                                    <Input id="s_sem" name="semester" type="number" min="1" max="10" required />
                                </div>
                                <div>
                                    <Label htmlFor="s_cred">Credits</Label>
                                    <Input id="s_cred" name="credits" type="number" min="1" max="10" defaultValue="3" required />
                                </div>
                            </div>

                            <Button type="submit" className="w-full">Create Subject</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
