
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

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
  // Add preconnect for Google Fonts
  const fontPreconnect = document.createElement('link');
  fontPreconnect.rel = 'preconnect';
  fontPreconnect.href = 'https://fonts.googleapis.com';
  document.head.appendChild(fontPreconnect);
  
  const fontGstatic = document.createElement('link');
  fontGstatic.rel = 'preconnect';
  fontGstatic.href = 'https://fonts.gstatic.com';
  fontGstatic.crossOrigin = 'anonymous';
  document.head.appendChild(fontGstatic);
  
  // Add preconnect for YouTube
  const youtubePreconnect = document.createElement('link');
  youtubePreconnect.rel = 'preconnect';
  youtubePreconnect.href = 'https://www.youtube.com';
  document.head.appendChild(youtubePreconnect);
  
  const youtubeImgPreconnect = document.createElement('link');
  youtubeImgPreconnect.rel = 'preconnect';
  youtubeImgPreconnect.href = 'https://i.ytimg.com';
  document.head.appendChild(youtubeImgPreconnect);
  
  // Add DNS prefetch
  const dnsPrefetch = document.createElement('link');
  dnsPrefetch.rel = 'dns-prefetch';
  dnsPrefetch.href = 'https://fonts.googleapis.com';
  document.head.appendChild(dnsPrefetch);
  
  // Add canonical URL handling to prevent duplicate content issues
  const canonicalLink = document.createElement('link');
  canonicalLink.rel = 'canonical';
  canonicalLink.href = window.location.origin + window.location.pathname;
  document.head.appendChild(canonicalLink);
}
