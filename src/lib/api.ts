// API configuration
// Automatically detect the API URL based on current origin
// Works in both development and production, regardless of port
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side: use environment variable or default to port 3018
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3018/api'
  }

  // Client-side: use relative path to automatically use current origin
  // This will work with ANY port (3018, 5000, etc.)
  return '/api'
}

const API_BASE_URL = getApiBaseUrl()

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

// Helper function to get API key
const getApiKey = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('apiKey')
  }
  return null
}

// Generic fetch wrapper
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }

  return data
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  register: async (name: string, email: string, password: string, phone?: string) => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phone }),
    })
  },

  getProfile: async () => {
    return fetchAPI('/auth/me')
  },

  regenerateApiKey: async () => {
    return fetchAPI('/auth/regenerate-api-key', {
      method: 'POST',
    })
  },
}

// Locations API
export const locationsAPI = {
  getAll: async () => {
    return fetchAPI('/locations')
  },

  getById: async (id: string) => {
    return fetchAPI(`/locations/${id}`)
  },

  create: async (data: any) => {
    return fetchAPI('/locations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: any) => {
    return fetchAPI(`/locations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return fetchAPI(`/locations/${id}`, {
      method: 'DELETE',
    })
  },

  getSensorDeviceIds: async (id: string) => {
    return fetchAPI(`/locations/${id}/sensor-device-ids`)
  },

  updateIrrigation: async (id: string, settings: { mode?: string; schedule?: string }) => {
    return fetchAPI(`/locations/${id}/irrigation`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    })
  },
}

// Sensors API
export const sensorsAPI = {
  submitData: async (data: any, apiKey: string) => {
    return fetch(`${API_BASE_URL}/sensors/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
  },

  getLatest: async (locationId: string) => {
    return fetchAPI(`/sensors/location/${locationId}/latest`)
  },

  getHistory: async (locationId: string, params?: { sensorType?: string; hours?: number }) => {
    const queryParams = new URLSearchParams(params as any).toString()
    return fetchAPI(`/sensors/location/${locationId}/history?${queryParams}`)
  },

  getSummary: async (locationId: string, hours?: number) => {
    const queryParams = hours ? `?hours=${hours}` : ''
    return fetchAPI(`/sensors/location/${locationId}/summary${queryParams}`)
  },

  getAggregate: async (hours?: number) => {
    const queryParams = hours ? `?hours=${hours}` : ''
    return fetchAPI(`/sensors/aggregate${queryParams}`)
  },
}

// Harvest API
export const harvestAPI = {
  getAll: async (params?: { locationId?: string; startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams(params as any).toString()
    return fetchAPI(`/harvest?${queryParams}`)
  },

  getById: async (id: string) => {
    return fetchAPI(`/harvest/${id}`)
  },

  create: async (data: any) => {
    return fetchAPI('/harvest', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: any) => {
    return fetchAPI(`/harvest/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return fetchAPI(`/harvest/${id}`, {
      method: 'DELETE',
    })
  },

  getDailySummary: async (params?: { startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams(params as any).toString()
    return fetchAPI(`/harvest/summary/daily?${queryParams}`)
  },

  getLocationSummary: async (locationId: string, days?: number) => {
    const queryParams = days ? `?days=${days}` : ''
    return fetchAPI(`/harvest/summary/location/${locationId}${queryParams}`)
  },
}

// Finance API
export const financeAPI = {
  getOverview: async (period?: string) => {
    const queryParams = period ? `?period=${period}` : ''
    return fetchAPI(`/finance/overview${queryParams}`)
  },

  getIncome: async (params?: { locationId?: string; startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams(params as any).toString()
    return fetchAPI(`/finance/income?${queryParams}`)
  },

  getExpenses: async (params?: { category?: string; startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams(params as any).toString()
    return fetchAPI(`/finance/expenses?${queryParams}`)
  },

  createExpense: async (data: any) => {
    return fetchAPI('/finance/expenses', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  updateExpense: async (id: string, data: any) => {
    return fetchAPI(`/finance/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  deleteExpense: async (id: string) => {
    return fetchAPI(`/finance/expenses/${id}`, {
      method: 'DELETE',
    })
  },

  getExpensesByCategory: async (params?: { startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams(params as any).toString()
    return fetchAPI(`/finance/expenses/by-category?${queryParams}`)
  },

  getTrend: async (days?: number) => {
    const queryParams = days ? `?days=${days}` : ''
    return fetchAPI(`/finance/trend${queryParams}`)
  },

  getExportData: async (params?: { startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams(params as any).toString()
    return fetchAPI(`/finance/export?${queryParams}`)
  },
}

export { API_BASE_URL }
