"use client"

import { useState } from "react"

// ─── Progress Bar ────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const pct = ((step - 1) / 3) * 100
  return (
    <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ─── Step 1: Welcome ─────────────────────────────────────────────────
function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 py-16">
      {/* Illustration */}
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/5">
        <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to Acme</h1>
        <p className="text-[#888] text-sm max-w-sm">
          Set up your workspace in a few quick steps. We&apos;ll get you up and running in under a minute.
        </p>
      </div>

      <button
        onClick={onNext}
        className="px-8 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
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
    if (!name) e.name = "Name is required"
    if (!email) e.email = "Email is required"
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

  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Your Profile</h2>
        <p className="text-[#888] text-sm mt-1">Tell us a bit about yourself.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#aaa]">Full name</label>
          <input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="Jane Smith"
            className={`px-3 py-2 rounded-lg bg-[#141414] border text-sm text-white placeholder:text-[#555] outline-none transition-colors ${
              touched.name && errors.name ? "border-red-500/50" : "border-[#222] focus:border-[#444]"
            }`}
          />
          {touched.name && errors.name && (
            <span className="text-xs text-red-400">{errors.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#aaa]">Email address</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="jane@company.com"
            className={`px-3 py-2 rounded-lg bg-[#141414] border text-sm text-white placeholder:text-[#555] outline-none transition-colors ${
              touched.email && errors.email ? "border-red-500/50" : "border-[#222] focus:border-[#444]"
            }`}
          />
          {touched.email && errors.email && (
            <span className="text-xs text-red-400 error" aria-label="error">{errors.email}</span>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#aaa]">Role</label>
          <select
            name="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            onBlur={() => handleBlur("role")}
            className={`px-3 py-2 rounded-lg bg-[#141414] border text-sm text-white outline-none transition-colors appearance-none ${
              touched.role && errors.role ? "border-red-500/50" : "border-[#222] focus:border-[#444]"
            } ${!role ? "text-[#555]" : ""}`}
          >
            <option value="" disabled>Select a role</option>
            <option value="engineer">Engineer</option>
            <option value="designer">Designer</option>
            <option value="pm">Product Manager</option>
            <option value="other">Other</option>
          </select>
          {touched.role && errors.role && (
            <span className="text-xs text-red-400">{errors.role}</span>
          )}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="self-end px-6 py-2 bg-white text-black rounded-full font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
      >
        Next
      </button>
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
    if (!inviteEmail.includes("@")) return
    if (invites.includes(inviteEmail)) return
    setInvites(prev => [...prev, inviteEmail])
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Set up your team</h2>
        <p className="text-[#888] text-sm mt-1">Name your team and invite your colleagues.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Team name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#aaa]">Team name</label>
          <input
            name="teamName"
            value={teamName}
            onChange={e => { setTeamName(e.target.value); setError("") }}
            placeholder="Acme Engineering"
            className={`px-3 py-2 rounded-lg bg-[#141414] border text-sm text-white placeholder:text-[#555] outline-none transition-colors ${
              error ? "border-red-500/50" : "border-[#222] focus:border-[#444]"
            }`}
          />
          {error && <span className="text-xs text-red-400">{error}</span>}
        </div>

        {/* Invite members */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#aaa]">Invite members</label>
          <div className="flex gap-2">
            <input
              name="inviteEmail"
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="flex-1 px-3 py-2 rounded-lg bg-[#141414] border border-[#222] text-sm text-white placeholder:text-[#555] outline-none focus:border-[#444] transition-colors"
              // BUG: No onKeyDown handler!
              // Enter key submits the <form> instead of calling handleAdd()
              // Fix would be:
              // onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
            />
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#222] text-sm text-[#aaa] hover:text-white hover:border-[#444] transition-colors cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Invite list */}
        {invites.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {invites.map(email => (
              <span
                key={email}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 invite-chip"
              >
                {email}
                <button
                  type="button"
                  onClick={() => handleRemove(email)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-[#666] hover:text-[#aaa] transition-colors cursor-pointer"
        >
          Skip
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-white text-black rounded-full font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          Next
        </button>
      </div>
    </form>
  )
}

// ─── Step 4: Plan Selection ──────────────────────────────────────────
function PlanSelect({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState("free")

  const plans = [
    { id: "free", name: "Free", price: "$0", description: "For individuals getting started", features: ["1 project", "Basic analytics", "Community support"] },
    { id: "pro", name: "Pro", price: "$20/mo", description: "For growing teams", features: ["Unlimited projects", "Advanced analytics", "Priority support", "Team collaboration"] },
    { id: "enterprise", name: "Enterprise", price: "Custom", description: "For large organizations", features: ["Everything in Pro", "SSO & SAML", "Dedicated account manager", "Custom SLAs", "Audit logs"] },
  ]

  const handleComplete = () => {
    localStorage.setItem("onboarded_at", new Date().toISOString())
    localStorage.setItem("selected_plan", selected)
    onComplete()
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Choose your plan</h2>
        <p className="text-[#888] text-sm mt-1">You can change this later in settings.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`flex flex-col p-4 rounded-lg border text-left transition-colors cursor-pointer ${
              selected === plan.id
                ? "border-blue-500/50 bg-blue-500/5"
                : "border-[#222] bg-[#141414] hover:border-[#333]"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">{plan.name}</span>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selected === plan.id ? "border-blue-500" : "border-[#333]"
              }`}>
                {selected === plan.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </div>
            <span className="text-lg font-semibold">{plan.price}</span>
            <span className="text-xs text-[#888] mt-1 mb-3">{plan.description}</span>
            <div className="flex flex-col gap-1.5 mt-auto">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-[#aaa]">
                  <svg className="w-3 h-3 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleComplete}
        className="self-end px-6 py-2 bg-white text-black rounded-full font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
      >
        Complete Setup
      </button>
    </div>
  )
}

// ─── Dashboard (redirect target) ────────────────────────────────────
function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
        <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">Welcome, Test User!</h1>
      <p className="text-[#888] text-sm">Your workspace is ready. Start building something great.</p>
    </div>
  )
}

// ─── Main Onboarding Page ────────────────────────────────────────────
export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto px-6">
          <Dashboard />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <ProgressBar step={step} />
        <div className="mt-2 mb-1 text-right text-xs text-[#555]">Step {step} of 4</div>

        {step === 1 && <Welcome onNext={() => setStep(2)} />}
        {step === 2 && <ProfileForm onNext={() => setStep(3)} />}
        {step === 3 && (
          <TeamSetup
            onNext={() => setStep(4)}
            onSkip={() => setStep(4)}
          />
        )}
        {step === 4 && <PlanSelect onComplete={() => setCompleted(true)} />}
      </div>
    </div>
  )
}
