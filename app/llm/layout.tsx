'use client'

import { ThemeProvider } from 'next-themes';
import { LLMThemeWrapper } from './LLMThemeWrapper';
import DashboardLayout from './DashboardLayout';

export default function LLMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LLMThemeWrapper className="min-h-screen">
        <DashboardLayout>{children}</DashboardLayout>
      </LLMThemeWrapper>
    </ThemeProvider>
  );
}