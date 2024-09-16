'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaLongArrowAltLeft } from 'react-icons/fa'; // Arrow icons
import { useSwipeable } from 'react-swipeable'; // Swipeable hook
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const frames = [
    {
        src: '/images/frame3.png',
        alt: 'Frame 3',
        title: 'Be a part of GLINT 247 today!',
        subtitle: 'You are the power of this community.',
        buttonText1: 'SIGN IN',
        buttonText2: 'JOIN NOW',
        url1: "/login",
        alreadyMember: 'Already a Member?',
        newMember: 'New To Glint 247?',
        url2: "/join",
    },
    {
        src: '/images/frame4.png',
        alt: 'Frame 4',
        title: 'Join now. Meet other professionals!',
        subtitle: 'The one you are looking for, is here.',
        showArrowsOnly: true, // Special behavior for arrows only
    },
    {
        src: '/images/frame5.png',
        alt: 'Frame 5',
        title: 'A hassle-free future is in your hands!',
        subtitle: 'Send us the feedback, and we will be working for you.',
        showArrowsOnly: true, // Special behavior for arrows only
    },
];

const SlideSection = () => {
    const router = useRouter();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
    
        // If token exists, redirect to dashboard
        if (token) {
          router.push('/dashboard');
        }
    }, [router]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % frames.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + frames.length) % frames.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Swipeable configuration
    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrev(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true // Allow swipe detection with mouse
    });

    return (
        <div className="relative w-full flex flex-col items-center py-8">
            <div className="relative w-full max-w-4xl h-[30rem] rounded-lg overflow-hidden shadow-lg">
                {/* Background Image */}
                <Image
                    src={frames[currentIndex].src}
                    alt={frames[currentIndex].alt}
                    fill
                    className="object-cover"
                />
                {/* Card Overlay */}
                <div {...handlers} className="absolute inset-0 flex items-center justify-start pl-10">
                    {/* Card Content */}
                    <div className="bg-white p-4 rounded-lg shadow-md" style={{ width: '250px', height: '350px' }}>
                        {/* Slide Progress Bar */}
                        <div className="w-full flex justify-center items-center h-2 bg-gray-300 rounded-full mb-4">
                            {frames.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 rounded-full ${currentIndex === index && 'bg-orange-500'}`}
                                    style={{ width: `${100 / frames.length}%` }}
                                />
                            ))}
                        </div>

                        {/* Content based on the frame */}
                        <h2 className="text-2xl font-bold text-orange-500 mb-2 text-center">
                            {frames[currentIndex].title}
                        </h2>
                        <p className="text-gray-700 text-center mb-4 text-xs">{frames[currentIndex].subtitle}</p>
                        
                        {/* Frame 3: Show Sign In and Join Now buttons */}
                        {!frames[currentIndex].showArrowsOnly && (
                            <>
                                {frames[currentIndex].alreadyMember &&
                                    <>
                                        <p className="text-sm text-gray-500 mb-1 text-center">
                                            {frames[currentIndex].alreadyMember}
                                        </p>
                                        <Link href={frames[currentIndex].url1} passHref>
                                            <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-md mb-3">
                                                {frames[currentIndex].buttonText1}
                                            </button>
                                        </Link>
                                    </>
                                }
                                {frames[currentIndex].newMember &&
                                    <>
                                        <p className="text-sm text-gray-500 mb-1 text-center">
                                            {frames[currentIndex].newMember}
                                        </p>
                                        <Link href={frames[currentIndex].url2} passHref>
                                            <button className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded-md">
                                                {frames[currentIndex].buttonText2}
                                            </button>
                                        </Link>
                                    </>
                                }
                            </>
                        )}

                        {/* Frame 4 & Frame 5: Show navigation arrows only */}
                        {frames[currentIndex].showArrowsOnly && (
                            <div className="flex flex-col items-center mt-4">
                                <div className="flex space-x-4">
                                    <button
                                        className="text-gray-700 p-2 hover:bg-gray-100 rounded-full"
                                        onClick={handlePrev}
                                    >
                                        <FaLongArrowAltLeft />
                                    </button>
                                    <button
                                        className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Dots for navigation */}
                        <div className="flex justify-center mt-4 space-x-2">
                            {frames.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-orange-500' : 'bg-gray-400'}`}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideSection;
