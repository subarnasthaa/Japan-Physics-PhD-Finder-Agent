'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  BookOpen,
  Award,
  Globe,
  FileText,
  HelpCircle,
  Settings,
  X,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AISettings {
  provider: 'gemini' | 'openai' | 'groq' | 'together' | 'custom'
  apiKey: string
  model: string
  baseUrl: string
}

const PROVIDERS = [
  {
    id: 'gemini' as const,
    name: 'Google Gemini',
    description: 'Free tier available',
    defaultModel: 'gemini-2.0-flash',
    defaultBaseUrl: '',
    getApiKeyUrl: 'https://aistudio.google.com/apikey',
    icon: '✨',
  },
  {
    id: 'openai' as const,
    name: 'OpenAI',
    description: 'GPT-4o, GPT-4o-mini',
    defaultModel: 'gpt-4o-mini',
    defaultBaseUrl: 'https://api.openai.com/v1',
    getApiKeyUrl: 'https://platform.openai.com/api-keys',
    icon: '🤖',
  },
  {
    id: 'groq' as const,
    name: 'Groq',
    description: 'Fast inference, free tier',
    defaultModel: 'llama-3.3-70b-versatile',
    defaultBaseUrl: 'https://api.groq.com/openai/v1',
    getApiKeyUrl: 'https://console.groq.com/keys',
    icon: '⚡',
  },
  {
    id: 'together' as const,
    name: 'Together AI',
    description: 'Open source models',
    defaultModel: 'meta-llama/Llama-3-70b-chat-hf',
    defaultBaseUrl: 'https://api.together.xyz/v1',
    getApiKeyUrl: 'https://api.together.xyz/settings/api-keys',
    icon: '🤝',
  },
  {
    id: 'custom' as const,
    name: 'Custom (OpenAI-compatible)',
    description: 'Any OpenAI-compatible API',
    defaultModel: 'gpt-4o-mini',
    defaultBaseUrl: 'https://api.openai.com/v1',
    getApiKeyUrl: '',
    icon: '🔧',
  },
]

const suggestedPrompts = [
  {
    label: 'Best Japanese universities for physics PhD',
    icon: BookOpen,
    prompt: 'What are the best Japanese universities for physics PhD for a Nepali student? Compare UTokyo, KyotoU, OsakaU, and TohokuU.',
  },
  {
    label: 'MEXT Scholarship guide',
    icon: Award,
    prompt: 'How can Nepali students get MEXT scholarship for a PhD in physics in Japan? Walk me through the application process and requirements.',
  },
  {
    label: 'JSPS Fellowship & funding',
    icon: FileText,
    prompt: 'What is the JSPS Fellowship and how much do PhD students get in Japan? Explain JSPS positions at RIKEN/KEK vs MEXT at universities.',
  },
  {
    label: 'About RIKEN & National Labs',
    icon: Globe,
    prompt: 'Tell me about RIKEN, KEK, and other national research institutes in Japan for physics PhD students. How do the positions and funding work?',
  },
  {
    label: 'IELTS requirements & tips',
    icon: HelpCircle,
    prompt: 'What IELTS score do I need for Japanese PhD programs in physics? Give me the requirements and tips for Nepali students.',
  },
]

const STORAGE_KEY = 'jp-phd-finder-ai-settings'

function loadSettings(): AISettings | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return null
}

function saveSettings(settings: AISettings) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

interface AgentChatTabProps {
  watchlistedIds: string[]
  watchlistedIdsParam: string
}

