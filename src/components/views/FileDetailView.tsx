'use client';

import { useState } from 'react';
import { ArrowDownToLine, FileText, GitCommitHorizontal, LockKeyhole, RotateCcw, Send, Unlock } from 'lucide-react';
import { WorkspaceFile } from '@/types';

export default function FileDetailView({ file }: { file: WorkspaceFile }) {
  const [message, setMessage] = useState('');
  const [locked, setLocked] = useState(Boolean(file.lockedBy));
  const notify = (text: string) => setMessage(text);
  return <div className="module-page"><div className="breadcrumb">Repository / {file.name}</div><div className="page-heading"><div><div className="eyebrow"><FileText size={14} /> File detail</div><h1>{file.name}</h1><p>{file.path} · {file.size}</p></div><button className="btn btn-secondary" onClick={() => { setLocked(!locked); notify(locked ? 'File unlocked.' : 'File locked for you.'); }}>{locked ? <Unlock size={16} /> : <LockKeyhole size={16} />}{locked ? 'Unlock' : 'Lock file'}</button></div>{message ? <div className="toast-banner">{message}</div> : null}<div className="file-actions"><button className="btn btn-primary" onClick={() => notify('New version pushed to mock repository.')}><Send size={16} /> Push changes</button><button className="btn btn-outline" onClick={() => notify('Latest version pulled.')}><ArrowDownToLine size={16} /> Pull latest</button><button className="btn btn-outline" onClick={() => notify('Version restored in mock repository.')}><RotateCcw size={16} /> Restore</button></div><div className="detail-grid"><section className="materio-card"><h2>Version history</h2>{['v3 · Kia · Today', 'v2 · Andi · Yesterday', 'v1 · Kia · Oct 12'].map((version) => <div className="activity-item" key={version}><GitCommitHorizontal size={16} /><span>{version}<small> Updated project asset</small></span></div>)}</section><aside className="materio-card"><h2>Preview</h2><div className="file-preview"><FileText size={40} /><span>Preview for {file.kind.toUpperCase()}</span></div></aside></div></div>;
}
