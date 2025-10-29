import { NextRequest, NextResponse } from 'next/server';
import {
  getSubmissions,
  addSubmission,
  updateSubmission,
  saveSubmissions,
  initializeFromJSON,
} from '@/lib/kv-db';
import { SubmissionFormData, Submission } from '@/types';

export async function GET() {
  try {
    // Initialize KV from JSON if needed (first run)
    await initializeFromJSON();
    
    const submissions = await getSubmissions();
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('GET /api/submissions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmissionFormData = await request.json();
    
    // Validation
    if (!body.firstName || !body.lastName || !body.socialUsername || !body.reelUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const submission = await addSubmission(body);
    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    console.error('POST /api/submissions error:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    // Bulk update (for reordering)
    if (body.bulk && Array.isArray(body.bulk)) {
      const submissions = await getSubmissions();
      
      for (const update of body.bulk) {
        const index = submissions.findIndex((s) => s.id === update.id);
        if (index !== -1) {
          submissions[index] = { ...submissions[index], ...update.updates };
        }
      }
      
      await saveSubmissions(submissions);
      return NextResponse.json({ success: true });
    }

    // Single update
    if (!body.id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    const updates: Partial<Submission> = {};
    if (body.status) updates.status = body.status;
    if (body.order !== undefined) updates.order = body.order;

    const submission = await updateSubmission(body.id, updates);
    
    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ submission });
  } catch (error) {
    console.error('PATCH /api/submissions error:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
