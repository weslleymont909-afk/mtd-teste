
'use client';

import Image from 'next/image';

interface OffersHeaderProps {
  name: string;
}

export function OffersHeader({ name }: OffersHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-primary px-4 pb-6 pt-3 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://i.postimg.cc/XY9QNVFx/logopng3-1.png"
            alt="logo meutudo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <p className="text-lg">
            Olá, <span className="font-bold">{name}</span>
          </p>
        </div>
      </div>
      <p className="mt-4 max-w-md text-base">
        Explore nossos produtos de crédito e encontre a melhor opção para
        você.
      </p>
    </header>
  );
}
