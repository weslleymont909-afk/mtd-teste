'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  KeyRound,
  Smartphone,
  Mail,
  Fingerprint,
  AlertCircle,
} from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, pixKey: string) => void;
  balance: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const pixKeyTypes = [
  { id: 'cpf', label: 'CPF/CNPJ', icon: Fingerprint },
  { id: 'phone', label: 'Telefone', icon: Smartphone },
  { id: 'email', label: 'E-mail', icon: Mail },
  { id: 'random', label: 'Aleatória', icon: KeyRound },
];

const maskCPFCNPJ = (value: string) => {
  const onlyDigits = value.replace(/\D/g, '');
  if (onlyDigits.length <= 11) {
    // CPF
    return onlyDigits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14);
  } // CNPJ
  return onlyDigits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
};

const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};

export function WithdrawModal({
  isOpen,
  onClose,
  onConfirm,
  balance,
}: WithdrawModalProps) {
  const [selectedKeyType, setSelectedKeyType] = useState<string>('cpf');
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState(''); // Stores raw numeric string like "12345" for 123.45
  const [amountError, setAmountError] = useState<string | null>(null);

  const keyConfig = useMemo(
    () => ({
      cpf: { placeholder: 'Digite seu CPF ou CNPJ', type: 'text' },
      phone: { placeholder: '(99) 99999-9999', type: 'tel' },
      email: { placeholder: 'seuemail@exemplo.com', type: 'email' },
      random: { placeholder: 'Digite sua chave aleatória', type: 'text' },
    }),
    []
  );

  const currentKeyConfig = keyConfig[selectedKeyType as keyof typeof keyConfig];

  // Reset states
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        // Delay reset to avoid flash of empty state during close animation
        setSelectedKeyType('cpf');
        setPixKey('');
        setAmount('');
        setAmountError(null);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    setPixKey('');
  }, [selectedKeyType]);

  const handlePixKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (selectedKeyType === 'cpf') {
      value = maskCPFCNPJ(value);
    } else if (selectedKeyType === 'phone') {
      value = maskPhone(value);
    }
    setPixKey(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue === '') {
      setAmount('');
      setAmountError(null);
      return;
    }

    const numericValue = parseInt(rawValue, 10) / 100;

    if (numericValue > balance) {
      setAmountError('Valor acima do saldo disponível');
      // Do not update state if value is invalid, effectively "blocking" it.
    } else {
      setAmountError(null);
      setAmount(rawValue);
    }
  };

  const formattedAmount = useMemo(() => {
    if (amount === '') return '';
    const value = parseInt(amount, 10) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }, [amount]);

  const numericAmount = amount ? parseInt(amount, 10) / 100 : 0;
  const isButtonDisabled =
    !pixKey || numericAmount <= 0 || numericAmount > balance;

  const handleConfirm = () => {
    if (!isButtonDisabled) {
      onConfirm(numericAmount, pixKey);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md rounded-2xl p-6 shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-3 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-3 duration-300 ease-out">
        <DialogHeader className="text-center">
          <DialogTitle className="text-sm font-semibold text-gray-600">
            Seu saldo disponível
          </DialogTitle>
          <p className="mt-1 text-4xl font-bold text-primary">
            {formatCurrency(balance)}
          </p>
        </DialogHeader>

        <div className="my-8 space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-800">
              Selecione o tipo de chave PIX
            </label>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {pixKeyTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedKeyType(id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors',
                    selectedKeyType === id
                      ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="pixKey"
              className="text-sm font-semibold text-gray-800"
            >
              Digite sua chave PIX aqui
            </label>
            <Input
              id="pixKey"
              type={currentKeyConfig.type}
              value={pixKey}
              onChange={handlePixKeyChange}
              placeholder={currentKeyConfig.placeholder}
              className="h-12 rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="amount"
              className="text-sm font-semibold text-gray-800"
            >
              Digite o valor que deseja sacar
            </label>
            <Input
              id="amount"
              type="text"
              inputMode="decimal"
              value={formattedAmount}
              onChange={handleAmountChange}
              placeholder="R$ 0,00"
              className={cn(
                'h-12 rounded-lg',
                amountError && 'border-destructive focus-visible:ring-destructive'
              )}
            />
            {amountError && (
              <p className="flex items-center gap-1.5 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {amountError}
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={handleConfirm}
          disabled={isButtonDisabled}
          className="h-12 w-full rounded-full text-base font-semibold"
        >
          REALIZAR SAQUE
        </Button>
      </DialogContent>
    </Dialog>
  );
}
