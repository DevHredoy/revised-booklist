'use client'

import { useEffect, useState } from 'react'
import { Card, Table } from 'antd'

interface DatabaseStats {
  users: Array<{
    id: number
    username: string
    created_at: string
  }>
  books: any[]
  stats: {
    totalUsers: number
    totalBooks: number
  }
}

export default function DebugPage() {
  const [data, setData] = useState<DatabaseStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/debug/database')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load database stats:', err)
        setLoading(false)
      })
  }, [])

  const userColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at' }
  ]

  if (loading) return <div>Loading database stats...</div>

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Database Debug View</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="Statistics">
          <p>Total Users: {data?.stats.totalUsers}</p>
          <p>Total Books: {data?.stats.totalBooks}</p>
        </Card>
      </div>

      <Card title="Users" className="mb-6">
        <Table 
          dataSource={data?.users} 
          columns={userColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Books">
        {data?.books.length === 0 ? (
          <p>No books in database yet</p>
        ) : (
          <pre>{JSON.stringify(data?.books, null, 2)}</pre>
        )}
      </Card>
    </div>
  )
}
