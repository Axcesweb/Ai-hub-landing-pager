'use client'

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check localStorage and system preference
    const stored = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme: Theme = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const toggleTheme = (newTheme?: Theme) => {
    const themeToApply = newTheme || (theme === 'light' ? 'dark' : 'light')
    setTheme(themeToApply)
    applyTheme(themeToApply)
    localStorage.setItem('theme', themeToApply)
  }

  const applyTheme = (themeToApply: Theme) => {
    const html = document.documentElement
    if (themeToApply === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  return { theme, toggleTheme, mounted }
}
