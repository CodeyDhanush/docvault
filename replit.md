# DocVault - File Management Application

## Overview

DocVault is a modern file management application built with a React frontend and Express.js backend. The application allows users to upload, manage, search, and download files with a clean, responsive UI. It supports various file types including PDFs, Word documents, text files, and images.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Structure
The application follows a monorepo structure with clear separation between client and server code:
- **Frontend**: React with TypeScript, located in `/client`
- **Backend**: Express.js with TypeScript, located in `/server`
- **Shared**: Common schemas and types in `/shared`

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Radix UI components
- **Backend**: Express.js, TypeScript, Multer for file uploads
- **Database**: PostgreSQL with Drizzle ORM
- **Cloud Database**: Neon Database (serverless PostgreSQL)
- **Styling**: TailwindCSS with Shadcn/ui component library
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component System**: Built on Radix UI primitives with custom Shadcn/ui components
- **State Management**: TanStack Query handles all server state and caching
- **Styling**: Utility-first CSS with TailwindCSS and CSS variables for theming
- **File Upload**: Drag-and-drop interface with progress tracking
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **File Storage**: Local file system storage with configurable upload directory
- **File Validation**: Multer middleware with file type and size restrictions
- **Database Layer**: Abstracted storage interface supporting multiple implementations

### Data Storage
- **Primary Database**: PostgreSQL via Neon Database serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **File Storage**: Local filesystem with organized directory structure
- **Backup Storage**: In-memory storage implementation for development/testing

## Data Flow

### File Upload Process
1. User selects files via drag-drop or file picker
2. Frontend validates file types and creates upload progress UI
3. Files sent to `/api/files/upload` endpoint via FormData
4. Backend validates files with Multer middleware
5. Files saved to local storage with unique names
6. File metadata stored in PostgreSQL database
7. Frontend updates file list via TanStack Query cache invalidation

### File Management
- **Search**: Real-time search through file names and metadata
- **Sorting**: Multiple sort options (name, size, type, date)
- **Download**: Direct file serving with download count tracking
- **Delete**: Soft delete with confirmation dialogs

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Environment variable `DATABASE_URL` required
- **Migrations**: Drizzle-kit for schema management

### File Upload Constraints
- **Size Limit**: 100MB per file
- **Allowed Types**: PDF, DOC, DOCX, TXT, JPEG, JPG, PNG, GIF
- **Storage**: Local filesystem with automatic directory creation

### UI Components
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Consistent icon system
- **TailwindCSS**: Utility-first styling framework

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement and fast builds
- **Replit Integration**: Built-in development tools and debugging
- **Environment Variables**: `.env` file for local configuration

### Production Build
- **Frontend**: Vite production build with optimizations
- **Backend**: ESBuild compilation for Node.js deployment
- **Static Assets**: Served from `dist/public` directory
- **Process Management**: Single Node.js process serving both API and static files

### GitHub Deployment
- **Repository Setup**: GitHub repository with automated deployment
- **GitHub Actions**: Automatic deployment to GitHub Pages on push to main
- **Build Configuration**: `vite.config.client.ts` for frontend builds
- **Static Hosting**: Frontend-only deployment for GitHub Pages

### Hosting Platform Support
- **Netlify**: Full-stack deployment with serverless functions (`netlify.toml`)
- **Vercel**: Edge deployment with API routes (`vercel.json`)
- **Railway**: Full-stack with integrated PostgreSQL database
- **Render**: Free tier hosting with database support
- **GitHub Pages**: Static frontend hosting with GitHub Actions

### Database Setup
- **Schema Management**: Drizzle migrations in `/migrations` directory
- **Push Command**: `npm run db:push` for schema updates
- **Connection**: Automatic connection pool management via Neon
- **Production Options**: Neon Database, Railway PostgreSQL, Supabase

### File System Requirements
- **Upload Directory**: Automatically created `uploads/` folder
- **Permissions**: Write access required for file storage
- **Cleanup**: Manual file cleanup process (not automated)
- **Cloud Storage**: Production deployments may require cloud storage solutions

### Deployment Files Created
- **GitHub Actions**: `.github/workflows/deploy.yml` for automated deployment
- **Configuration**: `netlify.toml`, `vercel.json` for platform-specific settings
- **Documentation**: `DEPLOYMENT.md` with comprehensive deployment instructions
- **Build Scripts**: Custom build configuration for different deployment targets

The application prioritizes developer experience with TypeScript throughout, comprehensive error handling, and a modern tech stack that scales well for file management use cases.