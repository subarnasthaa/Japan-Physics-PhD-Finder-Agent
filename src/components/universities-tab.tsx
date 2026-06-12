'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X, Loader2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import InstitutionCard from '@/components/institution-card'
import type { Institution } from '@/lib/static-data'

interface UniversitiesTabProps {
  watchlistedIdsParam: string
  toggleWatchlist: (id: string) => void
  isWatchlisted: (id: string) => boolean
}

export default function UniversitiesTab({ toggleWatchlist, isWatchlisted }: UniversitiesTabProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [doctoralOnly, setDoctoralOnly] = useState(false)
  const [mextOnly, setMextOnly] = useState(false)
  const [watchlistedOnly, setWatchlistedOnly] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [prefectureFilter, setPrefectureFilter] = useState('all')
  const [fieldFilter, setFieldFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)
  const [prefectures, setPrefectures] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then((data) => {
        setInstitutions(data)
        const prefectureSet = new Set<string>(data.map((u: Institution) => u.country))
        setPrefectures(Array.from(prefectureSet).sort())
        const fieldSet = new Set<string>()
        data.forEach((u: Institution) => {
          u.fields.split('|').forEach((f: string) => fieldSet.add(f.trim()))
        })
        setFields(Array.from(fieldSet).sort())
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = institutions.filter((inst) => {
    if (search) {
      const q = search.toLowerCase()
      const match =
        inst.name.toLowerCase().includes(q) ||
        inst.city.toLowerCase().includes(q) ||
        inst.fields.toLowerCase().includes(q) ||
        inst.department.toLowerCase().includes(q) ||
        inst.country.toLowerCase().includes(q)
      if (!match) return false
    }
    if (doctoralOnly && !inst.funding?.doctoralScholarshipAvailable) return false
    if (mextOnly && !inst.funding?.mextEligible) return false
    if (watchlistedOnly && !isWatchlisted(inst.id)) return false
    if (typeFilter !== 'all' && inst.type !== typeFilter) return false
    if (prefectureFilter !== 'all' && inst.country !== prefectureFilter) return false
    if (fieldFilter !== 'all' && !inst.fields.includes(fieldFilter)) return false
    return true
  })

  const clearFilters = () => {
    setSearch('')
    setDoctoralOnly(false)
    setMextOnly(false)
    setWatchlistedOnly(false)
    setTypeFilter('all')
    setPrefectureFilter('all')
    setFieldFilter('all')
  }

  const hasFilters = search || doctoralOnly || mextOnly || watchlistedOnly || typeFilter !== 'all' || prefectureFilter !== 'all' || fieldFilter !== 'all'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 text-red-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Search + Filter Toggle */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisibleCount(12) }}
            placeholder="Search institutions, cities, fields..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={`h-10 px-3 ${showFilters ? 'border-red-500 text-red-600' : ''}`}
        >
          <Filter className="size-4" />
        </Button>
        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters} className="h-10 px-3 text-gray-500">
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-3">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={doctoralOnly} onCheckedChange={setDoctoralOnly} />
              <span className="text-sm text-gray-700 dark:text-gray-300">Doctoral Scholarship</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={mextOnly} onCheckedChange={setMextOnly} />
              <span className="text-sm text-gray-700 dark:text-gray-300">MEXT Eligible</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={watchlistedOnly} onCheckedChange={setWatchlistedOnly} />
              <span className="text-sm text-gray-700 dark:text-gray-300">Watchlisted</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Types</option>
              <option value="University">University</option>
              <option value="Research Institute">Research Institute</option>
              <option value="National Institute">National Institute</option>
            </select>
            <select
              value={prefectureFilter}
              onChange={(e) => setPrefectureFilter(e.target.value)}
              className="h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Prefectures</option>
              {prefectures.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              className="h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Fields</option>
              {fields.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} institutions
      </p>

      {/* Institution Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Star className="size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 mb-2">No institutions match your filters</p>
          <Button variant="outline" onClick={clearFilters} size="sm">
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, visibleCount).map((inst) => (
            <InstitutionCard
              key={inst.id}
              institution={inst}
              isWatchlisted={isWatchlisted(inst.id)}
              onToggleWatchlist={() => toggleWatchlist(inst.id)}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {visibleCount < filtered.length && (
        <div className="text-center py-4">
          <Button variant="outline" onClick={() => setVisibleCount((c) => c + 12)}>
            Load More ({filtered.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </div>
  )
}
