import type { ReactNode } from 'react';
import { AlertCircle, Inbox, LoaderCircle } from 'lucide-react';

export function LoadingState({ label = 'Memuat data...' }: { label?: string }) {
  return <div className="state-card" role="status"><LoaderCircle className="spin" size={24} /><span>{label}</span></div>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="state-card"><Inbox size={30} /><strong>{title}</strong><span>{description}</span>{action}</div>;
}

export function ErrorState({ message = 'Data belum dapat dimuat.' }: { message?: string }) {
  return <div className="state-card state-error" role="alert"><AlertCircle size={30} /><strong>Terjadi kendala</strong><span>{message}</span></div>;
}
