import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

async function getAppRoutes(dir: string, baseDir: string): Promise<string[]> {
  const routes: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      // Skip if directory starts with _ or .
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) {
        continue;
      }
      // Recursively scan subdirectories
      const subRoutes = await getAppRoutes(fullPath, baseDir);
      routes.push(...subRoutes);
    } else if (entry.name === 'page.tsx' || entry.name === 'page.jsx') {
      // Add route if it's a page file
      routes.push(relativePath);
    }
  }

  return routes;
}

export async function GET() {
  try {
    const appDir = path.join(process.cwd(), 'app');
    const routes = await getAppRoutes(appDir, appDir);
    
    return NextResponse.json({
      routes: routes.map(route => 
        route
          .replace(/\\/g, '/') // Convert Windows paths to URL format
          .replace(/\.(tsx|jsx)$/, '') // Remove file extensions
      )
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch routes' },
      { status: 500 }
    );
  }
}