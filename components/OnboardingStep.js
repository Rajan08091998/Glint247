'use client'

import { useParams, useRouter } from 'next/navigation'

export default function OnboardingStep({ title,subtitle, fields, nextStep }) {
  const router = useRouter()
  const params = useParams()
  const id = params.id.replace('%40','@')
  let user = JSON.parse(localStorage.getItem(id))

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log('Step data:', data)
    // Here you would typically save this data
    let user = JSON.parse(localStorage.getItem(id)) || {}
    localStorage.setItem(id, JSON.stringify({...user, ...data}))
    {nextStep ? router.push(`${nextStep}/${id}`) : router.push('/dashboard')}
  }

  return (
    <div>
    <h1 className="text-2xl font-bold  mb-6 text-center">{title}</h1>
    {subtitle && <p className='text-xm mb-6 text-center'>{subtitle}</p>}
    <div className="flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-150 ease-in-out">
            Continue
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
