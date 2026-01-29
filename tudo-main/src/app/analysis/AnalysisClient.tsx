'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const dynamicTexts = [
  'Consultando instituições financeiras parceiras',
  'Analisando condições personalizadas para o seu perfil',
  'Buscando taxas mais justas para você',
  'Priorizando segurança e transparência',
  'Finalizando sua análise',
];

export default function AnalysisClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isFading, setIsFading] = useState(true);

  const welcomeMessage = name
    ? `${name}, estamos analisando as melhores ofertas para você`
    : 'Analisando as melhores ofertas para você';
  const currentDynamicText = dynamicTexts[currentTextIndex];

  useEffect(() => {
    // Redirect timer after 15 seconds
    const redirectTimer = setTimeout(() => {
      router.push(`/offers?name=${name || ''}`);
    }, 15000);

    // Initial fade in for the first message
    const initialFadeTimer = setTimeout(() => setIsFading(false), 500);

    // Dynamic text cycling timer
    const textCycleInterval = setInterval(() => {
      setIsFading(true); // Start fading out
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // If it's the last message, don't schedule the next change
          if (nextIndex >= dynamicTexts.length) {
            clearInterval(textCycleInterval);
            return prevIndex;
          }
          setIsFading(false); // Fade in the new message
          return nextIndex;
        });
      }, 500); // Cross-fade duration
    }, 2800); // Total time per message (stay + fade)

    // Cleanup timers
    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(initialFadeTimer);
      clearInterval(textCycleInterval);
    };
  }, [router, name]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-analysis-gradient px-6 text-primary-foreground">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <Image
          src="https://i.postimg.cc/XY9QNVFx/logopng3-1.png"
          alt="logo meutudo"
          width={80}
          height={80}
          className="logo-pulse-digital absolute"
          style={{ top: '42%' }}
          priority
        />
        
        <div className="absolute w-full px-6" style={{ top: '58%' }}>
          <h1 className="text-lg font-medium tracking-wide text-white/90 animate-in fade-in duration-1000 delay-200">
            {welcomeMessage}
          </h1>
          <div className="relative mt-4 h-6">
            <p
              className={cn(
                'absolute w-full text-sm text-white/70 transition-all duration-500 ease-out',
                isFading
                  ? 'opacity-0 translate-y-1'
                  : 'opacity-100 translate-y-0'
              )}
            >
              {currentDynamicText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
