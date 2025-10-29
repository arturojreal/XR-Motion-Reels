import { kv } from '@vercel/kv';
import { Submission } from '@/types';

const SUBMISSIONS_KEY = 'submissions';

export async function getSubmissions(): Promise<Submission[]> {
  try {
    const submissions = await kv.get<Submission[]>(SUBMISSIONS_KEY);
    return submissions || [];
  } catch (error) {
    console.error('Error fetching submissions from KV:', error);
    return [];
  }
}

export async function saveSubmissions(submissions: Submission[]): Promise<void> {
  try {
    await kv.set(SUBMISSIONS_KEY, submissions);
  } catch (error) {
    console.error('Error saving submissions to KV:', error);
    throw error;
  }
}

export async function addSubmission(
  submission: Omit<Submission, 'id' | 'submittedAt' | 'status'>
): Promise<Submission> {
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

export async function updateSubmission(
  id: string,
  updates: Partial<Submission>
): Promise<Submission | null> {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  
  if (index === -1) {
    return null;
  }

  submissions[index] = { ...submissions[index], ...updates };
  await saveSubmissions(submissions);
  
  return submissions[index];
}

export async function initializeFromJSON(): Promise<void> {
  try {
    // Check if KV already has data
    const existing = await kv.get<Submission[]>(SUBMISSIONS_KEY);
    if (existing && existing.length > 0) {
      console.log('KV already has data, skipping initialization');
      return;
    }

    // Import from JSON file (only works locally or during build)
    const fs = await import('fs/promises');
    const path = await import('path');
    const DB_PATH = path.join(process.cwd(), 'data', 'submissions.json');
    
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const { submissions } = JSON.parse(data);
    
    if (submissions && submissions.length > 0) {
      await saveSubmissions(submissions);
      console.log(`Initialized KV with ${submissions.length} submissions from JSON`);
    }
  } catch (error) {
    console.log('Could not initialize from JSON (this is normal on Vercel):', error);
    // Initialize with empty array if no data exists
    const existing = await kv.get<Submission[]>(SUBMISSIONS_KEY);
    if (!existing) {
      await saveSubmissions([]);
    }
  }
}
