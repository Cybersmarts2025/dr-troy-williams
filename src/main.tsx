
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

// Add preconnect hints for performance
if (typeof document !== 'undefined') {
  // Add preconnect for external resources (adapt these to your specific resources)
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.googleapis.com';
  document.head.appendChild(link);
  
  const dnsLink = document.createElement('link');
  dnsLink.rel = 'dns-prefetch';
  dnsLink.href = 'https://fonts.googleapis.com';
  document.head.appendChild(dnsLink);
}

