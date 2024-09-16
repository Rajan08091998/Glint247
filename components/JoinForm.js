'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setToken } from '@/utils/auth'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function JoinForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // State for password visibility
  const router = useRouter()

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    // If token exists, redirect to dashboard
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('/api/auth/register', { username: email, password });
      setToken(resp.data.token)
      localStorage.setItem(email, JSON.stringify({
        username: email,
        password: resp.data.password,
      }))
      router.push(`/onboarding/step1/${email}`)
    } catch (err) {
      console.error(err);
    }

    console.log('Join attempt', { email, password, rememberMe })
  }

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">Join Us</h2>
        <p className="text-gray-600 mb-6 text-center">Empower your professional growth</p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email or phone number</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password (8+ characters)</label>
          <input
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center justify-center"
          >
            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </button>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Remember me</label>
        </div>

        <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-150 ease-in-out">
          Agree & Join
        </button>

        <p className="text-sm text-gray-600 text-center mb-4">
          By continuing, you agree to Glint 247’s <a href="#" className="text-orange-500 hover:text-orange-600">user agreement</a> and <a href="#" className="text-orange-500 hover:text-orange-600">privacy policy</a>.
        </p>

        <div className="text-center">
          <a href="/login" className="text-orange-500 hover:text-orange-600">Already on Glint 247? Sign in</a>
        </div>
      </form>
    </div>
  )
}
