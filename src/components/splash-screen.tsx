import Image from 'next/image';

export function SplashScreen() {
  return (
    <div className="splash">
      <Image
        src="https://i.postimg.cc/XY9QNVFx/logopng3-1.png"
        alt="logo meutudo"
        width={130}
        height={130}
        className="splash-logo"
        priority
      />
      <h1 className="splash-text">Seu crédito, hoje mesmo.</h1>
    </div>
  );
}
