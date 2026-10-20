'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Trophy,
  TrendingUp,
  Users,
  CheckCircle2,
  GitPullRequest,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  CheckSquare,
  GitBranch,
  MessageSquare,
  Layers,
  GitCommit,
  Kanban,
  Code2,
  Zap,
} from 'lucide-react';

export default function DashboardView() {
  const {
    currentTeam,
    clickUpTasks,
    gitHubTasks,
    setActiveView,
    setIsCreateTaskModalOpen,
  } = useApp();

  const totalClickUp = clickUpTasks.length;
  const completedClickUp = clickUpTasks.filter((t) => t.status === 'done').length;
  const inProgressClickUp = clickUpTasks.filter((t) => t.status === 'in_progress').length;

  const totalGitHub = gitHubTasks.length;
  const mergedPRs = gitHubTasks.filter((t) => t.status === 'merged').length;
  const activePRs = gitHubTasks.filter((t) => t.status === 'pr_open' || t.status === 'in_review').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Baris Atas: Kartu Selamat & Kartu Aktivitas Transaksi (Sesuai Referensi Gambar Materio) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(420px, 1.6fr)',
          gap: '24px',
        }}
      >
        {/* Kartu 1: Selamat John! (Materio reference) */}
        <div
          className="materio-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-heading)',
                }}
              >
                Selamat John!
              </h3>
              <span
                className="badge badge-purple"
                style={{
                  fontSize: '0.7rem',
                  padding: '3px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Sparkles size={12} /> Top Dev
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Kontributor terbaik sprint bulan ini di {currentTeam.name}
            </p>

            <div style={{ margin: '20px 0 6px' }}>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  letterSpacing: '-0.5px',
                }}
              >
                92.4%
              </div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span>Target sprint tercapai</span>
                <span
                  style={{
                    color: 'var(--success)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <TrendingUp size={14} /> +12.8%
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <button
              onClick={() => setActiveView('clickup')}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '8px', padding: '8px 18px', fontWeight: 600 }}
            >
              Buka Papan TaskFlow
            </button>

            {/* Official Vector Trophy Badge (Tailwind/Lucide Standard) */}
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 180, 0, 0.24) 0%, rgba(255, 180, 0, 0.04) 70%, transparent 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '62px',
                  height: '62px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #ffb400 0%, #f59e0b 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 22px rgba(245, 158, 11, 0.42)',
                }}
              >
                <Trophy size={34} strokeWidth={2.2} />
              </div>
            </div>
          </div>
        </div>

        {/* Kartu 2: Ringkasan Sprint & Aktivitas */}
        <div
          className="materio-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                Ringkasan Sprint & Aktivitas Tim
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span style={{ color: 'var(--success)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <TrendingUp size={14} /> +48.5%
                </span>
                <span>lintas TaskFlow dan CodeHub</span>
              </div>
            </div>
            <button className="btn-icon">
              <MoreVertical size={18} />
            </button>
          </div>

          {/* 4 Stat Pills (Sesuai Referensi Gambar) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
            }}
          >
            {/* Tugas ClickUp */}
            <div
              onClick={() => setActiveView('clickup')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckSquare size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  TaskFlow
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {totalClickUp} Tugas
                </div>
              </div>
            </div>

            {/* Anggota Tim */}
            <div
              onClick={() => setActiveView('chat')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--success-light)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Users size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Tim
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {currentTeam.members.length} Dev
                </div>
              </div>
            </div>

            {/* Repositories */}
            <div
              onClick={() => setActiveView('github')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--warning-light)',
                  color: 'var(--warning)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GitBranch size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Tugas Kode
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {totalGitHub} PR
                </div>
              </div>
            </div>

            {/* Velocity / Merged */}
            <div
              onClick={() => setActiveView('github')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--info-light)',
                  color: 'var(--info)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GitPullRequest size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Selesai
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {mergedPRs} Merge
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Baris Kedua: Grafik Mingguan & Kecepatan Tim & Metrik Mini */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.3fr 1.5fr',
          gap: '24px',
        }}
      >
        {/* Kartu: Grafik Aktivitas Mingguan (dengan Bar Ungu Khas Materio) */}
        <div className="materio-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              Aktivitas Mingguan
            </h3>
            <button className="btn-icon">
              <MoreVertical size={18} />
            </button>
          </div>

          {/* Bar Chart Visualization */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '140px',
              padding: '10px 10px 0',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            {[
              { day: 'Sen', h: 42, active: false },
              { day: 'Sel', h: 58, active: false },
              { day: 'Rab', h: 35, active: false },
              { day: 'Kam', h: 95, active: true }, // Bar ungu khas referensi
              { day: 'Jum', h: 64, active: false },
              { day: 'Sab', h: 28, active: false },
              { day: 'Min', h: 40, active: false },
            ].map((bar) => (
              <div
                key={bar.day}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  width: '28px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: `${bar.h}%`,
                    borderRadius: '6px',
                    background: bar.active
                      ? 'var(--primary)'
                      : 'var(--bg-input)',
                    boxShadow: bar.active
                      ? '0 4px 12px rgba(140, 87, 255, 0.4)'
                      : 'none',
                    transition: 'all 0.3s ease',
                  }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {bar.day}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '18px',
            }}
          >
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                45%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>Lebih cepat dari minggu kemarin</span>
                <span style={{ color: 'var(--success)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <TrendingUp size={13} /> +15%
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveView('clickup')}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '8px' }}
            >
              Rincian
            </button>
          </div>
        </div>

        {/* Kartu: Kecepatan Tim (Total Velocity) */}
        <div className="materio-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                Kecepatan Tim
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                  2,480 poin
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--success)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ArrowUpRight size={14} /> 10%
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Dibandingkan target sprint
              </span>
            </div>
            <button className="btn-icon">
              <MoreVertical size={18} />
            </button>
          </div>

          {/* Daftar Modul Terintegrasi */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Kanban size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    TaskFlow Sprint Board
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Frontend & Status Sprint
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {inProgressClickUp} Berjalan
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>
                  85% Selesai
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',
                    background: '#fef3c7',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GitBranch size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    CodeHub Repo & PR
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Docker & Kubernetes
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {activePRs} PR Terbuka
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--info)', fontWeight: 600 }}>
                  Sedang Ditinjau
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',
                    background: '#ede9fe',
                    color: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MessageSquare size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    Pesan Tim TeamSync
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    4 Saluran Aktif
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  Aktif
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 600 }}>
                  ● 3 Online
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak Metrik Mini (Sesuai Referensi Gambar) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Kartu: Total Tugas Selesai */}
          <div className="materio-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle2 size={16} strokeWidth={2.2} />
              </div>
              <button className="btn-icon" style={{ width: '24px', height: '24px' }}>
                <MoreVertical size={14} />
              </button>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '8px' }}>
              {completedClickUp} / {totalClickUp}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Tugas TaskFlow Selesai
            </div>
            {/* SVG Trend Line */}
            <svg viewBox="0 0 100 35" style={{ width: '100%', height: '35px' }}>
              <path
                d="M 0,25 Q 25,5 50,20 T 100,5"
                fill="none"
                stroke="#8c57ff"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', marginTop: '4px' }}>
              +14% pada sprint ini
            </div>
          </div>

          {/* Kartu: PRs Merged */}
          <div className="materio-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--success-light)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GitPullRequest size={16} strokeWidth={2.2} />
              </div>
              <button className="btn-icon" style={{ width: '24px', height: '24px' }}>
                <MoreVertical size={14} />
              </button>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '8px' }}>
              {mergedPRs}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Pull Request Berhasil Digabung
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)', marginTop: '6px' }}>
              +42% Mingguan
            </div>
          </div>

          {/* Kartu: Story Points */}
          <div className="materio-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Layers size={16} strokeWidth={2.2} />
              </div>
              <button className="btn-icon" style={{ width: '24px', height: '24px' }}>
                <MoreVertical size={14} />
              </button>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '8px' }}>
              {currentTeam.members.length * 4}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Total Story Points
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginTop: '6px' }}>
              Sprint Aktif
            </div>
          </div>

          {/* Kartu: Commits count */}
          <div className="materio-card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255, 180, 0, 0.12)',
                  color: '#ffb400',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GitCommit size={16} strokeWidth={2.2} />
              </div>
              <button className="btn-icon" style={{ width: '24px', height: '24px' }}>
                <MoreVertical size={14} />
              </button>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '8px' }}>
              1,240
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Commit Git Tercatat
            </div>
            {/* Colorful Mini Bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '26px' }}>
              {[
                { h: 40, c: '#ff4c51' },
                { h: 70, c: '#8c57ff' },
                { h: 50, c: '#ffb400' },
                { h: 85, c: '#56ca00' },
                { h: 100, c: '#8c57ff' },
              ].map((b, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${b.h}%`,
                    background: b.c,
                    borderRadius: '3px',
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Cabang Main & Fitur
            </div>
          </div>
        </div>
      </div>

      {/* Tautan Cepat ke Modul Utama (TaskFlow vs CodeHub vs TeamSync) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '4px' }}>
        {/* TaskFlow Task Manager Direct Entry */}
        <div
          onClick={() => setActiveView('clickup')}
          className="materio-card"
          style={{
            cursor: 'pointer',
            borderTop: '4px solid #7b68ee',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckSquare size={20} color="#7b68ee" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)' }}>
                  TaskFlow (Papan Tugas)
                </span>
              </div>
              <span className="badge badge-purple">{clickUpTasks.length} Kartu</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Papan Kanban interaktif dengan status sprint, tag prioritas, dan pembagian tugas tim.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.8125rem', marginTop: '16px' }}>
            <span>Buka Papan TaskFlow</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* CodeHub Direct Entry */}
        <div
          onClick={() => setActiveView('github')}
          className="materio-card"
          style={{
            cursor: 'pointer',
            borderTop: '4px solid #24292e',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GitBranch size={20} color="var(--text-heading)" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)' }}>
                  CodeHub (Pusat Kode)
                </span>
              </div>
              <span className="badge badge-info">{gitHubTasks.length} PR & Task</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Pull request kode, cabang branch, peninjauan cuplikan diff kode, dan pipeline commit.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--info)', fontWeight: 600, fontSize: '0.8125rem', marginTop: '16px' }}>
            <span>Buka Pusat Kode CodeHub</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* TeamSync Direct Entry */}
        <div
          onClick={() => setActiveView('chat')}
          className="materio-card"
          style={{
            cursor: 'pointer',
            borderTop: '4px solid #5865f2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={20} color="#5865f2" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)' }}>
                  TeamSync (Obrolan Tim)
                </span>
              </div>
              <span className="badge badge-success">4 Saluran</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Komunikasi pesan instan dengan rekan kerja satu tim, saluran terpisah, dan reaksi emoji.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontWeight: 600, fontSize: '0.8125rem', marginTop: '16px' }}>
            <span>Masuk Obrolan TeamSync</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
