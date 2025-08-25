"use client"

// Simple toast implementation to avoid dependency conflicts
const Toaster = () => {
  return null // We'll implement simple alerts instead of complex toasts for now
}

// Export toast functions that use browser alerts temporarily
export const toast = {
  success: (message: string) => {
    if (typeof window !== 'undefined') {
      alert(`✅ ${message}`)
    }
  },
  error: (message: string) => {
    if (typeof window !== 'undefined') {
      alert(`❌ ${message}`)
    }
  },
  info: (message: string) => {
    if (typeof window !== 'undefined') {
      alert(`ℹ️ ${message}`)
    }
  }
}

export { Toaster }