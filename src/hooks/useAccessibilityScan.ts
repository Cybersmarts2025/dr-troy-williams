import { useState, useEffect, useCallback } from 'react';
import { runAccessibilityScan, AccessibilityScanReport } from '@/utils/accessibilityScanner';

interface UseAccessibilityScanOptions {
  autoScan?: boolean;
  scanInterval?: number; // in milliseconds
}

export const useAccessibilityScan = (options: UseAccessibilityScanOptions = {}) => {
  const { autoScan = false, scanInterval = 60000 } = options;
  
  const [report, setReport] = useState<AccessibilityScanReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scan = useCallback(async () => {
    setIsScanning(true);
    setError(null);

    try {
      // Small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const scanReport = runAccessibilityScan();
      setReport(scanReport);
      setLastScanTime(new Date());
      
      // Store in localStorage for persistence
      localStorage.setItem('a11y-scan-report', JSON.stringify(scanReport));
      localStorage.setItem('a11y-scan-time', new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
      console.error('Accessibility scan error:', err);
    } finally {
      setIsScanning(false);
    }
  }, []);

  // Load cached report on mount
  useEffect(() => {
    const cachedReport = localStorage.getItem('a11y-scan-report');
    const cachedTime = localStorage.getItem('a11y-scan-time');
    
    if (cachedReport && cachedTime) {
      try {
        const parsed = JSON.parse(cachedReport);
        parsed.timestamp = new Date(parsed.timestamp);
        setReport(parsed);
        setLastScanTime(new Date(cachedTime));
      } catch (e) {
        // Invalid cache, clear it
        localStorage.removeItem('a11y-scan-report');
        localStorage.removeItem('a11y-scan-time');
      }
    }
  }, []);

  // Auto-scan on mount if enabled
  useEffect(() => {
    if (autoScan && !report) {
      scan();
    }
  }, [autoScan, scan, report]);

  // Set up interval scanning if enabled
  useEffect(() => {
    if (!autoScan || scanInterval <= 0) return;

    const intervalId = setInterval(scan, scanInterval);
    return () => clearInterval(intervalId);
  }, [autoScan, scanInterval, scan]);

  const clearCache = useCallback(() => {
    localStorage.removeItem('a11y-scan-report');
    localStorage.removeItem('a11y-scan-time');
    setReport(null);
    setLastScanTime(null);
  }, []);

  return {
    report,
    isScanning,
    lastScanTime,
    error,
    scan,
    clearCache
  };
};

export default useAccessibilityScan;
