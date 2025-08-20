import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, saveDatabase } from '@/lib/database'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// DELETE /api/books/[id] - Delete a book
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const bookId = parseInt(params.id)
    if (isNaN(bookId)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 })
    }

    const db = getDatabase()
    const bookIndex = db.books.findIndex(
      book => book.id === bookId && book.user_id === payload.userId
    )

    if (bookIndex === -1) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    // Remove the book
    db.books.splice(bookIndex, 1)
    saveDatabase()

    return NextResponse.json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
