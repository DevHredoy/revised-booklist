import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database'

export async function GET() {
  try {
    const db = getDatabase()
    
    // Return database contents (excluding password hashes for security)
    const safeUsers = db.users.map(user => ({
      id: user.id,
      username: user.username,
      created_at: user.created_at
    }))

    return NextResponse.json({
      users: safeUsers,
      books: db.books,
      stats: {
        totalUsers: db.users.length,
        totalBooks: db.books.length
      }
    })
  } catch (error) {
    console.error('Database debug error:', error)
    return NextResponse.json(
      { error: 'Failed to read database' },
      { status: 500 }
    )
  }
}
