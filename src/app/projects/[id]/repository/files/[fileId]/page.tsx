import WorkspacePage from '@/components/layout/WorkspacePage';
import FileDetailView from '@/components/views/FileDetailView';
import { getFiles } from '@/lib/data/storage';
export const instant = false;
export default async function FilePage({ params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = await params;
  const files = await getFiles();
  return <WorkspacePage><FileDetailView file={files.find((item) => item.id === fileId) ?? files[0]} /></WorkspacePage>;
}
