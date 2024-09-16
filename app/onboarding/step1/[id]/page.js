import HeaderSection from "@/components/HeaderSection"
import OnboardingStep from "@/components/OnboardingStep" 

export default function OnboardingStep1() {
  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  ]

  return (
    <div>
        <HeaderSection/>
        <OnboardingStep
          title="Empower your professional growth"
          fields={fields}
          nextStep="/onboarding/step2"
        />
    </div>
  )
}