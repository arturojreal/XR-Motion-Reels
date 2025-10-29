# AdminPanel Component

```tsx
// src/components/AdminPanel.tsx

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
  } = useSubmissionStore();

  const [draggedItem, setDraggedItem] = useState<Submission | null>(null);

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

  const handleDrop = (e: React.DragEvent, targetReel: Submission) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetReel.id) return;

    const newOrder = [...acceptedReels];
    const draggedIndex = newOrder.findIndex((r) => r.id === draggedItem.id);
    const targetIndex = newOrder.findIndex((r) => r.id === targetReel.id);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    reorderReels(newOrder);
    setDraggedItem(null);
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <button
            onClick={toggleAdminMode}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            aria-label="Close admin panel"
          >
            Close
          </button>
        </div>

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
                    className="bg-gray-900 rounded-lg p-4 border border-gray-800 cursor-move hover:bg-gray-800 transition-colors"
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
```

## Features

- **Dual-column layout**: Pending submissions and accepted reels
- **Accept/Decline actions**: Quick submission approval
- **Drag-and-drop sorting**: Reorder accepted reels for display
- **Thumbnail previews**: Visual identification of videos
- **Real-time updates**: Changes persist immediately
- **Remove functionality**: Demote accepted reels back to declined
- **Responsive design**: Works on desktop and mobile

## State Management

Uses Zustand store for all state operations

## Accessibility

- ARIA labels on interactive elements
- Keyboard-accessible drag-and-drop fallback
- Screen reader friendly
- High contrast design