import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

/**
 * Accessible external link component that warns screen reader users
 * about external links opening in new tabs.
 */
const ExternalLink = ({ 
  href, 
  children, 
  showIcon = true, 
  className,
  ...props 
}: ExternalLinkProps) => {
  const isExternal = href.startsWith('http') || href.startsWith('//');
  
  if (!isExternal) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 min-h-[44px] min-w-[44px]",
        className
      )}
      aria-label={`${typeof children === 'string' ? children : 'Link'} (opens in new tab)`}
      {...props}
    >
      {children}
      {showIcon && (
        <ExternalLinkIcon 
          className="h-3 w-3 flex-shrink-0" 
          aria-hidden="true"
        />
      )}
      <span className="sr-only">(opens in new tab)</span>
    </a>
  );
};

export default ExternalLink;
