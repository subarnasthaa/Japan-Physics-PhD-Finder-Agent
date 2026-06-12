'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, MapPin, ExternalLink, Award, BookOpen, Calendar, Loader2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CASInstitute {
  id: string
  name: string
  city: string
  province: string
  type: string
  department: string
  researchGroup: string | null
  url: string
  fields: string
  deadline: string
  englishProgram: boolean
  hskRequired: boolean
  hskLevel: string | null
  cscDesignated: boolean
  scholarshipTypes: string
  watchlisted: boolean
  notesForNepali: string | null
}

interface CASInstitutesTabProps {
  onNavigate: (tab: string) => void
  watchlistedIdsParam: string
}

export default function CASInstitutesTab({ onNavigate, watchlistedIdsParam }: CASInstitutesTabProps) {
  const [institutes, setInstitutes] = useState<CASInstitute[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('all')
  const [cities, setCities] = useState<string[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const fetchInstitutes = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('type', 'CAS Institute')
      if (search) params.set('search', search)
      if (cityFilter !== 'all') params.set('city', cityFilter)
      if (watchlistedIdsParam) params.set('watchlistedIds', watchlistedIdsParam)

      const res = await fetch(`/api/universities?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setInstitutes(data)
      }
    } catch (err) {
      console.error('Error fetching CAS institutes:', err)
    } finally {
      setLoading(false)
    }
  }, [search, cityFilter, watchlistedIdsParam])

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch('/api/universities?type=CAS+Institute')
        if (res.ok) {
          const data: CASInstitute[] = await res.json()
          const citySet = new Set<string>()
          for (const inst of data) {
            citySet.add(inst.city)
          }
          setCities(Array.from(citySet).sort())
        }
      } catch (err) {
        console.error('Error fetching cities:', err)
      }
    }
    fetchCities()
  }, [])

  useEffect(() => {
    fetchInstitutes()
  }, [fetchInstitutes])

  // Group institutes by city
  const groupedByCity = institutes.reduce<Record<string, CASInstitute[]>>((acc, inst) => {
    if (!acc[inst.city]) acc[inst.city] = []
    acc[inst.city].push(inst)
    return acc
  }, {})

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 rounded-xl p-4 md:p-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-1">Chinese Academy of Sciences (CAS) Institutes</h2>
        <p className="text-red-100 text-sm md:text-base">
          CAS institutes are premier research institutions in China, offering world-class PhD programs through the University of Chinese Academy of Sciences (UCAS). They are ideal for students focused on research.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search CAS institutes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 text-red-600 animate-spin" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading CAS institutes...</span>
        </div>
      ) : institutes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔬</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No CAS institutes found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByCity).map(([city, cityInstitutes]) => (
            <div key={city}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="size-4 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{city}</h3>
                <Badge variant="secondary" className="text-xs">{cityInstitutes.length} {cityInstitutes.length === 1 ? 'institute' : 'institutes'}</Badge>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityInstitutes.map((inst) => {
                  const fieldsArr = inst.fields.split(',').map((f) => f.trim()).filter(Boolean)
                  const isExpanded = expandedId === inst.id

                  return (
                    <Card key={inst.id} className="hover:shadow-md transition-shadow border-red-100 dark:border-red-900/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                            {inst.name}
                          </CardTitle>
                          <Badge className="bg-red-600 hover:bg-red-700 text-white text-xs shrink-0">
                            <Award className="size-3 mr-0.5" />
                            CAS
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {/* Department */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                          <BookOpen className="size-3.5 shrink-0" />
                          <span className="truncate">{inst.department}</span>
                        </div>

                        {/* Research Fields */}
                        <div className="flex flex-wrap gap-1">
                          {fieldsArr.map((field) => (
                            <Badge key={field} variant="outline" className="text-xs font-normal">
                              {field}
                            </Badge>
                          ))}
                        </div>

                        {/* Deadline */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar className="size-3.5 shrink-0" />
                          <span>Deadline: <span className="font-medium text-gray-800 dark:text-gray-200">{inst.deadline}</span></span>
                        </div>

                        {/* English Program Badge */}
                        {inst.englishProgram && (
                          <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 text-xs">
                            English Program
                          </Badge>
                        )}

                        {/* Expand/Collapse */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedId(isExpanded ? null : inst.id)}
                          className="w-full text-xs text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                        >
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </Button>

                        {isExpanded && (
                          <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                            {/* URL */}
                            {inst.url && (
                              <div>
                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Program Website</div>
                                <a
                                  href={inst.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 break-all"
                                >
                                  {inst.url}
                                  <ExternalLink className="size-3 shrink-0" />
                                </a>
                              </div>
                            )}

                            {/* Research Group */}
                            {inst.researchGroup && (
                              <div>
                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Research Group</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{inst.researchGroup}</p>
                              </div>
                            )}

                            {/* Notes */}
                            {inst.notesForNepali && (
                              <div>
                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Notes for Nepali Students</div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/10 rounded-md p-2 border border-amber-100 dark:border-amber-900/30">
                                  {inst.notesForNepali}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info about UCAS */}
      <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Award className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                About UCAS (University of Chinese Academy of Sciences)
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                All CAS institutes enroll PhD students through UCAS. When applying, you select the specific institute as your research unit. The degree is awarded by UCAS, which is recognized globally. This means you apply through UCAS but conduct your research at the institute of your choice.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('universities')}
                className="mt-2 text-xs border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
              >
                View All Universities
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
