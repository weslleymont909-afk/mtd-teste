'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronRight, Smartphone, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// --- Data for Carousel ---
const preApprovedAmount = 2633.0;
const cardImage = PlaceHolderImages.find(p => p.id === 'service-card-image');
const avatar1 = PlaceHolderImages.find(p => p.id === 'avatar-1');
const avatar2 = PlaceHolderImages.find(p => p.id === 'avatar-2');
const avatar3 = PlaceHolderImages.find(p => p.id === 'avatar-3');
const portabilityIllustration = PlaceHolderImages.find(p => p.id === 'service-portability-illustration');


const carouselItems = [
  {
    type: 'service' as const,
    title: 'Cartão Consignado com até 2% de cashback',
    description: <>Você tem{' '}<span className="font-bold text-primary">{formatCurrency(preApprovedAmount)}</span>{' '}pré-aprovados.</>,
    buttonText: 'Pedir cartão',
    imageUrl: cardImage?.imageUrl,
    imageAlt: cardImage?.description,
  },
  {
    type: 'testimonial' as const,
    avatarUrl: avatar1?.imageUrl,
    name: 'Maria S., 62 anos',
    text: '“Consegui o dinheiro que precisava na hora. O processo foi rápido e seguro.”',
  },
  {
    type: 'service' as const,
    imageUrl: portabilityIllustration?.imageUrl,
    imageAlt: portabilityIllustration?.description,
    title: 'Portabilidade de Consignado',
    description: 'Traga seu empréstimo e reduza o valor das suas parcelas.',
    buttonText: 'Ver ofertas',
  },
  {
    type: 'testimonial' as const,
    avatarUrl: avatar2?.imageUrl,
    name: 'José P., 58 anos',
    text: '“Eu não conhecia o aplicativo da meutudo, mas logo de primeira já consegui liberar mais de R$ 3.000. Já tinha tentado em outros bancos e não consegui aprovação. Aqui deu certo.”',
  },
  {
    type: 'service' as const,
    icon: Percent,
    title: 'Antecipação Saque-Aniversário',
    description: 'Use seu saldo FGTS como garantia e receba o dinheiro na hora.',
    buttonText: 'Antecipar agora',
  },
  {
    type: 'testimonial' as const,
    avatarUrl: avatar3?.imageUrl,
    name: 'Ana L., 45 anos',
    text: '“Antes da meutudo eu tinha dificuldade para organizar minha vida financeira. Com o app, tudo ficou mais simples e transparente. Hoje consigo me planejar melhor e tomar decisões com mais segurança. É fácil de usar e realmente ajuda no dia a dia.”',
  },
];


// --- Card Components ---

const ServiceCard = ({ title, description, buttonText, icon: Icon, imageUrl, imageAlt }: { title: string; description: React.ReactNode; buttonText: string; icon?: React.ElementType; imageUrl?: string; imageAlt?: string; }) => {
    const { toast } = useToast();
    
    const handleBlockedClick = () => {
        toast({
          description: 'Realize primeiro o saque para ativar essa função.',
          duration: 3000,
        });
    };

    const isCardImage = title.startsWith('Cartão Consignado');
    return (
        <div className="overflow-hidden rounded-xl bg-white p-4 shadow-md h-full flex flex-col justify-between">
            <div>
                <div className="flex items-start gap-4">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={imageAlt || title}
                            width={isCardImage ? 104 : 48}
                            height={isCardImage ? 42 : 48}
                            className={!isCardImage ? "h-12 w-12 object-contain" : ""}
                            loading="lazy"
                        />
                    ) : Icon ? (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                            <Icon className="h-6 w-6" />
                        </div>
                    ) : null}
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{description}</p>
                    </div>
                </div>
            </div>
            <Button 
                onClick={handleBlockedClick}
                className="mt-4 h-11 w-full justify-between rounded-full opacity-60 cursor-not-allowed"
            >
                <span>{buttonText}</span>
                <ChevronRight className="h-5 w-5" />
            </Button>
        </div>
    )
}

const TestimonialCard = ({ avatarUrl, name, text }: { avatarUrl?: string; name: string; text: string }) => {
  return (
    <div className="flex h-full flex-col justify-start overflow-hidden rounded-xl bg-white p-4 shadow-md">
      <div className="flex items-center gap-3">
        {avatarUrl &&
            <Image
                src={avatarUrl}
                alt={`Depoimento de ${name}`}
                width={40}
                height={40}
                className="rounded-full"
                loading="lazy"
            />
        }
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
        </div>
      </div>
      <p className="mt-3 text-sm italic text-gray-600">
        {text}
      </p>
    </div>
  );
};


// --- Main Section Component ---

export function CreditCardSection() {
  return (
    <div className="w-full">
      <h2 className="px-6 text-lg font-bold text-gray-800">Serviços meutudo</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full mt-4"
      >
        <CarouselContent className="-ml-2">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="basis-4/5 pl-6 md:basis-2/3">
                {item.type === 'service' ? (
                    <ServiceCard 
                        title={item.title!}
                        description={item.description!}
                        buttonText={item.buttonText!}
                        icon={item.icon}
                        imageUrl={item.imageUrl}
                        imageAlt={item.imageAlt}
                    />
                ) : (
                    <TestimonialCard 
                        avatarUrl={item.avatarUrl}
                        name={item.name!}
                        text={item.text!}
                    />
                )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
