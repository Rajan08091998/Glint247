'use client'

import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push('/login'); // Redirect to login if not authenticated
    }
    setLoading(false); // Stop loading when check is complete
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking authentication
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
