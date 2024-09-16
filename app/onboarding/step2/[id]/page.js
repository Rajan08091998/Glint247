'use client'
import HeaderSection from "@/components/HeaderSection"
import OnboardingStep from "@/components/OnboardingStep" 
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function OnboardingStep2() {
  const [user, setUser] = useState(null)
  const params = useParams();

  useEffect(() => {
    const userId = params.id.replace('%40','@')
    const storedUser = JSON.parse(localStorage.getItem(userId))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [params.id])

  const fields = [
    { name: 'region_country', label: 'Country/Region*', type: 'text', required: true },
    { name: 'city_district', label: 'City/District*', type: 'text', required: true },
  ]

  if (!user) {
    return <p>Loading...</p> // Or a loading spinner/message
  }

  return (
    <div>
      <HeaderSection/>
      <OnboardingStep
        title={`Welcome ${user.firstName}!`}
        fields={fields}
        subtitle="Connect with your community through people, jobs, and much more. "
      />
    </div>
  )
}
