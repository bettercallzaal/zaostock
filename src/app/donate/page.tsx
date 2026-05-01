import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Donate to ZAO Festivals',
  description:
    'Three ways to support ZAO Festivals: tax-deductible via New Media Commons, PayPal for fiat, or Giveth for crypto. Funds cover artist pay and materials for the event.',
  openGraph: {
    title: 'Donate to ZAO Festivals',
    description:
      'Support ZAOstock 2026 and the ZAO Festivals series. Tax-deductible, fiat, or crypto.',
  },
};

const PAYPAL_URL = 'https://paypal.com/paypalme/zaalpanthaki';
const GIVETH_URL = 'https://giveth.io/project/sustaining-zao-festivals-creativity-technology';
const NMC_URL = process.env.NEXT_PUBLIC_NMC_DONATION_URL || '';

interface PathProps {
  rail: string;
  title: string;
  receipt: string;
  body: string;
  buttonLabel: string;
  href: string;
  hueClass: string;
  borderClass: string;
}

function DonatePathCard({ rail, title, receipt, body, buttonLabel, href, hueClass, borderClass }: PathProps) {
  const disabled = !href;
  return (
    <div className={`flex flex-col bg-[#0d1b2a] border ${borderClass} rounded-xl p-6 ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex items-baseline justify-between mb-3">
        <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${hueClass}`}>{rail}</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">{receipt}</span>
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      <p className="text-sm text-gray-300 leading-relaxed mt-3 flex-1">{body}</p>
      {disabled ? (
        <span className="inline-block mt-5 bg-white/[0.04] border border-white/[0.08] text-gray-500 font-bold rounded-lg px-4 py-3 text-sm text-center">
          Coming soon
        </span>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 bg-[#f5a623] hover:bg-[#ffd700] text-black font-bold rounded-lg px-4 py-3 text-sm text-center transition-colors"
        >
          {buttonLabel}
        </a>
      )}
    </div>
  );
}

export default function DonatePage() {
  return (
    <div className="min-h-[100dvh] bg-[#0a1628] text-white pb-12">
      <header className="sticky top-0 z-40 bg-[#0a1628]/95 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xs text-gray-400 hover:text-[#f5a623]">
            &larr; ZAOstock
          </Link>
          <span className="text-xs text-gray-500">Donate</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-3">
          <p className="inline-block rounded-full bg-[#f5a623]/10 px-3 py-1 text-xs text-[#f5a623] font-medium border border-[#f5a623]/30">
            Donate to ZAO Festivals
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Three ways to give.
          </h1>
          <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
            Funds cover artist pay and materials for the event. ZAOstock runs at break-even. Pick the path that fits how you want to give.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DonatePathCard
            rail="Tax-deductible"
            title="New Media Commons"
            receipt="501(c)(3) receipt"
            body="ZAO Festivals' programs are supported through fiscal sponsorship by New Media Commons, a 501(c)(3) public charity. Donations to NMC in support of our programs may be tax-deductible to the extent allowed by law."
            buttonLabel={NMC_URL ? 'Give via New Media Commons' : 'Coming soon'}
            href={NMC_URL}
            hueClass="text-emerald-300"
            borderClass="border-emerald-500/30"
          />
          <DonatePathCard
            rail="Fiat"
            title="PayPal"
            receipt="No tax receipt"
            body="Send fiat directly via PayPal. Fastest path if you don't need a tax receipt. Goes straight to project operations."
            buttonLabel="Give via PayPal"
            href={PAYPAL_URL}
            hueClass="text-blue-300"
            borderClass="border-blue-500/30"
          />
          <DonatePathCard
            rail="Crypto"
            title="Giveth"
            receipt="No tax receipt"
            body="Wallet-to-wallet via Giveth. USDC on Base preferred. Works on Ethereum, Base, Optimism, Polygon, Gnosis, Arbitrum, Celo. GIVbacks-eligible donations from $5+."
            buttonLabel="Give via Giveth"
            href={GIVETH_URL}
            hueClass="text-rose-300"
            borderClass="border-rose-500/30"
          />
        </div>

        <section className="bg-[#0d1b2a] rounded-xl p-5 border border-white/[0.08] space-y-3">
          <p className="text-xs text-[#f5a623] uppercase tracking-wider font-bold">Where the money goes</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Funds cover artist pay and materials for the event. Festival operates at break-even. Past contributors funded the early work that gets us to ZAOstock 2026.
          </p>
        </section>

        <section className="bg-[#0d1b2a] rounded-xl p-5 border border-white/[0.08] space-y-2">
          <p className="text-xs text-[#f5a623] uppercase tracking-wider font-bold">About the ZAO Festivals series</p>
          <ul className="text-sm text-gray-300 space-y-1.5">
            <li>- ZAO-PALOOZA, NYC, April 2024 (during NFT NYC). 12 artists, broke even.</li>
            <li>- ZAO-CHELLA, Miami Wynwood, December 2024 (during Art Basel). 16+ musicians, 100+ visual artists, 50+ music communities. ZAO HOUSE residency. Live WaveWarZ battle, cipher recorded on-site.</li>
            <li>- ZAOville, DMV, July 2026. Co-hosted with DCoop (founder of The VEC). Lineup includes PROF!T, ELYVN, and more.</li>
            <li>- ZAOstock, Ellsworth Maine, October 3 2026. One-day festival during Maine Craft Weekend.</li>
          </ul>
        </section>

        <footer className="pt-4 border-t border-white/[0.08] text-[11px] text-gray-500 leading-relaxed">
          ZAO Festivals&apos; programs are supported through fiscal sponsorship by New Media Commons, a 501(c)(3) public charity. Donations to NMC in support of ZAO Festivals may be tax-deductible to the extent allowed by law. Donations through PayPal or Giveth go directly to project operations and are not tax-deductible.
        </footer>
      </div>
    </div>
  );
}
