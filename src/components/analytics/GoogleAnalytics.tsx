
import React, { useEffect } from 'react';

interface GoogleAnalyticsProps {
  trackingId?: string;
}

const GoogleAnalytics = ({ trackingId = 'G-XXXXXXXXXX' }: GoogleAnalyticsProps) => {
  useEffect(() => {
    if (!trackingId || trackingId === 'G-XXXXXXXXXX') {
      console.log('Google Analytics: No tracking ID provided or using placeholder');
      return;
    }

    // Create script elements for Google Analytics
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(gtagScript);

    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    document.head.appendChild(configScript);

    // Track page views
    if (window.gtag) {
      window.gtag('config', trackingId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(gtagScript);
      document.head.removeChild(configScript);
    };
  }, [trackingId]);

  return null; // This component doesn't render anything
};

// Helper function to track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.log('Analytics Event:', { action, category, label, value });
  }
};

// Helper function to track page views
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (window.gtag) {
    window.gtag('config', 'GA_TRACKING_ID', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  } else {
    console.log('Page View:', { pagePath, pageTitle });
  }
};

export default GoogleAnalytics;
