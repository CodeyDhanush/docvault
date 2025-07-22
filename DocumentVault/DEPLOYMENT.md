# DocVault Deployment Guide

This guide shows you how to deploy DocVault to GitHub and various hosting platforms.

## 🚀 Quick GitHub Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `docvault` or any name you prefer
3. Make it public or private (your choice)
4. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub

From your project directory, run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit - DocVault application"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/docvault.git

# Push to GitHub
git push -u origin main
```

## 🌐 Hosting Options

### Option 1: GitHub Pages (Frontend Only)
**Best for: Static demo/portfolio sites**

1. In your GitHub repository, go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** (will be created automatically)
4. The GitHub Action will automatically deploy on every push to main
5. Your site will be available at: `https://YOUR_USERNAME.github.io/docvault`

### Option 2: Netlify (Recommended for Full-Stack)
**Best for: Easy deployment with forms and serverless functions**

1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Build settings are automatically detected from `netlify.toml`
5. Click "Deploy site"
6. Your site will be live in minutes!

### Option 3: Vercel (Great Performance)
**Best for: High-performance apps with edge deployment**

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Settings are automatically detected from `vercel.json`
5. Click "Deploy"

### Option 4: Railway (Full-Stack with Database)
**Best for: Apps that need a persistent database**

1. Go to [Railway](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will automatically detect and deploy your app
5. Add a PostgreSQL database from the Railway dashboard

### Option 5: Render (Free Tier Available)
**Best for: Free hosting with database support**

1. Go to [Render](https://render.com) and sign up/login
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Use these settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add environment variables if needed

## 🔧 Environment Variables

For production deployment, you'll need these environment variables:

```env
# Database (for full-stack deployment)
DATABASE_URL=your_postgresql_connection_string

# Server Configuration
PORT=5000
NODE_ENV=production

# File Upload (optional - defaults are fine)
MAX_FILE_SIZE=104857600  # 100MB in bytes
UPLOAD_DIR=uploads
```

### Setting up Environment Variables:

**Netlify**: Site settings → Environment variables
**Vercel**: Project settings → Environment Variables  
**Railway**: Variables tab in your project
**Render**: Environment tab in your service

## 📦 Build Commands Reference

```bash
# Build frontend only (for static hosting)
npm run build:client

# Build full application (frontend + backend)
npm run build

# Start production server
npm start

# Development server
npm run dev
```

## 🗄️ Database Setup

### For Development (Local)
The app uses in-memory storage by default - no setup needed!

### For Production (PostgreSQL)

#### Option 1: Neon Database (Free Tier)
1. Go to [Neon](https://neon.tech) and create account
2. Create a new database
3. Copy the connection string
4. Add as `DATABASE_URL` environment variable

#### Option 2: Railway PostgreSQL
1. In Railway dashboard, click "Add Service" → "Database" → "PostgreSQL"
2. Copy the connection string from the Variables tab
3. Add as `DATABASE_URL` environment variable

#### Option 3: Supabase (Free Tier)
1. Go to [Supabase](https://supabase.com) and create project
2. Go to Settings → Database
3. Copy the connection string
4. Add as `DATABASE_URL` environment variable

## 🚀 Deployment Checklist

Before deploying, make sure:

- [ ] All files are committed to GitHub
- [ ] Environment variables are set (if using database)
- [ ] Build commands work locally (`npm run build`)
- [ ] Repository is public or hosting platform has access
- [ ] Domain name configured (optional)

## 🔧 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure build commands match your hosting platform
- Check for TypeScript errors: `npm run build:client`

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check database is accessible from hosting platform
- Ensure database accepts connections from external IPs

### File Upload Not Working
- Check if hosting platform supports file uploads
- Verify upload directory permissions
- Consider using cloud storage (AWS S3, Cloudinary) for production

## 🎉 Next Steps

After deployment:

1. **Custom Domain**: Add your own domain name
2. **SSL Certificate**: Most platforms provide free SSL
3. **Analytics**: Add Google Analytics or similar
4. **Monitoring**: Set up uptime monitoring
5. **Backups**: Configure database backups

## 📞 Support

If you run into issues:

1. Check the hosting platform's documentation
2. Review build logs for error messages
3. Test locally first: `npm run build && npm start`
4. Create an issue on GitHub if you need help

---

🎉 **Congratulations!** Your DocVault application should now be live and accessible to the world!