import WorkspacePage from '@/components/layout/WorkspacePage';
import RepositoryView from '@/components/views/RepositoryView';
import { getFiles, getProjects } from '@/lib/data/storage';
export const instant = false;
export default async function RepositoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.id === id) ?? projects[0];
  return <WorkspacePage><RepositoryView project={project} files={(await getFiles()).filter((file) => file.projectId === project.id)} /></WorkspacePage>;
}
