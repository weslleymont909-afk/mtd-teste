'use client';

import { ChevronRight, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const questions = [
  'Como funciona o saque do meu saldo?',
  'Em quanto tempo o dinheiro cai na conta?',
  'Posso antecipar parcelas?',
  'Quais são as taxas aplicadas?',
  'Meus dados estão seguros?',
];

export function MoreOffers() {
  const { toast } = useToast();

  const handleBlockedClick = () => {
    toast({
      description: 'Realize primeiro o saque para ativar essa função.',
      duration: 3000,
    });
  };

  return (
    <div className="px-6 pb-24">
      <h2 className="text-lg font-bold text-gray-800">Dúvidas gerais</h2>
      <div className="mt-4 space-y-3">
        {questions.map((question, index) => {
          return (
            <div
              key={index}
              onClick={handleBlockedClick}
              className="flex cursor-not-allowed items-center justify-between rounded-xl bg-white p-4 shadow-md opacity-60"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600`}
                >
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-800">{question}</h3>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
