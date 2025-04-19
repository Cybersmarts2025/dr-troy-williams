
import { useEffect } from 'react';

export const useCopyProtection = (elementId: string) => {
  useEffect(() => {
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    const preventSelect = (e: Event) => {
      e.preventDefault();
      return false;
    };
    
    const section = document.getElementById(elementId);
    if (section) {
      section.addEventListener('copy', preventCopy);
      section.addEventListener('contextmenu', preventContextMenu);
      section.addEventListener('selectstart', preventSelect);
      
      return () => {
        section.removeEventListener('copy', preventCopy);
        section.removeEventListener('contextmenu', preventContextMenu);
        section.removeEventListener('selectstart', preventSelect);
      };
    }
  }, [elementId]);
};
