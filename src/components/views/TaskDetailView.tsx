'use client';

import { FileText, Link2, MessageSquare, Send, UserRound } from 'lucide-react';
import { ClickUpTask, WorkspaceFile } from '@/types';

export default function TaskDetailView({ task, files }: { task: ClickUpTask; files: WorkspaceFile[] }) {
  const linkedFiles = files.filter((file) => file.linkedTaskIds.includes(task.id));
  return <div className="module-page"><div className="breadcrumb">TaskFlow / {task.title}</div><div className="page-heading"><div><span className={`badge badge-${task.status === 'done' ? 'success' : 'info'}`}>{task.status}</span><h1>{task.title}</h1><p>{task.description}</p></div><button className="btn btn-primary"><Send size={16} /> Submit for Review</button></div><div className="detail-grid"><section className="materio-card detail-main"><h2>Task details</h2><div className="detail-meta"><span><UserRound size={16} /> {task.assignee.name}</span><span><FileText size={16} /> {task.priority}</span><span>Due {task.dueDate}</span></div><h3>Linked Files <button className="btn btn-secondary btn-sm"><Link2 size={14} /> Link File</button></h3>{linkedFiles.length ? linkedFiles.map((file) => <div className="linked-file" key={file.id}><FileText size={18} /><span>{file.name}</span><small>{file.size}</small></div>) : <p className="muted">Belum ada file terhubung.</p>}</section><aside className="materio-card"><h2>Activity</h2><div className="activity-item"><MessageSquare size={16} /><span>Task dibuat dan siap dikerjakan.</span></div><div className="activity-item"><UserRound size={16} /><span>Assigned to {task.assignee.name}.</span></div></aside></div></div>;
}
