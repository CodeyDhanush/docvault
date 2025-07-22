#!/usr/bin/env node

import { build } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildClient() {
  try {
    console.log('Building client application...');
    
    await build({
      plugins: [react()],
      root: path.resolve(__dirname, '../client'),
      build: {
        outDir: path.resolve(__dirname, '../dist/public'),
        emptyOutDir: true,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../client/src'),
          '@shared': path.resolve(__dirname, '../shared'),
        },
      },
      optimizeDeps: {
        exclude: ['@shared/schema'],
      },
    });
    
    console.log('✅ Client build completed successfully!');
  } catch (error) {
    console.error('❌ Client build failed:', error);
    process.exit(1);
  }
}

buildClient();