import { useState, useRef } from 'react';
import { RateLimiter } from '@/utils/security';

interface UseRateLimitOptions {
  maxAttempts?: number;
  windowMs?: number;
  identifier?: string;
}

export const useRateLimit = (options: UseRateLimitOptions = {}) => {
  const {
    maxAttempts = 5,
    windowMs = 60000, // 1 minute
    identifier = 'default'
  } = options;

  const rateLimiterRef = useRef(new RateLimiter(maxAttempts, windowMs));
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts);

  const checkRateLimit = (customIdentifier?: string): boolean => {
    const id = customIdentifier || identifier;
    const allowed = rateLimiterRef.current.isAllowed(id);
    
    if (!allowed) {
      setIsBlocked(true);
      setRemainingAttempts(0);
      // Reset after window period
      setTimeout(() => {
        setIsBlocked(false);
        setRemainingAttempts(maxAttempts);
      }, windowMs);
    } else {
      // Calculate remaining attempts (approximation)
      const now = Date.now();
      const attempts = (rateLimiterRef.current as any).attempts.get(id) || [];
      const validAttempts = attempts.filter((time: number) => now - time < windowMs);
      setRemainingAttempts(Math.max(0, maxAttempts - validAttempts.length));
    }
    
    return allowed;
  };

  return {
    checkRateLimit,
    isBlocked,
    remainingAttempts
  };
};