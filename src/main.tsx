
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use createRoot for React 18's concurrent features
const root = createRoot(document.getElementById("root")!);

// Add error boundary for better error handling
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Add preconnect hints for performance and SEO improvements
if (typeof document !== 'undefined') {
  // Add preconnect for external resources
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.googleapis.com';
  document.head.appendChild(link);
  
  const dnsLink = document.createElement('link');
  dnsLink.rel = 'dns-prefetch';
  dnsLink.href = 'https://fonts.googleapis.com';
  document.head.appendChild(dnsLink);
  
  // Add canonical URL handling to prevent duplicate content issues
  const canonicalLink = document.createElement('link');
  canonicalLink.rel = 'canonical';
  canonicalLink.href = window.location.origin + window.location.pathname;
  document.head.appendChild(canonicalLink);
}
