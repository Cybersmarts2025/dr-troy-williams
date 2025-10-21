import { z } from 'zod';

// Strong password requirements for mission-critical security
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
  .max(128, 'Password must not exceed 128 characters');

export const emailSchema = z
  .string()
  .trim()
  .email('Invalid email address')
  .max(255, 'Email must not exceed 255 characters')
  .refine(
    (email) => !email.includes('..'),
    'Email cannot contain consecutive dots'
  )
  .refine(
    (email) => {
      const localPart = email.split('@')[0];
      return localPart.length <= 64;
    },
    'Email local part must not exceed 64 characters'
  );

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const passwordResetSchema = z.object({
  email: emailSchema,
});

// Validate and sanitize auth inputs
export const validateAuthInput = (email: string, password: string) => {
  const result = authSchema.safeParse({ email, password });
  
  if (!result.success) {
    const errors = result.error.errors.map(err => err.message);
    return {
      isValid: false,
      errors,
      data: null
    };
  }
  
  return {
    isValid: true,
    errors: [],
    data: result.data
  };
};

export const validatePasswordResetInput = (email: string) => {
  const result = passwordResetSchema.safeParse({ email });
  
  if (!result.success) {
    const errors = result.error.errors.map(err => err.message);
    return {
      isValid: false,
      errors,
      data: null
    };
  }
  
  return {
    isValid: true,
    errors: [],
    data: result.data
  };
};

// Validate redirect URLs to prevent open redirects
export const isValidRedirectUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    const allowedDomains = [
      'drtroywilliams.net',
      'localhost',
      '127.0.0.1'
    ];
    
    return allowedDomains.some(domain => 
      parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
};
