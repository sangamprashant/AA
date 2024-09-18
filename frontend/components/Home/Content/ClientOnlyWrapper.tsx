import React, { Suspense } from 'react';
import LoadingUI from '@/components/LoadingUI';

const ClientOnlyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingUI />}>
      {children}
    </Suspense>
  );
};

export default ClientOnlyWrapper;