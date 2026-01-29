
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, CameraOff } from 'lucide-react';

const behavioralInstructions = [
  'Posicione seu rosto no centro',
  'Mantenha o celular na altura dos olhos',
  'Evite movimentos bruscos',
];

export default function ValidationFacePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(
    null
  );
  const [currentBehavioralInstruction, setCurrentBehavioralInstruction] =
    useState(behavioralInstructions[0]);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // Cycle through behavioral instructions (simulation)
    let behavioralIndex = 0;
    const behavioralInterval = setInterval(() => {
      behavioralIndex++;
      if (behavioralIndex < behavioralInstructions.length) {
        setCurrentBehavioralInstruction(
          behavioralInstructions[behavioralIndex]
        );
      }
    }, 2000); // 2 seconds per instruction

    // End simulation after a total of 6 seconds
    const simulationTimer = setTimeout(() => {
      setIsProcessing(false);
      clearInterval(behavioralInterval);
    }, behavioralInstructions.length * 2000);

    return () => {
      clearInterval(behavioralInterval);
      clearTimeout(simulationTimer);
    };
  }, []);

  const handleContinue = () => {
    // Stop camera stream on navigation
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    router.push('/offers');
  };

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
        <div className="w-full animate-in fade-in duration-500">
          <h1 className="text-3xl font-bold">Verificação facial</h1>
          <p className="mt-2 text-base text-white/80">
            Essa etapa ajuda a proteger seus dados e evitar fraudes.
          </p>
        </div>

        <div className="relative mt-8 w-full max-w-[280px] animate-in fade-in zoom-in-95 duration-500 delay-150">
          <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-[45%] bg-black/20">
            <video
              ref={videoRef}
              className={`h-full w-full object-cover scale-x-[-1] ${
                hasCameraPermission === false ? 'hidden' : 'block'
              }`} // Mirror front camera
              autoPlay
              playsInline
              muted
            />
            {hasCameraPermission === false && (
              <div className="absolute flex flex-col items-center gap-2 p-4 text-white/80">
                <CameraOff className="h-10 w-10" />
                <p className="text-sm font-medium">
                  Não foi possível acessar a câmera. Verifique as permissões do
                  seu dispositivo.
                </p>
              </div>
            )}
          </div>
          <div className="face-oval-static-border animate-pulse-border"></div>
        </div>

        <div className="mt-6 flex h-12 w-full flex-col items-center justify-center">
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2 text-white/90 animate-in fade-in">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="font-medium">{currentBehavioralInstruction}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-white/90 animate-in fade-in">
              <p className="font-semibold">Verificação concluída</p>
            </div>
          )}
        </div>

        <p className="mt-2 text-xs text-white/60">
          Imagem utilizada apenas para verificação visual
        </p>

        <div className="absolute bottom-6 left-4 right-4 animate-in fade-in duration-500 delay-300">
          <div className="flex flex-col items-center gap-3">
            <Button
              onClick={handleContinue}
              disabled={isProcessing}
              size="lg"
              className="h-12 w-full max-w-sm rounded-full bg-white text-base font-semibold text-primary shadow-lg transition-opacity hover:opacity-90 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70"
            >
              Continuar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <p className="cursor-pointer text-sm text-white/70">
                  Por que isso é necessário?
                </p>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-sm rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-bold text-center">
                    Por que fazemos essa verificação?
                  </AlertDialogTitle>
                  <AlertDialogDescription asChild>
                    <div className="space-y-4 pt-4 text-left text-sm text-gray-600">
                      <p>
                        Essa etapa é uma medida de segurança utilizada por bancos
                        e instituições financeiras para proteger você contra
                        golpes virtuais, uso indevido de dados e tentativas de
                        fraude online. A verificação ajuda a garantir que apenas
                        você tenha acesso às suas informações e ofertas
                        disponíveis.
                      </p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                  <AlertDialogAction className="h-12 w-full rounded-full bg-primary text-base font-semibold text-white transition-transform hover:bg-primary/90 active:scale-[0.985]">
                    Entendi
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </main>
    </div>
  );
}
