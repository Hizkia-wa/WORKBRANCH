'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Image from 'next/image';
import {
  LayoutDashboard,
  CheckSquare,
  GitBranch,
  MessageSquare,
  Users,
  PlusCircle,
  Sparkles,
  ChevronRight,
  ChevronDown,
  FolderGit2,
  Globe,
  FolderKanban,
  Bell,
  Settings,
  Search,
} from 'lucide-react';
import { ActiveView } from '@/types';

export default function Sidebar() {
  const router = useRouter();
  const {
    activeView,
    setActiveView,
    clickUpTasks,
    gitHubTasks,
    currentTeam,
    teams,
    setCurrentTeamId,
    setIsCreateTeamModalOpen,
    setIsCreateTaskModalOpen,
    setIsLandingPage,
  } = useApp();

  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = React.useState(false);

  const navItems = [
    {
      id: 'dashboard' as ActiveView,
      label: 'Dashboards',
      icon: LayoutDashboard,
      badge: '5',
      badgeColor: 'badge-danger',
    },
    {
      id: 'clickup' as ActiveView,
      label: 'TaskFlow',
      sublabel: 'Task Management',
      icon: CheckSquare,
      badge: `${clickUpTasks.length}`,
      badgeColor: 'badge-purple',
    },
    {
      id: 'github' as ActiveView,
      label: 'CodeHub',
      sublabel: 'Code & Repos',
      icon: GitBranch,
      badge: `${gitHubTasks.length}`,
      badgeColor: 'badge-info',
    },
    {
      id: 'chat' as ActiveView,
      label: 'TeamSync',
      sublabel: 'Team Chat & Channels',
      icon: MessageSquare,
      badge: 'Live',
      badgeColor: 'badge-success',
    },
  ];

  const routeItems = [
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Members', path: '/members', icon: Users },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Global Search', path: '/search', icon: Search },
  ];

  return (
    <aside className="sidebar" style={{ overflowY: 'auto' }}>
      {/* Brand Logo & Name */}
      <div
        style={{
          padding: '24px 22px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Image
            src="/workbranch-logo.png"
            alt="WorkBranch"
            width={190}
            height={70}
            priority
            style={{
              width: '190px',
              height: '70px',
              objectFit: 'contain',
              objectPosition: 'left center',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Team Switcher Card */}
      <div style={{ padding: '0 16px 14px' }}>
        <div
          onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
          style={{
            background: 'var(--bg-input)',
            borderRadius: '10px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: '1px solid var(--border-color)',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <span style={{ fontSize: '1.25rem' }}>{currentTeam.avatar}</span>
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--text-heading)',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {currentTeam.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {currentTeam.members.length} members
              </div>
            </div>
          </div>
          {isTeamDropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>

        {/* Dropdown with Teams */}
        {isTeamDropdownOpen && (
          <div
            style={{
              marginTop: '6px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '6px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', padding: '6px 8px', fontWeight: 700, textTransform: 'uppercase' }}>
              Switch Workspace
            </div>
            {teams.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setCurrentTeamId(t.id);
                  setIsTeamDropdownOpen(false);
                }}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  background: t.id === currentTeam.id ? 'var(--primary-light)' : 'transparent',
                  color: t.id === currentTeam.id ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: t.id === currentTeam.id ? 700 : 500,
                  fontSize: '0.8125rem',
                }}
              >
                <span>{t.avatar}</span>
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t.name}
                </span>
                {t.id === currentTeam.id && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                )}
              </div>
            ))}

            <button
              onClick={() => {
                setIsTeamDropdownOpen(false);
                setIsCreateTeamModalOpen(true);
              }}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginTop: '6px', fontSize: '0.75rem', gap: '6px' }}
            >
              <PlusCircle size={14} />
              Create New Team
            </button>
          </div>
        )}
      </div>

      {/* Main Navigation Menu */}
      <div style={{ flex: 1, padding: '0 12px' }}>
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-light)',
            padding: '12px 12px 8px',
            letterSpacing: '0.8px',
          }}
        >
          Core Workspace
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  background: isActive
                    ? 'linear-gradient(135deg, #0b3b82 0%, #0b75b8 100%)'
                    : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-main)',
                  boxShadow: isActive ? '0 4px 16px rgba(11, 92, 171, 0.28)' : 'none',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon
                    size={20}
                    style={{
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.875rem' }}>{item.label}</div>
                    {item.sublabel && !isActive && (
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>
                        {item.sublabel}
                      </div>
                    )}
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`badge ${isActive ? '' : item.badgeColor}`}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : undefined,
                      color: isActive ? '#ffffff' : undefined,
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-light)',
            padding: '24px 12px 8px',
            letterSpacing: '0.8px',
          }}
        >
          WorkBranch
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {routeItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  setIsLandingPage(false);
                  router.push(item.path);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  color: 'var(--text-main)',
                  fontWeight: 500,
                }}
              >
                <Icon size={18} color="var(--text-muted)" />
                <span style={{ fontSize: '0.875rem' }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Action: New Task */}
        <div style={{ marginTop: '20px', padding: '0 4px' }}>
          <button
            onClick={() => setIsCreateTaskModalOpen(true)}
            className="btn btn-primary"
            style={{ width: '100%', borderRadius: '10px', fontSize: '0.8125rem' }}
          >
            <PlusCircle size={16} />
            Create Task
          </button>
        </div>

        {/* Apps & Pages Section (Materio style) */}
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-light)',
            padding: '24px 12px 8px',
            letterSpacing: '0.8px',
          }}
        >
          Apps & Pages
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            onClick={() => setActiveView('github')}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: 'var(--text-main)',
              fontSize: '0.8125rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FolderGit2 size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '0.8125rem' }}>{currentTeam.defaultRepo.split('/')[1]}</span>
            </div>
            <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>Git</span>
          </div>

          <div
            onClick={() => setActiveView('chat')}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: 'var(--text-main)',
              fontSize: '0.8125rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '0.8125rem' }}>Team Members</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>
              ● {currentTeam.members.filter(m => m.status === 'online').length} online
            </span>
          </div>

          <div
            onClick={() => {
              setIsLandingPage(true);
              router.push('/');
            }}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: 'var(--text-main)',
              fontSize: '0.8125rem',
              marginTop: '2px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Landing Page</span>
            </div>
            <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>Home</span>
          </div>
        </div>
      </div>

      {/* Materio Pro Banner at bottom of sidebar (just like the reference image) */}
      <div style={{ padding: '16px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0b3b82 0%, #18b879 100%)',
            borderRadius: '12px',
            padding: '14px 16px',
            color: '#ffffff',
            boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 800 }}>Upgrade to Pro</div>
            <div style={{ fontSize: '0.68rem', opacity: 0.9 }}>Get Unlimited Repos</div>
          </div>
          <Sparkles size={20} />
        </div>
      </div>
    </aside>
  );
}
