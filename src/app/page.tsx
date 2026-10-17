'use client';

import React from 'react';
import LandingPage from '@/components/views/LandingPage';
import { useApp } from '@/context/AppContext';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  const { notification } = useApp();

  return (
    <>
      <LandingPage />
      {notification && (
        <div className="toast-banner">
          <CheckCircle size={18} color="var(--primary)" />
          <span>{notification}</span>
        </div>
      )}
    </>
  );
}
