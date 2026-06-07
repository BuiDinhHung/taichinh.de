import Image from "next/image";
import Link from "next/link";

const contactRows = [
  ["Proskauer Str. 13", "10247 Berlin"],
  ["Tel.: +49 30-4268859", "Mobil: 0176-10178768", "WhatsApp: 0176-10178768"],
];

export function AdvisorProfileSection() {
  return (
    <section className="bg-surface py-10 sm:py-12 lg:py-16">
      <div className="dvag-container">
        <div className="grid overflow-hidden rounded-sm bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:grid-cols-[minmax(280px,0.36fr)_minmax(0,0.64fr)]">
          <div className="flex flex-col justify-center bg-brand-gold-tint px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
            <div className="relative h-12 w-[218px] max-w-full">
              <Image
                src="/images/client-updates/advisor-team-office.png"
                alt="Buro fur Deutsche Vermogensberatung"
                fill
                sizes="218px"
                className="object-contain object-left"
              />
            </div>

            <div className="mt-6 space-y-1">
              <h2 className="text-base font-bold leading-snug text-brand-blue">
                Bao Vu The
              </h2>
              <p className="text-sm leading-snug text-brand-blue">
                Vermogensberater
              </p>
            </div>

            <div className="mt-7 space-y-5 text-sm leading-relaxed text-brand-blue">
              {contactRows.map((row) => (
                <div key={row[0]}>
                  {row.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ))}

              <div>
                <p>
                  Mail:{" "}
                  <Link
                    href="mailto:bao.vu-the.3625100@dvag.de"
                    className="underline underline-offset-2 hover:text-brand-gold-darker"
                  >
                    bao.vu-the.3625100@dvag.de
                  </Link>
                </p>
                <p>
                  Webseite:{" "}
                  <Link
                    href="/"
                    className="underline underline-offset-2 hover:text-brand-gold-darker"
                  >
                    www.taichinh.de
                  </Link>
                </p>
              </div>

              <div className="flex items-end gap-4">
                <div>
                  <p>Links & QR Online:</p>
                  <Link
                    href="https://bit.ly/vuthebao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-brand-gold-darker"
                  >
                    https://bit.ly/vuthebao
                  </Link>
                </div>
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-brand-gold/30 bg-white">
                  <Image
                    src="/images/client-updates/vuthebao-qr.png"
                    alt="QR Online"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[430px]">
            <Image
              src="/images/client-updates/hero-consulting-office.jpeg"
              alt="Tu van tai chinh tai van phong"
              fill
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
