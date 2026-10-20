import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers/Providers';

export const metadata: Metadata = {
  title: 'WorkBranch - Dev & Collab Suite (TaskFlow, CodeHub & TeamSync)',
  description: 'Unified workspace combining TaskFlow task management, CodeHub repository & code tasks, and TeamSync real-time messaging.',
  icons: {
    icon: '/workbranch-icon.png',
    shortcut: '/workbranch-icon.png',
    apple: '/workbranch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
