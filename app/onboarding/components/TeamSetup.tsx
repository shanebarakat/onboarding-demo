"use client"

import { useState } from "react"
import { ErrorIcon } from "@/app/components/icons"

// BUG: Enter key in invite input submits the form instead of adding email
export function TeamSetup({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
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
              <ErrorIcon className="w-4 h-4 shrink-0" strokeWidth={2.5} />
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
