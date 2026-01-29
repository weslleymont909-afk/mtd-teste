
'use client';

import { CheckCircle, ChevronRight, DollarSign } from 'lucide-react';
import type { ProductOffer } from '@/lib/offers-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  offer: ProductOffer;
  onSimulateClick?: (amount: number) => void;
}

export function ProductCard({ offer, onSimulateClick }: ProductCardProps) {
  const isAvailable = offer.status === 'available';
  const isDenied = offer.ctaText === 'Crédito negado';

  const handleCTAClick = () => {
    if (isDenied || !onSimulateClick) return;

    // Extrai o valor numérico do título
    const amountString = offer.title.replace(/[^0-9,]/g, '').replace(',', '.');
    const amount = parseFloat(amountString);
    if (!isNaN(amount)) {
      onSimulateClick(amount);
    }
  };

  if (!isAvailable) {
    return (
      <div className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="absolute right-4 top-4 rounded-md bg-pink-100 px-2.5 py-1 text-xs font-semibold text-pink-800">
          {offer.tag}
        </div>
        <div className="flex items-center gap-3">
          {offer.icon === 'DollarSign' && (
            <DollarSign className="h-5 w-5 text-primary/80" />
          )}
          <h3 className="text-base font-semibold text-gray-800">
            {offer.title}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[160px] justify-between overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex-1 py-4 pl-4">
        <h3 className="text-base font-semibold text-gray-900">{offer.title}</h3>
        <ul className="mt-2 space-y-1.5">
          {offer.benefits.map((benefit, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        {isDenied ? (
          <div
            className={cn(
              'mt-4 flex items-center gap-1 text-sm font-bold text-destructive'
            )}
          >
            <span>{offer.ctaText}</span>
          </div>
        ) : (
          <Button
            onClick={handleCTAClick}
            className="mt-4 h-auto rounded-full px-5 py-2.5 font-semibold"
          >
            {offer.ctaText}
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
      {offer.imageUrl && (
        <div className="relative w-32 flex-shrink-0">
          <Image
            src={offer.imageUrl}
            alt={offer.imageHint || offer.title}
            fill
            className="object-contain object-right-bottom"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            data-ai-hint={offer.imageHint}
          />
        </div>
      )}
    </div>
  );
}
