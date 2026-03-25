"use client"

import { useState, useEffect } from "react"

// ─── Sidebar ─────────────────────────────────────────────────────────
function Sidebar({ step }: { step: number }) {
  const steps = [
    { num: 1, label: "Welcome", desc: "Get started with Acme" },
    { num: 2, label: "Your Profile", desc: "Name, email, and role" },
    { num: 3, label: "Team Setup", desc: "Create workspace & invite" },
    { num: 4, label: "Choose Plan", desc: "Select your subscription" },
  ]

  return (
    <div className="w-[340px] shrink-0 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col p-8">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
          </svg>
        </div>
        <span className="text-xl font-semibold">Acme</span>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-1">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-start gap-4">
            {/* Indicator column */}
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all shrink-0 ${
                s.num < step ? "bg-green-500 text-white" :
                s.num === step ? "bg-white text-black ring-4 ring-white/10" :
                "bg-[#1a1a1a] text-[#555] border border-[#2a2a2a]"
              }`}>
                {s.num < step ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : s.num}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-px h-10 my-1 transition-colors ${s.num < step ? "bg-green-500/30" : "bg-[#1a1a1a]"}`} />
              )}
            </div>
            {/* Text */}
            <div className="pt-1.5">
              <div className={`text-sm font-medium transition-colors ${
                s.num <= step ? "text-white" : "text-[#555]"
              }`}>{s.label}</div>
              <div className={`text-xs mt-0.5 transition-colors ${
                s.num <= step ? "text-[#888]" : "text-[#333]"
              }`}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto text-xs text-[#333]">
        Having trouble? <span className="text-[#666] underline underline-offset-2 cursor-pointer">Contact support</span>
      </div>
    </div>
  )
}

// ─── Step 1: Welcome ─────────────────────────────────────────────────
function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-10 h-full">
      <div className="flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
          <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold tracking-tight">Welcome to Acme</h1>
          <p className="text-[#888] text-lg max-w-lg leading-relaxed">
            Set up your workspace in a few quick steps. We&apos;ll get you up and running in under a minute.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="px-12 py-4 bg-white text-black rounded-full font-semibold text-base hover:bg-white/90 transition-all cursor-pointer shadow-2xl shadow-white/10"
      >
        Get Started
      </button>
    </div>
  )
}

