"use client"

import { useState, useEffect } from "react"

// ─── Step Indicator ──────────────────────────────────────────────────
function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 flex-1">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
            i + 1 < step ? "bg-white text-black" :
            i + 1 === step ? "bg-white text-black ring-4 ring-white/20" :
            "bg-[#1a1a1a] text-[#555] border border-[#2a2a2a]"
          }`}>
            {i + 1 < step ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div className={`flex-1 h-px transition-colors duration-300 ${i + 1 < step ? "bg-white/30" : "bg-[#2a2a2a]"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Step 1: Welcome ─────────────────────────────────────────────────
function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-10 py-20">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold tracking-tight">Welcome to Acme</h1>
          <p className="text-[#999] text-lg max-w-md leading-relaxed">
            Let&apos;s get your workspace set up. This takes about 2 minutes and you can always change things later.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="px-10 py-3.5 bg-white text-black rounded-full font-medium text-base hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10"
      >
        Get Started
      </button>

      <p className="text-[#555] text-sm">Already have an account? <span className="text-white/70 underline underline-offset-2 cursor-pointer">Sign in</span></p>
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
    `w-full px-4 py-4 rounded-xl bg-[#111] border text-base text-white placeholder:text-[#444] outline-none transition-all focus:ring-2 focus:ring-white/10 ${
      touched[field] && errors[field] ? "border-red-500/60 focus:ring-red-500/20" : "border-[#222] hover:border-[#333] focus:border-[#444]"
    }`

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">Your Profile</h2>
        <p className="text-[#999] text-base mt-2">Tell us about yourself so we can personalize your experience.</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#ccc]">Full name</label>
          <input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="Jane Smith"
            className={fieldClass("name")}
          />
          {touched.name && errors.name && (
            <span className="text-sm text-red-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {errors.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#ccc]">Work email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="jane@company.com"
            className={fieldClass("email")}
          />
          {touched.email && errors.email && (
            <span className="text-sm text-red-400 flex items-center gap-1.5 error" aria-label="error">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#ccc]">Your role</label>
          <select
            name="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            onBlur={() => handleBlur("role")}
            className={`${fieldClass("role")} ${!role ? "text-[#444]" : ""} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:20px]`}
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
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {errors.role}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all cursor-pointer"
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">Set up your team</h2>
        <p className="text-[#999] text-base mt-2">Create a workspace for your team and invite your colleagues.</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#ccc]">Team name</label>
          <input
            name="teamName"
            value={teamName}
            onChange={e => { setTeamName(e.target.value); setError("") }}
            placeholder="Acme Engineering"
            className={`w-full px-4 py-4 rounded-xl bg-[#111] border text-base text-white placeholder:text-[#444] outline-none transition-all focus:ring-2 focus:ring-white/10 ${
              error ? "border-red-500/60" : "border-[#222] hover:border-[#333] focus:border-[#444]"
            }`}
          />
          {error && (
            <span className="text-sm text-red-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#ccc]">Invite team members</label>
          <div className="flex gap-2">
            <input
              name="inviteEmail"
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="flex-1 px-4 py-4 rounded-xl bg-[#111] border border-[#222] text-base text-white placeholder:text-[#444] outline-none hover:border-[#333] focus:border-[#444] focus:ring-2 focus:ring-white/10 transition-all"
              // BUG: No onKeyDown handler!
              // Enter key submits the <form> instead of calling handleAdd()
              // Fix would be:
              // onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
            />
            <button
              type="button"
              onClick={handleAdd}
              className="px-5 py-4 rounded-xl bg-[#1a1a1a] border border-[#222] text-sm font-medium text-[#999] hover:text-white hover:border-[#444] hover:bg-[#222] transition-all cursor-pointer"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-[#555]">Press Add or hit Enter to invite (Enter is bugged!)</p>
        </div>

        {invites.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#666] uppercase tracking-wider">Invited ({invites.length})</label>
            <div className="flex flex-wrap gap-2">
              {invites.map(email => (
                <span
                  key={email}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-400 invite-chip"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-medium text-indigo-300 uppercase">
                    {email[0]}
                  </span>
                  {email}
                  <button
                    type="button"
                    onClick={() => handleRemove(email)}
                    className="hover:text-white transition-colors cursor-pointer ml-1"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-[#666] hover:text-[#aaa] transition-colors cursor-pointer"
        >
          Skip for now
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all cursor-pointer"
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
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "For individuals and small projects",
      features: ["Up to 3 projects", "1,000 API calls/mo", "Community support", "Basic analytics"],
      cta: "Get Started",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$20",
      period: "/month",
      description: "For growing teams that need more",
      popular: true,
      features: ["Unlimited projects", "100,000 API calls/mo", "Priority support", "Advanced analytics", "Team collaboration", "Custom domains"],
      cta: "Start Pro Trial",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For organizations with advanced needs",
      features: ["Everything in Pro", "Unlimited API calls", "SSO & SAML", "Dedicated account manager", "Custom SLAs", "Audit logs", "On-premise option"],
      cta: "Contact Sales",
    },
  ]

  const handleComplete = () => {
    localStorage.setItem("onboarded_at", new Date().toISOString())
    localStorage.setItem("selected_plan", selected)
    onComplete()
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight">Choose your plan</h2>
        <p className="text-[#999] text-base mt-2">Start free and upgrade when you need to. All plans include a 14-day trial.</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`relative flex flex-col p-8 rounded-2xl border text-left transition-all cursor-pointer min-h-[420px] ${
              selected === plan.id
                ? "border-white/30 bg-white/5 shadow-lg shadow-white/5"
                : "border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#2a2a2a] hover:bg-[#111]"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-medium bg-indigo-500 text-white">
                Most Popular
              </span>
            )}
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-semibold">{plan.name}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === plan.id ? "border-white" : "border-[#333]"
              }`}>
                {selected === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-sm text-[#666]">{plan.period}</span>}
            </div>
            <span className="text-sm text-[#888] mb-5">{plan.description}</span>
            <div className="flex flex-col gap-2.5 mt-auto">
              {plan.features.map(f => (
                <div key={f} className="flex items-start gap-2.5 text-sm text-[#bbb]">
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

      <div className="flex justify-end pt-2">
        <button
          onClick={handleComplete}
          className="px-8 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all cursor-pointer"
        >
          Complete Setup
        </button>
      </div>
    </div>
  )
}

// ─── Dashboard (after onboarding) ────────────────────────────────────
function Dashboard() {
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(true) }, [])

  return (
    <div className={`flex flex-col items-center justify-center text-center gap-6 py-20 transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
        <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-tight">Welcome, Test User!</h1>
        <p className="text-[#888] text-base max-w-md">Your workspace is ready. You can now start building, invite more team members, or explore the platform.</p>
      </div>
      <div className="flex gap-3 mt-2">
        <button className="px-6 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all cursor-pointer">
          Go to Dashboard
        </button>
        <button className="px-6 py-2.5 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-full font-medium text-sm hover:bg-[#222] transition-all cursor-pointer">
          Explore Docs
        </button>
      </div>
    </div>
  )
}

// ─── Main Onboarding Page ────────────────────────────────────────────
export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [completed, setCompleted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const goToStep = (next: number) => {
    setTransitioning(true)
    setTimeout(() => {
      setStep(next)
      setTransitioning(false)
    }, 200)
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-[#090909]">
        <div className="max-w-5xl mx-auto px-8">
          <Dashboard />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#090909]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-[#151515]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
          </div>
          <span className="text-base font-semibold text-white">Acme</span>
        </div>
        <span className="text-sm text-[#555]">Step {step} of 4</span>
      </div>

      <div className="max-w-5xl mx-auto px-8 pt-10">
        <StepIndicator step={step} total={4} />

        <div className={`transition-all duration-200 ${transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
          {step === 1 && <Welcome onNext={() => goToStep(2)} />}
          {step === 2 && <ProfileForm onNext={() => goToStep(3)} />}
          {step === 3 && (
            <TeamSetup
              onNext={() => goToStep(4)}
              onSkip={() => goToStep(4)}
            />
          )}
          {step === 4 && <PlanSelect onComplete={() => { setTransitioning(true); setTimeout(() => setCompleted(true), 200) }} />}
        </div>
      </div>
    </div>
  )
}
