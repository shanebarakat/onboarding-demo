import { LogoIcon } from "@/app/components/icons"

export function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-10 h-full">
      <div className="flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
          <LogoIcon className="w-12 h-12 text-white" strokeWidth={1.5}>
          <path d="M2 12l10 5 10-5" />
        </LogoIcon>
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
