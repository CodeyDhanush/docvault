import { files, type File, type InsertFile } from "@shared/schema";

export interface IStorage {
  getFile(id: number): Promise<File | undefined>;
  getAllFiles(): Promise<File[]>;
  createFile(file: InsertFile): Promise<File>;
  deleteFile(id: number): Promise<boolean>;
  incrementDownloadCount(id: number): Promise<void>;
  searchFiles(query: string): Promise<File[]>;
}

export class MemStorage implements IStorage {
  private files: Map<number, File>;
  private currentId: number;

  constructor() {
    this.files = new Map();
    this.currentId = 1;
  }

  async getFile(id: number): Promise<File | undefined> {
    return this.files.get(id);
  }

  async getAllFiles(): Promise<File[]> {
    return Array.from(this.files.values()).sort(
      (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
    );
  }

  async createFile(insertFile: InsertFile): Promise<File> {
    const id = this.currentId++;
    const file: File = {
      ...insertFile,
      id,
      uploadedAt: new Date(),
      downloadCount: 0,
    };
    this.files.set(id, file);
    return file;
  }

  async deleteFile(id: number): Promise<boolean> {
    return this.files.delete(id);
  }

  async incrementDownloadCount(id: number): Promise<void> {
    const file = this.files.get(id);
    if (file) {
      const updatedFile = { ...file, downloadCount: file.downloadCount + 1 };
      this.files.set(id, updatedFile);
    }
  }

  async searchFiles(query: string): Promise<File[]> {
    const allFiles = await this.getAllFiles();
    if (!query.trim()) return allFiles;
    
    const searchTerm = query.toLowerCase();
    return allFiles.filter(file =>
      file.originalName.toLowerCase().includes(searchTerm) ||
      file.mimeType.toLowerCase().includes(searchTerm)
    );
  }
}

export const storage = new MemStorage();
