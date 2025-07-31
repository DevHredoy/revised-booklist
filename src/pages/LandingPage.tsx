import { Navigate } from 'react-router-dom'

export const LandingPage = () => {
  // Route protection: Only show if logged in
  if (localStorage.getItem("isLoggedIn") !== "true") {
    return <Navigate to="/login" replace />
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-slate-800">
      <div className="bg-white/90 p-10 rounded-xl shadow-2xl w-full max-w-lg border border-blue-400">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Welcome to the Booklist Landing Page</h1>
        <p className="text-lg text-center text-blue-900">You are successfully logged in!</p>
      </div>
    </div>
  )
}