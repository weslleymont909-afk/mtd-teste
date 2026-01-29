import { Facebook, Instagram, Linkedin, Youtube, Phone } from 'lucide-react';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);


export function Footer() {
  return (
    <footer
      className="mt-14 border-t border-gray-200 bg-[#F2F2F2] text-black"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-9">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_1fr_1fr] md:gap-16">
          {/* Coluna 1: Logo e Redes Sociais */}
          <div>
            <h2 className="text-3xl font-semibold">
              meutudo<span className="text-primary">.</span>
            </h2>
            <p className="mt-2 text-sm">
              Seu <span className="text-primary">crédito</span>, hoje mesmo.
            </p>
            <div className="mt-6 flex space-x-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </div>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black text-black"
              >
                <Facebook className="h-5 w-5" />
              </div>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black text-black"
              >
                <Instagram className="h-5 w-5" />
              </div>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black text-black"
              >
                <Linkedin className="h-5 w-5" />
              </div>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black text-black"
              >
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Coluna 2: Institucional e Horário */}
          <div className="flex flex-col">
            <div>
              <h3 className="mb-2.5 text-sm font-semibold">Institucional</h3>
              <ul className="space-y-1.5 text-[12.8px] leading-[1.42]">
                <li>Simule agora</li>
                <li>Ajuda</li>
                <li>Sobre nós</li>
                <li>Blog</li>
                <li>Carreiras</li>
                <li>Mapa do site</li>
                <li>Validador de contrato</li>
                <li>Parati Financeira</li>
              </ul>
            </div>
            <div className="mt-8 text-[12.8px] leading-[1.42]">
                <h3 className="mb-2.5 text-sm font-semibold">Horário de atendimento</h3>
                <p className="mb-1.5">Segunda a Sexta: 08:00 - 20:00</p>
                <p>Sábado: 08:00 - 16:00</p>
            </div>
          </div>


          {/* Coluna 3: Contatos */}
          <div className="text-[12.8px] leading-[1.42]">
            <h3 className="mb-2.5 text-sm font-semibold">Contatos</h3>
            <div className="space-y-3">
                <div>
                    <h4 className="font-semibold">Fale conosco</h4>
                </div>
                <div>
                    <p>Capitais e regiões metropolitanas</p>
                    <p className="flex items-center gap-2 font-semibold"><Phone className="h-4 w-4"/> 4000 1831</p>
                </div>
                <div>
                    <p>Demais localidades</p>
                    <p className="flex items-center gap-2 font-semibold"><Phone className="h-4 w-4"/> 0800 700 8831</p>
                </div>
            </div>
          </div>
        </div>

        <hr className="my-5 h-px border-0 bg-[#CFCFCF]" />

        <div className="space-y-2.5 text-left text-[10.8px] leading-[1.48] text-gray-700">
          <p>
            A meutudo pertence à TUDO Serviços S.A. (“TUDO”), CNPJ
            27.852.506/0001-85, localizada à Av. Senador Virgílio Távora, nº 303,
            Meireles, Fortaleza/CE, CEP: 60170-250, uma fintech de acesso a
            empréstimos consignados. Nossa atuação é pautada na Resolução nº
            4.935, de 29 de julho de 2021, que disciplina a atuação de
            correspondentes no país. Atuamos por intermédio da PARATI CRÉDITO,
            FINANCIAMENTO E INVESTIMENTO S/A, instituição financeira devidamente,
            com sede na Cidade de Vitória, Estado do Espírito Santo, e inscrita
            no CNPJ/MF sob o nº 03.311.443/0001-91 (“PARATI”) - Canais de
            Atendimento da PARATI: www.parati-cfi.com.br / Telefone: +55 (27)
            2123-4771 / Ouvidoria: ouvidoria@parati-cfi.com.br.
          </p>
        </div>

        <hr className="my-5 h-px border-0 bg-[#CFCFCF]" />

        <div className="flex flex-col items-center justify-center space-y-4 text-[10.8px] md:flex-row md:justify-start md:space-x-4 md:space-y-0">
          <span>Política de privacidade</span>
          <span>Termos de uso</span>
          <span>Educação Financeira</span>
          <span>Ética e Integridade</span>
        </div>
      </div>
    </footer>
  );
}
