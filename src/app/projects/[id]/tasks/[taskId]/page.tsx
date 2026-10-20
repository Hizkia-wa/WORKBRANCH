import WorkspacePage from '@/components/layout/WorkspacePage';
import TaskDetailView from '@/components/views/TaskDetailView';
import { getClickUpTasks, getFiles } from '@/lib/data/storage';
export const instant = false;
export default async function TaskPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  const tasks = await getClickUpTasks();
  const task = tasks.find((item) => item.id === taskId) ?? tasks[0];
  return <WorkspacePage><TaskDetailView task={task} files={await getFiles()} /></WorkspacePage>;
}
