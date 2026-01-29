
import Image from 'next/image';
import { LandingPageCard } from '@/components/cards/landing-page-card';

export default function Home() {
  return (
    <>
      <section className="relative h-[60vh] overflow-hidden bg-primary">
        <Image
          src="https://i.postimg.cc/dQjKSYL1/ea3b1479-a36c-4b2a-bcee-9a3514dd5ed3.png"
          alt="background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          data-ai-hint="people smiling"
          style={{ zIndex: 0 }}
        />
        <div className="absolute left-4 bottom-[160px] z-20">
          <Image
            src="https://i.postimg.cc/XY9QNVFx/logopng3-1.png"
            alt="logo meutudo"
            width={56}
            height={56}
            className="rounded-full"
            priority
          />
        </div>
      </section>

      <div className="relative z-10">
        <LandingPageCard />
      </div>
    </>
  );
}
