'use client';
import type { Metadata } from 'next';
import './globals.css';
import { SplashScreen } from '@/components/splash-screen';
import { useState, useEffect } from 'react';
import { Footer } from '@/components/landing/footer';
import { usePathname } from 'next/navigation';
import { ValidationProvider } from '@/context/ValidationContext';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { ROUTES } from '@/constants/routes';

// export const metadata: Metadata = {
//   title: 'meutudo — Seu crédito, suas escolhas',
//   description: 'Abra sua conta e escolha seu crédito com a meutudo.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 2.4s animation delay + 0.6s fade-out

    return () => clearTimeout(timer);
  }, []);

  const isAnalysisPage = pathname === ROUTES.ANALYSIS;


  const noFooterPaths = [
    ROUTES.CPF_VALIDATION,
    ROUTES.OFFERS,
    ROUTES.MOTHER_NAME_VALIDATION,
    ROUTES.BIRTHDATE_VALIDATION,
    ROUTES.FACIAL,
    ROUTES.PRE_FACIAL,
    ROUTES.HOME,
  ];

  if (isAnalysisPage) {
    return (
      <html lang="pt-BR">
        <head>
          <title>Analisando Ofertas — meutudo</title>
          <meta name="description" content="Aguarde enquanto analisamos as melhores ofertas de crédito para você." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Poppins:wght@600&display=swap"
            rel="stylesheet"
          />
          <Script id="utmify-pixel" strategy="afterInteractive">
            {`
              window.pixelId = "696bd30d338dd4b08c5827ca";
              var a = document.createElement("script");
              a.setAttribute("async", "");
              a.setAttribute("defer", "");
              a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
              document.head.appendChild(a);
            `}
          </Script>
        </head>
        <body className="font-body antialiased">{children}</body>
      </html>
    );
  }

  return (
    <html lang="pt-BR">
      <head>
        <title>meutudo — Seu crédito, suas escolhas</title>
        <meta name="description" content="Abra sua conta e escolha seu crédito com a meutudo." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
        <Script id="utmify-pixel" strategy="afterInteractive">
            {`
              window.pixelId = "696bd30d338dd4b08c5827ca";
              var a = document.createElement("script");
              a.setAttribute("async", "");
              a.setAttribute("defer", "");
              a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
              document.head.appendChild(a);
            `}
          </Script>
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ValidationProvider>
          {showSplash ? (
            <SplashScreen />
          ) : (
            <>
              <main className="flex-grow flex flex-col">{children}</main>
            </>
          )}
          {!showSplash && !noFooterPaths.includes(pathname) && <Footer />}
          <Toaster />
        </ValidationProvider>
      </body>
    </html>
  );
}
