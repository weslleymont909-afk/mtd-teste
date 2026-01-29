'use client';

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export function BalanceCard() {
    const [isVisible, setIsVisible] = useState(true);
    const balance = 1250.75;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_8px_25px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in-98 duration-300 ease-out delay-100">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">Saldo disponível</span>
        <button onClick={() => setIsVisible(!isVisible)} className="text-gray-500 hover:text-gray-700">
            {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      <div className="mt-2">
        {isVisible ? (
             <p className="text-3xl font-bold text-gray-900 animate-in fade-in duration-300">
                {formatCurrency(balance)}
             </p>
        ) : (
            <div className="h-9 w-40 animate-pulse rounded-md bg-gray-200/80" />
        )}
      </div>
    </div>
  );
}
