'use client';

import type { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useApp } from '@/context/AppContext';
import { CheckCircle } from 'lucide-react';

export default function WorkspacePage({ children }: { children: ReactNode }) {
  const { notification } = useApp();
  return <div className="app-container"><Sidebar /><div className="main-content"><Header /><main className="page-body">{children}</main></div>{notification && <div className="toast-banner"><CheckCircle size={18} color="var(--primary)" /><span>{notification}</span></div>}</div>;
}
