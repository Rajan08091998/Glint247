import Image from 'next/image'

export default function LandingPage({ imageSrc, title, subtitle, children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src={imageSrc}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  )
}