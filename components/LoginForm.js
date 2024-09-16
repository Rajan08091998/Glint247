'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { setToken } from '@/utils/auth'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            router.push('/dashboard')
        }
    }, [router])

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Login attempt', { email, password })
        const profile = JSON.parse(localStorage.getItem(email))
        console.log(profile)

        try {
            const response = await axios.post('/api/auth/login', {
                username: email,
                password,
                user_name: profile.user_name,
                user_password: profile.password
            })

            if (response.status !== 200) {
                alert('Invalid Credentials')
                return
            }

            setToken(response.data.token)
            router.push('/dashboard')
        } catch (err) {
            console.error(err)
            alert('Invalid Credentials')
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className="flex justify-center items-center mt-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">Sign In</h2>
                <p className="text-gray-600 mb-6 text-center">Keep a pulse on your industry.</p>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email or phone number</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email or phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                    />
                </div>

                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pt-4 pr-3 flex items-center"
                    >
                        {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                    </button>
                </div>

                <div className="flex justify-between mb-6">
                    <a href="#" className="text-sm text-orange-500 hover:text-orange-600">Forgot Password?</a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-150 ease-in-out"
                >
                    Sign In
                </button>

                <p className="text-sm text-gray-600 text-center mb-4">
                    By continuing, you agree to Glint 247's <a href="#" className="text-orange-500 hover:text-orange-600">user agreement</a> and <a href="#" className="text-orange-500 hover:text-orange-600">privacy policy</a>.
                </p>

                <div className="text-center">
                    <a href="/join" className="text-orange-500 hover:text-orange-600">New to Glint 247? Join Now.</a>
                </div>
            </form>
        </div>
    )
}
