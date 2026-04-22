'use client';
import { useEffect } from 'react';

// Silently reloads the PWA when a new deploy is detected.
// Works by comparing the build SHA embedded in the page against the last
// known SHA stored in localStorage. On mismatch → reload once, then update
// the stored SHA so we don't loop.
export function AutoUpdate() {
  useEffect(() => {
    const currentSha = document.querySelector<HTMLMetaElement>('meta[name="app-sha"]')?.content;
    if (!currentSha || currentSha === 'dev') return; // local dev — skip

    const storedSha = localStorage.getItem('hs.deploy.sha');

    if (!storedSha) {
      // First visit — just store it
      localStorage.setItem('hs.deploy.sha', currentSha);
      return;
    }

    if (storedSha !== currentSha) {
      // New deploy detected — store first to prevent reload loop, then reload
      localStorage.setItem('hs.deploy.sha', currentSha);
      window.location.reload();
    }
  }, []);

  return null;
}
