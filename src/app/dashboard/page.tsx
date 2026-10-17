'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardView from '@/components/views/DashboardView';
import ClickUpView from '@/components/views/ClickUpView';
import GitHubView from '@/components/views/GitHubView';
import ChatView from '@/components/views/ChatView';
import CreateTaskModal from '@/components/modals/CreateTaskModal';
import CreateTeamModal from '@/components/modals/CreateTeamModal';
import { CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const { activeView, notification } = useApp();

  return (
    <div className="app-container">
      {/* Left Sidebar (Materio style) */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="main-content">
        {/* Top Header */}
        <Header />

        {/* Dynamic Page Body */}
        <main className="page-body">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'clickup' && <ClickUpView />}
          {activeView === 'github' && <GitHubView />}
          {activeView === 'chat' && <ChatView />}
        </main>
      </div>

      {/* Modals */}
      <CreateTaskModal />
      <CreateTeamModal />

      {/* Floating Toast Notification */}
      {notification && (
        <div className="toast-banner">
          <CheckCircle size={18} color="var(--primary)" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}
