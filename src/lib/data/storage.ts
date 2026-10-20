import {
  initialChannels,
  initialClickUpTasks,
  initialGitHubTasks,
  initialMembers,
  initialMessages,
  initialTeams,
} from '@/data/mockData';
import { Channel, ChatMessage, ClickUpTask, GitHubTask, Team, TeamMember } from '@/types';

const STORAGE_VERSION = 'v2';
const PREFIX = `workbranch:${STORAGE_VERSION}:`;
const THEME_KEY = `${PREFIX}theme`;

const seeds = {
  teams: initialTeams,
  clickUpTasks: initialClickUpTasks,
  gitHubTasks: initialGitHubTasks,
  channels: initialChannels,
  messages: initialMessages,
  members: initialMembers,
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
