
# Generate React components - Part 2: SubmissionForm

submission_form = """// src/components/SubmissionForm.tsx

'use client';

import { useState, FormEvent } from 'react';
import { useSubmissionStore } from '@/store/submissionStore';
import { SubmissionFormData } from '@/types';

export default function SubmissionForm() {
  const [formData, setFormData] = useState<SubmissionFormData>({
    firstName: '',
    lastName: '',
    socialUsername: '',
    reelUrl: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { addSubmission, isLoading, error } = useSubmissionStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await addSubmission(formData);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        socialUsername: '',
        reelUrl: '',
      });
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 text-center animate-fade-in">
          <div className="mb-4 text-6xl">✓</div>
          <h2 className="text-2xl font-bold mb-4">Submission Received!</h2>
          <p className="text-gray-400 mb-6">
            Thank you for submitting your reel. We'll review it shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-primary hover:bg-blue-600 rounded-lg transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Submit Your Reel
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          Share your work with the XR Motion community
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-2"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="John"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-2"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="Doe"
            />
          </div>

          <div>
            <label
              htmlFor="socialUsername"
              className="block text-sm font-medium mb-2"
            >
              Social Username *
            </label>
            <input
              type="text"
              id="socialUsername"
              name="socialUsername"
              value={formData.socialUsername}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="@johndoe"
            />
          </div>

          <div>
            <label
              htmlFor="reelUrl"
              className="block text-sm font-medium mb-2"
            >
              Reel URL *
            </label>
            <input
              type="url"
              id="reelUrl"
              name="reelUrl"
              value={formData.reelUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="https://youtube.com/watch?v=..."
            />
            <p className="mt-2 text-xs text-gray-500">
              YouTube, Vimeo, or direct MP4 link
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-900 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Submitting...' : 'Submit Reel'}
          </button>
        </form>
      </div>
    </div>
  );
}
"""

print("Generated: src/components/SubmissionForm.tsx")
print("\nForm features:")
print("- Validates all required fields")
print("- Shows success confirmation")
print("- Error handling")
print("- Responsive design")
