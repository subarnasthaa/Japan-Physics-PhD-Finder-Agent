'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Clock, CheckCircle, Star, Bell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Alert {
  id: string
  name: string
  city: string
  state: string
  type: string
  deadline: string
  daysLeft: number
  contractType: string
  languageInstruction: string
  englishLabLife: boolean
  monthlyJpy: number | null
  fields: string
}

interface AlertsTabProps {
  onNavigate: (tab: string) => void
  watchlistedIdsParam: string
}

export default function AlertsTab({ onNavigate }: AlertsTabProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/api/alerts')
      .then((r) => r.json())
      .then((data) => {
        setAlerts(Array.isArray(data) ? data : [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = alerts.filter((a) => {
    if (filter === 'urgent') return a.daysLeft < 30
    if (filter === 'upcoming') return a.daysLeft >= 30 && a.daysLeft < 60
    return true
  })

  const urgentCount = alerts.filter((a) => a.daysLeft < 30).length
  const upcomingCount = alerts.filter((a) => a.daysLeft >= 30 && a.daysLeft < 60).length
  const safeCount = alerts.filter((a) => a.daysLeft >= 60).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Clock className="size-8 text-red-600 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-red-200 dark:border-red-800/50">
          <CardContent className="p-3 text-center">
            <AlertTriangle className="size-5 text-red-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-red-600">{urgentCount}</p>
            <p className="text-xs text-gray-500">Urgent (&lt;30d)</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-800/50">
          <CardContent className="p-3 text-center">
            <Clock className="size-5 text-red-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-red-600">{upcomingCount}</p>
            <p className="text-xs text-gray-500">Upcoming (30-60d)</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 dark:border-emerald-800/50">
          <CardContent className="p-3 text-center">
            <CheckCircle className="size-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-emerald-600">{safeCount}</p>
            <p className="text-xs text-gray-500">Safe (&gt;60d)</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="all">All Alerts ({alerts.length})</option>
          <option value="urgent">Urgent Only ({urgentCount})</option>
          <option value="upcoming">Upcoming Only ({upcomingCount})</option>
        </select>
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={() => onNavigate('universities')}>
          Browse Institutions
        </Button>
      </div>

      {/* Alert Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No alerts to display</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.daysLeft < 30
                  ? 'border-l-red-500'
                  : alert.daysLeft < 60
                  ? 'border-l-red-500'
                  : 'border-l-emerald-500'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{alert.name}</h4>
                    <p className="text-xs text-gray-500">{alert.city}, {alert.state}</p>
                  </div>
                  <Badge
                    variant={alert.daysLeft < 30 ? 'destructive' : alert.daysLeft < 60 ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {alert.daysLeft === 999 ? 'Rolling' : `${alert.daysLeft}d left`}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  {alert.contractType?.includes('Doctoral') && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                      Doctoral
                    </Badge>
                  )}
                  {alert.contractType?.includes('MEXT') && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      MEXT
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                    English
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Deadline: {alert.deadline}
                  {alert.monthlyJpy && ` | ¥${alert.monthlyJpy.toLocaleString()}/mo`}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
