import { Metadata } from 'next';
import Link from 'next/link';
import { CountdownTimer } from '@/components/CountdownTimer';
import { RSVPForm } from '../RSVPForm';
import { getPublicMembers, getStockCounts, type PublicMember } from '@/lib/members';
import { LineupMarquee } from '@/components/festival/LineupMarquee';
import { FactStrip } from '@/components/festival/FactStrip';
import { SectionHeader } from '@/components/festival/SectionHeader';
import { StatTile } from '@/components/festival/StatTile';
import { TierPanel } from '@/components/festival/TierPanel';
import { PastEventCard } from '@/components/festival/PastEventCard';
import { StickyActionBar } from '@/components/festival/StickyActionBar';
import { TeamMosaic } from '@/components/festival/TeamMosaic';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ZAOstock | Test Layout',
  description: 'ZAOstock - test layout preview',
  robots: { index: false, follow: false },
};

const FESTIVAL_DATE = '2026-10-03T12:00:00-04:00';

const FACTS = [
  { label: 'Date', value: 'Oct 03 2026' },
  { label: 'Venue', value: 'Franklin St Parklet' },
  { label: 'Time', value: '12 PM - 6 PM' },
  { label: 'Lineup', value: 'Independent Artists' },
];

const LINEUP_SLOTS = [
  'TBA', 'TBA', 'DJ', 'TBA', 'TBA', 'TBA', 'DJ', 'TBA',
];

const SPONSOR_OFFERINGS = [
  {
    category: 'Main Stage Partner',
    number: '01',
    items: [
      'Named credit on stage banner and signage',
      'Booth or table space on-site',
      'Welcome bag inclusion',
      'Live verbal credit during the event',
      'Co-presented in all printed materials',
    ],
  },
  {
    category: 'Broadcast Partner',
    number: '02',
    items: [
      'Named credit on festival website with backlink',
      'Livestream overlay credit',
      'Sponsored segment plus interview feature',
      'Social campaign across Farcaster, X, and Bluesky',
      'Newsletter credit (400+ editions)',
    ],
  },
  {
    category: 'Year-Round Partner',
    number: '03',
    items: [
      'Post-event thank-you feature and recap',
      'Advisory seat for Year 2 planning',
      'Priority placement in 2027',
      'Tax-deductible via New Media Commons 501(c)(3)',
    ],
  },
];

const PAST_EVENTS = [
  {
    year: 'NYC · Apr 2024',
    name: 'ZAO-PALOOZA',
    description: 'Community meet-up during NFT NYC. 12 artists. Volunteer-organized in six weeks. Broke even.',
    hue: 'rose' as const,
  },
  {
    year: 'Miami · Dec 2024',
    name: 'ZAO-CHELLA',
    description: 'Showcase in Wynwood during Art Basel. 10 artists, AR art, trading cards, live WaveWarZ battle, cipher recorded on-site.',
    hue: 'indigo' as const,
  },
];

const PARTNERS = [
  { name: 'Heart of Ellsworth', role: 'Venue + MCW statewide promotion', confirmed: true },
  { name: 'Town of Ellsworth', role: 'Parklet venue', confirmed: true },
  { name: 'New Media Commons', role: '501(c)(3) fiscal sponsor', confirmed: true },
  { name: 'ENTERACT', role: 'Technical build', confirmed: true },
].filter((p) => p.confirmed);

const NAV = [
  { href: '/program', label: 'Program' },
  { href: '/suggest', label: 'Suggest' },
  { href: '/apply', label: 'Volunteer' },
  { href: '/sponsor/deck', label: 'Partner' },
];

