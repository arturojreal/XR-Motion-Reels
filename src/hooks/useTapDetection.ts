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
