'use client'

import { useState } from 'react'
import Header from '@/components/header'
import DashboardTab from '@/components/dashboard-tab'
import UniversitiesTab from '@/components/universities-tab'
import NationalLabsTab from '@/components/national-labs-tab'
import MEXTGuideTab from '@/components/mext-guide-tab'
import WatchlistTab from '@/components/watchlist-tab'
import AlertsTab from '@/components/alerts-tab'
import AgentChatTab from '@/components/agent-chat-tab'
import { useWatchlist } from '@/hooks/use-watchlist'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { watchlistedIds, toggleWatchlist, isWatchlisted, watchlistedIdsParam } = useWatchlist()

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab onNavigate={setActiveTab} watchlistedIdsParam={watchlistedIdsParam} />
      case 'universities':
        return <UniversitiesTab watchlistedIdsParam={watchlistedIdsParam} toggleWatchlist={toggleWatchlist} isWatchlisted={isWatchlisted} />
      case 'national-labs':
        return <NationalLabsTab onNavigate={setActiveTab} watchlistedIdsParam={watchlistedIdsParam} />
      case 'mext-guide':
        return <MEXTGuideTab />
      case 'watchlist':
        return <WatchlistTab watchlistedIds={watchlistedIds} toggleWatchlist={toggleWatchlist} onNavigate={setActiveTab} watchlistedIdsParam={watchlistedIdsParam} />
      case 'alerts':
        return <AlertsTab onNavigate={setActiveTab} watchlistedIdsParam={watchlistedIdsParam} />
      case 'agent':
        return <AgentChatTab watchlistedIds={watchlistedIds} watchlistedIdsParam={watchlistedIdsParam} />
      default:
        return <DashboardTab onNavigate={setActiveTab} watchlistedIdsParam={watchlistedIdsParam} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {renderTab()}
      </main>
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Japan Physics PhD Finder | Built for Nepali Students | MEXT Covers Everything 🇯🇵
          </p>
        </div>
      </footer>
    </div>
  )
}
