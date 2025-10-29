'use client';

import { useState } from 'react';
import { useSubmissionStore } from '@/store/submissionStore';
import { Submission } from '@/types';
import { getThumbnailUrl } from '@/lib/utils';

export default function AdminPanel() {
  const {
    submissions,
    acceptedReels,
    updateSubmissionStatus,
    reorderReels,
    toggleAdminMode,
    addSubmission,
    fetchSubmissions,
  } = useSubmissionStore();

  const [draggedItem, setDraggedItem] = useState<Submission | null>(null);
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualFormData, setManualFormData] = useState({
    firstName: '',
    lastName: '',
    socialUsername: '',
    reelUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');

  const handleAccept = async (id: string) => {
    await updateSubmissionStatus(id, 'accepted');
  };

  const handleDecline = async (id: string) => {
    await updateSubmissionStatus(id, 'declined');
  };

  const handleDragStart = (e: React.DragEvent, reel: Submission) => {
    setDraggedItem(reel);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetReel: Submission) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetReel.id) return;

    const newOrder = [...acceptedReels];
    const draggedIndex = newOrder.findIndex((r) => r.id === draggedItem.id);
    const targetIndex = newOrder.findIndex((r) => r.id === targetReel.id);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    await reorderReels(newOrder);
    setDraggedItem(null);
    
    // Refresh to ensure we have the latest data
    await fetchSubmissions();
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addSubmission(manualFormData);
      
      // Reset form
      setManualFormData({
        firstName: '',
        lastName: '',
        socialUsername: '',
        reelUrl: '',
      });
      setShowManualForm(false);
      
      // Refresh submissions to show the new one
      await fetchSubmissions();
    } catch (error) {
      console.error('Failed to add manual submission:', error);
      alert('Failed to add reel. Please check the URL and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowManualForm(!showManualForm)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              aria-label="Toggle manual add form"
            >
              {showManualForm ? 'Cancel' : '+ Add Reel Manually'}
            </button>
            <button
              onClick={toggleAdminMode}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              aria-label="Close admin panel"
            >
              Close
            </button>
          </div>
        </div>

        {/* Manual Add Form */}
        {showManualForm && (
          <div className="max-w-7xl mx-auto mb-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Add Reel Manually</h2>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="manual-firstName" className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="manual-firstName"
                      name="firstName"
                      value={manualFormData.firstName}
                      onChange={handleManualFormChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="manual-lastName" className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="manual-lastName"
                      name="lastName"
                      value={manualFormData.lastName}
                      onChange={handleManualFormChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="manual-socialUsername" className="block text-sm font-medium mb-2">
                    Social Username *
                  </label>
                  <input
                    type="text"
                    id="manual-socialUsername"
                    name="socialUsername"
                    value={manualFormData.socialUsername}
                    onChange={handleManualFormChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="@johndoe"
                  />
                </div>
                <div>
                  <label htmlFor="manual-reelUrl" className="block text-sm font-medium mb-2">
                    Reel URL (YouTube or Vimeo) *
                  </label>
                  <input
                    type="url"
                    id="manual-reelUrl"
                    name="reelUrl"
                    value={manualFormData.reelUrl}
                    onChange={handleManualFormChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Supports YouTube, Vimeo, or direct MP4 links
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                  >
                    {isSubmitting ? 'Adding...' : 'Add to Pending'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualForm(false)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Submissions */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Pending Submissions ({pendingSubmissions.length})
            </h2>
            <div className="space-y-4">
              {pendingSubmissions.length === 0 ? (
                <p className="text-gray-400">No pending submissions</p>
              ) : (
                pendingSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-gray-900 rounded-lg p-4 border border-gray-800"
                  >
                    <div className="flex gap-4">
                      <div className="w-32 h-20 bg-gray-800 rounded flex-shrink-0 overflow-hidden">
                        <img
                          src={getThumbnailUrl(submission.reelUrl)}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {submission.firstName} {submission.lastName}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">
                          {submission.socialUsername}
                        </p>
                        <a
                          href={submission.reelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline truncate block"
                        >
                          View Reel
                        </a>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleAccept(submission.id)}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(submission.id)}
                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Accepted Reels (with drag-drop sorting) */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Accepted Reels ({acceptedReels.length})
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Drag to reorder display sequence
            </p>
            <div className="space-y-2">
              {acceptedReels.length === 0 ? (
                <p className="text-gray-400">No accepted reels yet</p>
              ) : (
                acceptedReels.map((reel, index) => (
                  <div
                    key={reel.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, reel)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, reel)}
                    onDragEnd={handleDragEnd}
                    className={`bg-gray-900 rounded-lg p-4 border border-gray-800 cursor-move hover:bg-gray-800 transition-colors ${
                      draggedItem?.id === reel.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-gray-600">
                        {index + 1}
                      </span>
                      <div className="w-24 h-16 bg-gray-800 rounded flex-shrink-0 overflow-hidden">
                        <img
                          src={getThumbnailUrl(reel.reelUrl)}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {reel.firstName} {reel.lastName}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">
                          {reel.socialUsername}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDecline(reel.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
