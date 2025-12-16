import { sanitizeInput, sanitizeHtml, isValidEmail } from './security';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationResult => {
  const errors: string[] = [];

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Validate subject
  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  } else if (data.subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (data.message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateBlogPost = (data: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}): ValidationResult => {
  const errors: string[] = [];

  // Validate title
  if (!data.title || data.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  } else if (data.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  // Validate excerpt
  if (!data.excerpt || data.excerpt.trim().length < 20) {
    errors.push('Excerpt must be at least 20 characters long');
  } else if (data.excerpt.length > 500) {
    errors.push('Excerpt must be less than 500 characters');
  }

  // Validate content
  if (!data.content || data.content.trim().length < 100) {
    errors.push('Content must be at least 100 characters long');
  } else if (data.content.length > 50000) {
    errors.push('Content must be less than 50,000 characters');
  }

  // Validate category
  if (!data.category || data.category.trim().length < 2) {
    errors.push('Please select a valid category');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // For content fields that may contain HTML, use HTML sanitization
      if (key === 'content' || key === 'description') {
        sanitized[key as keyof T] = sanitizeHtml(value) as T[keyof T];
      } else {
        // For other fields, use input sanitization
        sanitized[key as keyof T] = sanitizeInput(value) as T[keyof T];
      }
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
};