"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/sidebar"
import SystemInfo from "../components/system-info"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      {/* Main Content agora se adapta melhor com a sidebar */}
      <main className="flex-1 overflow-auto transition-all duration-300">
        <div className="pt-20 px-4 md:px-8 py-6">
          <SystemInfo />
        </div>
      </main>
    </div>
  )
}
