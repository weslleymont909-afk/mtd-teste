'use client';

import {
  DollarSign,
  MousePointerClick,
  Barcode,
  PiggyBank,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const actions = [
  { id: 'withdraw', icon: DollarSign, label: 'Sacar agora!' },
  { id: 'pix', icon: MousePointerClick, label: 'Pix' },
  { id: 'pay', icon: Barcode, label: 'Pagar boleto' },
  { id: 'save', icon: PiggyBank, label: 'Cofrinho' },
];

interface QuickActionsProps {
  onWithdrawClick: () => void;
}

export function QuickActions({ onWithdrawClick }: QuickActionsProps) {
  const { toast } = useToast();

  const handleBlockedClick = () => {
    toast({
      description: 'Realize primeiro o saque para ativar essa função.',
      duration: 3000,
    });
  };

  return (
    <div className="px-6">
      <h2 className="text-lg font-bold text-gray-800">Ações rápidas</h2>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isWithdrawButton = action.id === 'withdraw';
          return (
            <button
              key={action.label}
              onClick={isWithdrawButton ? onWithdrawClick : handleBlockedClick}
              className={cn(
                'flex animate-in fade-in slide-in-from-bottom-2 flex-col items-center justify-center gap-1.5 rounded-xl p-2 text-center shadow-md transition-transform active:scale-95',
                isWithdrawButton
                  ? 'animate-pulse-subtle bg-primary text-primary-foreground shadow-lg'
                  : 'cursor-not-allowed bg-white opacity-60'
              )}
              style={{
                animationDelay: `${100 + index * 80}ms`,
                fillMode: 'backwards',
              }}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  isWithdrawButton ? 'bg-white/20' : 'bg-primary/10 text-primary'
                )}
              >
                <Icon
                  className={cn('h-5 w-5', isWithdrawButton && 'text-white')}
                />
              </div>
              <span
                className={cn(
                  'text-xs font-bold',
                  !isWithdrawButton && 'text-gray-700'
                )}
              >
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
