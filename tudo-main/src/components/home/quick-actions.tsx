'use client';

import { DollarSign, MousePointerClick, Barcode, PiggyBank } from 'lucide-react';
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
                            "flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white p-2 text-center shadow-md transition-transform active:scale-95 animate-in fade-in slide-in-from-bottom-2",
                             !isWithdrawButton && 'opacity-60 cursor-not-allowed'
                        )}
                        style={{
                            animationDelay: `${100 + index * 80}ms`,
                            fillMode: 'backwards',
                        }}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{action.label}</span>
                    </button>
                )
            })}
        </div>
    </div>
  );
}
