import { promises as fs } from 'fs';
import path from 'path';
import { Submission } from '@/types';

const DB_PATH = path.join(process.cwd(), 'data', 'submissions.json');

export async function getSubmissions(): Promise<Submission[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const json = JSON.parse(data);
    return json.submissions || [];
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

export async function saveSubmissions(submissions: Submission[]): Promise<void> {
  try {
    await fs.writeFile(
      DB_PATH,
      JSON.stringify({ submissions }, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Error saving submissions (file system may be read-only on serverless):', error);
    // On Vercel, file system is read-only. Log warning but don't crash.
    console.warn('⚠️  Submissions cannot be persisted on Vercel without a database. See DEPLOYMENT_NOTE.md');
    // Don't throw - allow the app to continue functioning
  }
}

export async function addSubmission(submission: Omit<Submission, 'id' | 'submittedAt' | 'status'>): Promise<Submission> {
  const submissions = await getSubmissions();
  
  const newSubmission: Submission = {
    ...submission,
    id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };

  submissions.push(newSubmission);
  await saveSubmissions(submissions);
  
  return newSubmission;
}

export async function updateSubmission(id: string, updates: Partial<Submission>): Promise<Submission | null> {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  
  if (index === -1) {
    return null;
  }

  submissions[index] = { ...submissions[index], ...updates };
  await saveSubmissions(submissions);
  
  return submissions[index];
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const submissions = await getSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  
  if (filtered.length === submissions.length) {
    return false;
  }

  await saveSubmissions(filtered);
  return true;
}
