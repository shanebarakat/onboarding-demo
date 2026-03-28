"use client"

import { useState, useEffect } from "react"
import { CheckIcon } from "@/app/components/icons"

export function Dashboard() {
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(true) }, [])

  return (
    <div className={`flex flex-col items-center justify-center text-center gap-8 h-full transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="w-24 h-24 rounded-3xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
        <CheckIcon className="w-12 h-12 text-green-400" strokeWidth={2} />
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
