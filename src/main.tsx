import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Register PWA Service Worker for Android WebAPK support
if ('serviceWorker' in navigator) {
  const hostname = window.location.hostname;
  const isDevOrPreview = 
    hostname.indexOf('run.app') !== -1 || 
    hostname.indexOf('localhost') !== -1 || 
    hostname.indexOf('127.0.0.1') !== -1 ||
    hostname.indexOf('aistudio') !== -1 ||
    hostname.indexOf('webcontainer') !== -1 ||
    hostname.indexOf('stackblitz') !== -1 ||
    window.self !== window.top;

  if (isDevOrPreview) {
    // Actively unregister service workers and clear caches in dev/preview to prevent React 19 hook dispatcher conflicts
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      let unregisteredAny = false;
      const promises = registrations.map((registration) => {
        return registration.unregister().then((success) => {
          if (success) {
            unregisteredAny = true;
          }
        });
      });
      
      Promise.all(promises).then(() => {
        if (unregisteredAny && !sessionStorage.getItem('sw_clean_reloaded')) {
          sessionStorage.setItem('sw_clean_reloaded', 'true');
          console.log('Successfully unregistered stale SW, performing one-time clean reload');
          window.location.reload();
        }
      });
    });
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration skipped:', err);
      });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);


