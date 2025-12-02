'use client';

import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster 
      position="top-center" 
      richColors 
      closeButton
      theme="light"
      style={{
        fontFamily: 'inherit' // Matches your Next.js font
      }}
      toastOptions={{
        style: {
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: 500,
        },
        classNames: {
          toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
}