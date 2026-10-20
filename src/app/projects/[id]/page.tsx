import WorkspacePage from '@/components/layout/WorkspacePage';
import ProjectOverviewView from '@/components/views/ProjectOverviewView';
import { getFiles, getProjects } from '@/lib/data/storage';
export const instant = false;
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.id === id) ?? projects[0];
  return <WorkspacePage><ProjectOverviewView project={project} files={(await getFiles()).filter((file) => file.projectId === project.id)} /></WorkspacePage>;
}
