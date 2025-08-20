'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, message } from 'antd'
import { useAuth } from '@/lib/auth-context'

interface LoginFormValues {
  username: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const { login, user, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Redirect if already logged in
    if (user && !isLoading) {
      router.push('/hp')
    }
  }, [user, isLoading, router])

  const onFinish = async (values: LoginFormValues) => {
    setIsSubmitting(true)
    try {
      const success = await login(values.username, values.password)
      if (success) {
        message.success('Login successful!')
        router.push('/hp')
      } else {
        message.error('Invalid username or password')
      }
    } catch (error) {
      message.error('Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onFinishFailed = () => {
    message.error('Please fill in all fields correctly.')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-800 to-blue-900">
      <div className="bg-white/90 p-10 rounded-xl shadow-2xl w-full max-w-md border border-blue-400">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Login to Booklist</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="text-blue-900 font-semibold">Username</span>}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input className="bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-500"/>
          </Form.Item>
          <Form.Item
            label={<span className="text-blue-900 font-semibold">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className="bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-500"/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="bg-blue-700 hover:bg-blue-800 w-full"
              loading={isSubmitting}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
