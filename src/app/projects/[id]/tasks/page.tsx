import WorkspacePage from '@/components/layout/WorkspacePage';
import ProjectTasksView from '@/components/views/ProjectTasksView';
import { getProjects, getClickUpTasks } from '@/lib/data/storage';
export const instant = false;
export default async function ProjectTasksPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await getProjects();
  return <WorkspacePage><ProjectTasksView project={projects.find((item) => item.id === id) ?? projects[0]} tasks={await getClickUpTasks()} /></WorkspacePage>;
}
