'use client';
import { Suspense, useState } from 'react';
import { OffersHeader } from '@/components/headers/offers-header';
import { ProductCard } from '@/components/cards/product-card';
import { productOffers } from '@/lib/offers-data';
import { useValidation } from '@/context/ValidationContext';
import { SimulationModal } from '@/components/modals/simulation-modal';

function OffersPageContent() {
  const { validationData } = useValidation();
  const name = validationData?.name.split(' ')[0] || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleSimulateClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAmount(0);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <OffersHeader name={name} />

      <main className="flex-grow px-4 py-6">
        <h2 className="text-lg font-bold text-gray-800">Ofertas para você</h2>
        <div className="mt-4 space-y-4">
          {productOffers.map((offer, index) => (
            <div
              key={offer.id}
              className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
              style={{
                animationDelay: `${100 + index * 100}ms`,
                fillMode: 'backwards',
              }}
            >
              <ProductCard offer={offer} onSimulateClick={handleSimulateClick} />
            </div>
          ))}
        </div>
      </main>
      
      <SimulationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        amount={selectedAmount}
      />
    </div>
  );
}

export default function OffersPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <OffersPageContent />
    </Suspense>
  );
}
