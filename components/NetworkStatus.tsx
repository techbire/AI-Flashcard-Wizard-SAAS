'use client'

import { useState, useEffect } from 'react'

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)
      
      if (!online) {
        setShowOfflineMessage(true)
      } else if (showOfflineMessage) {
        // Show "back online" message briefly
        setTimeout(() => setShowOfflineMessage(false), 3000)
      }
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Initial check
    updateOnlineStatus()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [showOfflineMessage])

  if (!showOfflineMessage) return null

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      isOnline 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          isOnline ? 'bg-green-200' : 'bg-red-200'
        }`} />
        <span className="text-sm font-medium">
          {isOnline ? 'Back online!' : 'You are offline'}
        </span>
      </div>
      {!isOnline && (
        <p className="text-xs mt-1 opacity-90">
          Some features may not work properly
        </p>
      )}
    </div>
  )
}
