
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useValidation } from '@/context/ValidationContext';
import {
  Loader2,
  CameraOff,
  ScanFace,
  Lightbulb,
  Smartphone,
  Glasses,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/landing/footer';
import { ROUTES } from '@/constants/routes';

const stepsContent = [
  {
    icon: ScanFace,
    title: 'Confirmação de identidade',
    text: (name: string) =>
      `${name}, para sua segurança, precisamos confirmar sua identidade por meio de uma verificação facial.`,
    button: 'CONTINUAR',
  },
  {
    icon: Lightbulb,
    title: 'Prepare o ambiente',
    text: (name: string) =>
      `${name}, esteja em um ambiente bem iluminado e evite pessoas ou objetos ao fundo durante a verificação.`,
    button: 'CONTINUAR',
  },
  {
    icon: Smartphone,
    title: 'Posicione seu rosto',
    text: (name: string) =>
      'Mantenha o celular na altura do seu rosto e centralize sua face dentro do círculo durante todo o processo.',
    button: 'CONTINUAR',
  },
  {
    icon: Glasses,
    title: 'Retire acessórios',
    text: (name: string) =>
      'Evite o uso de bonés, óculos escuros ou qualquer acessório que cubra parte do seu rosto.',
    button: 'INICIAR VERIFICAÇÃO',
  },
];

const verificationTexts = [
  'Centralizando seu rosto',
  'Analisando iluminação',
  'Confirmando identidade',
  'Verificação em andamento',
];

export default function ValidationFaceInfoPage() {
  const router = useRouter();
  const { validationData } = useValidation();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationStatusText, setVerificationStatusText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (validationData?.name) {
      const name = validationData.name.split(' ')[0] || '';
      setFirstName(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
    } else {
      // Fallback if context is not loaded yet or empty
      setFirstName('Cliente');
    }
  }, [validationData]);

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      router.push(ROUTES.FACIAL);
    }
  };

  const currentStepContent = stepsContent[step - 1];
  const Icon = currentStepContent.icon;

  return (
    <div id="signup-page-container" className="bg-white">
      <section className="relative h-[60vh] overflow-hidden bg-primary">
        <Image
          src="https://i.postimg.cc/3N3TnfVv/12b37c06-ea9d-4e8d-aa06-010817e529b3.png"
          alt="Ilustração de verificação de identidade"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          data-ai-hint="security illustration"
        />
      </section>

      <main className="relative z-10 -mt-[140px] px-4 pb-10">
        <div className="relative z-40 mx-auto max-w-[460px] animate-in fade-in-0 slide-in-from-bottom-3 duration-500 ease-out">
          <div className="rounded-[24px] bg-white p-6 text-center shadow-[0_10px_28px_rgba(0,0,0,0.06)] md:p-8">
            <div className="mb-4 flex justify-center text-primary animate-in fade-in-0 delay-100">
              <Icon className="h-10 w-10" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold leading-tight text-foreground animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-out delay-200 fill-mode-both md:text-3xl">
              {currentStepContent.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out delay-300 fill-mode-both">
              {currentStepContent.text(firstName)}
            </p>

            <div className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out delay-400 fill-mode-both">
              <Button
                onClick={handleNext}
                size="lg"
                className="h-12 w-full rounded-full text-base font-semibold shadow-[0_8px_20px_-6px_rgba(255,31,122,0.4)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,31,122,0.5)] active:scale-[0.98]"
              >
                {currentStepContent.button}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
