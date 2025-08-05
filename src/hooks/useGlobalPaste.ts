'use client';

import { useCallback, useEffect } from 'react';

interface UseGlobalPasteProps {
  onFilesPaste: (files: File[]) => void;
  disabled?: boolean;
}

export function useGlobalPaste({ onFilesPaste, disabled = false }: UseGlobalPasteProps) {
  const handleGlobalPaste = useCallback(async (event: ClipboardEvent) => {
    if (disabled) return;

    // Don't interfere with paste in text inputs
    const target = event.target as HTMLElement;
    if (target && (
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.contentEditable === 'true' ||
      target.closest('input') ||
      target.closest('textarea')
    )) {
      return;
    }

    const items = event.clipboardData?.items;
    if (!items) return;

    const files: File[] = [];
    
    // Process clipboard items
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Handle files (images, PDFs, etc.)
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }

    if (files.length > 0) {
      event.preventDefault();
      onFilesPaste(files);
    }
  }, [onFilesPaste, disabled]);

  useEffect(() => {
    document.addEventListener('paste', handleGlobalPaste);
    return () => document.removeEventListener('paste', handleGlobalPaste);
  }, [handleGlobalPaste]);
}
