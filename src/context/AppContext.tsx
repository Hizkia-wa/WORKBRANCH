'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Team,
  TeamMember,
  ClickUpTask,
  GitHubTask,
  Channel,
  ChatMessage,
  ActiveView,
  ClickUpStatus,
  GitHubStatus,
} from '@/types';
import {
  initialTeams,
  initialMembers,
  initialClickUpTasks,
  initialGitHubTasks,
  initialChannels,
  initialMessages,
} from '@/data/mockData';
import {
  getClickUpTasks,
  getGitHubTasks,
  getTeams,
  readTheme,
  writeStored,
  writeTheme,
} from '@/lib/data/storage';

interface AppContextType {
  teams: Team[];
  currentTeam: Team;
  setCurrentTeamId: (id: string) => void;
  createTeam: (name: string, description: string, avatar: string, defaultRepo: string) => Team;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  clickUpTasks: ClickUpTask[];
  gitHubTasks: GitHubTask[];
  createClickUpTask: (data: Omit<ClickUpTask, 'id' | 'createdAt' | 'type' | 'teamId'>) => void;
  createGitHubTask: (data: Omit<GitHubTask, 'id' | 'createdAt' | 'type' | 'teamId'>) => void;
  updateClickUpStatus: (taskId: string, status: ClickUpStatus) => void;
  updateGitHubStatus: (taskId: string, status: GitHubStatus) => void;
  deleteTask: (taskId: string, type: 'clickup' | 'github') => void;
  channels: Channel[];
  currentChannelId: string;
  setCurrentChannelId: (id: string) => void;
  messages: ChatMessage[];
  sendMessage: (channelId: string, content: string) => void;
  addReaction: (messageId: string, emoji: string) => void;
  members: TeamMember[];
  isCreateTaskModalOpen: boolean;
  setIsCreateTaskModalOpen: (open: boolean) => void;
  isCreateTeamModalOpen: boolean;
  setIsCreateTeamModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  isLandingPage: boolean;
  setIsLandingPage: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLandingPage, setIsLandingPage] = useState<boolean>(true);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [currentTeamId, setCurrentTeamId] = useState<string>('team-1');
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [clickUpTasks, setClickUpTasks] = useState<ClickUpTask[]>(initialClickUpTasks);
  const [gitHubTasks, setGitHubTasks] = useState<GitHubTask[]>(initialGitHubTasks);
  const [channels] = useState<Channel[]>(initialChannels);
  const [currentChannelId, setCurrentChannelId] = useState<string>('ch-general');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [members] = useState<TeamMember[]>(initialMembers);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notification, setNotification] = useState<string | null>(null);

  // Load from localStorage if present
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const [savedTeams, savedCUTasks, savedGHTasks] = await Promise.all([
          getTeams(),
          getClickUpTasks(),
          getGitHubTasks(),
        ]);
        setTeams(savedTeams);
        setClickUpTasks(savedCUTasks);
        setGitHubTasks(savedGHTasks);
        const savedTheme = readTheme();
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } catch {
        // Ignore unavailable or malformed local storage data.
      }
    };

    const timeoutId = window.setTimeout(() => void loadSavedState(), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  // Save changes
  useEffect(() => {
    writeStored('teams', teams);
  }, [teams]);

  useEffect(() => {
    writeStored('clickUpTasks', clickUpTasks);
  }, [clickUpTasks]);

  useEffect(() => {
    writeStored('gitHubTasks', gitHubTasks);
  }, [gitHubTasks]);

  const currentTeam = teams.find((t) => t.id === currentTeamId) || teams[0];

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    writeTheme(next);
  };

  const createTeam = (name: string, description: string, avatar: string, defaultRepo: string): Team => {
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description: description || 'Workspace tim kolaboratif baru',
      avatar: avatar || 'WB',
      members: initialMembers,
      defaultRepo: defaultRepo || `workbranch-hq/${name.toLowerCase().replace(/\s+/g, '-')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTeams((prev) => [...prev, newTeam]);
    setCurrentTeamId(newTeam.id);
    showNotification(`Tim "${newTeam.name}" berhasil dibuat!`);
    return newTeam;
  };

  const createClickUpTask = (data: Omit<ClickUpTask, 'id' | 'createdAt' | 'type' | 'teamId'>) => {
    const newTask: ClickUpTask = {
      ...data,
      id: `cu-${Date.now().toString().slice(-4)}`,
      teamId: currentTeam.id,
      type: 'clickup',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setClickUpTasks((prev) => [newTask, ...prev]);
    showNotification(`Tugas "${newTask.title}" berhasil ditambahkan ke papan TaskFlow!`);
  };

  const createGitHubTask = (data: Omit<GitHubTask, 'id' | 'createdAt' | 'type' | 'teamId'>) => {
    const newTask: GitHubTask = {
      ...data,
      id: `gh-${Date.now().toString().slice(-4)}`,
      teamId: currentTeam.id,
      type: 'github',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setGitHubTasks((prev) => [newTask, ...prev]);
    showNotification(`Tugas kode & PR #${newTask.prNumber} berhasil dikirim ke Pusat Kode CodeHub!`);
  };

  const updateClickUpStatus = (taskId: string, status: ClickUpStatus) => {
    setClickUpTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
    const statusMap: Record<ClickUpStatus, string> = {
      todo: 'Belum Dikerjakan',
      in_progress: 'Sedang Dikerjakan',
      review: 'Dalam Peninjauan',
      done: 'Selesai',
    };
    showNotification(`Status tugas TaskFlow dipindahkan ke "${statusMap[status]}"`);
  };

  const updateGitHubStatus = (taskId: string, status: GitHubStatus) => {
    setGitHubTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
    const ghStatusMap: Record<GitHubStatus, string> = {
      open_issue: 'Issue Terbuka',
      pr_open: 'PR Terbuka',
      in_review: 'Dalam Review',
      merged: 'Berhasil Digabung (Merged)',
    };
    showNotification(`Status tugas CodeHub diperbarui ke "${ghStatusMap[status]}"`);
  };

  const deleteTask = (taskId: string, type: 'clickup' | 'github') => {
    if (type === 'clickup') {
      setClickUpTasks((prev) => prev.filter((t) => t.id !== taskId));
    } else {
      setGitHubTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
    showNotification('Tugas berhasil dihapus.');
  };

  const sendMessage = (channelId: string, content: string) => {
    if (!content.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      teamId: currentTeam.id,
      sender: initialMembers[0], // current user
      content,
      timestamp: timeStr,
      reactions: [],
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        const reactions = msg.reactions || [];
        const existing = reactions.find((r) => r.emoji === emoji);
        if (existing) {
          return {
            ...msg,
            reactions: reactions.map((r) =>
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            ),
          };
        } else {
          return {
            ...msg,
            reactions: [...reactions, { emoji, count: 1, users: ['m1'] }],
          };
        }
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        teams,
        currentTeam,
        setCurrentTeamId,
        createTeam,
        activeView,
        setActiveView,
        clickUpTasks,
        gitHubTasks,
        createClickUpTask,
        createGitHubTask,
        updateClickUpStatus,
        updateGitHubStatus,
        deleteTask,
        channels,
        currentChannelId,
        setCurrentChannelId,
        messages,
        sendMessage,
        addReaction,
        members,
        isCreateTaskModalOpen,
        setIsCreateTaskModalOpen,
        isCreateTeamModalOpen,
        setIsCreateTeamModalOpen,
        searchQuery,
        setSearchQuery,
        theme,
        toggleTheme,
        notification,
        showNotification,
        isLandingPage,
        setIsLandingPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
