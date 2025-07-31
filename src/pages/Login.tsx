import { Form, Input, Button, message } from "antd"
import { useNavigate } from "react-router-dom"
import "../App.css"
import { useEffect } from "react"

// Demo credentials (never do this in production)
const DEMO_USER = {
  userName: "demo",
  loginpass: "password123"
}

const onFinish = (values: any, navigate: any) => {
  if (
    values.userName === DEMO_USER.userName &&
    values.loginpass === DEMO_USER.loginpass
  ) {
    localStorage.setItem("isLoggedIn", "true")
    message.success("Login successful!")
    navigate("/hp")
  } else {
    message.error("Invalid username or password")
  }
}

const onFinishFailed = () => {
  message.error("Please fill in all fields correctly.")
}

export const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/hp")
    }
  }, [navigate])

  return (
    <div id="layer3" className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-800 to-blue-900">
      <div id="layer2" className="bg-white/90 p-10 rounded-xl shadow-2xl w-full max-w-md border border-blue-400">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Login to Booklist</h2>
        <Form
          id="layer1"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={(values) => onFinish(values, navigate)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="text-blue-900 font-semibold">User Name</span>}
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input className="bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-500"/>
          </Form.Item>
          <Form.Item
            label={<span className="text-blue-900 font-semibold">Password</span>}
            name="loginpass"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className="bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-500"/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-blue-700 hover:bg-blue-800 w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}