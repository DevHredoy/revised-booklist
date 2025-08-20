'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, message } from 'antd'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/lib/auth-context'

const QUOTE = "A room without books is like a body without a soul."

export interface Book {
  id: number
  user_id: number
  title: string
  author: string
  description?: string
  created_at: string
}

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      fetchBooks()
    }
  }, [token])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBooks(data.books)
      } else {
        message.error('Failed to load books')
      }
    } catch (error) {
      console.error('Error fetching books:', error)
      message.error('Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  const removeBook = async (bookId: number) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setBooks(books.filter(book => book.id !== bookId))
        message.success('Book deleted successfully')
      } else {
        message.error('Failed to delete book')
      }
    } catch (error) {
      console.error('Error deleting book:', error)
      message.error('Failed to delete book')
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-blue-900 p-8">
        <div className="flex justify-between items-center mb-8">
          <Button 
            type="primary" 
            className="bg-blue-700 hover:bg-blue-800 font-bold text-lg px-6 py-2 rounded-lg shadow" 
            onClick={() => router.push("/add-book")}
          >
            + Add Book
          </Button>
          <Button 
            type="default" 
            onClick={() => router.push("/hp")}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            Back to Home
          </Button>
        </div>
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <blockquote className="text-2xl italic text-blue-200 text-center mb-4">
              {QUOTE}
            </blockquote>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card
                key={book.id}
                title={book.title}
                className="shadow-lg border-blue-400"
                extra={
                  <Button
                    type="text"
                    danger
                    size="small"
                    onClick={() => removeBook(book.id)}
                  >
                    Delete
                  </Button>
                }
              >
                <p><strong>Author:</strong> {book.author}</p>
                {book.description && (
                  <p><strong>Description:</strong> {book.description}</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
