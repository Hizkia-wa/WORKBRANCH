'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Users, Sparkles, FolderGit2 } from 'lucide-react';

export default function CreateTeamModal() {
  const { isCreateTeamModalOpen, setIsCreateTeamModalOpen, createTeam, setActiveView } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('⚡');
  const [defaultRepo, setDefaultRepo] = useState('');

  if (!isCreateTeamModalOpen) return null;

  const emojiList = ['⚡', '🚀', '🔥', '💻', '🛡️', '🎯', '✨', '💎', '⚙️', '🤖'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createTeam(
      name,
      description,
      avatar,
      defaultRepo || `materio-hq/${name.toLowerCase().replace(/\s+/g, '-')}`
    );

    setName('');
    setDescription('');
    setDefaultRepo('');
    setIsCreateTeamModalOpen(false);
    setActiveView('dashboard');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCreateTeamModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px' }}
      >
        {/* Header */}
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
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                Buat Workspace Tim Baru
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Kelola tugas ClickUp, hubungkan repository GitHub, dan koordinasi bersama tim
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateTeamModalOpen(false)}
            className="btn-icon"
            style={{ borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* Avatar Icon Picker */}
          <div className="form-group">
            <label className="form-label">Ikon Lencana Tim</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
              {emojiList.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setAvatar(em)}
                  style={{
                    width: '38px',
                    height: '38px',
                    fontSize: '1.2rem',
                    borderRadius: '8px',
                    border: avatar === em ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: avatar === em ? 'var(--primary-light)' : 'var(--bg-input)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Nama Tim */}
          <div className="form-group">
            <label className="form-label">Nama Tim *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="Contoh: Tim Frontend Garuda"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!defaultRepo) {
                  setDefaultRepo(`materio-hq/${e.target.value.toLowerCase().replace(/\s+/g, '-')}`);
                }
              }}
            />
          </div>

          {/* Deskripsi */}
          <div className="form-group">
            <label className="form-label">Visi & Deskripsi Tim</label>
            <textarea
              className="form-textarea"
              placeholder="Apa fokus utama dan tanggung jawab tim ini?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Default GitHub Repository */}
          <div className="form-group">
            <label className="form-label">Repository GitHub Default</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="materio-hq/apollo-core"
                value={defaultRepo}
                onChange={(e) => setDefaultRepo(e.target.value)}
              />
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Semua tugas kode dan pull request dari tim ini akan diarahkan ke repository ini secara default.
            </p>
          </div>

          {/* Tombol Aksi */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '20px',
            }}
          >
            <button
              type="button"
              onClick={() => setIsCreateTeamModalOpen(false)}
              className="btn btn-outline"
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary" style={{ gap: '6px' }}>
              <Sparkles size={16} />
              <span>Buat Tim Sekarang</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
