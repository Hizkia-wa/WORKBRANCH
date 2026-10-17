'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  GitBranch,
  GitPullRequest,
  GitCommit,
  FolderGit2,
  CheckCircle2,
  Clock,
  Plus,
  ExternalLink,
  Code2,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileCode,
  Check,
} from 'lucide-react';
import Image from 'next/image';
import { GitHubStatus } from '@/types';

export default function GitHubView() {
  const {
    gitHubTasks,
    currentTeam,
    updateGitHubStatus,
    deleteTask,
    setIsCreateTaskModalOpen,
    searchQuery,
  } = useApp();

  const [expandedCodeId, setExpandedCodeId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTasks = gitHubTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.repo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: GitHubStatus) => {
    switch (status) {
      case 'merged':
        return (
          <span className="badge badge-purple" style={{ gap: '4px' }}>
            <Check size={12} /> DIGABUNG (MERGED)
          </span>
        );
      case 'in_review':
        return (
          <span className="badge badge-warning" style={{ gap: '4px' }}>
            <Clock size={12} /> SEDANG DIREVIEW
          </span>
        );
      case 'pr_open':
        return (
          <span className="badge badge-info" style={{ gap: '4px' }}>
            <GitPullRequest size={12} /> PR TERBUKA
          </span>
        );
      case 'open_issue':
        return (
          <span className="badge badge-success" style={{ gap: '4px' }}>
            <CheckCircle2 size={12} /> ISSUE TERBUKA
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header Repository GitHub */}
      <div
        className="materio-card"
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#24292e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            }}
          >
            <FolderGit2 size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                {currentTeam.defaultRepo}
              </h2>
              <span className="badge" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                publik
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Repository utama workspace {currentTeam.name}. Pull request & tugas kode terintegrasi di sini.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
            style={{ padding: '7px 12px', fontSize: '0.8rem', width: 'auto' }}
          >
            <option value="all">Semua Status PR</option>
            <option value="pr_open">PR Terbuka</option>
            <option value="in_review">Sedang Direview</option>
            <option value="merged">Berhasil Digabung (Merged)</option>
            <option value="open_issue">Issue Terbuka</option>
          </select>

          {/* Tombol Tugas Kode Baru */}
          <button
            onClick={() => setIsCreateTaskModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ gap: '6px' }}
          >
            <Plus size={16} />
            <span>Tugas Kode Baru</span>
          </button>
        </div>
      </div>

      {/* Bar Statistik Repository */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        <div className="materio-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--info-light)', color: 'var(--info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GitPullRequest size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              {gitHubTasks.filter((t) => t.status === 'pr_open' || t.status === 'in_review').length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pull Request Aktif</div>
          </div>
        </div>

        <div className="materio-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--purple-light, rgba(140,87,255,0.12))', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              {gitHubTasks.filter((t) => t.status === 'merged').length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Digabung ke Cabang Main</div>
          </div>
        </div>

        <div className="materio-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--warning-light)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GitBranch size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              {gitHubTasks.length + 2}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cabang Fitur Berjalan</div>
          </div>
        </div>

        <div className="materio-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GitCommit size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              24
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Commit Sprint Ini</div>
          </div>
        </div>
      </div>

      {/* Daftar Tugas Kode & PR */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredTasks.map((task) => {
          const isExpanded = expandedCodeId === task.id;

          return (
            <div
              key={task.id}
              className="materio-card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderLeft:
                  task.status === 'merged'
                    ? '4px solid var(--primary)'
                    : task.status === 'in_review'
                    ? '4px solid var(--warning)'
                    : '4px solid var(--info)',
              }}
            >
              {/* Header Tugas */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'var(--bg-input)',
                      color: 'var(--text-heading)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px',
                    }}
                  >
                    <GitPullRequest size={18} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        #{task.prNumber}
                      </span>
                      <h3
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--text-heading)',
                        }}
                      >
                        {task.title}
                      </h3>
                      {getStatusBadge(task.status)}
                    </div>

                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-muted)',
                        marginTop: '6px',
                        lineHeight: 1.4,
                      }}
                    >
                      {task.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => deleteTask(task.id, 'github')}
                    className="btn-icon"
                    style={{ color: 'var(--danger)' }}
                    title="Hapus Tugas Kode"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Branch, Commits, Changes & People */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  padding: '10px 14px',
                  background: 'var(--bg-input)',
                  borderRadius: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  {/* Branch Pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      background: 'var(--bg-card)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      color: 'var(--primary)',
                      fontWeight: 600,
                    }}
                  >
                    <GitBranch size={13} />
                    <span>{task.branch}</span>
                  </div>

                  {/* Commits count */}
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <GitCommit size={14} />
                    <span>{task.commitsCount} commit</span>
                  </div>

                  {/* Diff stats */}
                  <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>+{task.additions || 84} baris</span>
                    <span style={{ color: 'var(--danger)', fontWeight: 600 }}>-{task.deletions || 12} baris</span>
                  </div>
                </div>

                {/* Anggota (Assignee & Reviewer) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pembuat:</span>
                    <Image
                      src={task.assignee.avatar}
                      alt={task.assignee.name}
                      width={22}
                      height={22}
                      unoptimized
                      style={{ borderRadius: '50%' }}
                    />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{task.assignee.name}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Reviewer:</span>
                    <Image
                      src={task.reviewer.avatar}
                      alt={task.reviewer.name}
                      width={22}
                      height={22}
                      unoptimized
                      style={{ borderRadius: '50%' }}
                    />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{task.reviewer.name}</span>
                  </div>
                </div>
              </div>

              {/* Accordion Cuplikan Kode */}
              {task.codeSnippet && (
                <div>
                  <button
                    onClick={() => setExpandedCodeId(isExpanded ? null : task.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--primary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: '4px 0',
                    }}
                  >
                    <FileCode size={15} />
                    <span>{isExpanded ? 'Sembunyikan Perubahan Kode' : 'Buka Cuplikan Kode & Diff'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '10px',
                        background: '#1e1b2e',
                        color: '#d4d4d4',
                        borderRadius: '10px',
                        padding: '16px',
                        fontSize: '0.8125rem',
                        fontFamily: 'var(--font-mono)',
                        overflowX: 'auto',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <pre style={{ margin: 0 }}>
                        <code>{task.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Aksi: Status PR */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Dibuat pada {task.createdAt} di repository <strong>{task.repo}</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {task.status !== 'merged' && (
                    <button
                      onClick={() => updateGitHubStatus(task.id, 'merged')}
                      className="btn btn-primary btn-sm"
                      style={{ gap: '4px' }}
                    >
                      <Check size={14} />
                      <span>Gabungkan PR (Merge)</span>
                    </button>
                  )}

                  {task.status === 'pr_open' && (
                    <button
                      onClick={() => updateGitHubStatus(task.id, 'in_review')}
                      className="btn btn-secondary btn-sm"
                    >
                      Minta Review Kode
                    </button>
                  )}

                  {task.status === 'merged' && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                      ✓ Berhasil Digabung ke Main & Siap Rilis
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div
            className="materio-card"
            style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}
          >
            <FolderGit2 size={40} style={{ margin: '0 auto 10px', color: 'var(--text-light)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              Tidak Ada Tugas Kode
            </h3>
            <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>
              Buat tugas baru dan pilih <strong>Tugas Kode CodeHub</strong> sebagai tujuan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
