'use client';

import Link from 'next/link';
import { FileArchive, FileSpreadsheet, FileText, Image, LockKeyhole, Plus, Upload } from 'lucide-react';
import { Project, WorkspaceFile } from '@/types';

const icons = { docx: FileText, xlsx: FileSpreadsheet, pptx: FileArchive, pdf: FileText, image: Image, video: FileArchive, code: FileText };

export default function RepositoryView({ project, files }: { project: Project; files: WorkspaceFile[] }) {
  return <div className="module-page"><div className="breadcrumb">Projects / {project.name} / Repository</div><div className="page-heading"><div><div className="eyebrow">CodeHub</div><h1>Repository</h1><p>Semua aset project, bukan hanya source code. Versi dan aktivitas tetap terlacak.</p></div><div className="task-toolbar"><button className="btn btn-outline"><Upload size={16} /> Upload file</button><button className="btn btn-primary"><Plus size={16} /> New folder</button></div></div><div className="repository-toolbar"><span>/ root</span><span>{files.length} files</span></div><div className="file-list">{files.map((file) => { const Icon = icons[file.kind]; return <Link className="file-row" href={`/projects/${project.id}/repository/files/${file.id}`} key={file.id}><Icon size={22} className="file-icon" /><span className="file-name"><strong>{file.name}</strong><small>{file.path}</small></span><span>{file.kind.toUpperCase()}</span><span>{file.size}</span>{file.lockedBy ? <LockKeyhole size={16} /> : null}</Link>; })}</div></div>;
}
