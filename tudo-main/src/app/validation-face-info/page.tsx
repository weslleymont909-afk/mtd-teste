
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

  useEffect(() => {
    if (step === 5) {
      setIsProcessing(true);

      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error('Camera API not supported');
          setHasCameraPermission(false);
          return;
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
          });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
        }
      };

      getCameraPermission();

      let textIndex = 0;
      setVerificationStatusText(verificationTexts[0]);
      const textInterval = setInterval(() => {
        textIndex = textIndex + 1;
        if (textIndex < verificationTexts.length) {
          setVerificationStatusText(verificationTexts[textIndex]);
        }
      }, 5000); // 20s / 4 texts

      const verificationTimer = setTimeout(() => {
        clearInterval(textInterval);
        setIsProcessing(false);
        setIsCompleted(true);

        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
        }
      }, 20000);

      return () => {
        clearInterval(textInterval);
        clearTimeout(verificationTimer);
      };
    }
  }, [step]);

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else if (isCompleted) {
      router.push('/offers');
    }
  };

  if (step < 5) {
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

  // Step 5: Verification
  return (
    <div
      id="signup-page-container"
      className="bg-primary text-primary-foreground"
    >
      <header className="absolute left-4 top-4 z-20">
        <Image
          src="https://i.postimg.cc/XY9QNVFx/logopng3-1.png"
          alt="logo meutudo"
          width={56}
          height={56}
          className="rounded-full"
          priority
        />
      </header>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-4 py-8 text-center sm:py-16">
        <div className="relative mt-8 w-full max-w-[280px] animate-in fade-in zoom-in-95 duration-500 delay-150">
          <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-[45%] bg-black/20">
            {isCompleted ? (
              <div className="flex flex-col items-center gap-3 p-4 text-center text-white/90 animate-in fade-in">
                <CheckCircle2 className="h-12 w-12" />
                <p className="text-lg font-semibold">
                  Identidade confirmada com sucesso
                </p>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className={cn(
                    'h-full w-full object-cover scale-x-[-1]',
                    hasCameraPermission ? 'block' : 'hidden'
                  )}
                  autoPlay
                  playsInline
                  muted
                />
                {hasCameraPermission === false && (
                  <div className="absolute flex flex-col items-center gap-2 p-4 text-white/80">
                    <CameraOff className="h-10 w-10" />
                    <p className="text-sm font-medium">
                      Não foi possível acessar a câmera.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <div
            className={cn(
              'face-oval-static-border',
              isProcessing && 'animate-pulse-border'
            )}
          ></div>
        </div>

        <div className="mt-6 flex min-h-[3rem] w-full flex-col items-center justify-center px-4">
          {isProcessing && (
            <div className="flex items-center justify-center gap-2 text-white/90 animate-in fade-in">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="font-medium">{verificationStatusText}</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-20 left-4 right-4 animate-in fade-in duration-500 delay-300">
          <div className="flex flex-col items-center gap-3">
            <Button
              onClick={handleNext}
              disabled={!isCompleted}
              size="lg"
              className="h-12 w-full max-w-sm rounded-full bg-white text-base font-semibold text-primary shadow-lg transition-opacity hover:opacity-90 active:scale-[0.985] disabled:cursor-not-allowed disabled:bg-white/40 disabled:text-white/80"
            >
              CONTINUAR
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
