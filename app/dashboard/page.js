import Dashboard from '@/components/Dashboard'
import HeaderSection from '@/components/HeaderSection'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardPage(){
  return (
    <ProtectedRoute>

      <HeaderSection />
      <Dashboard />
    </ProtectedRoute>
  );
};
