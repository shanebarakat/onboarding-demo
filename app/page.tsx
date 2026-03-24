import Link from "next/link"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link
        href="/onboarding"
        className="px-6 py-3 bg-white text-black rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Start Onboarding
      </Link>
    </div>
  )
}
