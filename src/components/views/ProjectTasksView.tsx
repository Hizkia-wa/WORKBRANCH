'use client';

import Link from 'next/link';
import { CalendarDays, CheckCircle2, Circle, ListFilter, Plus } from 'lucide-react';
import { ClickUpTask, Project } from '@/types';

export default function ProjectTasksView({ project, tasks }: { project: Project; tasks: ClickUpTask[] }) {
  const projectTasks = tasks.filter((task) => task.teamId === 'team-1');
  return <div className="module-page"><div className="breadcrumb">Projects / {project.name} / Tasks</div><div className="page-heading"><div><div className="eyebrow">TaskFlow</div><h1>Project tasks</h1><p>Task, review, dan pekerjaan yang terhubung dengan file project.</p></div><button className="btn btn-primary"><Plus size={16} /> New Task</button></div><div className="task-toolbar"><button className="btn btn-outline"><ListFilter size={16} /> Filter</button><button className="btn btn-outline"><CalendarDays size={16} /> Timeline</button></div><div className="task-board">{(['todo', 'in_progress', 'review', 'done'] as const).map((status) => <section className="task-column" key={status}><h2>{status.replace('_', ' ')}</h2>{projectTasks.filter((task) => task.status === status).map((task) => <Link className="task-card" href={`/projects/${project.id}/tasks/${task.id}`} key={task.id}><div className="task-card-status">{status === 'done' ? <CheckCircle2 size={16} /> : <Circle size={16} />}{task.priority}</div><strong>{task.title}</strong><span>{task.description}</span><small>Due {task.dueDate}</small></Link>)}</section>)}</div></div>;
}
