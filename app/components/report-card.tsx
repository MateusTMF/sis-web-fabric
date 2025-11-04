import type { LucideIcon } from "lucide-react"

interface ReportCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconBg: string
  trend?: {
    value: string
    label: string
    isPositive: boolean
  }
}

export function ReportCard({ title, value, icon: Icon, iconBg, trend }: ReportCardProps) {
  return (
    <div className="bg-white dark:bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`${iconBg} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <p className={`text-sm flex items-center gap-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
          <span>
            {trend.isPositive ? "↑" : "↓"} {trend.value}
          </span>{" "}
          {trend.label}
        </p>
      )}
    </div>
  )
}
