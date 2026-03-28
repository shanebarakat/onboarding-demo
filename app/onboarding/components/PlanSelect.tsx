"use client"

import { useState } from "react"
import { CheckIcon } from "@/app/components/icons"

export function PlanSelect({ onComplete }: { onComplete: () => void }) {
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
                  <CheckIcon className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
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
