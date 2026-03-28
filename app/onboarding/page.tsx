"use client"

import { useState } from "react"
import { Sidebar, Welcome, ProfileForm, TeamSetup, PlanSelect, Dashboard } from "./components"

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

