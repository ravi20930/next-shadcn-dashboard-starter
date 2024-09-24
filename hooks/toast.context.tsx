// ToastContext.tsx
'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import useToastMessage from './useToastMessage';

type ToastContextType = ReturnType<typeof useToastMessage> | null;

const ToastContext = createContext<ToastContextType>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const showToast = useToastMessage();

  return (
    <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
