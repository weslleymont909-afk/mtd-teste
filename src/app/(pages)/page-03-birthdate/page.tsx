
'use client';

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, Lock, AlertCircle } from 'lucide-react';
import { cn, shuffleArray } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useValidation } from '@/context/ValidationContext';
import { Footer } from '@/components/landing/footer';
import { ROUTES } from '@/constants/routes';

// Helper to format date from a Date object to DD/MM/YYYY
const formatDate = (date: Date) => {
  if (!date || isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Helper to generate a couple of FAKE dates, independent of the real one
const generateFakeDates = (): Date[] => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Random but plausible birth years
    const year1 = currentYear - (Math.floor(Math.random() * 15) + 20); // 20-35 years ago
    const year2 = currentYear - (Math.floor(Math.random() * 20) + 36); // 36-56 years ago

    const date1 = new Date(year1, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const date2 = new Date(year2, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    return [date1, date2];
}

type BirthdateOption = {
  value: string;
  label: string;
  isCorrect: boolean;
};

// Component for selection buttons
function SelectionButton({
  text,
  onClick,
  isSelected,
}: {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-xl border bg-white p-4 text-left text-base text-gray-800 transition-all duration-200 ease-out active:scale-[0.98]',
        isSelected ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300'
      )}
    >
      <div className="flex items-center justify-between">
        <span>{text}</span>
        {isSelected && <Check className="h-5 w-5 text-primary" />}
      </div>
    </button>
  );
}

function ValidationBirthdatePageContent() {
  const router = useRouter();
  const { validationData } = useValidation();
  
  const [birthdateOptions, setBirthdateOptions] = useState<BirthdateOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<BirthdateOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState('Confirmar dados');

  useEffect(() => {
    const birthdateFromApi = validationData?.birthdate;

    if (!birthdateFromApi || typeof birthdateFromApi !== 'string') {
      setBirthdateOptions([]);
      return;
    }

    const realOption: BirthdateOption = {
      value: birthdateFromApi,
      label: birthdateFromApi,
      isCorrect: true,
    };

    const fakeDates = generateFakeDates();
    const fakeOptions: BirthdateOption[] = fakeDates.map(date => {
      const fakeDateString = formatDate(date);
      return {
        value: fakeDateString,
        label: fakeDateString,
        isCorrect: false,
      };
    });

    const allOptions = shuffleArray([realOption, ...fakeOptions]);
    setBirthdateOptions(allOptions);

  }, [validationData]);

  const handleConfirm = () => {
    if (!selectedOption) return;
    
    setIsProcessing(true);
    setErrorMessage(null);
    setButtonText('Validando informações...');

    setTimeout(() => {
        if (selectedOption.isCorrect) {
          setButtonText('Dados confirmados com segurança');
          setTimeout(() => {
            router.push(ROUTES.PRE_FACIAL);
          }, 1000);
        } else {
          setErrorMessage('A data de nascimento não confere. Tente novamente.');
          setIsProcessing(false);
          setButtonText('Confirmar dados');
          
          setTimeout(() => {
              setSelectedOption(null); // Reset selection
              setErrorMessage(null);
          }, 2500);
        }
    }, 1200);
  };
  
  if (!validationData) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-[#fff5f9]">
            <p>Carregando dados...</p>
        </div>
      );
  }

  return (
    <div id="signup-page-container" className="bg-[#fff5f9]">
      <section className="relative h-[25vh] overflow-hidden bg-primary/5">
        <div className="absolute left-4 top-4 z-20">
          <Image
            src="https://i.postimg.cc/XY9QNVFx/logopng3-1.png"
            alt="logo meutudo"
            width={56}
            height={56}
            className="rounded-full"
            priority
          />
        </div>
      </section>

      <main className="relative z-10 -mt-[120px] pb-10">
        <div
          className={cn(
            'mx-4 max-w-lg rounded-[22px] bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:mx-auto'
          )}
        >
          <div className="animate-in fade-in duration-500">
            <h2 className="text-lg font-semibold text-gray-900">
              Confirme seus dados
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
              Selecione sua data de nascimento para continuar.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {birthdateOptions.length > 0 ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                <label className="text-sm font-semibold text-gray-800">
                    Selecione sua data de nascimento:
                </label>
                <div className="space-y-3">
                    {birthdateOptions.map((option) => (
                    <SelectionButton
                        key={option.value}
                        text={option.label}
                        onClick={() => setSelectedOption(option)}
                        isSelected={selectedOption?.value === option.value}
                    />
                    ))}
                </div>
                </div>
            ) : (
                <div className="text-center text-sm text-gray-500 py-8">
                    Carregando opções...
                </div>
            )}

            {errorMessage && (
              <div className="flex items-start space-x-2 rounded-md bg-destructive/10 p-3 text-destructive animate-in fade-in duration-300">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <Button
              onClick={handleConfirm}
              disabled={!selectedOption || isProcessing}
              className="h-auto w-full rounded-full bg-primary py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {buttonText}
            </Button>
            
            <div className="flex items-center space-x-1.5 pt-2 text-xs text-gray-500/90">
              <Lock className="h-3 w-3 flex-shrink-0" />
              <span>
                Essas informações são usadas apenas para confirmar sua
                identidade e proteger seus dados.
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ValidationBirthdatePage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ValidationBirthdatePageContent />
    </Suspense>
  );
}
