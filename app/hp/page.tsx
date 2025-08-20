'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, message } from 'antd'
import { useAuth } from '@/lib/auth-context'

export default function LandingPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user && !isLoading) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    message.info('Logged out successfully.')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-slate-800">
      <div className="bg-white/90 p-10 rounded-xl shadow-2xl w-full max-w-lg border border-blue-400">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Welcome to the Booklist Landing Page
        </h1>
        <p className="text-lg text-center text-blue-900 mb-4">
          Hello, {user.username}! You are successfully logged in!
        </p>
        <div className="flex gap-4 justify-center mb-4">
          <Button 
            type="primary" 
            onClick={() => router.push('/books')}
            className="bg-blue-700 hover:bg-blue-800"
          >
            View Books
          </Button>
          <Button 
            type="default" 
            onClick={() => router.push('/add-book')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add Book
          </Button>
        </div>
        <div className="text-center">
          <Button 
            type="default" 
            onClick={handleLogout} 
            className="w-full bg-slate-200 hover:bg-slate-300 text-green-600 font-semibold"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
