'use client';

import Link from 'next/link';
import { ArrowRight, FolderKanban, Plus, Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/ui/PageStates';

const content: Record<string, [string, string]> = {
  projects: ['Projects', 'Kelola seluruh project, milestone, dan progress workspace dalam satu tempat.'],
  notifications: ['Notifications', 'Pantau penugasan, review, approval, dan aktivitas terbaru workspace.'],
  search: ['Global Search', 'Cari task, file, project, member, dan aktivitas secara terpusat.'],
  members: ['Workspace Members', 'Kelola anggota, peran, dan akses kolaborasi workspace.'],
  settings: ['Workspace Settings', 'Atur identitas workspace, preferensi tampilan, dan data demo.'],
  pricing: ['WorkBranch Plans', 'Pilih paket yang sesuai dengan skala kolaborasi tim Anda.'],
  reviews: ['Review Queue', 'Tinjau pekerjaan yang menunggu approval dari tim.'],
  activity: ['Activity Timeline', 'Lihat jejak perubahan project, task, file, dan review.'],
  discussions: ['Team Discussions', 'Diskusi terstruktur berdasarkan project dan channel kerja.'],
};

export default function WorkspaceModuleView({ module }: { module: string }) {
  const [title, description] = content[module] ?? ['WorkBranch', 'Workspace kolaborasi project dan file.'];
  return <div className="module-page"><div className="page-heading"><div><div className="eyebrow"><Sparkles size={14} /> WorkBranch Workspace</div><h1>{title}</h1><p>{description}</p></div><button className="btn btn-primary"><Plus size={16} /> New</button></div><div className="module-grid"><section className="materio-card module-hero"><FolderKanban size={30} color="var(--primary)" /><h2>Where Projects Remember.</h2><p>Data mock tersimpan melalui data layer terpusat yang siap diganti backend di masa depan.</p><Link className="btn btn-secondary" href="/projects">Lihat Projects <ArrowRight size={15} /></Link></section><section className="materio-card"><EmptyState title="Belum ada aktivitas baru" description="Aksi seperti membuat task, push file, atau approval akan muncul di sini." /></section></div></div>;
}
