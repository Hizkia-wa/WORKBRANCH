'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Kanban,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ClickUpPriority, ClickUpStatus } from '@/types';

type ViewMode = 'board' | 'list';
type PriorityFilter = 'all' | ClickUpPriority;

const columns: {
  id: ClickUpStatus;
  label: string;
  description: string;
  color: string;
}[] = [
  { id: 'todo', label: 'To Do', description: 'Belum dikerjakan', color: '#0b75b8' },
  { id: 'in_progress', label: 'In Progress', description: 'Sedang dikerjakan', color: '#0b5cab' },
  { id: 'review', label: 'Review', description: 'Menunggu peninjauan', color: '#159957' },
  { id: 'done', label: 'Done', description: 'Selesai', color: '#087f5b' },
];

const priorityLabels: Record<PriorityFilter, string> = {
  all: 'Semua',
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function getNextStatus(status: ClickUpStatus): ClickUpStatus | null {
  if (status === 'todo') return 'in_progress';
  if (status === 'in_progress') return 'review';
  if (status === 'review') return 'done';
  return null;
}

function getPreviousStatus(status: ClickUpStatus): ClickUpStatus | null {
  if (status === 'done') return 'review';
  if (status === 'review') return 'in_progress';
  if (status === 'in_progress') return 'todo';
  return null;
}

function getPriorityClass(priority: ClickUpPriority): string {
  return `task-priority task-priority-${priority}`;
}

export default function ClickUpView() {
  const {
    clickUpTasks,
    updateClickUpStatus,
    deleteTask,
    setIsCreateTaskModalOpen,
    showNotification,
    searchQuery,
  } = useApp();
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [localSearch, setLocalSearch] = useState('');

  const filteredTasks = useMemo(() => {
    const query = `${searchQuery} ${localSearch}`.trim().toLowerCase();
    return clickUpTasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [clickUpTasks, localSearch, priorityFilter, searchQuery]);

  const handleDelete = (taskId: string, title: string) => {
    if (window.confirm(`Hapus tugas "${title}"?`)) {
      deleteTask(taskId, 'clickup');
    }
  };

  const moveTask = (taskId: string, status: ClickUpStatus | null) => {
    if (status) updateClickUpStatus(taskId, status);
  };

  const renderPriority = (priority: ClickUpPriority) => (
    <span className={getPriorityClass(priority)}>{priorityLabels[priority]}</span>
  );

  const renderTaskCard = (task: (typeof clickUpTasks)[number], color: string) => {
    const nextStatus = getNextStatus(task.status);
    const previousStatus = getPreviousStatus(task.status);
    const checklistDone = task.checklist?.filter((item) => item.done).length ?? 0;
    const checklistTotal = task.checklist?.length ?? 0;

    return (
      <article className="taskflow-card" key={task.id} style={{ '--task-accent': color } as React.CSSProperties}>
        <div className="taskflow-card-top">
          {renderPriority(task.priority)}
          <div className="taskflow-card-menu">
            <button
              className="taskflow-icon-button"
              title="Tindakan tugas"
              onClick={() => showNotification(`Tindakan tersedia untuk "${task.title}".`)}
            >
              <MoreHorizontal size={16} />
            </button>
            <button
              className="taskflow-icon-button taskflow-delete-button"
              title="Hapus tugas"
              onClick={() => handleDelete(task.id, task.title)}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="taskflow-card-content">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>

        <div className="taskflow-tags">
          {task.tags.slice(0, 3).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>

        <div className="taskflow-progress">
          <div className="taskflow-progress-label">
            <span>Progress</span>
            <strong>{task.progress}%</strong>
          </div>
          <div className="taskflow-progress-track">
            <span style={{ width: `${task.progress}%` }} />
          </div>
        </div>

        {checklistTotal > 0 && (
          <div className="taskflow-checklist">
            <CheckCircle2 size={14} />
            <span>{checklistDone}/{checklistTotal} checklist selesai</span>
          </div>
        )}

        <div className="taskflow-card-footer">
          <span className="taskflow-due-date">
            <CalendarDays size={14} />
            {task.dueDate}
          </span>
          <Image
            src={task.assignee.avatar}
            alt={task.assignee.name}
            title={task.assignee.name}
            width={30}
            height={30}
            unoptimized
            className="taskflow-avatar"
          />
        </div>

        <div className="taskflow-card-actions">
          {previousStatus ? (
            <button className="btn btn-outline btn-sm" onClick={() => moveTask(task.id, previousStatus)}>
              <ChevronLeft size={14} />
              Kembali
            </button>
          ) : (
            <span />
          )}
          {nextStatus ? (
            <button className="btn btn-primary btn-sm" onClick={() => moveTask(task.id, nextStatus)}>
              Lanjut
              <ChevronRight size={14} />
            </button>
          ) : (
            <span className="taskflow-complete-label">
              <Check size={14} />
              Selesai
            </span>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className="taskflow-page">
      <section className="taskflow-heading">
        <div>
          <div className="taskflow-kicker">
            <span />
            Task Management
          </div>
          <h1>TaskFlow <span>•</span> Papan Manajemen Tugas</h1>
          <p>Atur prioritas, lacak progress, dan pindahkan pekerjaan tanpa kehilangan konteks.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsCreateTaskModalOpen(true)}>
          <Plus size={17} />
          New Task
        </button>
      </section>

      <section className="taskflow-toolbar">
        <div className="taskflow-search">
          <Search size={16} />
          <input
            value={localSearch}
            onChange={(event) => setLocalSearch(event.target.value)}
            placeholder="Cari task, tag, atau deskripsi..."
            aria-label="Cari task"
          />
        </div>
        <div className="taskflow-priority-filter">
          <Filter size={15} />
          <span>Prioritas:</span>
          {(['all', 'urgent', 'high', 'medium', 'low'] as PriorityFilter[]).map((priority) => (
            <button
              key={priority}
              className={priorityFilter === priority ? 'is-active' : ''}
              onClick={() => setPriorityFilter(priority)}
            >
              {priorityLabels[priority]}
            </button>
          ))}
        </div>
        <div className="taskflow-view-toggle" role="group" aria-label="Tampilan task">
          <button className={viewMode === 'board' ? 'is-active' : ''} onClick={() => setViewMode('board')}>
            <Kanban size={15} />
            Kanban
          </button>
          <button className={viewMode === 'list' ? 'is-active' : ''} onClick={() => setViewMode('list')}>
            <List size={15} />
            List
          </button>
        </div>
      </section>

      {viewMode === 'board' ? (
        <section className="taskflow-board">
          {columns.map((column) => {
            const tasks = filteredTasks.filter((task) => task.status === column.id);
            return (
              <div className="taskflow-column" key={column.id}>
                <header className="taskflow-column-header">
                  <div>
                    <div className="taskflow-column-title">
                      <span style={{ background: column.color }} />
                      <h2>{column.label}</h2>
                    </div>
                    <p>{column.description}</p>
                  </div>
                  <span className="taskflow-count">{tasks.length}</span>
                </header>
                <div className="taskflow-column-body">
                  {tasks.map((task) => renderTaskCard(task, column.color))}
                  <button className="taskflow-add-card" onClick={() => setIsCreateTaskModalOpen(true)}>
                    <Plus size={15} />
                    Tambah task
                  </button>
                  {tasks.length === 0 && <div className="taskflow-empty">Belum ada task di kolom ini.</div>}
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="taskflow-list">
          <div className="taskflow-list-header">
            <span>Task</span>
            <span>Assignee</span>
            <span>Deadline</span>
            <span>Priority</span>
            <span>Status</span>
            <span>Aksi</span>
          </div>
          {filteredTasks.map((task) => (
            <div className="taskflow-list-row" key={task.id}>
              <div>
                <strong>{task.title}</strong>
                <small>{task.description}</small>
              </div>
              <span className="taskflow-list-assignee">
                <Image src={task.assignee.avatar} alt={task.assignee.name} width={26} height={26} unoptimized />
                {task.assignee.name}
              </span>
              <span>{task.dueDate}</span>
              <span>{renderPriority(task.priority)}</span>
              <select value={task.status} onChange={(event) => updateClickUpStatus(task.id, event.target.value as ClickUpStatus)}>
                {columns.map((column) => <option key={column.id} value={column.id}>{column.label}</option>)}
              </select>
              <button className="taskflow-icon-button taskflow-delete-button" onClick={() => handleDelete(task.id, task.title)} title="Hapus task">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {filteredTasks.length === 0 && <div className="taskflow-empty">Tidak ada task yang cocok dengan filter.</div>}
        </section>
      )}
    </div>
  );
}
