
'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, Lock, AlertCircle } from 'lucide-react';
import { cn, shuffleArray } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useValidation } from '@/context/ValidationContext';
import { Footer } from '@/components/landing/footer';

// Helper to capitalize names
const toTitleCase = (str: string) => {
  if (!str) return '';
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
};

// Fake data for options
const fakeMotherNames = [
  'Maria Aparecida Santos',
  'Ana Paula Oliveira',
  'Sandra Regina Costa',
  'Rita de Cassia Lima',
  'Francisca das Chagas',
];

type MotherNameOption = {
  name: string;
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
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-gray-200 hover:border-gray-300'
      )}
    >
      <div className="flex items-center justify-between">
        <span>{text}</span>
        {isSelected && <Check className="h-5 w-5 text-primary" />}
      </div>
    </button>
  );
}

function ValidationPageContent() {
  const router = useRouter();
  const { validationData } = useValidation();
  
  const apiName = useMemo(() => toTitleCase(validationData?.name || ''), [validationData]);
  const apiMotherName = useMemo(() => toTitleCase(validationData?.motherName || ''), [validationData]);

  const [selectedOption, setSelectedOption] = useState<MotherNameOption | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // Memoize options to prevent re-shuffling on re-render
  const motherNameOptions = useMemo((): MotherNameOption[] => {
    if (!apiMotherName) return [];
    
    // Get other names, ensuring they are not the same as the real one
    const otherNames = fakeMotherNames.filter(name => name.toLowerCase() !== apiMotherName.toLowerCase());
    
    // Create the options array with the isCorrect flag
    const options: MotherNameOption[] = [
      ...shuffleArray(otherNames).slice(0, 2).map(name => ({ name, isCorrect: false })),
      { name: apiMotherName, isCorrect: true },
    ];
    
    return shuffleArray(options);
  }, [apiMotherName]);

  const handleNext = () => {
    if (!selectedOption) return;

    if (selectedOption.isCorrect) {
      setErrorMessage(null);
      // Data is already in context, just navigate
      router.push('/validation-birthdate');
    } else {
      setErrorMessage('O nome da mãe não confere. Por favor, tente novamente.');
       setTimeout(() => {
          setErrorMessage(null);
          setSelectedOption(null); // Deselect the wrong option
        }, 2500);
    }
  };

  if (!validationData) {
    // Optional: show a loading state or redirect if context is empty
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
              Para sua segurança, precisamos confirmar algumas informações.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="animate-in fade-in duration-500 delay-100">
              <label className="text-sm font-semibold text-gray-800">
                Nome completo
              </label>
              <input
                type="text"
                disabled
                value={apiName}
                className="mt-2 h-auto w-full rounded-[14px] border-gray-300 bg-gray-100 px-4 py-3.5 text-base"
              />
            </div>
            
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
              <label className="text-sm font-semibold text-gray-800">
                Selecione o nome correto da sua mãe:
              </label>
              <div className="space-y-3">
                {motherNameOptions.map((option) => (
                  <SelectionButton
                    key={option.name}
                    text={option.name}
                    onClick={() => setSelectedOption(option)}
                    isSelected={selectedOption?.name === option.name}
                  />
                ))}
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-start space-x-2 rounded-md bg-destructive/10 p-3 text-destructive animate-in fade-in duration-300">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="h-auto w-full rounded-full bg-primary py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Continuar
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

export default function ValidationPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ValidationPageContent />
    </Suspense>
  );
}
