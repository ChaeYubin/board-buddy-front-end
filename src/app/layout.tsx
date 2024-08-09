import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/utils/tailwind';
import '../styles/globals.css';
import { MSWComponent } from '@/mocks/MSWComponent';
import ReactQueryProviders from '@/utils/reactQueryProvider';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';

const BASE_URL = 'https://boardbuddyapp.vercel.app';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '보드버디',
  description: '보드게임 할 사람, 여기 버디 모여라!',
  icons: {
    icon: '/images/logo/boardbuddy_small_logo_orange.png',
  },
  openGraph: {
    title: '보드버디',
    url: BASE_URL,
    siteName: '보드버디',
    images: [
      {
        url: `${BASE_URL}/images/banner/banner_1.jpeg`,
        width: 1630,
        height: 1038,
      },
    ],
    locale: 'ko_KR',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          'min-h-screen bg-gray-100 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div
          className={cn(
            'max-w-md bg-white mx-auto min-h-dvh max-h-dvh flex flex-col shadow-md',
          )}
        >
          <MSWComponent>
            <ReactQueryProviders>
              <Toaster />
              <Header />
              {children}
            </ReactQueryProviders>
          </MSWComponent>
        </div>
      </body>
    </html>
  );
}
