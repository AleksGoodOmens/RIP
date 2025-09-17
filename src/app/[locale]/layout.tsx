import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import './globals.css';
import Providers from '@/providers/Providers';

import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';

import type { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JustCodeIt - RIP - Project',
  description: 'Restful client created by JustCodeIt team RS-School 2025',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh overflow-y-scroll`}
      >
        <Providers locale={locale} messages={messages}>
          <Header />
          <main className="pt-32 grow fadeIn-children container mx-auto">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
