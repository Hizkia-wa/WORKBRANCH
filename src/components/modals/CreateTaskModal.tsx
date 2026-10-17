'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  CheckSquare,
  GitBranch,
  Calendar,
  User,
  Tag,
  Code,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { TaskType, ClickUpStatus, ClickUpPriority, GitHubStatus } from '@/types';

export default function CreateTaskModal() {
  const {
    isCreateTaskModalOpen,
    setIsCreateTaskModalOpen,
    createClickUpTask,
    createGitHubTask,
    members,
    currentTeam,
    setActiveView,
  } = useApp();

  const [taskType, setTaskType] = useState<TaskType>('clickup');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState(members[0]?.id || '');

  // ClickUp Specific Fields
  const [clickUpStatus, setClickUpStatus] = useState<ClickUpStatus>('todo');
  const [priority, setPriority] = useState<ClickUpPriority>('medium');
  const [dueDate, setDueDate] = useState('2026-10-30');
  const [tagInput, setTagInput] = useState('Frontend, Fitur');

  // GitHub Specific Fields
  const [repo, setRepo] = useState(currentTeam.defaultRepo);
  const [branch, setBranch] = useState('feat/modul-kolaborasi-baru');
  const [prNumber, setPrNumber] = useState(150);
  const [gitHubStatus, setGitHubStatus] = useState<GitHubStatus>('pr_open');
  const [reviewerId, setReviewerId] = useState(members[1]?.id || members[0]?.id);
  const [codeSnippet, setCodeSnippet] = useState(`// Logika fitur baru\nexport function initializeFeature() {\n  console.log("Modul siap dideploy ke server");\n}`);

  if (!isCreateTaskModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedMember = members.find((m) => m.id === assigneeId) || members[0];
    const reviewerMember = members.find((m) => m.id === reviewerId) || members[1] || members[0];

    if (taskType === 'clickup') {
      const tags = tagInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      createClickUpTask({
        title,
        description,
        status: clickUpStatus,
        priority,
        dueDate,
        assignee: assignedMember,
        tags: tags.length > 0 ? tags : ['Umum'],
        progress: clickUpStatus === 'done' ? 100 : clickUpStatus === 'in_progress' ? 50 : 0,
      });

      // Beralih ke view ClickUp
      setActiveView('clickup');
    } else {
      createGitHubTask({
        title,
        description,
        repo,
        branch,
        prNumber: Number(prNumber) || Math.floor(Math.random() * 800) + 100,
        status: gitHubStatus,
        assignee: assignedMember,
        reviewer: reviewerMember,
        codeSnippet,
        commitsCount: 2,
        additions: 120,
        deletions: 15,
      });

      // Beralih ke view GitHub
      setActiveView('github');
    }

    // Reset dan tutup
    setTitle('');
    setDescription('');
    setIsCreateTaskModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCreateTaskModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              <Layers size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                Buat Tugas Baru
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Tentukan apakah tugas ini masuk ke papan TaskFlow atau ke repository CodeHub
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateTaskModalOpen(false)}
            className="btn-icon"
            style={{ borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px', flex: 1 }}>
          {/* TASK DESTINATION SELECTOR */}
          <div style={{ marginBottom: '22px' }}>
            <label className="form-label">
              TUJUAN TUGAS &bull; Ke mana tugas ini akan diarahkan?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '6px' }}>
              {/* Opsi 1: TaskFlow */}
              <div
                onClick={() => setTaskType('clickup')}
                style={{
                  border: taskType === 'clickup' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: taskType === 'clickup' ? 'var(--primary-light)' : 'var(--bg-input)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: '#7b68ee',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckSquare size={16} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)' }}>
                    Tugas TaskFlow
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  Masuk ke menu <strong>TaskFlow</strong>, papan Kanban, dan pelacak prioritas sprint.
                </p>
              </div>

              {/* Opsi 2: CodeHub */}
              <div
                onClick={() => setTaskType('github')}
                style={{
                  border: taskType === 'github' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: taskType === 'github' ? 'var(--primary-light)' : 'var(--bg-input)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: '#24292e',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <GitBranch size={16} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)' }}>
                    Tugas Kode CodeHub
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  Masuk ke menu <strong>CodeHub</strong>, pull request (PR), cabang branch, dan peninjauan kode.
                </p>
              </div>
            </div>
          </div>

          {/* Judul Tugas */}
          <div className="form-group">
            <label className="form-label">Judul Tugas *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder={taskType === 'clickup' ? 'Contoh: Desain landing page responsif' : 'Contoh: feat(auth): validasi token sesi pengguna'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Deskripsi */}
          <div className="form-group">
            <label className="form-label">Deskripsi / Rincian Instruksi</label>
            <textarea
              className="form-textarea"
              placeholder="Jelaskan apa yang perlu diselesaikan atau diuji dalam tugas ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Penanggung Jawab */}
          <div className="form-group">
            <label className="form-label">Penanggung Jawab (Assignee)</label>
            <select
              className="form-select"
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role})
                </option>
              ))}
            </select>
          </div>

          {/* FORM SESUAI TIPE */}
          {taskType === 'clickup' ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Status Awal</label>
                  <select
                    className="form-select"
                    value={clickUpStatus}
                    onChange={(e) => setClickUpStatus(e.target.value as ClickUpStatus)}
                  >
                    <option value="todo">Belum Dikerjakan (To Do)</option>
                    <option value="in_progress">Sedang Dikerjakan (In Progress)</option>
                    <option value="review">Dalam Peninjauan (Review)</option>
                    <option value="done">Selesai (Completed)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Tingkat Prioritas</label>
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ClickUpPriority)}
                  >
                    <option value="urgent">Mendesak (Urgent)</option>
                    <option value="high">Tinggi (High)</option>
                    <option value="medium">Sedang (Medium)</option>
                    <option value="low">Rendah (Low)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Tenggat Waktu (Due Date)</label>
                  <input
                    type="date"
                    className="form-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tag Kategori (pisahkan koma)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Frontend, Backend, Sprint-15"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Repository GitHub Tujuan</label>
                  <input
                    type="text"
                    className="form-input"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Cabang (Branch Name)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Nomor PR / Issue</label>
                  <input
                    type="number"
                    className="form-input"
                    value={prNumber}
                    onChange={(e) => setPrNumber(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Peninjau Kode (Reviewer)</label>
                  <select
                    className="form-select"
                    value={reviewerId}
                    onChange={(e) => setReviewerId(e.target.value)}
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cuplikan Kode / Perubahan Diff (Opsional)</label>
                <textarea
                  className="form-textarea"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Tombol Aksi */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '16px',
            }}
          >
            <button
              type="button"
              onClick={() => setIsCreateTaskModalOpen(false)}
              className="btn btn-outline"
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
              <span>Terbitkan ke {taskType === 'clickup' ? 'Papan TaskFlow' : 'Pusat Kode CodeHub'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
