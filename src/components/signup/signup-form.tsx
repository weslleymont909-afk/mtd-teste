'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useValidation } from '@/context/ValidationContext';
import { AlertCircle } from 'lucide-react';
import { fetchUserData } from '@/services/api';
import { ROUTES } from '@/constants/routes';

// Validação do CPF
const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  return true;
};

// Máscara do CPF
const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const FormSchema = z.object({
  cpf: z.string().refine(validateCPF, {
    message: 'Digite um CPF válido para continuar.',
  }),
});

interface SignupFormProps {
  onFocusChange: (isFocused: boolean) => void;
}

export function SignupForm({ onFocusChange }: SignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState('Analisar ofertas');
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const { setValidationData } = useValidation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: '',
    },
    mode: 'onChange',
  });

  const { errors } = form.formState;
  const cpfValue = form.watch('cpf');
  const isCpfValid = validateCPF(cpfValue);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    setButtonText('Consultando seus dados com segurança...');
    setApiError(null);

    const numericCpf = data.cpf.replace(/\D/g, '');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const responseData = await fetchUserData(numericCpf);
      
      if (responseData && responseData.nome && responseData.nascimento && responseData.mae) {
        setValidationData({
          name: responseData.nome,
          birthdate: responseData.nascimento,
          motherName: responseData.mae,
        });
        router.push(ROUTES.MOTHER_NAME_VALIDATION);
      } else {
        setApiError('Não localizamos informações para este CPF.');
        setIsSubmitting(false);
        setButtonText('Analisar ofertas');
      }
    } catch (error) {
      setApiError(
        'Não foi possível consultar seus dados agora. Tente novamente em instantes.'
      );
      setIsSubmitting(false);
      setButtonText('Analisar ofertas');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <>
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-800">
                    CPF
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onFocus={() => onFocusChange(true)}
                      onBlur={() => onFocusChange(false)}
                      onChange={(e) => {
                        field.onChange(maskCPF(e.target.value));
                      }}
                      type="text"
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      className={cn(
                        'h-auto rounded-[14px] border-gray-300 bg-white px-4 py-3.5 text-base transition-colors duration-300 focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,0,122,0.08)] focus:ring-0',
                        isCpfValid && 'border-primary',
                        errors.cpf && 'border-destructive'
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive text-xs" />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-1.5 text-xs text-gray-600">
              <Lock className="h-3 w-3 flex-shrink-0" />
              <span>
                Seus dados estão protegidos e serão usados apenas para
                simulação.
              </span>
            </div>
          </>

        {apiError && !isSubmitting && (
          <div className="flex items-start space-x-2 rounded-md bg-destructive/10 p-3 text-destructive">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{apiError}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={!isCpfValid || isSubmitting}
          className={cn(
            'h-auto w-full rounded-full bg-primary py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60',
            isSubmitting && 'skeleton-shimmer'
          )}
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  );
}
