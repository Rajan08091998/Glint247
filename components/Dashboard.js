'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-8">Welcome to Your Dashboard</h1>

      {/* Logout button */}
      <div className="mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Profile" link="/profile">
          View and edit your profile information
        </DashboardCard>
        <DashboardCard title="Settings" link="/settings">
          Manage your account settings
        </DashboardCard>
        <DashboardCard title="Messages" link="/messages">
          Check your latest messages
        </DashboardCard>
        <DashboardCard title="Analytics" link="/analytics">
          View your performance analytics
        </DashboardCard>
        {/* Add more cards here if needed */}
      </div>
    </div>
  );
}

function DashboardCard({ title, children, link }) {
  return (
    <Link href={link} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-semibold text-orange-500 mb-2">{title}</h2>
        <p className="text-gray-700">{children}</p>
      </div>
    </Link>
  );
}
