import { useEffect, useState } from "react"
import { Button, Card } from "antd"
import { useNavigate } from "react-router-dom"

const QUOTE = "A room without books is like a body without a soul."

export interface Book {
  title: string
  author: string
  description?: string
}

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem("books")
    setBooks(stored ? JSON.parse(stored) : [])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-blue-900 p-8">
      <div className="flex justify-start mb-8">
        <Button type="primary" className="bg-blue-700 hover:bg-blue-800 font-bold text-lg px-6 py-2 rounded-lg shadow" onClick={() => navigate("/add-book")}>+ Add Book</Button>
      </div>
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <blockquote className="text-2xl italic text-blue-200 text-center mb-4">{QUOTE}</blockquote>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, idx) => (
            <Card key={idx} title={book.title} className="shadow-lg border-blue-400">
              <p className="font-semibold text-blue-900">Author: {book.author}</p>
              {book.description && <p className="mt-2 text-slate-700">{book.description}</p>}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
