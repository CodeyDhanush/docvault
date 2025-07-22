import { useQuery } from "@tanstack/react-query";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileCard from "@/components/file-card";
import type { File } from "@shared/schema";

interface FileListProps {
  searchQuery: string;
  sortBy: string;
}

export default function FileList({ searchQuery, sortBy }: FileListProps) {
  const { data: files = [], isLoading } = useQuery<File[]>({
    queryKey: ["/api/files", { search: searchQuery || undefined }],
  });

  const sortedFiles = [...files].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.originalName.localeCompare(b.originalName);
      case "size":
        return b.size - a.size;
      case "type":
        return a.mimeType.localeCompare(b.mimeType);
      case "date":
      default:
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sortedFiles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FolderOpen className="text-gray-400 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
        <p className="text-gray-500 mb-6">Upload your first document to get started</p>
        <Button
          className="bg-primary text-white hover:bg-blue-700"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Upload Document
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedFiles.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
