'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, message } from 'antd'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/lib/auth-context'

interface BookFormValues {
  title: string
  author: string
  description?: string
}

export default function AddBookPage() {
  const router = useRouter()
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: BookFormValues) => {
    setLoading(true)
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        message.success("Book added successfully!")
        router.push("/books")
      } else {
        const error = await response.json()
        message.error(error.error || 'Failed to add book')
      }
    } catch (error) {
      console.error('Error adding book:', error)
      message.error('Failed to add book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-blue-900">
        <div className="bg-white/90 p-10 rounded-xl shadow-2xl w-full max-w-md border border-blue-400">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Add a New Book</h2>
          <Form name="addBookForm" layout="vertical" onFinish={onFinish}>
            <Form.Item 
              label="Title" 
              name="title" 
              rules={[{ required: true, message: 'Please enter the book title!' }]}
            > 
              <Input /> 
            </Form.Item>
            <Form.Item 
              label="Author" 
              name="author" 
              rules={[{ required: true, message: 'Please enter the author!' }]}
            > 
              <Input /> 
            </Form.Item>
            <Form.Item label="Description" name="description"> 
              <Input.TextArea rows={3} /> 
            </Form.Item>
            <Form.Item>
              <div className="flex gap-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="flex-1 bg-blue-700 hover:bg-blue-800"
                >
                  Add Book
                </Button>
                <Button 
                  type="default" 
                  onClick={() => router.push("/books")}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ProtectedRoute>
  )
}
