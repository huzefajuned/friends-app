import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import React from 'react'

const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login, error } = useStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(username, password)
    const isAuth= await  useStore.getState().isAuthenticated;

    // console.log('isAuth',isAuth)
    if ( await useStore.getState().isAuthenticated) {
      navigate('/');
    }
   
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Sign in to your account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      <div className="mt-4 text-center">
        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  )
}

export default Login

