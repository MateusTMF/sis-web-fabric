"use client"

import { useState, useEffect } from "react"
import Sidebar from "../../components/sidebar"
export default function Movimentacao() {
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
      <main className="flex-1 overflow-auto transition-all duration-300">
        <div className="pt-20 px-4 md:px-8 py-6"><h1>Movimentação</h1></div>
      </main>
    </div>
  )
}