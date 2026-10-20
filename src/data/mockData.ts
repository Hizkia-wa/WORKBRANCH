import { Team, TeamMember, ClickUpTask, GitHubTask, Channel, ChatMessage } from '@/types';

export const initialMembers: TeamMember[] = [
  {
    id: 'm1',
    name: 'John Doe',
    role: 'Lead Architect',
    email: 'john.doe@workbranch.dev',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    status: 'online',
  },
  {
    id: 'm2',
    name: 'Sarah Connor',
    role: 'Senior Frontend Dev',
    email: 'sarah.c@workbranch.dev',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'online',
  },
  {
    id: 'm3',
    name: 'Alex Rivera',
    role: 'Backend & DevOps Engineer',
    email: 'alex.r@workbranch.dev',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    status: 'idle',
  },
  {
    id: 'm4',
    name: 'Emma Watson',
    role: 'UI/UX Product Designer',
    email: 'emma.w@workbranch.dev',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'offline',
  },
];

export const initialTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Tim Apollo Rekayasa',
    slug: 'apollo-team',
    description: 'Tim pengembangan produk inti yang membangun sistem kolaborasi developer masa depan.',
    avatar: 'A',
    members: initialMembers,
    defaultRepo: 'workbranch-hq/apollo-core',
    createdAt: '2026-01-10',
  },
  {
    id: 'team-2',
    name: 'Tim CyberSec & Cloud',
    slug: 'cybersec-cloud',
    description: 'Infrastruktur, pipeline deployment otomatis, dan kepatuhan keamanan cloud.',
    avatar: 'C',
    members: [initialMembers[0], initialMembers[2]],
    defaultRepo: 'workbranch-hq/infra-k8s',
    createdAt: '2026-02-14',
  },
];

export const initialClickUpTasks: ClickUpTask[] = [
  {
    id: 'cu-101',
    teamId: 'team-1',
    type: 'clickup',
    title: 'Desain Ulang Widget Dashboard WorkBranch',
    description: 'Perbarui kartu transaksi, analitik aktivitas sprint, dan grafik mingguan agar sesuai dengan standar desain terbaru.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-10-25',
    assignee: initialMembers[1],
    tags: ['UI/UX', 'Sprint-14'],
    progress: 75,
    checklist: [
      { id: 'cl-1', text: 'Styling grafik bar mingguan', done: true },
      { id: 'cl-2', text: 'Icon pill transaksi', done: true },
      { id: 'cl-3', text: 'Token warna tema gelap', done: false },
    ],
    createdAt: '2026-10-12',
  },
  {
    id: 'cu-102',
    teamId: 'team-1',
    type: 'clickup',
    title: 'Konfigurasi Pipeline WebSocket Pesan Tim',
    description: 'Implementasikan pengiriman pesan instan dan pemicu notifikasi saat rekan satu tim mengirim pesan di channel.',
    status: 'todo',
    priority: 'urgent',
    dueDate: '2026-10-28',
    assignee: initialMembers[2],
    tags: ['Backend', 'Realtime'],
    progress: 20,
    createdAt: '2026-10-14',
  },
  {
    id: 'cu-103',
    teamId: 'team-1',
    type: 'clickup',
    title: 'Matriks Otorisasi Peran & Profil Pengguna',
    description: 'Buat aturan hak akses untuk peran Admin, Lead Dev, dan Tamu di seluruh workspace tim.',
    status: 'review',
    priority: 'medium',
    dueDate: '2026-10-22',
    assignee: initialMembers[0],
    tags: ['Keamanan', 'Auth'],
    progress: 90,
    createdAt: '2026-10-08',
  },
  {
    id: 'cu-104',
    teamId: 'team-1',
    type: 'clickup',
    title: 'Uji Coba Pengalaman Pengguna (Usability Testing)',
    description: 'Wawancarai anggota tim mengenai alur pemilihan tugas TaskFlow vs CodeHub agar navigasi semakin intuitif.',
    status: 'done',
    priority: 'low',
    dueDate: '2026-10-15',
    assignee: initialMembers[3],
    tags: ['Riset'],
    progress: 100,
    createdAt: '2026-10-01',
  },
];

