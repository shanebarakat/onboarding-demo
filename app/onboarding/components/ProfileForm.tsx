"use client"

import { useState } from "react"
import { ErrorIcon } from "@/app/components/icons"

// BUG: Email validation only checks if empty, doesn't validate format
export function ProfileForm({ onNext }: { onNext: () => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = "Name is required"
    if (!email.trim()) e.email = "Email is required"
    // BUG: Missing email format validation!
    // Should have: if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email address'
    if (!role) e.role = "Please select a role"
    return e
  }

  const handleNext = () => {
    const e = validate()
    setErrors(e)
    setTouched({ name: true, email: true, role: true })
    if (Object.keys(e).length === 0) onNext()
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    setErrors(validate())
  }

  const fieldClass = (field: string) =>
    `w-full px-5 py-4 rounded-xl bg-[#111] border text-[15px] text-white placeholder:text-[#444] outline-none transition-all focus:ring-2 focus:ring-white/10 ${
      touched[field] && errors[field] ? "border-red-500/60 focus:ring-red-500/20" : "border-[#222] hover:border-[#333] focus:border-[#444]"
    }`

  return (
    <div className="flex flex-col gap-10 max-w-xl mx-auto w-full">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">Your Profile</h2>
        <p className="text-[#888] text-lg mt-3">Tell us about yourself so we can personalize your experience.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-medium text-[#ccc]">Full name</label>
          <input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="Jane Smith"
            className={fieldClass("name")}
            autoComplete="off"
          />
          {touched.name && errors.name && (
            <span className="text-sm text-red-400 flex items-center gap-1.5">
              <ErrorIcon className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              {errors.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-medium text-[#ccc]">Work email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="jane@company.com"
            className={fieldClass("email")}
            autoComplete="off"
          />
          {touched.email && errors.email && (
            <span className="text-sm text-red-400 flex items-center gap-1.5 error" aria-label="error">
              <ErrorIcon className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              {errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-medium text-[#ccc]">Your role</label>
          <select
            name="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            onBlur={() => handleBlur("role")}
            className={`${fieldClass("role")} ${!role ? "text-[#444]" : ""} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] bg-[length:20px]`}
          >
            <option value="" disabled>Select your role</option>
            <option value="engineer">Software Engineer</option>
            <option value="designer">Designer</option>
            <option value="pm">Product Manager</option>
            <option value="lead">Engineering Lead</option>
            <option value="other">Other</option>
          </select>
          {touched.role && errors.role && (
            <span className="text-sm text-red-400 flex items-center gap-1.5">
              <ErrorIcon className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              {errors.role}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-10 py-3.5 bg-white text-black rounded-full font-semibold text-sm hover:bg-white/90 transition-all cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
