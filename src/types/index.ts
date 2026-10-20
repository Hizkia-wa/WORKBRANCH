export type TaskType = 'clickup' | 'github';

export type TaskFlowStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type ClickUpStatus = TaskFlowStatus;

export type TaskFlowPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ClickUpPriority = TaskFlowPriority;

export type CodeHubStatus = 'open_issue' | 'pr_open' | 'in_review' | 'merged';
export type GitHubStatus = CodeHubStatus;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'online' | 'idle' | 'offline';
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar: string;
  members: TeamMember[];
  defaultRepo: string;
  createdAt: string;
}

export interface ClickUpTask {
  id: string;
  teamId: string;
  type: 'clickup';
  title: string;
  description: string;
  status: ClickUpStatus;
  priority: ClickUpPriority;
  dueDate: string;
  assignee: TeamMember;
  tags: string[];
  progress: number;
  checklist?: { id: string; text: string; done: boolean }[];
  createdAt: string;
}

export interface GitHubTask {
  id: string;
  teamId: string;
  type: 'github';
  title: string;
  description: string;
  repo: string;
  branch: string;
  prNumber: number;
  status: GitHubStatus;
  assignee: TeamMember;
  reviewer: TeamMember;
  codeSnippet?: string;
  commitsCount: number;
  additions?: number;
  deletions?: number;
  createdAt: string;
}

export type AnyTask = ClickUpTask | GitHubTask;

export interface Channel {
  id: string;
  teamId: string;
  name: string;
  topic: string;
  isPrivate?: boolean;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  teamId: string;
  sender: TeamMember;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
}

export type ActiveView = 'dashboard' | 'clickup' | 'github' | 'chat' | 'team';

export type ProjectStatus = 'planning' | 'active' | 'completed';
export type FileKind = 'docx' | 'xlsx' | 'pptx' | 'pdf' | 'image' | 'video' | 'code';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  ownerId: string;
  memberIds: string[];
  updatedAt: string;
}

export interface WorkspaceFile {
  id: string;
  projectId: string;
  name: string;
  path: string;
  kind: FileKind;
  size: string;
  updatedAt: string;
  lockedBy?: string;
  linkedTaskIds: string[];
}

export interface Activity {
  id: string;
  projectId: string;
  actorId: string;
  action: string;
  target: string;
  createdAt: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: string;
}
