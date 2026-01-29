
'use client';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '../ui/scroll-area';

interface AllianzModalProps {
  isOpen: boolean;
  onClose: () => void;
  withdrawAmount: number;
  pixKey: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export function AllianzModal({
  isOpen,
  onClose,
  withdrawAmount,
  pixKey,
}: AllianzModalProps) {
  const allianzLogo = PlaceHolderImages.find((p) => p.id === 'allianz-logo');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] max-h-[700px] w-[calc(100vw-2rem)] max-w-md flex-col rounded-2xl p-0 shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-3 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-3 duration-300 ease-out">
        <DialogHeader className="border-b p-6 text-center">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Confirmação de segurança
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Etapa final para liberação do seu saque.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 p-6">
            {/* Allianz Block */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                {allianzLogo && (
                  <Image
                    src={allianzLogo.imageUrl}
                    alt="Allianz Logo"
                    width={80}
                    height={20}
                    className="opacity-80"
                    loading="lazy"
                  />
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-blue-900/90">
                A Allianz Seguros garante a segurança da sua operação. Essa etapa
                protege você contra fraudes e usos indevidos.
              </p>
              <p className="mt-2 text-xs text-blue-800/80">
                O valor do seguro é devolvido após a quitação do empréstimo.
              </p>
            </div>

            {/* Insurance Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Detalhamento do seguro
              </h3>
              <ul className="mt-3 space-y-2 border-t border-gray-200 pt-3 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Declaração de seguro</span>
                  <span>R$ 7,99</span>
                </li>
                <li className="flex justify-between">
                  <span>Proteção da seguradora</span>
                  <span>R$ 10,27</span>
                </li>
                <li className="flex justify-between">
                  <span>Apólice virtual</span>
                  <span>R$ 14,42</span>
                </li>
              </ul>
              <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 font-bold text-gray-800">
                <span>TOTAL DO SEGURO</span>
                <span>R$ 32,58</span>
              </div>
            </div>

            {/* Final Amount */}
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <p className="text-sm font-semibold text-green-800">
                Valor do empréstimo
              </p>
              <p className="mt-1 text-3xl font-bold text-green-700">
                {formatCurrency(withdrawAmount)}
              </p>
              <p className="mt-2 text-xs text-green-600">
                Após a confirmação, o valor será liberado em até 10 minutos.
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="mt-auto border-t bg-white p-6">
          <Button
            asChild
            className="h-12 w-full rounded-full bg-green-600 text-base font-semibold text-white hover:bg-green-700"
          >
            <a
              href="https://google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pagar agora
            </a>
          </Button>
          <p className="mt-3 text-center text-xs text-gray-500">
            Pagamento seguro • Ambiente protegido
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
