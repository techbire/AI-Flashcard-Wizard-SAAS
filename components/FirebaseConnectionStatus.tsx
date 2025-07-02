'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import firebaseOperations from '@/lib/firebaseOperations'

export default function FirebaseConnectionStatus() {
    const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
    const [error, setError] = useState<string | null>(null)
    const [isRetrying, setIsRetrying] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const testConnection = async () => {
        setConnectionStatus('checking')
        setError(null)
        
        try {
            await firebaseOperations.testConnection()
            setConnectionStatus('connected')
            setError(null)
            setShowSuccess(true)
            // Hide the success notification after 3 seconds
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
        } catch (err) {
            setConnectionStatus('error')
            setError(err instanceof Error ? err.message : 'Unknown error')
        }
    }

    const retryConnection = async () => {
        setIsRetrying(true)
        await testConnection()
        setIsRetrying(false)
    }

    useEffect(() => {
        testConnection()
    }, [])

    if (connectionStatus === 'connected' && showSuccess) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                    <span className="text-sm font-medium">Firebase Connected</span>
                </div>
            </div>
        )
    }

    if (connectionStatus === 'checking') {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Checking Firebase...</span>
                </div>
            </div>
        )
    }

    if (connectionStatus === 'error') {
        return (
            <div className="fixed bottom-4 right-4 z-50 max-w-sm">
                <Card className="bg-red-50 border-red-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-red-700 text-sm flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Firebase Connection Issue</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <p className="text-red-600 text-xs mb-3">
                            {error?.includes('transport') || error?.includes('400') 
                                ? 'Connection blocked (likely adblocker or firewall)' 
                                : error}
                        </p>
                        <div className="space-y-2">
                            <Button 
                                size="sm" 
                                onClick={retryConnection}
                                disabled={isRetrying}
                                className="w-full"
                            >
                                {isRetrying ? 'Retrying...' : 'Retry Connection'}
                            </Button>
                            <div className="text-xs text-gray-600">
                                <p>Common fixes:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Disable adblocker</li>
                                    <li>Check firewall settings</li>
                                    <li>Try different network</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return null
}