export default async function TestPage() {
  const [publicMembers, counts] = await Promise.all([getPublicMembers(), getStockCounts()]);
  const typedMembers: PublicMember[] = publicMembers;

  return (
    <div className="min-h-[100dvh] bg-[#0a1628] text-white pb-24 sm:pb-12 font-[family-name:var(--font-display)]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a1628]/95 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <Link href="/test" className="font-bold text-base tracking-tight">ZAOstock</Link>
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.2em] hidden sm:inline">
              / Oct 03 2026
            </span>
          </div>
          <nav className="flex items-center gap-5">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-gray-400 hover:text-[#f5a623] transition-colors hidden sm:inline"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/"
              className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[#f5a623] hover:text-[#ffd700] transition-colors"
            >
              The ZAO
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        {/* dot pattern bg */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(245,166,35,0.6) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-8 bg-[#f5a623]" />
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase text-[#f5a623] tracking-[0.25em]">
              Community Music Festival / Year 1
            </span>
          </div>
          <h1
            className="font-bold tracking-[-0.04em] leading-[0.85]"
            style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
          >
            ZAO<span className="text-[#f5a623]">stock</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-xl text-gray-300 leading-relaxed">
            A community-built outdoor music festival in Ellsworth, Maine. Independent artists. One stage. All day.
          </p>
          <div className="mt-10">
            <FactStrip facts={FACTS} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#rsvp"
              className="bg-[#f5a623] hover:bg-[#ffd700] text-black font-bold font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] px-6 py-4 transition-colors"
            >
              Get on the list
            </Link>
            <Link
              href="/apply"
              className="border border-white/30 hover:border-[#f5a623] hover:text-[#f5a623] font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] px-6 py-4 transition-colors"
            >
              Volunteer
            </Link>
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.18em] ml-2">
              Tickets required for parklet entry / Free to listen from outside
            </span>
          </div>
        </div>
      </section>

      {/* Countdown bar */}
      <section className="border-y border-white/[0.12] bg-[#0d1b2a]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.2em]">
              Countdown
            </span>
            <div className="flex-1 min-w-[260px]">
              <CountdownTimer targetDate={FESTIVAL_DATE} eventName="ZAOstock" />
            </div>
          </div>
        </div>
      </section>

      {/* Lineup marquee */}
      <section className="my-12 sm:my-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-6 flex items-baseline justify-between gap-4 flex-wrap">
          <SectionHeader eyebrow="The Lineup" title="Independent artists. One stage." />
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.2em]">
            Announced August 2026
          </span>
        </div>
        <LineupMarquee slots={LINEUP_SLOTS} speedSeconds={45} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-6">
          <p className="text-sm text-gray-400 max-w-2xl">
            Independent artists with DJs between every act. Lineup announced August 2026.
          </p>
        </div>
      </section>

      {/* About: 2-col asymmetric */}
      <section className="my-16 sm:my-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SectionHeader eyebrow="About" title="Built where every car to Acadia passes through." />
              <div className="space-y-5 text-base sm:text-lg text-gray-300 leading-relaxed">
                <p>
                  ZAOstock is The ZAO&apos;s flagship IRL music festival. A full-day outdoor showcase at the Franklin
                  Street Parklet in downtown Ellsworth, Maine. Independent artists perform with DJs between.
                </p>
                <p>
                  Part of the 9th Annual Art of Ellsworth during Maine Craft Weekend, ZAOstock brings the decentralized
                  music community together in the Crossroads of Downeast.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l border-white/[0.12]">
              <dl className="space-y-5">
                {[
                  { k: 'Location', v: 'Franklin St Parklet, Ellsworth ME' },
                  { k: 'Series', v: '9th Annual Art of Ellsworth' },
                  { k: 'Weekend', v: 'Maine Craft Weekend' },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col gap-1 pb-4 border-b border-white/[0.08]">
                    <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.18em]">
                      {row.k}
                    </dt>
                    <dd className="text-base text-white">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="my-16 sm:my-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="How We Run It" title="No margin. No extraction. Built by the community." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.12] border border-white/[0.12]">
            <StatTile value="100%" label="Goes to artists + production" accent />
            <StatTile value="0%" label="Operator margin" />
            <StatTile value="501(c)(3)" label="Tax-deductible via New Media Commons" />
          </div>
        </div>
      </section>


      {/* Team */}
      <section id="team" className="my-16 sm:my-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="The Team" title="Built by these people." />
          <TeamMosaic members={typedMembers} />
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-600 tracking-[0.18em] mt-5">
            Tap any name for full bio + links
          </p>
        </div>
      </section>

      {/* Partners */}
      <section className="my-16 sm:my-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="Partners" title="Building this together." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.12] border border-white/[0.12]">
            {PARTNERS.map((p) => (
              <div key={p.name} className="bg-[#0d1b2a] p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#f5a623]">
                    Confirmed
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-gray-600">
                    /CFM
                  </span>
                </div>
                <p className="font-bold text-white text-lg tracking-tight">{p.name}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer + RSVP combined */}
      <section id="rsvp" className="my-16 sm:my-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="Join In" title="Build the festival or get on the list." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.12] border border-white/[0.12]">
            <div className="bg-[#0d1b2a] p-8 sm:p-10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-bold text-2xl sm:text-3xl tracking-tight">Volunteer</h3>
                {counts.volunteers > 0 && (
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-[#f5a623] text-3xl sm:text-4xl leading-none tabular-nums">
                      {counts.volunteers}
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.18em] mt-2">
                      Signed up
                    </p>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Setup, check-in, stage crew, content, teardown - or anything in between. Volunteers get crew shirts,
                meals on-site, and front-of-house access.
              </p>
              <Link
                href="/apply"
                className="inline-block mt-6 border border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-black font-bold font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] px-6 py-4 transition-colors"
              >
                Sign up to volunteer
              </Link>
            </div>
            <div className="bg-[#0d1b2a] p-8 sm:p-10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-bold text-2xl sm:text-3xl tracking-tight">Get on the list</h3>
                {counts.rsvps > 0 && (
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-[#f5a623] text-3xl sm:text-4xl leading-none tabular-nums">
                      {counts.rsvps}
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.18em] mt-2">
                      On the list
                    </p>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Limited capacity. First to know when tickets drop and the lineup is announced.
              </p>
              <RSVPForm eventSlug="zao-stock-2026" />
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section className="my-16 sm:my-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="Partner With Us" title="Three paths. No tiers." />
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-3xl mb-8">
            No Gold / Silver / Bronze. Partners get named credit for the role they play. Custom packages available for
            local Ellsworth businesses, digital creator brands, and ecosystem partners. Tax-deductible donations supporting
            ZAOstock route through New Media Commons, our 501(c)(3) fiscal sponsor.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.12] border border-white/[0.12]">
            {SPONSOR_OFFERINGS.map((g) => (
              <TierPanel key={g.category} category={g.category} number={g.number} items={g.items} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-white/[0.12] bg-[#0d1b2a] p-5">
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase text-gray-400 tracking-[0.18em]">
              Full deck on request / start the conversation
            </span>
            <Link
              href="/sponsor"
              className="bg-[#f5a623] hover:bg-[#ffd700] text-black font-bold font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] px-6 py-3 transition-colors"
            >
              Become a partner
            </Link>
          </div>
        </div>
      </section>

      {/* Past + upcoming */}
      <section className="my-16 sm:my-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="Lineage" title="What came before. What's next." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAST_EVENTS.map((e) => (
              <PastEventCard
                key={e.name}
                year={e.year}
                name={e.name}
                description={e.description}
                hue={e.hue}
                status="past"
              />
            ))}
            <PastEventCard
              year="July 2026"
              name="ZAOville"
              description="ZAO Festivals helps host with DCoop in the DMV. The runway leading into ZAOstock."
              hue="emerald"
              status="upcoming"
            />
            <PastEventCard
              year="Oct 2026"
              name="ZAOstock"
              description="First standalone ZAO Festivals weekend. Independent artists, one stage, all day in Ellsworth Maine."
              hue="amber"
              status="upcoming"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.12] mt-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-500 tracking-[0.2em]">
            ZAOstock / Oct 03 2026 / Ellsworth ME
          </span>
          <div className="flex items-center gap-5">
            <Link href="/onepagers/overview" className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-400 hover:text-[#f5a623] tracking-[0.18em] transition-colors">
              Overview deck
            </Link>
            <Link href="/team" className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-gray-400 hover:text-[#f5a623] tracking-[0.18em] transition-colors">
              Team login
            </Link>
            <Link href="/" className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-[#f5a623] hover:text-[#ffd700] tracking-[0.18em] transition-colors">
              Live page
            </Link>
          </div>
        </div>
      </footer>

      <StickyActionBar />
    </div>
  );
}