// ─── Step 2: Profile Form ────────────────────────────────────────────
// BUG: Email validation only checks if empty, doesn't validate format
function ProfileForm({ onNext }: { onNext: () => void }) {
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
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
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
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
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
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
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

// ─── Step 3: Team Setup ──────────────────────────────────────────────
// BUG: Enter key in invite input submits the form instead of adding email
function TeamSetup({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  const [teamName, setTeamName] = useState("")
  const [invites, setInvites] = useState<string[]>([])
  const [inviteEmail, setInviteEmail] = useState("")
  const [error, setError] = useState("")

  const handleAdd = () => {
    const trimmed = inviteEmail.trim()
    if (!trimmed.includes("@")) return
    if (invites.includes(trimmed)) return
    setInvites(prev => [...prev, trimmed])
    setInviteEmail("")
  }

  const handleRemove = (email: string) => {
    setInvites(prev => prev.filter(e => e !== email))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim()) {
      setError("Team name is required")
      return
    }
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-xl mx-auto w-full">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">Set up your team</h2>
        <p className="text-[#888] text-lg mt-3">Create a workspace for your team and invite colleagues.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-medium text-[#ccc]">Team name</label>
          <input
            name="teamName"
            value={teamName}
            onChange={e => { setTeamName(e.target.value); setError("") }}
            placeholder="Acme Engineering"
            className={`w-full px-5 py-4 rounded-xl bg-[#111] border text-[15px] text-white placeholder:text-[#444] outline-none transition-all focus:ring-2 focus:ring-white/10 ${
              error ? "border-red-500/60" : "border-[#222] hover:border-[#333] focus:border-[#444]"
            }`}
            autoComplete="off"
          />
          {error && (
            <span className="text-sm text-red-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-medium text-[#ccc]">Invite team members</label>
          <div className="flex gap-3">
            <input
              name="inviteEmail"
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="flex-1 px-5 py-4 rounded-xl bg-[#111] border border-[#222] text-[15px] text-white placeholder:text-[#444] outline-none hover:border-[#333] focus:border-[#444] focus:ring-2 focus:ring-white/10 transition-all"
              autoComplete="off"
              // BUG: No onKeyDown handler!
              // Enter key submits the <form> instead of calling handleAdd()
            />
            <button
              type="button"
              onClick={handleAdd}
              className="px-6 py-4 rounded-xl bg-[#1a1a1a] border border-[#222] text-sm font-semibold text-[#999] hover:text-white hover:border-[#444] hover:bg-[#222] transition-all cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {invites.length > 0 && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Invited ({invites.length})</label>
            <div className="flex flex-col gap-2">
              {invites.map(email => (
                <div
                  key={email}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111] border border-[#1a1a1a]"
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center text-sm font-semibold text-indigo-400 uppercase shrink-0">
                    {email[0]}
                  </div>
                  <span className="text-sm text-[#ccc] flex-1">{email}</span>
                  <span className="text-xs text-[#555] px-2 py-0.5 rounded-full bg-[#1a1a1a]">Pending</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(email)}
                    className="text-[#555] hover:text-white transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-[#555] hover:text-[#aaa] transition-colors cursor-pointer"
        >
          Skip for now
        </button>
        <button
          type="submit"
          className="px-10 py-3.5 bg-white text-black rounded-full font-semibold text-sm hover:bg-white/90 transition-all cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  )
}

// ─── Step 4: Plan Selection ──────────────────────────────────────────
function PlanSelect({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState("free")

  const plans = [
    {
      id: "free", name: "Free", price: "$0", period: "forever",
      description: "For individuals and small projects",
      features: ["Up to 3 projects", "1,000 API calls/mo", "Community support", "Basic analytics"],
    },
    {
      id: "pro", name: "Pro", price: "$20", period: "/month",
      description: "For growing teams that need more", popular: true,
      features: ["Unlimited projects", "100,000 API calls/mo", "Priority support", "Advanced analytics", "Team collaboration", "Custom domains"],
    },
    {
      id: "enterprise", name: "Enterprise", price: "Custom", period: "",
      description: "For organizations at scale",
      features: ["Everything in Pro", "Unlimited API calls", "SSO & SAML", "Dedicated CSM", "Custom SLAs", "Audit logs", "On-premise"],
    },
  ]

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">Choose your plan</h2>
        <p className="text-[#888] text-lg mt-3">Start free and upgrade anytime. All plans include a 14-day trial.</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`relative flex flex-col p-7 rounded-2xl border text-left transition-all cursor-pointer ${
              selected === plan.id
                ? "border-white/30 bg-white/5 shadow-xl shadow-white/5"
                : "border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#2a2a2a] hover:bg-[#111]"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500 text-white">
                Most Popular
              </span>
            )}
            <div className="flex items-center justify-between mb-5">
              <span className="text-lg font-semibold">{plan.name}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === plan.id ? "border-white" : "border-[#333]"
              }`}>
                {selected === plan.id && <div className="w-3 h-3 rounded-full bg-white" />}
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-base text-[#666]">{plan.period}</span>}
            </div>
            <span className="text-sm text-[#777] mb-6">{plan.description}</span>
            <div className="flex flex-col gap-3 mt-auto">
              {plan.features.map(f => (
                <div key={f} className="flex items-start gap-3 text-sm text-[#aaa]">
                  <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => { localStorage.setItem("onboarded_at", new Date().toISOString()); onComplete() }}
          className="px-10 py-3.5 bg-white text-black rounded-full font-semibold text-sm hover:bg-white/90 transition-all cursor-pointer"
        >
          Complete Setup
        </button>
      </div>
    </div>
  )
}

// ─── Dashboard ───────────────────────────────────────────────────────
function Dashboard() {
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(true) }, [])

  return (
    <div className={`flex flex-col items-center justify-center text-center gap-8 h-full transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="w-24 h-24 rounded-3xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
        <svg className="w-12 h-12 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Welcome, Test User!</h1>
        <p className="text-[#777] text-lg max-w-md">Your workspace is ready. Start building something great.</p>
      </div>
      <div className="flex gap-3 mt-2">
        <button className="px-8 py-3 bg-white text-black rounded-full font-semibold text-sm hover:bg-white/90 transition-all cursor-pointer">
          Go to Dashboard
        </button>
        <button className="px-8 py-3 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-full font-semibold text-sm hover:bg-[#222] transition-all cursor-pointer">
          Explore Docs
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [completed, setCompleted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const goToStep = (next: number) => {
    setTransitioning(true)
    setTimeout(() => { setStep(next); setTransitioning(false) }, 150)
  }

  if (completed) {
    return (
      <div className="h-screen bg-[#090909] flex">
        <Sidebar step={5} />
        <div className="flex-1 flex items-center justify-center p-12">
          <Dashboard />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-[#090909] flex overflow-hidden">
      <Sidebar step={step} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className={`flex-1 flex items-center p-12 transition-all duration-150 ${transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
          <div className="w-full">
            {step === 1 && <Welcome onNext={() => goToStep(2)} />}
            {step === 2 && <ProfileForm onNext={() => goToStep(3)} />}
            {step === 3 && <TeamSetup onNext={() => goToStep(4)} onSkip={() => goToStep(4)} />}
            {step === 4 && <PlanSelect onComplete={() => { setTransitioning(true); setTimeout(() => setCompleted(true), 150) }} />}
          </div>
        </div>
      </div>
    </div>
  )
}
