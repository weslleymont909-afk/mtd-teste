'use client';
import { useMemo, useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useValidation } from '@/context/ValidationContext';
import { ROUTES } from '@/constants/routes';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const calculateInstallment = (principal: number, months: number) => {
  const monthlyInterestRate = 0.0106; // 1.06%
  if (principal <= 0 || months <= 0)
    return { installmentValue: 0, totalValue: 0 };
  const i = monthlyInterestRate;
  const n = months;
  // Tabela Price Formula
  const installmentValue =
    (principal * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
  const totalValue = installmentValue * n;
  return {
    installmentValue,
    totalValue,
  };
};

export function SimulationModal({
  isOpen,
  onClose,
  amount,
}: SimulationModalProps) {
  const router = useRouter();
  const { setLoanAmount } = useValidation();
  const installmentOptions = [12, 24, 36, 48, 60, 72, 84];
  const [selectedMonths, setSelectedMonths] = useState<number | null>(null);

  const simulationData = useMemo(() => {
    if (!amount) return [];
    return installmentOptions.map((months) => {
      const { installmentValue, totalValue } = calculateInstallment(
        amount,
        months
      );
      return {
        months,
        installment: formatCurrency(installmentValue),
        total: formatCurrency(totalValue),
      };
    });
  }, [amount]);

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedMonths(null);
    }
  }, [isOpen]);

  const handleAdvance = () => {
    if (!selectedMonths) return;

    setLoanAmount(amount);

    onClose();
    setTimeout(() => {
      router.push(ROUTES.HOME);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-sm rounded-2xl p-6 shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-3 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-3 duration-300 ease-out">
        <DialogHeader className="text-center">
          <div className="animate-in fade-in-0 slide-in-from-bottom-3 zoom-in-98 duration-300 ease-out">
            <p className="text-sm text-muted-foreground">Você está simulando:</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {formatCurrency(amount)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Simulação rápida, sem compromisso
            </p>
          </div>
        </DialogHeader>

        <div className="my-4">
          <p className="mb-3 text-sm font-semibold text-gray-800">
            Escolha o número de parcelas:
          </p>
          <ScrollArea className="h-[240px] w-full pr-3">
            <div className="space-y-3">
              {simulationData.map(({ months, installment, total }, index) => (
                <button
                  key={months}
                  onClick={() => setSelectedMonths(months)}
                  className={cn(
                    'w-full rounded-xl border bg-white p-3 text-left text-sm text-gray-800 transition-all duration-150 ease-out active:scale-[0.98] hover:shadow-md',
                    selectedMonths === months
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md'
                      : 'border-gray-200 hover:border-gray-300',
                    'animate-in fade-in-0 slide-in-from-bottom-2'
                  )}
                  style={{
                    animationDelay: `${100 + index * 30}ms`,
                    fillMode: 'backwards',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedMonths === months ? (
                        <CheckCircle className="h-5 w-5 text-primary animate-in fade-in zoom-in-95" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300 transition-colors" />
                      )}
                      <span className="font-semibold">
                        {months}x de {installment}
                      </span>
                    </div>
                    {months === 48 && (
                      <Badge
                        variant="outline"
                        className="border-primary/50 text-primary animate-in fade-in slide-in-from-left-2"
                      >
                        Mais escolhida
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 pl-8 text-xs text-muted-foreground">
                    Valor total: {total}
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <p className="-mt-2 text-center text-xs text-gray-500">
          Taxa de até 1,06% ao mês. Simulação ilustrativa.
        </p>

        <DialogFooter className="flex flex-col gap-2 pt-4">
          <Button
            onClick={handleAdvance}
            disabled={!selectedMonths}
            className="h-12 w-full rounded-full text-base font-semibold transition-all duration-200 ease-out disabled:scale-x-95 disabled:opacity-50 active:scale-[0.985]"
          >
            Avançar com esta opção
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-muted-foreground"
          >
            Quero ver outras parcelas
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
