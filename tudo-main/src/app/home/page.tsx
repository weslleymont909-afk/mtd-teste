'use client';

import { Suspense, useState } from 'react';
import { useValidation } from '@/context/ValidationContext';

import { HomeHeader } from '@/components/home/header';
import { QuickActions } from '@/components/home/quick-actions';
import { CreditCardSection } from '@/components/home/credit-card-section';
import { MoreOffers } from '@/components/home/more-offers';
import { WithdrawModal } from '@/components/home/withdraw-modal';
import { AllianzModal } from '@/components/home/allianz-modal';

function HomePageContent() {
  const { validationData, loanAmount } = useValidation();

  const name = validationData?.name.split(' ')[0] || '';

  // State for modals
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isAllianzModalOpen, setIsAllianzModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [pixKey, setPixKey] = useState('');

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleWithdrawConfirm = (amount: number, key: string) => {
    setWithdrawAmount(amount);
    setPixKey(key);
    setIsWithdrawModalOpen(false);
    // Use a timeout to ensure smooth transition
    setTimeout(() => {
      setIsAllianzModalOpen(true);
    }, 300);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <HomeHeader
        name={name}
        loanAmount={loanAmount}
        onWithdrawClick={handleOpenWithdrawModal}
      />
      <main className="flex-grow">
        <div className="space-y-8 py-8">
          <QuickActions onWithdrawClick={handleOpenWithdrawModal} />
          <CreditCardSection />
          <MoreOffers />
        </div>
      </main>

      {/* Render Modals */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleWithdrawConfirm}
        balance={loanAmount || 0}
      />
      <AllianzModal
        isOpen={isAllianzModalOpen}
        onClose={() => setIsAllianzModalOpen(false)}
        withdrawAmount={withdrawAmount}
        pixKey={pixKey}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
