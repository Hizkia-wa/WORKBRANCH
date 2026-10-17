'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Kanban,
  List,
  Plus,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle,
  MoreVertical,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Filter,
} from 'lucide-react';
import Image from 'next/image';
import { ClickUpStatus, ClickUpPriority, ClickUpTask } from '@/types';

export default function ClickUpView() {
  const {
    clickUpTasks,
    updateClickUpStatus,
    deleteTask,
    setIsCreateTaskModalOpen,
    searchQuery,
  } = useApp();

  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTasks = clickUpTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const columns: { id: ClickUpStatus; label: string; color: string; bg: string }[] = [
    { id: 'todo', label: 'Belum Dikerjakan', color: '#ffb400', bg: 'rgba(255, 180, 0, 0.12)' },
    { id: 'in_progress', label: 'Sedang Dikerjakan', color: '#8c57ff', bg: 'rgba(140, 87, 255, 0.12)' },
    { id: 'review', label: 'Dalam Peninjauan', color: '#16b1ff', bg: 'rgba(22, 177, 255, 0.12)' },
    { id: 'done', label: 'Selesai', color: '#56ca00', bg: 'rgba(86, 202, 0, 0.12)' },
  ];

  const getPriorityBadge = (p: ClickUpPriority) => {
    switch (p) {
      case 'urgent':
        return <span className="badge badge-danger">MENDESAK</span>;
      case 'high':
        return <span className="badge badge-warning">TINGGI</span>;
      case 'medium':
        return <span className="badge badge-purple">SEDANG</span>;
      case 'low':
        return <span className="badge" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>RENDAH</span>;
    }
  };

  const getNextStatus = (current: ClickUpStatus): ClickUpStatus | null => {
    if (current === 'todo') return 'in_progress';
    if (current === 'in_progress') return 'review';
    if (current === 'review') return 'done';
    return null;
  };

  const getPrevStatus = (current: ClickUpStatus): ClickUpStatus | null => {
    if (current === 'done') return 'review';
    if (current === 'review') return 'in_progress';
    if (current === 'in_progress') return 'todo';
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Filter ClickUp */}
      <div
        className="materio-card"
        style={{
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#7b68ee',
                boxShadow: '0 0 10px #7b68ee',
              }}
            />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              TaskFlow &bull; Papan Manajemen Tugas
            </h2>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Pelacak alur kerja sprint tim. Tugas yang dibuat untuk TaskFlow masuk ke tahapan Kanban ini.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Toggle Tampilan Papan / Tabel */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-input)',
              borderRadius: '8px',
              padding: '3px',
              border: '1px solid var(--border-color)',
            }}
          >
            <button
              onClick={() => setViewMode('board')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'board' ? 'var(--bg-card)' : 'transparent',
                color: viewMode === 'board' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: viewMode === 'board' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <Kanban size={15} />
              <span>Papan Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'list' ? 'var(--bg-card)' : 'transparent',
                color: viewMode === 'list' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <List size={15} />
              <span>Tabel Rinci</span>
            </button>
          </div>

          {/* Filter Prioritas */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={15} color="var(--text-muted)" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="form-select"
              style={{ padding: '6px 10px', fontSize: '0.8rem', width: 'auto' }}
            >
              <option value="all">Semua Prioritas</option>
              <option value="urgent">Mendesak (Urgent)</option>
              <option value="high">Tinggi (High)</option>
              <option value="medium">Sedang (Medium)</option>
              <option value="low">Rendah (Low)</option>
            </select>
          </div>

          {/* Tombol Buat Tugas */}
          <button
            onClick={() => setIsCreateTaskModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ gap: '6px' }}
          >
            <Plus size={16} />
            <span>Buat Tugas</span>
          </button>
        </div>
      </div>

      {/* TAMPILAN PAPAN KANBAN */}
      {viewMode === 'board' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(260px, 1fr))',
            gap: '18px',
            alignItems: 'start',
          }}
        >
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                style={{
                  background: 'var(--bg-input)',
                  borderRadius: '14px',
                  padding: '14px',
                  minHeight: '480px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* Header Kolom */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '8px',
                    borderBottom: '2px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: col.color,
                      }}
                    />
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--text-heading)',
                      }}
                    >
                      {col.label}
                    </span>
                  </div>
                  <span
                    className="badge"
                    style={{
                      background: col.bg,
                      color: col.color,
                      fontSize: '0.72rem',
                    }}
                  >
                    {colTasks.length}
                  </span>
                </div>

                {/* Kartu Kolom */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="materio-card"
                      style={{
                        padding: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        boxShadow: 'var(--shadow-sm)',
                        borderLeft: `4px solid ${col.color}`,
                      }}
                    >
                      {/* Prioritas & Hapus */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        {getPriorityBadge(task.priority)}
                        <button
                          onClick={() => deleteTask(task.id, 'clickup')}
                          className="btn-icon"
                          style={{ width: '24px', height: '24px', color: 'var(--text-light)' }}
                          title="Hapus Tugas"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Judul & Deskripsi */}
                      <div>
                        <h4
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: 'var(--text-heading)',
                            lineHeight: 1.3,
                          }}
                        >
                          {task.title}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.785rem',
                            color: 'var(--text-muted)',
                            marginTop: '4px',
                            lineHeight: 1.4,
                          }}
                        >
                          {task.description}
                        </p>
                      </div>

                      {/* Tag Kategori */}
                      {task.tags && task.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: '0.68rem',
                                padding: '2px 8px',
                                background: 'var(--bg-input)',
                                borderRadius: '4px',
                                color: 'var(--text-muted)',
                                fontWeight: 500,
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bar Progres */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.7rem',
                            color: 'var(--text-muted)',
                            marginBottom: '4px',
                          }}
                        >
                          <span>Progres Tugas</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: '5px',
                            background: 'var(--bg-input)',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${task.progress}%`,
                              height: '100%',
                              background: col.color,
                              borderRadius: '3px',
                            }}
                          />
                        </div>
                      </div>

                      {/* Footer: Tenggat Waktu & Penanggung Jawab */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--border-color)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.72rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <Calendar size={13} />
                          <span>{task.dueDate}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Image
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            width={24}
                            height={24}
                            unoptimized
                            style={{ borderRadius: '50%' }}
                            title={task.assignee.name}
                          />
                        </div>
                      </div>

                      {/* Tombol Geser Status Cepat */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '6px',
                        }}
                      >
                        {getPrevStatus(col.id) ? (
                          <button
                            onClick={() => updateClickUpStatus(task.id, getPrevStatus(col.id)!)}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '3px 8px', fontSize: '0.7rem', gap: '3px' }}
                          >
                            <ChevronLeft size={12} />
                            <span>Kembali</span>
                          </button>
                        ) : <span />}

                        {getNextStatus(col.id) ? (
                          <button
                            onClick={() => updateClickUpStatus(task.id, getNextStatus(col.id)!)}
                            className="btn btn-primary btn-sm"
                            style={{ padding: '3px 8px', fontSize: '0.7rem', gap: '3px' }}
                          >
                            <span>Lanjut</span>
                            <ChevronRight size={12} />
                          </button>
                        ) : (
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: 'var(--success)',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <CheckCircle size={12} /> Selesai
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div
                      style={{
                        padding: '28px 12px',
                        textAlign: 'center',
                        color: 'var(--text-light)',
                        fontSize: '0.8rem',
                        border: '1px dashed var(--border-color)',
                        borderRadius: '10px',
                      }}
                    >
                      Belum ada tugas di kolom {col.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TAMPILAN TABEL DAFTAR TUGAS */
        <div className="materio-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-input)' }}>
                <th style={{ padding: '14px 20px', fontSize: '0.785rem', color: 'var(--text-muted)' }}>JUDUL TUGAS</th>
                <th style={{ padding: '14px 20px', fontSize: '0.785rem', color: 'var(--text-muted)' }}>PENANGGUNG JAWAB</th>
                <th style={{ padding: '14px 20px', fontSize: '0.785rem', color: 'var(--text-muted)' }}>TENGGAT WAKTU</th>
                <th style={{ padding: '14px 20px', fontSize: '0.785rem', color: 'var(--text-muted)' }}>PRIORITAS</th>
                <th style={{ padding: '14px 20px', fontSize: '0.785rem', color: 'var(--text-muted)' }}>STATUS TUGAS</th>
                <th style={{ padding: '14px 20px', fontSize: '0.785rem', color: 'var(--text-muted)' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    transition: 'background 0.15s',
                  }}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {task.description.slice(0, 60)}...
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Image
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        width={26}
                        height={26}
                        unoptimized
                        style={{ borderRadius: '50%' }}
                      />
                      <span style={{ fontSize: '0.8125rem' }}>{task.assignee.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    {task.dueDate}
                  </td>
                  <td style={{ padding: '16px 20px' }}>{getPriorityBadge(task.priority)}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      value={task.status}
                      onChange={(e) => updateClickUpStatus(task.id, e.target.value as ClickUpStatus)}
                      className="form-select"
                      style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                    >
                      <option value="todo">Belum Dikerjakan (To Do)</option>
                      <option value="in_progress">Sedang Dikerjakan (In Progress)</option>
                      <option value="review">Dalam Peninjauan (Review)</option>
                      <option value="done">Selesai (Completed)</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      onClick={() => deleteTask(task.id, 'clickup')}
                      className="btn-icon"
                      style={{ color: 'var(--danger)' }}
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
