
'use client';

import { useState, useEffect, useRef } from 'react';
import { SignupForm } from '@/components/signup/signup-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/landing/footer';

export default function SignupPage() {
  const [isCpfFocused, setIsCpfFocused] = useState(false);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const signupHeroImage = PlaceHolderImages.find(p => p.id === 'signup-hero');

  useEffect(() => {
    const handleScroll = () => {
      if (heroImageRef.current) {
        const y = window.scrollY;
        // Apply a subtle parallax effect
        heroImageRef.current.style.transform = `translateY(${y * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="signup-page-container" className="bg-[#fff5f9]">
      <section className="relative h-[60vh] overflow-hidden bg-[#fff5f9]">
        {signupHeroImage && (
          <Image
            ref={heroImageRef}
            src={signupHeroImage.imageUrl}
            alt={signupHeroImage.description}
            fill
            className="object-cover object-center-top transition-transform duration-300 ease-out"
            priority
            sizes="100vw"
            data-ai-hint={signupHeroImage.imageHint}
          />
        )}
        <div className="absolute left-4 top-4 z-20">
          <Image
            src="https://i.postimg.cc/XY9QNVFx/logopng3-1.png"
            alt="logo meutudo"
            width={56}
            height={56}
            className="rounded-full"
            priority
          />
        </div>
      </section>

      <main className="relative z-10 -mt-[120px] pb-10">
        <div
          className={cn(
            'mx-4 max-w-lg rounded-[22px] bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out sm:mx-auto',
            isCpfFocused && '-translate-y-1.5 shadow-[0_18px_36px_rgba(0,0,0,0.12)]'
          )}
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Comece informando seu CPF
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
            Analisaremos as melhores opções disponíveis no seu nome.
          </p>
          <div className="mt-4">
            <SignupForm onFocusChange={setIsCpfFocused} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
