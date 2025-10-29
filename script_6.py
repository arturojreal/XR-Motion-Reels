
# Generate custom hooks

use_key_press = """// src/hooks/useKeyPress.ts

import { useEffect } from 'react';

export function useKeyPress(
  targetKey: string,
  callback: () => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === targetKey.toLowerCase()) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [targetKey, callback, enabled]);
}
"""

use_tap_detection = """// src/hooks/useTapDetection.ts

import { useEffect, useRef } from 'react';

export function useTapDetection(
  requiredTaps: number,
  callback: () => void,
  timeWindow: number = 2000
) {
  const tapCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTap = () => {
      tapCountRef.current += 1;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (tapCountRef.current >= requiredTaps) {
        callback();
        tapCountRef.current = 0;
      } else {
        timeoutRef.current = setTimeout(() => {
          tapCountRef.current = 0;
        }, timeWindow);
      }
    };

    window.addEventListener('touchstart', handleTap);
    return () => {
      window.removeEventListener('touchstart', handleTap);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [requiredTaps, callback, timeWindow]);
}
"""

use_submissions = """// src/hooks/useSubmissions.ts

import { useEffect } from 'react';
import { useSubmissionStore } from '@/store/submissionStore';

export function useSubmissions() {
  const store = useSubmissionStore();

  useEffect(() => {
    store.fetchSubmissions();
  }, []);

  return store;
}
"""

print("Generated custom hooks:")
print("- src/hooks/useKeyPress.ts")
print("- src/hooks/useTapDetection.ts")
print("- src/hooks/useSubmissions.ts")
