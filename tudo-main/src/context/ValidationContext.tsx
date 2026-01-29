'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ValidationData {
  name: string;
  motherName: string;
  birthdate: string;
}

interface ValidationContextType {
  validationData: ValidationData | null;
  setValidationData: (data: ValidationData) => void;
  loanAmount: number | null;
  setLoanAmount: (amount: number | null) => void;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export function ValidationProvider({ children }: { children: ReactNode }) {
  const [validationData, setValidationData] = useState<ValidationData | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);

  return (
    <ValidationContext.Provider value={{ validationData, setValidationData, loanAmount, setLoanAmount }}>
      {children}
    </ValidationContext.Provider>
  );
}

export function useValidation() {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
}
