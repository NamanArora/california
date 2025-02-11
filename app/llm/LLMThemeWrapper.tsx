'use client'

import React from 'react';
import { useTheme } from 'next-themes';
import styles from './styles/llm-theme.module.css';
import { cn } from "@/lib/utils";

interface LLMThemeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function LLMThemeWrapper({ children, className }: LLMThemeWrapperProps) {
  const { theme } = useTheme();

  return (
    <div className={cn(
      styles.llmWrapper,
      theme === 'dark' && styles.dark,
      className
    )}>
      {children}
    </div>
  );
}