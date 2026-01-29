import { PlaceHolderImages } from './placeholder-images';

const inssImage = PlaceHolderImages.find((p) => p.id === 'inss-woman-smiling');
const fgtsImage = PlaceHolderImages.find((p) => p.id === 'offer-fgts-woman');
const portabilityImage = PlaceHolderImages.find(
  (p) => p.id === 'offer-portability-woman'
);

export interface ProductOffer {
  id: string;
  title: string;
  benefits: string[];
  ctaText: string;
  status: 'available' | 'unavailable' | 'comming-soon';
  imageUrl?: string;
  imageHint?: string;
  tag?: string;
  icon?: string;
}

export const productOffers: ProductOffer[] = [
  {
    id: 'portability',
    title: 'Empréstimo R$ 15.000,00',
    benefits: ['Taxa de 1,06 % ao mês', 'Parcele em até 84 vezes'],
    ctaText: 'Crédito negado',
    status: 'available',
    imageUrl: portabilityImage?.imageUrl || '',
    imageHint: portabilityImage?.imageHint || 'woman with phone',
  },
  {
    id: 'inss',
    title: 'Empréstimo R$ 8.000,00',
    benefits: ['Taxa de 1,06 % ao mês', 'Parcele em até 84 vezes'],
    ctaText: 'Consultar agora',
    status: 'available',
    imageUrl: inssImage?.imageUrl || '',
    imageHint: inssImage?.imageHint || 'senior woman smiling',
  },
  {
    id: 'fgts',
    title: 'Empréstimo R$ 3.000,00',
    benefits: ['Taxa de 1,06% ao mês', 'Parcele em até 84 vezes'],
    ctaText: 'Consultar agora',
    status: 'available',
    imageUrl: fgtsImage?.imageUrl || '',
    imageHint: fgtsImage?.imageHint || 'woman smiling',
  },
];
