
import React from 'react';
import AuthWrapper from '@/components/AuthWrapper';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <AuthWrapper requireAuth={true}>
      {children}
    </AuthWrapper>
  );
};

export default ProtectedRoute;
