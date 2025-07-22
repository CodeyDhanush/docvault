import { useState } from "react";
import { FileIcon, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UploadZone from "@/components/upload-zone";
import FileList from "@/components/file-list";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [activeTab, setActiveTab] = useState<"upload" | "files">("upload");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileIcon className="text-primary text-2xl mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">DocVault</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-1 pb-1 ${
                  activeTab === "upload"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => setActiveTab("files")}
                className={`px-1 pb-1 ${
                  activeTab === "files"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                My Files
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">2.3 GB / 5 GB used</span>
              <button className="text-gray-400 hover:text-gray-600">
                <User className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "upload" && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upload Your Documents
              </h2>
              <p className="text-gray-600">
                Drag and drop files or click to browse. Supports PDF, DOC, DOCX, TXT, and images.
              </p>
            </div>
            <UploadZone onUploadComplete={() => setActiveTab("files")} />
          </div>
        )}

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your Documents</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="size">Sort by Size</SelectItem>
                  <SelectItem value="type">Sort by Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <FileList searchQuery={searchQuery} sortBy={sortBy} />
        </div>
      </main>
    </div>
  );
}
