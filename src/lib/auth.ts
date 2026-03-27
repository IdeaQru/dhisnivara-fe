'use client'

import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  apiKey: string
  role: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    console.log('=== AUTH HOOK - useAuth ===')
    console.log('1. token from localStorage:', token)
    console.log('2. userStr from localStorage:', userStr)
    console.log('3. Type of userStr:', typeof userStr)

    if (token && userStr) {
      try {
        const parsedUser = JSON.parse(userStr)
        console.log('4. Parsed user object:', parsedUser)
        console.log('5. Parsed user.role:', parsedUser.role)
        console.log('6. Type of parsed user.role:', typeof parsedUser.role)
        console.log('7. parsedUser.role === "admin":', parsedUser.role === 'admin')
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }

    console.log('========================')
    setLoading(false)
  }, [])

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('apiKey', userData.apiKey)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return { user, loading, login, logout }
}

export function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

export function getApiKey() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('apiKey')
  }
  return null
}

export function isAuthenticated() {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token')
  }
  return false
}
