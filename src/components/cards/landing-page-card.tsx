"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export function LandingPageCard() {
  const router = useRouter();

  const handleSignupClick = () => {
    // In a real app, this would integrate with an analytics service like Firebase Analytics
    // For example: gtag('event','signup_click',{method:'hero'});
    console.log("Analytics: signup_click");
    router.push(ROUTES.CPF_VALIDATION);
  };

  return (
    <main className="relative -mt-[140px] px-4">
      <div className="relative z-40 mx-auto max-w-[460px] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 ease-out">
        <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)] md:p-8">
          <h1 className="text-3xl font-bold leading-tight text-foreground animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-out delay-200 fill-mode-both md:text-4xl lg:text-[44px]">
            Seu <span className="text-primary">crédito</span>, hoje mesmo.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out delay-300 fill-mode-both md:text-base">
            Junte-se a mais de{" "}
            <strong className="font-semibold text-foreground/90">13 milhões</strong> de
            mulheres que escolheram a{" "}
            <strong className="font-semibold text-foreground/90">meutudo.</strong>
          </p>

          <div className="mt-8 space-y-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out delay-400 fill-mode-both">
            <Button
              id="btn-signup"
              aria-label="Simular empréstimo"
              size="lg"
              className="h-12 w-full rounded-full text-base font-semibold shadow-[0_8px_20px_-6px_rgba(255,31,122,0.4)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,31,122,0.5)] active:scale-[0.98]"
              onClick={handleSignupClick}
            >
              Simular empréstimo
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
