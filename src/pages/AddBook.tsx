import { Form, Input, Button, message } from "antd"
import { Navigate, useNavigate } from "react-router-dom"
import type { Book } from "./BookList"

export const AddBook = () => {
  const navigate = useNavigate()

  // Protect the page - redirect to login if not authenticated
  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <Navigate to="/login" replace />
  }

  const onFinish = (values: Book) => {
    const stored = localStorage.getItem("books")
    const books = stored ? JSON.parse(stored) : []
    books.push(values)
    localStorage.setItem("books", JSON.stringify(books))
    message.success("Book added successfully!")
    navigate("/books")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-blue-900">
      <div className="bg-white/90 p-10 rounded-xl shadow-2xl w-full max-w-md border border-blue-400">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Add a New Book</h2>
        <Form name="addBookForm" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the book title!' }]}> 
            <Input /> 
            </Form.Item>
          <Form.Item label="Author" name="author" rules={[{ required: true, message: 'Please enter the author!' }]}> 
            <Input /> 
            </Form.Item>
          <Form.Item label="Description" name="description"> 
            <Input.TextArea rows={3} /> 
            </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Book</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
