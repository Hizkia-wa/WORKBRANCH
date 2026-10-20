import WorkspacePage from '@/components/layout/WorkspacePage';
import ProjectsView from '@/components/views/ProjectsView';
import { getProjects } from '@/lib/data/storage';
export default async function ProjectsPage() { return <WorkspacePage><ProjectsView projects={await getProjects()} /></WorkspacePage>; }
