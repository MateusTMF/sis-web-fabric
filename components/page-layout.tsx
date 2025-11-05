import type React from "react"
import Sidebar from "./sidebar"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <>
      <Sidebar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h1>
            {description && <p className="text-muted-foreground text-sm md:text-base">{description}</p>}
          </div>
          {children}
        </div>
      </main>
    </>
  )
}
