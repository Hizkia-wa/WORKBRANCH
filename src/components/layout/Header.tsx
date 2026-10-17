'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Moon,
  Sun,
  Bell,
  Plus,
  Star,
  CheckCircle,
  Clock,
  Sparkles,
  Globe,
} from 'lucide-react';
import Image from 'next/image';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Header() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
    setIsCreateTaskModalOpen,
    setIsLandingPage,
    members,
    clickUpTasks,
    gitHubTasks,
    showNotification,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(1928);
  const [hasStarred, setHasStarred] = useState(false);

  const currentUser = members[0];

  const handleStar = () => {
    if (!hasStarred) {
      setStarsCount((prev) => prev + 1);
      setHasStarred(true);
      showNotification('Terima kasih telah memberikan bintang pada Materio Suite!');
    } else {
      setStarsCount((prev) => prev - 1);
      setHasStarred(false);
    }
  };

  return (
    <header className="header">
      {/* Search Input Bar (Materio Style: Search ⌘K) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', maxWidth: '420px' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Search tasks, PRs, chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 70px 9px 38px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              outline: 'none',
              transition: 'all 0.2s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '2px 6px',
              borderRadius: '5px',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          >
            ⌘K
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Landing Page Link Button */}
        <button
          onClick={() => {
            setIsLandingPage(true);
            router.push('/');
          }}
          className="btn btn-outline btn-sm"
          style={{ gap: '6px', fontSize: '0.785rem', padding: '6px 12px' }}
          title="Buka Halaman Welcome / Landing Page"
        >
          <Globe size={14} />
          <span>Landing Page</span>
        </button>

        {/* Create Task Quick Button */}
        <button
          onClick={() => setIsCreateTaskModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ gap: '6px' }}
        >
          <Plus size={16} />
          <span>New Task</span>
        </button>

        {/* Stars Button */}
        <button
          onClick={handleStar}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            background: hasStarred ? 'var(--primary-light)' : 'var(--bg-card)',
            color: hasStarred ? 'var(--primary)' : 'var(--text-main)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Star size={15} fill={hasStarred ? 'var(--primary)' : 'none'} />
          <span>Stars</span>
          <span
            style={{
              background: 'var(--bg-input)',
              padding: '1px 6px',
              borderRadius: '10px',
              fontSize: '0.75rem',
              color: hasStarred ? 'var(--primary)' : 'var(--text-muted)',
            }}
          >
            {(starsCount / 1000).toFixed(1)}k
          </span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn-icon"
          title="Ganti Mode Gelap / Terang"
          style={{ borderRadius: '50%' }}
        >
          {theme === 'dark' ? <Sun size={19} color="#ffb400" /> : <Moon size={19} />}
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="btn-icon"
            style={{ borderRadius: '50%', position: 'relative' }}
          >
            <Bell size={19} />
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '8px',
                height: '8px',
                background: 'var(--primary)',
                borderRadius: '50%',
                border: '2px solid var(--bg-card)',
              }}
            />
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '320px',
                background: 'var(--bg-card)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-color)',
                padding: '14px',
                zIndex: 50,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)' }}>
                  Pemberitahuan
                </span>
                <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                  2 Baru
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'var(--primary-light)',
                    fontSize: '0.8rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--primary)' }}>
                    <CheckCircle size={14} />
                    <span>Tugas ClickUp Ditugaskan</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px', fontSize: '0.75rem' }}>
                    {clickUpTasks[0]?.title || 'Pembaruan UI Materio'}
                  </div>
                </div>

                <div
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'var(--info-light)',
                    fontSize: '0.8rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--info)' }}>
                    <GithubIcon size={14} />
                    <span>Pull Request Siap Direview</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', marginTop: '2px', fontSize: '0.75rem' }}>
                    PR #{gitHubTasks[0]?.prNumber} menunggu persetujuan tim
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Online Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{ position: 'relative' }}>
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={38}
              height={38}
              unoptimized
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary-light)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '1px',
                right: '1px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--success)',
                border: '2px solid var(--bg-card)',
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
