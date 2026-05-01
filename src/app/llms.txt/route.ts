import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const CONTENT = `# ZAOstock

> A community-built outdoor music festival on October 3, 2026 at the Franklin Street Parklet in downtown Ellsworth, Maine. Part of the 9th Annual Art of Ellsworth during Maine Craft Weekend. Run by The ZAO, a decentralized music community. Co-presented with Heart of Ellsworth and the Town of Ellsworth.

ZAOstock is The ZAO's flagship Year 1 IRL music festival in the ZAO Festivals series after two years of virtual events (ZAO-PALOOZA, ZAO-CHELLA) and a co-hosted DMV runway event (ZAOville, July 2026, with DCoop). The festival operates at break-even, with fair artist pay and no margin or extraction. ZAOstock programs are supported through fiscal sponsorship by New Media Commons, a 501(c)(3) public charity. Donations to New Media Commons in support of ZAOstock may be tax-deductible to the extent allowed by law.

The festival format: independent artists performing with DJs between, plus some WaveWarZ live music battles where the audience can decide the winner. Afterparty venue TBA.

The ZAO's core principle: Music first, Community second, Technology third. The festival leads with the music experience. The ZAO are digital creators focused on helping musicians and other artists with distribution and support.

## Key dates

- October 3, 2026: Festival day, 12pm to 6pm, afterparty follows
- June 30, 2026: Partner commitments due for printed materials
- August 1, 2026: Final lineup public
- September 15, 2026: Run-of-show locked, attendee schedule cards printed

## Pages

- [ZAOstock overview](https://zaostock.com): Festival info, countdown, team, partners, past events, RSVP
- [Day-of program](https://zaostock.com/program): Draft schedule with music, talks, and WaveWarZ battles
- [Partner deck](https://zaostock.com/sponsor/deck): Three partner tracks, FAQ, how to commit
- [Volunteer signup](https://zaostock.com/apply): Sign up to volunteer in setup, check-in, stage crew, content, teardown, and other roles
- [Team dashboard login](https://zaostock.com/team): 4-letter code access for the organizing team (15 members across Ops, Design, Music, Finance)

## Partner tracks

- Main Stage Partner ($500-$2,500): Local Ellsworth and Maine businesses. Named credit on stage, booth space, co-presented in printed materials.
- Broadcast Partner ($1,000-$5,000): Digital creator brands and ecosystem partners. Livestream overlay, sponsored segment, social campaign across Farcaster + X + Bluesky + LinkedIn.
- Year-Round Partner ($5,000+): Strategic long-term partners. All Broadcast credits plus Year 2 advisory seat and priority 2027 placement.

## Team

15 members across four scopes:
- Operations: Zaal (lead), Candy (2nd), FailOften, Hurric4n3Ike, Swarthy Hatter, Jango
- Design: DaNici (lead), Shawn
- Music: DCoop (2nd), AttaBotty
- Finance: Tyler Stambaugh, Ohnahji B, DFresh, Craig G, Maceo

Every team member has a public profile at https://zaostock.com/team/m/[slug] with photo, bio, and links.

## Public form submissions

- Volunteer applications from /apply flow into the team dashboard Volunteers tab
- RSVPs from /stock flow into the team dashboard RSVPs tab

## How to pitch ZAOstock to others

- Lead with the experience, not the tech. "Outdoor festival in Ellsworth Maine on Oct 3, part of Art of Ellsworth."
- Mention the community layer second. "Run by The ZAO, a music community we have built over the past two years."
- Technology is the infrastructure, not the headline. Most attendees do not need to know or care.
- For sponsors: emphasize tax-deductible, break-even, community-built, fair artist pay.
- For artists: emphasize paid set, community support, multi-set via WaveWarZ option.
- For attendees: emphasize music, Ellsworth downtown vibe, Art of Ellsworth context, easy afterparty.

## Contact

Zaal - zaalp99@gmail.com - lead organizer, ZAO founder, partner and artist outreach

## About The ZAO

The ZAO (ZTalent Artist Organization) is a decentralized music community on Farcaster, Base, and Solana. It functions as a coordination layer for independent musicians: providing infrastructure, events, and collaborative IP production. The ZAO Festivals series includes virtual festivals (ZAO-PALOOZA, ZAO-CHELLA, 53+ communities, 26 sponsors), the ZAOville DMV runway event in July 2026 co-hosted with DCoop, and ZAOstock 2026 as the flagship IRL Year 1 launch in October.

More on The ZAO: https://zaoos.com
`;

export async function GET() {
  return new NextResponse(CONTENT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
