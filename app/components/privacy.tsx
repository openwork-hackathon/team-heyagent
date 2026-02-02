'use client'

import { useState } from 'react'

interface PrivacyToggle {
  id: string
  label: string
  description: string
  enabled: boolean
}

// Privacy settings component
export function PrivacySettings() {
  const [settings, setSettings] = useState<PrivacyToggle[]>([
    {
      id: 'share_conversations',
      label: 'Share Conversations',
      description: 'Allow your agent to learn from your conversations',
      enabled: true,
    },
    {
      id: 'public_profile',
      label: 'Public Profile',
      description: 'Others can see your agent in the directory',
      enabled: true,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      description: 'Help improve HeyAgent with anonymous usage data',
      enabled: true,
    },
    {
      id: 'third_party',
      label: 'Third-Party Integrations',
      description: 'Allow connected services to access your agent',
      enabled: false,
    },
  ])

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <span>🔒</span>
        <span>Privacy Settings</span>
      </h3>
      
      <div className="space-y-3">
        {settings.map(setting => (
          <div
            key={setting.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1 mr-4">
              <p className="font-medium text-gray-900 dark:text-white text-sm">
                {setting.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {setting.description}
              </p>
            </div>
            <button
              onClick={() => toggleSetting(setting.id)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                setting.enabled
                  ? 'bg-primary-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  setting.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Your data is encrypted and never sold. <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Learn more</a>
      </p>
    </div>
  )
}

// Single privacy toggle for inline use
export function PrivacyToggle({
  label,
  enabled,
  onChange,
  size = 'md'
}: {
  label: string
  enabled: boolean
  onChange: (enabled: boolean) => void
  size?: 'sm' | 'md'
}) {
  const sizes = {
    sm: { toggle: 'w-8 h-4', dot: 'w-3 h-3', translate: 'translate-x-4', text: 'text-xs' },
    md: { toggle: 'w-11 h-6', dot: 'w-5 h-5', translate: 'translate-x-5', text: 'text-sm' },
  }
  const s = sizes[size]

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative ${s.toggle} rounded-full transition-colors ${
          enabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 ${s.dot} bg-white rounded-full shadow transition-transform ${
            enabled ? s.translate : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`${s.text} text-gray-700 dark:text-gray-300`}>{label}</span>
    </label>
  )
}

// Visibility selector (public/friends/private)
export function VisibilitySelector({
  value,
  onChange
}: {
  value: 'public' | 'friends' | 'private'
  onChange: (value: 'public' | 'friends' | 'private') => void
}) {
  const options = [
    { value: 'public', label: 'Public', icon: '🌐', desc: 'Anyone can see' },
    { value: 'friends', label: 'Friends', icon: '👥', desc: 'Only connections' },
    { value: 'private', label: 'Private', icon: '🔒', desc: 'Only you' },
  ] as const

  return (
    <div className="flex gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${
            value === opt.value
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <span className="text-xl">{opt.icon}</span>
          <p className={`text-sm font-medium mt-1 ${
            value === opt.value
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {opt.label}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</p>
        </button>
      ))}
    </div>
  )
}
