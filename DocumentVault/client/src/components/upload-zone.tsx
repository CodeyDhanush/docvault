import { useState, useRef } from "react";
import { CloudUpload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UploadingFile {
  file: File;
  progress: number;
  status: string;
}

interface UploadZoneProps {
  onUploadComplete: () => void;
}

export default function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Upload failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      setUploadingFiles([]);
      toast({
        title: "Success",
        description: "Files uploaded successfully!",
      });
      onUploadComplete();
    },
    onError: (error: any) => {
      setUploadingFiles([]);
      toast({
        title: "Error",
        description: error.message || "Failed to upload files",
        variant: "destructive",
      });
    },
  });

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        return false;
      }
      
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 100MB limit`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    // Set initial uploading state
    const initialUploadingFiles = validFiles.map((file) => ({
      file,
      progress: 0,
      status: "Preparing...",
    }));
    setUploadingFiles(initialUploadingFiles);

    // Simulate progress for better UX
    initialUploadingFiles.forEach((uploadingFile, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        
        setUploadingFiles((prev) =>
          prev.map((uf, i) =>
            i === index
              ? { ...uf, progress, status: "Uploading..." }
              : uf
          )
        );
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
      }, 2000);
    });

    uploadMutation.mutate(validFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const removeUploadingFile = (index: number) => {
    setUploadingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center bg-white transition-all duration-300 cursor-pointer ${
          isDragOver
            ? "border-primary bg-blue-50"
            : "border-gray-300 hover:border-primary hover:bg-blue-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <CloudUpload className="text-primary text-2xl" />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-900 mb-2">
              Drop files here to upload
            </p>
            <p className="text-gray-500 mb-4">or</p>
            <Button className="bg-primary text-white hover:bg-blue-700">
              Choose Files
            </Button>
          </div>
          <p className="text-sm text-gray-400">Maximum file size: 100MB per file</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {uploadingFiles.length > 0 && (
        <div className="space-y-4">
          {uploadingFiles.map((uploadingFile, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <CloudUpload className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {uploadingFile.file.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {(uploadingFile.file.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUploadingFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Progress value={uploadingFile.progress} className="mb-1" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{uploadingFile.status}</span>
                <span>{Math.round(uploadingFile.progress)}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
