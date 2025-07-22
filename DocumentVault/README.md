# DocVault - Document Management System

A modern, responsive document upload and download website built with React and Express.js. Features drag-and-drop file uploads, file management, search functionality, and a clean user interface.

## 🚀 Features

- **File Upload**: Drag-and-drop or click to upload files
- **File Management**: View, search, sort, and organize your documents
- **File Download**: Download files with download count tracking
- **File Deletion**: Delete files with confirmation dialogs
- **Search & Sort**: Real-time search and multiple sorting options
- **File Support**: PDF, DOC, DOCX, TXT, JPEG, JPG, PNG, GIF
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean interface built with TailwindCSS and Radix UI

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Radix UI** for accessible components
- **TanStack Query** for server state management
- **Wouter** for routing
- **Lucide React** for icons

### Backend
- **Express.js** with TypeScript
- **Multer** for file uploads
- **PostgreSQL** with Drizzle ORM
- **Neon Database** for serverless PostgreSQL
- **Zod** for validation

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and configuration
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite development setup
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── uploads/               # File upload directory
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/docvault.git
   cd docvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   PORT=5000
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 📦 Building for Production

### Build the application
```bash
npm run build
```

### Start production server
```bash
npm start
```

## 🚀 Deployment

### GitHub Pages (Frontend Only)
This project includes GitHub Actions workflow for automatic deployment to GitHub Pages.

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. The workflow will automatically build and deploy on every push to main branch

### Full-Stack Deployment Options

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Railway
```bash
npm install -g @railway/cli
railway login
railway deploy
```

#### Heroku
```bash
# Install Heroku CLI and login
heroku create your-app-name
git push heroku main
```

## 🔧 Configuration

### File Upload Settings
- Maximum file size: 100MB per file
- Allowed file types: PDF, DOC, DOCX, TXT, JPEG, JPG, PNG, GIF
- Upload directory: `./uploads`

### Database
- Uses PostgreSQL with Drizzle ORM
- Supports Neon Database for serverless deployment
- In-memory storage available for development

## 📚 API Documentation

### Endpoints

#### Files
- `GET /api/files` - Get all files (with optional search)
- `POST /api/files/upload` - Upload files
- `GET /api/files/:id/download` - Download file
- `DELETE /api/files/:id` - Delete file

### Example API Usage

```javascript
// Upload files
const formData = new FormData();
formData.append('files', file);

fetch('/api/files/upload', {
  method: 'POST',
  body: formData
});

// Get all files
fetch('/api/files')
  .then(res => res.json())
  .then(files => console.log(files));
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS
- [Lucide](https://lucide.dev/) for beautiful icons
- [TanStack Query](https://tanstack.com/query) for server state management

## 📞 Support

If you have any questions or need help with deployment, please open an issue on GitHub.

---

Built with ❤️ using React and Express.js