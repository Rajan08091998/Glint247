import Image from "next/image"

export default function HeaderSection() {

    return (
        <header class="flex flex-col items-center py-4 ">
            <Image
                src="/images/logo.png"
                alt="GLINT Logo"
                class="w-32 h-10"
                width={120} // Adjust width as needed
                height={40} // Adjust height as needed
            />
            <div class="mt-2 text-lg text-gray-700">
                Hub For Creative Minds
            </div>
        </header>
    )
}