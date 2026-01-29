'use client';

import { Info } from "lucide-react";

interface LoanStatusProps {
    amount: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

export function LoanStatus({ amount }: LoanStatusProps) {
  return (
    <div className="mt-8 rounded-xl border border-blue-200/70 bg-blue-50/50 p-4 animate-in fade-in duration-300 delay-500">
        <div className="flex items-start gap-3">
            <Info className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
            <div>
                <p className="text-sm font-semibold text-blue-800">Sua proposta está em análise</p>
                <p className="mt-1 text-sm text-blue-700">Crédito solicitado: <span className="font-bold">{formatCurrency(amount)}</span></p>
            </div>
        </div>
    </div>
  );
}