export const initialGitHubTasks: GitHubTask[] = [
  {
    id: 'gh-201',
    teamId: 'team-1',
    type: 'github',
    title: 'feat(auth): Integrasi OAuth2 CodeHub dan autentikasi token personal',
    description: 'Memungkinkan developer menghubungkan akun CodeHub mereka untuk sinkronisasi otomatis issue dan pull request repository.',
    repo: 'workbranch-hq/apollo-core',
    branch: 'feat/codehub-oauth-provider',
    prNumber: 142,
    status: 'in_review',
    assignee: initialMembers[2],
    reviewer: initialMembers[0],
    commitsCount: 6,
    additions: 384,
    deletions: 42,
    codeSnippet: `// auth/codehub-provider.ts
export async function verifyCodeHubToken(token: string) {
  const client = new CodeHubClient({ auth: token });
  const { data: user } = await client.users.getAuthenticated();
  return { id: user.id, username: user.login, avatar: user.avatar_url };
}`,
    createdAt: '2026-10-11',
  },
  {
    id: 'gh-202',
    teamId: 'team-1',
    type: 'github',
    title: 'fix(kanban): Atasi race condition saat drag and drop kartu cepat',
    description: 'Mencegah mutasi state yang berbenturan saat memindahkan tugas antara kolom To Do dan In Progress secara serentak.',
    repo: 'workbranch-hq/apollo-core',
    branch: 'fix/kanban-drag-race-condition',
    prNumber: 145,
    status: 'pr_open',
    assignee: initialMembers[1],
    reviewer: initialMembers[0],
    commitsCount: 3,
    additions: 112,
    deletions: 88,
    codeSnippet: `// components/kanban.tsx
const handleCardDrop = useCallback((taskId: string, targetCol: ClickUpStatus) => {
  setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: targetCol } : t));
}, []);`,
    createdAt: '2026-10-14',
  },
  {
    id: 'gh-203',
    teamId: 'team-1',
    type: 'github',
    title: 'perf(api): Optimasi latensi query tugas dengan layer caching Redis',
    description: 'Menyimpan metrik dan jumlah tugas tim di memori Redis dengan TTL 60 detik untuk mengurangi beban database PostgreSQL sebesar 68%.',
    repo: 'workbranch-hq/infra-k8s',
    branch: 'perf/redis-cache-layer',
    prNumber: 89,
    status: 'merged',
    assignee: initialMembers[0],
    reviewer: initialMembers[2],
    commitsCount: 8,
    additions: 490,
    deletions: 115,
    codeSnippet: `// cache/redis.ts
export async function getCachedTeamMetrics(teamId: string) {
  const key = \`team:\${teamId}:metrics\`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const data = await computeMetrics(teamId);
  await redis.setex(key, 60, JSON.stringify(data));
  return data;
}`,
    createdAt: '2026-10-05',
  },
  {
    id: 'gh-204',
    teamId: 'team-1',
    type: 'github',
    title: 'ci(pipeline): Otomatisasi pengujian unit test dan pemeriksaan bundle',
    description: 'Menambahkan workflow CodeHub Pipeline untuk menjalankan linting dan verifikasi build pada setiap push pull request.',
    repo: 'workbranch-hq/apollo-core',
    branch: 'ci/codehub-ci-pipeline',
    prNumber: 147,
    status: 'open_issue',
    assignee: initialMembers[1],
    reviewer: initialMembers[2],
    commitsCount: 1,
    additions: 76,
    deletions: 4,
    createdAt: '2026-10-15',
  },
];

export const initialChannels: Channel[] = [
  {
    id: 'ch-general',
    teamId: 'team-1',
    name: 'umum-pengumuman',
    topic: 'Pengumuman umum tim dan koordinasi harian tim',
  },
  {
    id: 'ch-clickup',
    teamId: 'team-1',
    name: 'diskusi-taskflow',
    topic: 'Perencanaan sprint, pembagian tugas TaskFlow, dan update progres harian',
  },
  {
    id: 'ch-github',
    teamId: 'team-1',
    name: 'review-kode-codehub',
    topic: 'Pull request baru di CodeHub, diskusi arsitektur kode, dan status commit',
  },
  {
    id: 'ch-random',
    teamId: 'team-1',
    name: 'santai-ngobrol',
    topic: 'Obrolan santai, ide kreatif, dan diskusi santai tim',
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    channelId: 'ch-general',
    teamId: 'team-1',
    sender: initialMembers[0],
    content: 'Halo semua! Selamat datang di platform kolaborasi terpadu tim kita. Sekarang manajemen tugas TaskFlow dan repositori CodeHub sudah terhubung di satu web ini.',
    timestamp: '10:14',
    reactions: [{ emoji: 'OK', count: 4, users: ['m1', 'm2', 'm3', 'm4'] }, { emoji: 'FYI', count: 2, users: ['m2', 'm3'] }],
  },
  {
    id: 'msg-2',
    channelId: 'ch-general',
    teamId: 'team-1',
    sender: initialMembers[1],
    content: 'Keren banget! Saya sudah menambahkan tugas #tf-101 untuk pembaruan UI WorkBranch. Saat buat tugas baru, jangan lupa pilih tujuannya: TaskFlow (papan tugas) atau CodeHub (tugas kode)!',
    timestamp: '10:20',
    reactions: [{ emoji: '👍', count: 3, users: ['m1', 'm3', 'm4'] }],
  },
  {
    id: 'msg-3',
    channelId: 'ch-general',
    teamId: 'team-1',
    sender: initialMembers[2],
    content: 'Siap Sarah. Saya sedang mereview PR #142 di CodeHub. Kode implementasi autentikasinya sudah sangat rapi.',
    timestamp: '10:28',
    reactions: [{ emoji: 'ACK', count: 2, users: ['m1', 'm2'] }],
  },
  {
    id: 'msg-4',
    channelId: 'ch-github',
    teamId: 'team-1',
    sender: initialMembers[0],
    content: 'PR #145 di CodeHub sudah siap untuk review akhir. Ini mengatasi race condition saat drag kartu Kanban. Silakan cek cuplikan kodenya ya rekan-rekan.',
    timestamp: '11:05',
  },
];
