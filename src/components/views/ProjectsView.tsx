'use client';

import Link from 'next/link';
import { FolderKanban, ArrowUpRight, Plus, Users } from 'lucide-react';
import { Project } from '@/types';

export default function ProjectsView({ projects }: { projects: Project[] }) {
  return <div className="module-page"><div className="page-heading"><div><div className="eyebrow"><FolderKanban size={14} /> Workspace Projects</div><h1>Projects</h1><p>Kelola project, milestone, file, dan pekerjaan tim secara terukur.</p></div><Link className="btn btn-primary" href="/projects/new"><Plus size={16} /> New Project</Link></div><div className="project-grid">{projects.map((project) => <Link className="materio-card project-card" href={`/projects/${project.id}`} key={project.id}><div className="project-card-top"><span className={`badge badge-${project.status === 'active' ? 'success' : 'info'}`}>{project.status}</span><ArrowUpRight size={18} /></div><h2>{project.name}</h2><p>{project.description}</p><div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div><div className="project-card-meta"><span>{project.progress}% progress</span><span><Users size={14} /> {project.memberIds.length}</span></div></Link>)}</div></div>;
}
