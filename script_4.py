
# Generate utility files

utils_file = """// src/lib/utils.ts

import { ParsedVideoUrl, VideoProvider } from '@/types';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function parseVideoUrl(url: string): ParsedVideoUrl {
  // YouTube
  const youtubeRegex = /(?:youtube\\.com\\/(?:[^\\/]+\\/.+\\/|(?:v|e(?:mbed)?)\\/|.*[?&]v=)|youtu\\.be\\/)([^"&?\\/ ]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  
  if (youtubeMatch && youtubeMatch[1]) {
    return {
      provider: 'youtube',
      videoId: youtubeMatch[1],
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&controls=1`,
    };
  }

  // Vimeo
  const vimeoRegex = /vimeo\\.com\\/(\\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      provider: 'vimeo',
      videoId: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  // Direct video URL
  if (url.match(/\\.(mp4|webm|ogg)$/i)) {
    return {
      provider: 'direct',
      embedUrl: url,
    };
  }

  // Default fallback
  return {
    provider: 'direct',
    embedUrl: url,
  };
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getThumbnailUrl(url: string): string {
  const parsed = parseVideoUrl(url);
  
  if (parsed.provider === 'youtube' && parsed.videoId) {
    return `https://i.ytimg.com/vi/${parsed.videoId}/hqdefault.jpg`;
  }
  
  // Vimeo thumbnails require API call, return placeholder
  if (parsed.provider === 'vimeo') {
    return '/placeholder-thumbnail.jpg';
  }
  
  return '/placeholder-thumbnail.jpg';
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
"""

db_file = """// src/lib/db.ts

import { Submission, SubmissionFormData } from '@/types';
import { generateId } from './utils';
import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'submissions.json');

async function ensureDbFile() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify({ submissions: [] }, null, 2));
  }
}

export async function getSubmissions(): Promise<Submission[]> {
  await ensureDbFile();
  const data = await fs.readFile(DB_PATH, 'utf-8');
  const parsed = JSON.parse(data);
  return parsed.submissions || [];
}

export async function addSubmission(
  data: SubmissionFormData
): Promise<Submission> {
  await ensureDbFile();
  
  const submission: Submission = {
    id: generateId(),
    ...data,
    status: 'pending',
    order: 0,
    submittedAt: new Date().toISOString(),
  };

  const submissions = await getSubmissions();
  submissions.push(submission);
  
  await fs.writeFile(
    DB_PATH,
    JSON.stringify({ submissions }, null, 2)
  );

  return submission;
}

export async function updateSubmission(
  id: string,
  updates: Partial<Submission>
): Promise<Submission | null> {
  await ensureDbFile();
  
  const submissions = await getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  
  if (index === -1) return null;
  
  submissions[index] = { ...submissions[index], ...updates };
  
  await fs.writeFile(
    DB_PATH,
    JSON.stringify({ submissions }, null, 2)
  );

  return submissions[index];
}

export async function updateMultipleSubmissions(
  updates: Array<{ id: string; updates: Partial<Submission> }>
): Promise<void> {
  await ensureDbFile();
  
  const submissions = await getSubmissions();
  
  updates.forEach(({ id, updates: updatesData }) => {
    const index = submissions.findIndex((s) => s.id === id);
    if (index !== -1) {
      submissions[index] = { ...submissions[index], ...updatesData };
    }
  });
  
  await fs.writeFile(
    DB_PATH,
    JSON.stringify({ submissions }, null, 2)
  );
}
"""

print("Generated utility files:")
print("- src/lib/utils.ts")
print("- src/lib/db.ts")
