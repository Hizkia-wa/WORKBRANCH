'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Image from 'next/image';
import {
  Layers,
  CheckSquare,
  GitBranch,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle2,
  Users,
  GitPullRequest,
  Code2,
  Kanban,
  Zap,
  Shield,
  Clock,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setIsLandingPage, theme, toggleTheme } = useApp();
  const [activeTabPreview, setActiveTabPreview] = useState<'clickup' | 'github' | 'chat' | 'dashboard'>('clickup');

  const handleGetStarted = () => {
    setIsLandingPage(false);
    router.push('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column' }}>
      {/* 1. TOP NAVBAR */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--bg-navbar)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 40px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Image
            src="/workbranch-logo.png"
            alt="WorkBranch"
            width={230}
            height={64}
            priority
            style={{
              width: '230px',
              height: '64px',
              objectFit: 'contain',
              objectPosition: 'left center',
              display: 'block',
            }}
          />
        </div>

        {/* Center Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.875rem', fontWeight: 600 }}>
          <a href="#fitur" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }}>
            Fitur Utama
          </a>
          <a href="#integrasi" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }}>
            TaskFlow & CodeHub
          </a>
          <a href="#chat" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }}>
            TeamSync Chat
          </a>
          <a href="#perbandingan" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }}>
            Kenapa WorkBranch?
          </a>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleTheme}
            className="btn-icon"
            title="Ganti Mode Gelap/Terang"
            style={{ borderRadius: '50%' }}
          >
            {theme === 'dark' ? <Sun size={19} color="#ffb400" /> : <Moon size={19} />}
          </button>

          <button
            onClick={handleGetStarted}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-heading)',
              cursor: 'pointer',
              padding: '8px 12px',
            }}
          >
            Login
          </button>

          {/* Primary CTA Button (Matching ClickUp reference) */}
          <Link
            href="/dashboard"
            onClick={() => setIsLandingPage(false)}
            style={{
              background: 'var(--text-heading)',
              color: 'var(--bg-card)',
              border: 'none',
              borderRadius: '24px',
              padding: '10px 22px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
          >
            <span>Get Started. It&apos;s FREE</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (ClickUp Inspired with Materio Purple Theme) */}
      <section
        style={{
          padding: '80px 24px 40px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Pill Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(11, 92, 171, 0.15)',
          }}
        >
          <Sparkles size={16} />
          <span>Solusi Kolaborasi Terpadu: TaskFlow + CodeHub + TeamSync</span>
        </div>

        {/* Big Bold Headline */}
        <h1
          style={{
            fontSize: '3.6rem',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
            color: 'var(--text-heading)',
            maxWidth: '960px',
            marginBottom: '22px',
          }}
        >
          The project management tool <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #0b3b82 0%, #18b879 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            you won’t outgrow
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            maxWidth: '780px',
            lineHeight: 1.6,
            marginBottom: '36px',
          }}
        >
          Rencanakan sprint, kelola tugas di papan <strong>TaskFlow</strong>, pantau kode & pull request di <strong>CodeHub</strong>, dan koordinasikan pesan instan di <strong>TeamSync</strong>. Semua terhubung dalam satu workspace modern yang konsisten.
        </p>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Main "Get Started. It's FREE" button */}
          <Link
            href="/dashboard"
            onClick={() => setIsLandingPage(false)}
            style={{
              background: '#24292e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '28px',
              padding: '16px 36px',
              fontSize: '1.05rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(36, 41, 46, 0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(11, 92, 171, 0.3)';
              e.currentTarget.style.background = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(36, 41, 46, 0.35)';
              e.currentTarget.style.background = '#24292e';
            }}
          >
            <span>Get Started. It&apos;s FREE</span>
            <ArrowRight size={18} />
          </Link>

          {/* Secondary "Book a Demo" button */}
          <button
            onClick={handleGetStarted}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-heading)',
              borderRadius: '28px',
              padding: '16px 32px',
              fontSize: '1.05rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
            }}
          >
            Book a Demo
          </button>
        </div>

        {/* Microcopy Underneath */}
        <div style={{ marginTop: '14px', fontSize: '0.85rem', color: 'var(--text-light)', display: 'flex', gap: '16px' }}>
          <span>✓ Free Forever.</span>
          <span>✓ No Credit Card Required.</span>
          <span>✓ Setup in 2 Minutes.</span>
        </div>

        {/* Star Rating Reviews (from ClickUp screenshot) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '22px' }}>
          <div style={{ display: 'flex', color: '#ffb400', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={17} fill="#ffb400" />
            ))}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <strong>25,000+ reviews</strong> dari developer & tim rekayasa terkemuka
          </span>
        </div>
      </section>

      {/* 3. INTERACTIVE WORKSPACE PREVIEW MOCKUP (Scrollable Section 1) */}
      <section style={{ maxWidth: '1200px', margin: '30px auto 70px', padding: '0 24px', width: '100%' }}>
        <div
          className="materio-card"
          style={{
            padding: '0',
            overflow: 'hidden',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(11, 92, 171, 0.12), 0 8px 24px rgba(0,0,0,0.06)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Mockup Window Header Bar with macOS dots and Tab switcher */}
          <div
            style={{
              padding: '14px 20px',
              background: 'var(--bg-input)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '12px', fontWeight: 600 }}>
                workbranch.dev &bull; Interactive Workspace Preview
              </span>
            </div>

            {/* Clickable Mockup Tabs */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'clickup' as const, label: 'Papan TaskFlow', icon: CheckSquare },
                { id: 'github' as const, label: 'Kode CodeHub', icon: GitBranch },
                { id: 'chat' as const, label: 'Pesan TeamSync', icon: MessageSquare },
                { id: 'dashboard' as const, label: 'Dashboard Sprint', icon: Layers },
              ].map((tab) => {
                const isActive = activeTabPreview === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabPreview(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      background: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      fontSize: '0.785rem',
                      fontWeight: 700,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mockup Dynamic Content Display */}
          <div style={{ padding: '28px', background: 'var(--bg-card)' }}>
            {activeTabPreview === 'clickup' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--warning)', marginBottom: '10px' }}>
                    ● Belum Dikerjakan (To Do)
                  </div>
                  <div className="materio-card" style={{ padding: '14px', marginBottom: '10px' }}>
                    <span className="badge badge-danger">MENDESAK</span>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '6px' }}>Konfigurasi WebSocket Pesan Tim</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Implementasi pipeline realtime chat</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '10px' }}>
                    ● Sedang Dikerjakan (In Progress)
                  </div>
                  <div className="materio-card" style={{ padding: '14px', borderLeft: '4px solid var(--primary)' }}>
                    <span className="badge badge-warning">TINGGI</span>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '6px' }}>Desain Ulang Widget WorkBranch</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginTop: '8px' }}>Progres 75% Selesai</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--success)', marginBottom: '10px' }}>
                    ● Selesai (Completed)
                  </div>
                  <div className="materio-card" style={{ padding: '14px', borderLeft: '4px solid var(--success)' }}>
                    <span className="badge badge-purple">SEDANG</span>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '6px' }}>Pengujian Usability Alur Tugas</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600, marginTop: '8px' }}>✓ Selesai Terverifikasi</div>
                  </div>
                </div>
              </div>
            )}

            {activeTabPreview === 'github' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="materio-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--text-muted)' }}>#142</span>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>feat(auth): Integrasi OAuth2 CodeHub dan token akses repositori</span>
                      <span className="badge badge-warning">SEDANG DIREVIEW</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Branch: feat/codehub-oauth-provider &bull; +384 baris &bull; -42 baris</div>
                  </div>
                  <button onClick={handleGetStarted} className="btn btn-primary btn-sm">Buka Diff Kode</button>
                </div>

                <div className="materio-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--text-muted)' }}>#89</span>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>perf(api): Optimasi latensi query tugas dengan layer caching Redis</span>
                      <span className="badge badge-purple">DIGABUNG (MERGED)</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Branch: perf/redis-cache-layer &bull; 8 commit &bull; Deploy sukses</div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>✓ Merged to Main</span>
                </div>
              </div>
            )}

            {activeTabPreview === 'chat' && (
              <div style={{ display: 'flex', gap: '16px', minHeight: '180px' }}>
                <div style={{ width: '180px', background: 'var(--bg-input)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>SALURAN TEAMSYNC</div>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}># umum-pengumuman</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '6px' }}># diskusi-taskflow</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}># review-kode-codehub</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '0.85rem' }}><strong>John Doe (Lead Dev):</strong> Halo tim! Seluruh alur TaskFlow dan CodeHub sekarang sudah sinkron di dashboard ini.</div>
                    <div style={{ fontSize: '0.85rem' }}><strong>Sarah Connor (Frontend):</strong> Mantap! Saat buat task baru, jangan lupa pilih tujuan: TaskFlow atau CodeHub ya! 👍</div>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-input)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    Ketik pesan untuk mencoba obrolan tim langsung...
                  </div>
                </div>
              </div>
            )}

            {activeTabPreview === 'dashboard' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '18px' }}>
                <div className="materio-card" style={{ padding: '18px', background: 'var(--primary-light)' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>Selamat John</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target penyelesaian sprint 92.4% tercapai</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div className="materio-card" style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>4 Tasks</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TaskFlow Board</div>
                  </div>
                  <div className="materio-card" style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>4 PRs</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CodeHub Repo</div>
                  </div>
                  <div className="materio-card" style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>4 Ch</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TeamSync Active</div>
                  </div>
                </div>
              </div>
            )}

            {/* Click to Enter Callout inside Mockup */}
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Ingin mencoba alur pembuatan tugas & routing otomatis secara penuh?
              </div>
              <button onClick={handleGetStarted} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                <span>Buka Dashboard Sekarang</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FITUR UTAMA / FEATURE BREAKDOWN (Scrollable Section 2) */}
      <section id="fitur" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.5px' }}>
            Satu Platform, Semua Kebutuhan Rekayasa Tim
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '12px', maxWidth: '640px', margin: '12px auto 0' }}>
            Hilangkan pemborosan waktu berpindah tab antara tool manajemen proyek, repository git, dan aplikasi chat.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {/* Card 1: TaskFlow */}
          <div
            id="integrasi"
            className="materio-card"
            style={{
              padding: '32px',
              borderTop: '5px solid #7b68ee',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(123, 104, 238, 0.12)',
                  color: '#7b68ee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <CheckSquare size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '10px' }}>
                Papan Tugas TaskFlow
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Kelola sprint tim dengan papan Kanban 4 kolom. Atur prioritas <strong>Mendesak, Tinggi, Sedang, Rendah</strong>, tanggal tenggat waktu, dan assign ke rekan developer dengan mudah.
              </p>
            </div>
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
              ✓ Status Kanban Realtime & Checklist Sprint
            </div>
          </div>

          {/* Card 2: CodeHub */}
          <div
            className="materio-card"
            style={{
              padding: '32px',
              borderTop: '5px solid #24292e',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(36, 41, 46, 0.1)',
                  color: 'var(--text-heading)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <GitBranch size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '10px' }}>
                Pusat Kode & PR CodeHub
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Sinkronkan branch, pantau commit terbaru, inspect perubahan cuplikan kode (diff preview), serta lakukan peninjauan kode dan merge pull request langsung di satu tempat.
              </p>
            </div>
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--info)', fontWeight: 700 }}>
              ✓ Diff Inspector & Pipeline Reviewer
            </div>
          </div>

          {/* Card 3: TeamSync */}
          <div
            id="chat"
            className="materio-card"
            style={{
              padding: '32px',
              borderTop: '5px solid #5865f2',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(88, 101, 242, 0.12)',
                  color: '#5865f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <MessageSquare size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '10px' }}>
                Pesan Tim TeamSync
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Fasilitas kirim pesan terorganisir per saluran (*#umum*, *#diskusi-tugas*, *#review-kode*). Dilengkapi indikator online rekan kerja dan reaksi emoji instan.
              </p>
            </div>
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--success)', fontWeight: 700 }}>
              ✓ Saluran Terisolasi & Presensi Anggota
            </div>
          </div>
        </div>

        {/* 4th Highlight: Smart Routing Feature Callout */}
        <div
          className="materio-card"
          style={{
            marginTop: '36px',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(11, 92, 171, 0.08) 0%, rgba(24, 184, 121, 0.05) 100%)',
            border: '2px solid rgba(11, 92, 171, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
              FITUR UNGGULAN
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '4px' }}>
              Alur Pintar: Routing Tugas Otomatis saat Pembuatan
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
              Saat membuat task baru, pilih apakah tugas tersebut dialihkan ke <strong>TaskFlow</strong> (papan sprint) atau ke <strong>CodeHub</strong> (tugas kode & PR). Sistem otomatis mendistribusikan task tersebut ke menu yang tepat tanpa campur tangan manual.
            </p>
          </div>
          <button onClick={handleGetStarted} className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
            Coba Buat Task Sekarang
          </button>
        </div>
      </section>

      {/* 5. PERBANDINGAN: KENAPA MATERIO DEV SUITE (Scrollable Section 3) */}
      <section id="perbandingan" style={{ padding: '60px 24px 80px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
            Perbedaan Menggunakan Platform Terpadu
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            Lihat bagaimana penggabungan ini mengubah cara tim Anda bekerja setiap hari.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px', textAlign: 'left' }}>
            {/* Kolom Tradisional */}
            <div style={{ background: 'var(--bg-input)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 800, color: 'var(--danger)', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✕ Cara Lama (Terpisah-pisah)
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <li>• Buka 3 aplikasi/tab berbeda: TaskFlow, CodeHub, dan TeamSync secara terpisah.</li>
                <li>• Kehilangan konteks saat menghubungkan nomor PR CodeHub ke tiket tugas TaskFlow.</li>
                <li>• Notifikasi berantakan di banyak platform berbeda.</li>
                <li>• Sulit melihat kecepatan tim (velocity) secara menyeluruh dalam 1 ringkasan.</li>
              </ul>
            </div>

            {/* Kolom WorkBranch Suite */}
            <div style={{ background: 'var(--primary-light)', padding: '24px', borderRadius: '16px', border: '2px solid var(--primary)' }}>
              <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✓ Dengan WorkBranch Collab Suite
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                <li>• <strong>Satu Pintu:</strong> Akses sprint, pull request, dan obrolan tim di 1 jendela browser.</li>
                <li>• <strong>Routing Otomatis:</strong> Pilih tujuan tugas saat dibuat, langsung sinkron ke papan atau kode.</li>
                <li>• <strong>Dashboard Terpadu:</strong> Pantau velocity, commit, dan progres sprint di grafik mingguan WorkBranch.</li>
                <li>• <strong>Hemat Waktu:</strong> Mengurangi context switching tim hingga 48.5%.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION BANNER (Scrollable Section 4) */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0b3b82 0%, #0b75b8 100%)',
            color: '#ffffff',
            borderRadius: '24px',
            padding: '60px 32px',
            boxShadow: '0 16px 40px rgba(11, 92, 171, 0.28)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <h2 style={{ fontSize: '2.6rem', fontWeight: 900, marginBottom: '14px', letterSpacing: '-0.5px' }}>
            The project management tool you won’t outgrow
          </h2>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, maxWidth: '640px', margin: '0 auto 32px', lineHeight: 1.5 }}>
            Bergabunglah dengan ribuan developer yang mengelola tugas dan kode dalam satu workspace yang rapi dan terstruktur.
          </p>

          <Link
            href="/dashboard"
            onClick={() => setIsLandingPage(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#ffffff',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '28px',
              padding: '16px 40px',
              fontSize: '1.05rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Get Started. It&apos;s FREE
          </Link>

          <div style={{ marginTop: '16px', fontSize: '0.8rem', opacity: 0.8 }}>
            Free Forever. No Credit Card Required.
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '32px 40px',
          background: 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'var(--primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={13} />
          </div>
          <span>&copy; 2026 WorkBranch Collaboration Suite &bull; TaskFlow + CodeHub + TeamSync Fusion</span>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={handleGetStarted} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
            Masuk ke Workspace Dashboard
          </button>
        </div>
      </footer>
    </div>
  );
}
