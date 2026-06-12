'use client'

import { useState } from 'react'
import {
  Star,
  MapPin,
  Globe,
  Calendar,
  FileText,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  User,
  MessageSquare,
  ExternalLink,
  DollarSign,
  Shield,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface University {
  id: string
  name: string
  city: string
  state: string
  type: string
  department: string
  researchGroup: string | null
  url: string
  fields: string
  deadline: string
  fallDeadline: string
  springDeadline: string
  greRequired: string
  grePhysicsRequired: string
  toeflMin: number | null
  ieltsMin: number | null
  fundingType: string
  annualStipend: number | null
  tuitionWaiver: boolean
  healthInsurance: boolean
  acceptanceRate: string | null
  notableProfessors: string
  nepaliStudents: boolean
  requiredDocuments: string
  scholarshipTypes: string
  notesForNepali: string
  watchlisted: boolean
  lastUpdated: string
}

interface UniversityCardProps {
  university: University
  toggleWatchlist: (id: string) => void
  isWatchlisted: (id: string) => boolean
  compact?: boolean
}

export default function UniversityCard({ university, toggleWatchlist, isWatchlisted, compact = false }: UniversityCardProps) {
  const [expanded, setExpanded] = useState(false)
  const watchlisted = isWatchlisted(university.id)

  const fields = university.fields.split(',').map((f) => f.trim()).filter(Boolean)
  const professors = university.notableProfessors
    ? university.notableProfessors.split('|').map((p) => p.trim()).filter(Boolean)
    : []
  const documents = university.requiredDocuments
    ? university.requiredDocuments.split(',').map((d) => d.trim()).filter(Boolean)
    : []
  const scholarships = university.scholarshipTypes
    ? university.scholarshipTypes.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  const handleToggleWatchlist = () => {
    toggleWatchlist(university.id)
  }

  return (
    <Card className="group hover:shadow-md transition-shadow border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white leading-tight truncate">
              {university.name}
            </CardTitle>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{university.city}, {university.state}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleWatchlist}
            className={`shrink-0 size-8 ${watchlisted ? 'text-amber-500 hover:text-amber-600' : 'text-gray-300 hover:text-amber-400'}`}
            aria-label={watchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Star className={`size-5 ${watchlisted ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={university.type === 'National Lab' ? 'default' : 'secondary'} className={
            university.type === 'National Lab'
              ? 'bg-red-600 hover:bg-red-700 text-white text-xs'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs'
          }>
            {university.type === 'National Lab' ? (
              <Award className="size-3 mr-0.5" />
            ) : (
              <GraduationCap className="size-3 mr-0.5" />
            )}
            {university.type}
          </Badge>
          {university.fundingType === 'Full' && (
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
              Fully Funded
            </Badge>
          )}
          {(university.greRequired === 'Not Required' || university.greRequired === 'Waived') && (
            <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 text-xs">
              <Shield className="size-3 mr-0.5" />
              GRE Not Required
            </Badge>
          )}
        </div>

        {/* Department */}
        {!compact && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <BookOpen className="size-3.5 shrink-0" />
            <span className="truncate">{university.department}</span>
          </div>
        )}

        {/* Research Fields */}
        <div className="flex flex-wrap gap-1">
          {fields.slice(0, compact ? 3 : 5).map((field) => (
            <Badge key={field} variant="outline" className="text-xs font-normal">
              {field}
            </Badge>
          ))}
          {fields.length > (compact ? 3 : 5) && (
            <Badge variant="outline" className="text-xs font-normal text-gray-400">
              +{fields.length - (compact ? 3 : 5)} more
            </Badge>
          )}
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
          <Calendar className="size-3.5 shrink-0" />
          <span>
            {university.fallDeadline || university.springDeadline ? (
              <>
                Fall: <span className="font-medium text-gray-800 dark:text-gray-200">{university.fallDeadline || 'N/A'}</span>
                {' | '}
                Spring: <span className="font-medium text-gray-800 dark:text-gray-200">{university.springDeadline || 'N/A'}</span>
              </>
            ) : (
              <>
                Deadline: <span className="font-medium text-gray-800 dark:text-gray-200">{university.deadline}</span>
              </>
            )}
          </span>
        </div>

        {/* GRE Requirement */}
        {university.greRequired && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            GRE: <span className={`font-medium ${
              university.greRequired === 'Not Required' || university.greRequired === 'Waived'
                ? 'text-sky-700 dark:text-sky-400'
                : university.greRequired === 'Recommended'
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-gray-800 dark:text-gray-200'
            }`}>
              {university.greRequired}
            </span>
          </div>
        )}

        {/* TOEFL/IELTS */}
        {(university.toeflMin || university.ieltsMin) && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {university.toeflMin && <span>TOEFL: <span className="font-medium">{university.toeflMin}+</span></span>}
            {university.toeflMin && university.ieltsMin && <span> | </span>}
            {university.ieltsMin && <span>IELTS: <span className="font-medium">{university.ieltsMin}+</span></span>}
          </div>
        )}

        {/* Annual Stipend */}
        {university.annualStipend && (
          <div className="flex items-center gap-1.5 text-xs">
            <DollarSign className="size-3.5 shrink-0 text-blue-600" />
            <span className="text-gray-600 dark:text-gray-400">
              Stipend: <span className="font-medium text-gray-800 dark:text-gray-200">${university.annualStipend.toLocaleString()}/yr</span>
            </span>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full text-xs text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {expanded ? (
            <>
              <ChevronUp className="size-3.5 mr-1" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="size-3.5 mr-1" />
              View Details
            </>
          )}
        </Button>

        {/* Expanded Details */}
        {expanded && (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            {/* URL */}
            {university.url && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Globe className="size-3.5" />
                  Program Website
                </div>
                <a
                  href={university.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-all inline-flex items-center gap-1"
                >
                  {university.url}
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}

            {/* Research Group */}
            {university.researchGroup && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <BookOpen className="size-3.5" />
                  Research Group
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{university.researchGroup}</p>
              </div>
            )}

            {/* Notable Professors */}
            {professors.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <User className="size-3.5" />
                  Notable Professors
                </div>
                <ul className="space-y-0.5">
                  {professors.map((prof, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                      <span className="text-blue-500 mt-0.5">•</span>
                      {prof}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Scholarship Types */}
            {scholarships.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Award className="size-3.5" />
                  Scholarship Types
                </div>
                <div className="flex flex-wrap gap-1">
                  {scholarships.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs font-normal bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Required Documents */}
            {documents.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FileText className="size-3.5" />
                  Required Documents
                </div>
                <ul className="space-y-0.5">
                  {documents.map((doc, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                      <span className="text-blue-500 mt-0.5">☐</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stipend Details */}
            {university.annualStipend && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <DollarSign className="size-3.5" />
                  Funding Details
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                  <div>Annual Stipend: ${university.annualStipend.toLocaleString()}</div>
                  <div>Tuition Waiver: {university.tuitionWaiver ? 'Yes' : 'No'}</div>
                  <div>Health Insurance: {university.healthInsurance ? 'Included' : 'Not included'}</div>
                </div>
              </div>
            )}

            {/* Notes for Nepali Students */}
            {university.notesForNepali && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <MessageSquare className="size-3.5" />
                  Notes for Nepali Students
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/10 rounded-md p-2 border border-amber-100 dark:border-amber-900/30">
                  {university.notesForNepali}
                </p>
              </div>
            )}

            {/* Last Updated */}
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Last updated: {new Date(university.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
