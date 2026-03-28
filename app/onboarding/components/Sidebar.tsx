import { CheckIcon, LogoIcon } from "@/app/components/icons"

export function Sidebar({ step }: { step: number }) {
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
          <LogoIcon className="w-5 h-5 text-white" strokeWidth={2} />
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
                  <CheckIcon className="w-4 h-4" strokeWidth={3} />
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
