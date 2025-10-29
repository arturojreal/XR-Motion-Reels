
# Generate API route

api_route = """// src/app/api/submissions/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {
  getSubmissions,
  addSubmission,
  updateSubmission,
  updateMultipleSubmissions,
} from '@/lib/db';
import { SubmissionFormData, Submission } from '@/types';
import { validateUrl } from '@/lib/utils';

export async function GET() {
  try {
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

    if (!validateUrl(body.reelUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
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
      await updateMultipleSubmissions(body.bulk);
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    await updateSubmission(id, { status: 'declined' });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/submissions error:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
"""

print("Generated: src/app/api/submissions/route.ts")
print("\nAPI endpoints:")
print("- GET: Fetch all submissions")
print("- POST: Create new submission")
print("- PATCH: Update submission status or bulk reorder")
print("- DELETE: Soft delete (mark as declined)")
