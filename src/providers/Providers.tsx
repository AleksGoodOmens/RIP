'use client';

import { NextIntlClientProvider, Messages } from 'next-intl';

import { AuthProvider } from '@/providers/auth/AuthProvider';
import { ThemeProvider } from '@/providers/theme/ThemeProvider';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}

export default function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AuthProvider>{children}</AuthProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
