'use client'

import { useState } from 'react'
import {
  Star,
  ChevronDown,
  ChevronUp,
  Globe,
  MapPin,
  Building2,
  Atom,
  Banknote,
  Languages,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Institution } from '@/lib/static-data'

interface InstitutionCardProps {
  institution: Institution
  isWatchlisted: boolean
  onToggleWatchlist: () => void
}

export default function InstitutionCard({ institution, isWatchlisted, onToggleWatchlist }: InstitutionCardProps) {
  const [expanded, setExpanded] = useState(false)

  const typeColor = institution.type === 'National Institute' || institution.type === 'Research Institute'
    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'

  const fieldsList = institution.fields.split('|').map((f) => f.trim()).filter(Boolean)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1 truncate">
              {institution.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <MapPin className="size-3" />
              <span>{institution.city}, {institution.country}</span>
            </div>
          </div>
          <button
            onClick={onToggleWatchlist}
            className={`shrink-0 p-1 rounded transition-colors ${
              isWatchlisted
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-300 dark:text-gray-600 hover:text-red-400'
            }`}
          >
            <Star className={`size-5 ${isWatchlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor}`}>
            {institution.type === 'National Institute' ? 'National Institute' : institution.type === 'Research Institute' ? 'Research Institute' : institution.funding?.imperialUniversity ? 'Imperial University' : 'University'}
          </span>
          {institution.funding?.doctoralScholarshipAvailable && (
            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              Doctoral Scholarship
            </Badge>
          )}
          {institution.funding?.mextEligible && (
            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              MEXT
            </Badge>
          )}
          {institution.funding?.jspsEligible && (
            <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              JSPS
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
            English
          </Badge>
        </div>

        {/* Fields */}
        <div className="flex flex-wrap gap-1 mb-3">
          {fieldsList.slice(0, 3).map((field) => (
            <span key={field} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
              {field}
            </span>
          ))}
          {fieldsList.length > 3 && (
            <span className="text-xs text-gray-400">+{fieldsList.length - 3} more</span>
          )}
        </div>

        {/* Key Info */}
        <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <ClockIcon className="size-3.5 text-red-500" />
            <span>Deadline: {institution.deadline || 'Rolling'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="size-3.5 text-purple-500" />
            <span>{institution.monthlyJpy ? `¥${institution.monthlyJpy.toLocaleString()}/month` : 'Stipend varies'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="size-3.5 text-red-500" />
            <span>{institution.languageInstruction}</span>
            {institution.englishLabLife && (
              <span className="text-green-600 dark:text-green-400">(lab life OK)</span>
            )}
          </div>
        </div>

        {/* Expand/Collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-3 flex items-center justify-center gap-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400 transition-colors"
        >
          {expanded ? (
            <>Less details <ChevronUp className="size-3" /></>
          ) : (
            <>View details <ChevronDown className="size-3" /></>
          )}
        </button>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2.5">
            {institution.url && (
              <div className="flex items-start gap-2">
                <Globe className="size-3.5 text-gray-400 mt-0.5 shrink-0" />
                <a href={institution.url} target="_blank" rel="noopener noreferrer" className="text-xs text-red-600 hover:underline break-all">
                  {institution.url}
                </a>
              </div>
            )}
            {institution.department && (
              <div className="flex items-start gap-2">
                <Building2 className="size-3.5 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{institution.department}</span>
              </div>
            )}
            {institution.researchGroup && (
              <div className="flex items-start gap-2">
                <Atom className="size-3.5 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{institution.researchGroup}</span>
              </div>
            )}
            {institution.contractType && (
              <div className="text-xs">
                <span className="text-gray-500">Funding:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{institution.contractType}</span>
              </div>
            )}
            {institution.ieltsMinimum && (
              <div className="text-xs">
                <span className="text-gray-500">IELTS Minimum:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{institution.ieltsMinimum}</span>
              </div>
            )}
            {institution.internationalTuitionJpy !== undefined && (
              <div className="text-xs">
                <span className="text-gray-500">International Tuition:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">
                  {institution.internationalTuitionJpy === 0
                    ? '¥0/year (No tuition fees at national institutes!)'
                    : `¥${institution.internationalTuitionJpy.toLocaleString()}/year`}
                </span>
              </div>
            )}
            {institution.admission && (
              <div className="text-xs">
                <span className="text-gray-500">Admission:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{institution.admission}</span>
              </div>
            )}
            {institution.requiredDocuments && (
              <div className="text-xs">
                <span className="text-gray-500">Documents:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{institution.requiredDocuments}</span>
              </div>
            )}
            {institution.notableProfessors && (
              <div className="text-xs">
                <span className="text-gray-500">Notable:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{institution.notableProfessors}</span>
              </div>
            )}
            {institution.notesForNepali && (
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-700 dark:text-red-300">
                  🇳🇵 {institution.notesForNepali}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
