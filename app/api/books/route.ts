import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, saveDatabase } from '@/lib/database'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// GET /api/books - Get user's books
export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const db = getDatabase()
    const userBooks = db.books.filter(book => book.user_id === payload.userId)

    return NextResponse.json({ books: userBooks })
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/books - Add new book
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { title, author, description } = await request.json()

    if (!title || !author) {
      return NextResponse.json(
        { error: 'Title and author are required' },
        { status: 400 }
      )
    }

    const db = getDatabase()
    const newBook = {
      id: Math.max(...db.books.map(b => b.id), 0) + 1,
      user_id: payload.userId,
      title,
      author,
      description: description || '',
      created_at: new Date().toISOString()
    }

    db.books.push(newBook)
    saveDatabase()

    return NextResponse.json({ 
      message: 'Book added successfully', 
      book: newBook 
    }, { status: 201 })
  } catch (error) {
    console.error('Error adding book:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
