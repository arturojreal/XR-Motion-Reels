import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getVideoEmbedUrl(url: string): string {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoRegex = /vimeo\.com\/(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1`;
  }

  // Direct video URL
  return url;
}

export function getThumbnailUrl(url: string): string {
  // YouTube thumbnail
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://i.ytimg.com/vi/${youtubeMatch[1]}/mqdefault.jpg`;
  }

  // Vimeo thumbnail (placeholder - requires API call for real thumbnail)
  const vimeoRegex = /vimeo\.com\/(\d+)/;
  if (vimeoRegex.test(url)) {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%234a5568" width="100" height="100"/%3E%3C/svg%3E';
  }

  // Default placeholder
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3C/svg%3E';
}

export function isValidVideoUrl(url: string): boolean {
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
  const vimeoRegex = /vimeo\.com\/(\d+)/;
  const directVideoRegex = /\.(mp4|webm|ogg)$/i;

  return youtubeRegex.test(url) || vimeoRegex.test(url) || directVideoRegex.test(url);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
