import {
  initialChannels,
  initialClickUpTasks,
  initialGitHubTasks,
  initialMembers,
  initialMessages,
  initialTeams,
} from '@/data/mockData';
import { Activity, Channel, ChatMessage, ClickUpTask, GitHubTask, Project, Team, TeamMember, WorkspaceFile } from '@/types';

const STORAGE_VERSION = 'v2';
const PREFIX = `workbranch:${STORAGE_VERSION}:`;
const THEME_KEY = `${PREFIX}theme`;

const seededProjects: Project[] = [
  { id: 'project-duluinnovation', name: 'Duluinnovation 2026', description: 'Platform kolaborasi dan inovasi produk digital.', status: 'active', progress: 64, ownerId: 'm1', memberIds: ['m1', 'm2', 'm3', 'm4'], updatedAt: '2026-10-20' },
  { id: 'project-bebras', name: 'Bebras Challenge 2026', description: 'Persiapan materi, publikasi, dan operasional challenge.', status: 'planning', progress: 28, ownerId: 'm2', memberIds: ['m1', 'm2', 'm3'], updatedAt: '2026-10-18' },
];

const seededFiles: WorkspaceFile[] = [
  { id: 'file-roadmap', projectId: 'project-duluinnovation', name: 'Product Roadmap.docx', path: '/planning/Product Roadmap.docx', kind: 'docx', size: '2.4 MB', updatedAt: '2026-10-20', linkedTaskIds: ['cu-101'] },
  { id: 'file-budget', projectId: 'project-duluinnovation', name: 'Sprint Budget.xlsx', path: '/planning/Sprint Budget.xlsx', kind: 'xlsx', size: '840 KB', updatedAt: '2026-10-19', linkedTaskIds: [] },
  { id: 'file-deck', projectId: 'project-bebras', name: 'Challenge Brief.pptx', path: '/brief/Challenge Brief.pptx', kind: 'pptx', size: '5.1 MB', updatedAt: '2026-10-18', linkedTaskIds: [] },
];

const seeds = {
  teams: initialTeams,
  clickUpTasks: initialClickUpTasks,
  gitHubTasks: initialGitHubTasks,
  channels: initialChannels,
  messages: initialMessages,
  members: initialMembers,
  projects: seededProjects,
  files: seededFiles,
  activities: [] as Activity[],
};

function key(name: keyof typeof seeds): string {
  return `${PREFIX}${name}`;
}

export function readStored<T>(name: keyof typeof seeds, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key(name));
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored<T>(name: keyof typeof seeds, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key(name), JSON.stringify(value));
  } catch {
    // Persistence is best effort in the mock-only client data layer.
  }
}

export function resetDemoData(): void {
  if (typeof window === 'undefined') return;
  Object.entries(seeds).forEach(([name, value]) => {
    writeStored(name as keyof typeof seeds, value);
  });
}

export function readTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    return window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function writeTheme(theme: 'light' | 'dark'): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Persistence is best effort in the mock-only client data layer.
  }
}

export async function getTeams(): Promise<Team[]> {
  return readStored('teams', initialTeams);
}

export async function getMembers(): Promise<TeamMember[]> {
  return readStored('members', initialMembers);
}

export async function getClickUpTasks(): Promise<ClickUpTask[]> {
  return readStored('clickUpTasks', initialClickUpTasks);
}

export async function getGitHubTasks(): Promise<GitHubTask[]> {
  return readStored('gitHubTasks', initialGitHubTasks);
}

export async function getChannels(): Promise<Channel[]> {
  return readStored('channels', initialChannels);
}

export async function getMessages(): Promise<ChatMessage[]> {
  return readStored('messages', initialMessages);
}

export async function getProjects(): Promise<Project[]> {
  return readStored('projects', seededProjects);
}

export async function getFiles(): Promise<WorkspaceFile[]> {
  return readStored('files', seededFiles);
}

export async function getActivities(): Promise<Activity[]> {
  return readStored('activities', []);
}
