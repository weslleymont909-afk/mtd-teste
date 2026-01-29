'use client';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

interface OpportunitiesCardProps {
  loanAmount: number | null;
  onWithdrawClick: () => void;
}

export function OpportunitiesCard({
  loanAmount,
  onWithdrawClick,
}: OpportunitiesCardProps) {
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    if (loanAmount === null) {
      return;
    }
    
    if (loanAmount === 0) {
      setDisplayAmount(0);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setDisplayAmount(easedProgress * loanAmount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure it ends on the exact amount
        setDisplayAmount(loanAmount);
      }
    };

    requestAnimationFrame(step);

  }, [loanAmount]);

  return (
    <div className="rounded-xl bg-white p-4 text-gray-900 shadow-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div className="relative">
        <div className="absolute -right-4 -top-4 rounded-bl-lg rounded-tr-xl bg-purple-100 px-3 py-1 text-sm font-bold text-purple-800">
          Allianz pendente
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Saldo disponível</h3>
          <p className="mt-1 text-3xl font-bold text-primary">
            {formatCurrency(displayAmount)}
          </p>
        </div>
        <hr className="my-4" />
        <button
          onClick={onWithdrawClick}
          className="flex w-full items-center justify-between text-sm font-bold text-primary"
        >
          <span>Sacar agora!</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
