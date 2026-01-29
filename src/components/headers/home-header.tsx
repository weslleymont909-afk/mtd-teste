'use client';
import Image from 'next/image';
import { OpportunitiesCard } from '@/components/cards/opportunities-card';

interface HomeHeaderProps {
  name: string;
  loanAmount: number | null;
  onWithdrawClick: () => void;
}

export function HomeHeader({
  name,
  loanAmount,
  onWithdrawClick,
}: HomeHeaderProps) {
  return (
    <header className="relative bg-primary px-4 pb-8 pt-5 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://i.postimg.cc/XY9QNVFx/logopng3-1.png"
            alt="logo meutudo"
            width={40}
            height={40}
            className="rounded-full bg-white/20 p-1"
            priority
          />
          <h1 className="text-xl font-semibold">Olá, {name}</h1>
        </div>
      </div>
      <div className="pt-6">
        <OpportunitiesCard
          loanAmount={loanAmount}
          onWithdrawClick={onWithdrawClick}
        />
      </div>
    </header>
  );
}
