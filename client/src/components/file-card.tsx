import { Download, Trash2, FileText, File as FileIcon, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { File } from "@shared/schema";
import DeleteDialog from "@/components/delete-dialog";
import { useState } from "react";

interface FileCardProps {
  file: File;
}

export default function FileCard({ file }: FileCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getFileIcon = (mimeType: string) => {
    if (mimeType === "application/pdf") {
      return <FileText className="text-red-500" />;
    } else if (mimeType.includes("word")) {
      return <FileText className="text-blue-500" />;
    } else if (mimeType.startsWith("image/")) {
      return <Image className="text-green-500" />;
    } else if (mimeType === "text/plain") {
      return <FileIcon className="text-gray-500" />;
    }
    return <FileIcon className="text-gray-500" />;
  };

  const getFileIconBg = (mimeType: string) => {
    if (mimeType === "application/pdf") {
      return "bg-red-100";
    } else if (mimeType.includes("word")) {
      return "bg-blue-100";
    } else if (mimeType.startsWith("image/")) {
      return "bg-green-100";
    } else if (mimeType === "text/plain") {
      return "bg-gray-100";
    }
    return "bg-gray-100";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const deleteMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", `/api/files/${file.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      setShowDeleteDialog(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    },
  });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/api/files/${file.id}/download`;
    link.download = file.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${getFileIconBg(file.mimeType)} rounded-lg flex items-center justify-center`}>
              {getFileIcon(file.mimeType)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {file.originalName}
              </h3>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-gray-400 hover:text-primary"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Uploaded</span>
            <span>{formatDate(file.uploadedAt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Downloads</span>
            <span>{file.downloadCount}</span>
          </div>
        </div>
        <Button
          onClick={handleDownload}
          className="w-full mt-4 bg-primary text-white hover:bg-blue-700"
        >
          Download
        </Button>
      </div>

      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        fileName={file.originalName}
        isDeleting={deleteMutation.isPending}
      />
    </>
  );
}