export default function AgentChatTab({ watchlistedIds }: AgentChatTabProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<AISettings | null>(null)
  const [settingsForm, setSettingsForm] = useState<AISettings>({
    provider: 'gemini',
    apiKey: '',
    model: 'gemini-2.0-flash',
    baseUrl: '',
  })
  const [showApiKey, setShowApiKey] = useState(false)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [apiError, setApiError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load settings on mount
  useEffect(() => {
    const saved = loadSettings()
    if (saved) {
      setSettings(saved)
      setSettingsForm(saved)
    }
    setSessionId(`session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleProviderChange = (provider: AISettings['provider']) => {
    const providerConfig = PROVIDERS.find((p) => p.id === provider)
    setSettingsForm((prev) => ({
      ...prev,
      provider,
      model: providerConfig?.defaultModel || '',
      baseUrl: providerConfig?.defaultBaseUrl || '',
    }))
  }

  const handleSaveSettings = () => {
    if (!settingsForm.apiKey.trim()) return
    const newSettings = { ...settingsForm }
    saveSettings(newSettings)
    setSettings(newSettings)
    setSettingsSaved(true)
    setApiError('')
    setTimeout(() => setSettingsSaved(false), 2000)
    setTimeout(() => setShowSettings(false), 500)
  }

  const handleClearSettings = () => {
    localStorage.removeItem(STORAGE_KEY)
    setSettings(null)
    setSettingsForm({
      provider: 'gemini',
      apiKey: '',
      model: 'gemini-2.0-flash',
      baseUrl: '',
    })
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    // Check if API key is configured
    if (!settings?.apiKey) {
      setShowSettings(true)
      setApiError('Please configure an AI API key first. Google Gemini offers a free tier!')
      return
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setApiError('')

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          sessionId,
          watchlistedIds,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          apiKey: settings.apiKey,
          provider: settings.provider,
          model: settings.model,
          baseUrl: settings.baseUrl,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.error === 'AI_API_KEY_REQUIRED') {
          setShowSettings(true)
          setApiError(data.message)
          setSettings(null)
          return
        }
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-response`,
          role: 'assistant',
          content: data.response || data.error || 'I could not generate a response. Please try again.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        const data = await res.json().catch(() => ({}))
        const errorMsg = data.error || data.message || 'Unknown error'
        setApiError(errorMsg)

        const errorMessage: Message = {
          id: `msg-${Date.now()}-error`,
          role: 'assistant',
          content: `Sorry, there was an error: ${errorMsg}. Please check your API key in Settings.`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch {
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'Network error. Please check your connection and try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt)
  }

  const currentProvider = PROVIDERS.find((p) => p.id === settingsForm.provider)

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Settings Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Settings className="size-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Settings</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Configure your AI provider</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="size-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="size-4 text-gray-500" />
              </button>
            </div>

            {/* Settings Body */}
            <div className="p-6 space-y-5">
              {apiError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                  <AlertCircle className="size-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-700 dark:text-red-400">{apiError}</p>
                </div>
              )}

              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI Provider
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {PROVIDERS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleProviderChange(p.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                        settingsForm.provider === p.id
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <span className="text-lg">{p.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{p.description}</div>
                      </div>
                      {settingsForm.provider === p.id && (
                        <Check className="size-4 text-red-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={settingsForm.apiKey}
                    onChange={(e) => setSettingsForm((prev) => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="Enter your API key..."
                    className="w-full h-10 px-4 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {currentProvider?.getApiKeyUrl && (
                  <a
                    href={currentProvider.getApiKeyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1.5 text-xs text-red-600 hover:text-red-700 dark:text-red-400 hover:underline"
                  >
                    Get {currentProvider.name} API Key →
                  </a>
                )}
              </div>

              {/* Model (for non-Gemini) */}
              {settingsForm.provider !== 'gemini' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Model
                  </label>
                  <input
                    type="text"
                    value={settingsForm.model}
                    onChange={(e) => setSettingsForm((prev) => ({ ...prev, model: e.target.value }))}
                    placeholder={currentProvider?.defaultModel}
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Base URL (for custom) */}
              {settingsForm.provider === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Base URL
                  </label>
                  <input
                    type="text"
                    value={settingsForm.baseUrl}
                    onChange={(e) => setSettingsForm((prev) => ({ ...prev, baseUrl: e.target.value }))}
                    placeholder="https://api.openai.com/v1"
                    className="w-full h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Recommendation box */}
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-700 dark:text-red-300">
                  <strong>💡 Recommended:</strong> Google Gemini offers a generous free tier perfect for this app.
                  Get your free API key at{' '}
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    aistudio.google.com
                  </a>
                </p>
              </div>
            </div>

            {/* Settings Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleClearSettings}
                className="text-xs text-red-500 hover:text-red-600 transition-colors"
              >
                Clear saved settings
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  disabled={!settingsForm.apiKey.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-700 hover:bg-red-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {settingsSaved ? (
                    <>
                      <Check className="size-4" />
                      Saved!
                    </>
                  ) : (
                    'Save & Connect'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="size-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <Bot className="size-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Germany Physics PhD Finder Agent
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-2">
              I can help you find the best PhD programs in Germany, explain DAAD & TV-L E13 funding, Max Planck/Helmholtz positions, and guide you through the application process.
            </p>

            {/* API Key Status */}
            {!settings?.apiKey ? (
              <div className="mb-6 max-w-md">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-sm font-medium transition-colors mx-auto"
                >
                  <Settings className="size-4" />
                  Configure AI API Key (Free)
                </button>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Google Gemini offers a free tier — just sign up and get your key!
                </p>
              </div>
            ) : (
              <div className="mb-4 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                <Check className="size-3.5" />
                Connected to {PROVIDERS.find((p) => p.id === settings.provider)?.name}
              </div>
            )}

            {/* Suggested Prompts */}
            <div className="grid sm:grid-cols-2 gap-2 w-full max-w-lg">
              {suggestedPrompts.map((suggestion) => {
                const Icon = suggestion.icon
                return (
                  <button
                    key={suggestion.label}
                    onClick={() => handleSuggestedPrompt(suggestion.prompt)}
                    disabled={loading || !settings?.apiKey}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left disabled:opacity-50"
                  >
                    <Icon className="size-4 text-red-600 shrink-0" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{suggestion.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="size-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <Bot className="size-4 text-red-600 dark:text-red-400" />
              </div>
            )}
            <div
              className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-red-700 text-white rounded-br-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-red-200' : 'text-gray-400 dark:text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                <User className="size-4 text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="size-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <Bot className="size-4 text-red-600 dark:text-red-400" />
            </div>
            <Card className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 text-red-600 animate-spin" />
                  <Sparkles className="size-4 text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Thinking...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (show when there are messages too) */}
      {messages.length > 0 && messages.length < 3 && !loading && (
        <div className="px-4 md:px-6 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestedPrompts.slice(0, 3).map((suggestion) => (
              <button
                key={suggestion.label}
                onClick={() => handleSuggestedPrompt(suggestion.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors whitespace-nowrap text-xs text-gray-600 dark:text-gray-400"
              >
                <Sparkles className="size-3 text-red-500" />
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 md:px-6">
        {/* API Key Status Bar */}
        {!settings?.apiKey && (
          <div className="mb-2 flex items-center gap-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="size-3.5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400 flex-1">
              API key required to chat
            </p>
            <button
              onClick={() => setShowSettings(true)}
              className="text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400"
            >
              Setup →
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              settings?.apiKey
                ? 'Ask about PhD programs, DAAD, Max Planck, IELTS...'
                : 'Configure API key to start chatting...'
            }
            disabled={loading || !settings?.apiKey}
            className="flex-1 h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim() || !settings?.apiKey}
            className="bg-red-700 hover:bg-red-800 text-white h-10 px-4"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowSettings(true)}
            className="h-10 px-3 border-gray-200 dark:border-gray-700"
            title="AI Settings"
          >
            <Settings className="size-4 text-gray-500" />
          </Button>
        </form>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
          AI Agent can make mistakes. Verify important information with official sources.
        </p>
      </div>
    </div>
  )
}
