const sampleReportUrl = "/examples/shopify-inventory-forecasting";
const appUrl = "/preview";
const appCtaLabel = "Open instant preview";

const signalTypes = [
  ["Pain", "Broken workflows, wasted time, repeated frustration, and expensive mistakes."],
  ["Buying intent", "People asking for paid tools, recommendations, consultants, or replacement products."],
  ["Workarounds", "Spreadsheets, scripts, Zapier chains, and duct-tape processes doing real business work."],
  ["Switching", "Users comparing competitors, complaining about pricing, or looking for a way out."],
  ["Repeated requests", "The same feature or pain showing up across communities, threads, and time windows."],
  ["Urgency", "Language that points to budget, risk, deadlines, revenue loss, or operational pressure."],
];

const validationSteps = [
  ["scanned", "Raw public threads collected from the target communities."],
  ["qualified", "Rule-ranked candidates filtered for pain, help-seeking, and buying language."],
  ["reviewed", "Human review marks useful / not useful before anyone trusts the output."],
  ["contacted", "The best signals become interview prompts, outreach angles, or kill criteria."],
  ["converted", "Only revenue, replies, booked calls, or saved time count as proof."],
];

const accessOffers = [
  {
    name: "Niche research report",
    price: "$49 / scan",
    body: "One market brief, one manually reviewed Reddit demand report, delivered as source-linked Markdown.",
    cta: "Request a scan",
  },
  {
    name: "Weekly lead radar",
    price: "$199 / month",
    body: "A weekly scan for one automation or SaaS niche, with reviewed signals, next actions, and review-status tracking.",
    cta: "Join research preview",
  },
];

const faqs = [
  {
    q: "Is Lead Radar a finished self-serve SaaS?",
    a: "No. It is currently a closed research preview: a Python scanner, review workflow, and manual-quality layer wrapped by a public landing page. That is deliberate — the next validation target is paid usefulness, not more dashboard chrome.",
  },
  {
    q: "What does Lead Radar analyze?",
    a: "Public Reddit posts and comments related to your market brief. It looks for pain, workaround behavior, buying intent, repeated requests, and source-linked evidence.",
  },
  {
    q: "Are the sample reports real scans?",
    a: "No. They are simulated examples that show the report format. Real customer reports must include source links and review status before being treated as evidence.",
  },
  {
    q: "Is this a replacement for customer interviews?",
    a: "No. It is the step before interviews: use it to kill weak ideas early and bring sharper language into the conversations that remain.",
  },
  {
    q: "Does it use private Reddit data?",
    a: "No. Lead Radar is designed around publicly accessible conversations only. No private messages, no private subreddits, no creepy enrichment.",
  },
  {
    q: "What do I get back?",
    a: "A Markdown research report with market summary, pain clusters, ranked evidence, representative snippets, source links, suggested next actions, and review-status notes.",
  },
];

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "logoMark small" : "logoMark"} viewBox="0 0 256 256" role="img" aria-label="Lead Radar logo">
      <title>Lead Radar logo</title>
      <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 188V68A120 120 0 0 1 180 188" />
        <path d="M60 148A40 40 0 0 1 100 188" opacity="0.9" />
        <path d="M60 108A80 80 0 0 1 140 188" opacity="0.74" />
        <path d="M60 96H208" />
        <path d="M150 126H184" opacity="0.72" />
        <path d="M184 88V164" opacity="0.72" />
      </g>
      <circle cx="60" cy="188" r="13" fill="currentColor" />
      <circle className="logoAccent" cx="148" cy="96" r="15" />
      <circle cx="108" cy="148" r="6" fill="currentColor" opacity="0.74" />
    </svg>
  );
}

export default function Home() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Lead Radar",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "OfferCatalog",
      name: "Lead Radar research preview",
      itemListElement: accessOffers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        price: offer.price.match(/\$(\d+)/)?.[1] ?? "0",
        priceCurrency: "USD",
        availability: "https://schema.org/LimitedAvailability",
      })),
    },
    description: "A Reddit demand research workflow for source-linked, manually reviewed market signals.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="siteHeader">
        <nav className="container headerInner" aria-label="Primary">
          <a className="brand" href="#top" aria-label="Lead Radar home">
            <LogoMark small />
            <span>Lead Radar</span>
          </a>
          <div className="navLinks">
            <a href="#method">Method</a>
            <a href="#validation">Validation</a>
            <a href="#access">Access</a>
            <a href="/examples">Examples</a>
            <a href="#faq">FAQ</a>
          </div>
          <a className="button buttonSmall" href={appUrl}>
            Preview app
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container heroGrid">
            <div className="heroCopy">
              <p className="eyebrow">Closed research preview · Reddit demand evidence</p>
              <h1>Weekly demand signals for builders who need proof, not vibes.</h1>
              <p className="subhead">
                Lead Radar turns a market brief into source-linked Reddit evidence, then forces the part most tools skip: human review, usefulness status, and a next action you can actually test.
              </p>
              <div className="ctaRow">
                <a className="button buttonPrimary" href={appUrl}>
                  {appCtaLabel}
                </a>
                <a className="button buttonSecondary" href="#access">See access options</a>
              </div>
              <p className="note">Current stage: validated workflow prototype. Not pretending to be a fully self-serve SaaS yet.</p>
            </div>

            <aside className="heroArtwork" aria-label="Lead Radar signal map illustration">
              <img src="/brand-signal-map-hero.png" alt="Lead Radar transforms scattered market signals into a structured evidence report" />
            </aside>
          </div>
        </section>

        <section className="thesis">
          <div className="container thesisGrid">
            <p className="kicker">The useful question is not “can we build it?”</p>
            <h2>It is whether strangers are already describing the pain clearly enough to justify your next week — or your next invoice.</h2>
          </div>
        </section>

        <section id="method" className="section methodSection">
          <div className="container methodGrid">
            <div className="sectionIntro stickyIntro">
              <p className="eyebrow">Method</p>
              <h2>A market brief goes in. A reviewed evidence artifact comes out.</h2>
              <p>Lead Radar is intentionally narrow: fewer vanity metrics, more inspectable claims. The point is not another dashboard. The point is a decision memo you can use for interviews, outreach, positioning, or killing a weak idea.</p>
            </div>
            <div className="methodSteps">
              <article>
                <span>01</span>
                <h3>Translate the brief</h3>
                <p>Extract likely communities, keywords, intent phrases, competitor names, and exclusion filters from natural language.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Scan public conversations</h3>
                <p>Collect recent Reddit posts, deduplicate them, and keep the raw source link attached to every candidate.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Rank for commercial behavior</h3>
                <p>Score pain, workaround cost, urgency, buying language, and repeated requests — not keyword volume alone.</p>
              </article>
              <article>
                <span>04</span>
                <h3>Review before trusting</h3>
                <p>Mark signals as useful, not useful, contacted, replied, or converted. Without that feedback loop, it is just a pretty report.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="signals" className="section signalSection">
          <div className="container">
            <div className="sectionIntro narrow">
              <p className="eyebrow">Signal taxonomy</p>
              <h2>Not every complaint is demand. The report separates noise from commercial signal.</h2>
            </div>
            <div className="signalGrid">
              {signalTypes.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="validation" className="section validationSection">
          <div className="container validationGrid">
            <div className="sectionIntro">
              <p className="eyebrow">Validation loop</p>
              <h2>The scanner is not the product. The useful loop is.</h2>
              <p>Lead Radar only becomes valuable when raw posts turn into reviewed signals, conversations, and revenue evidence. The current preview is built around measuring that loop, not hiding it.</p>
            </div>
            <div className="loopCard">
              {validationSteps.map(([status, body]) => (
                <article key={status}>
                  <strong>{status}</strong>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="report" className="section reportSection">
          <div className="container reportPreviewGrid">
            <div className="sectionIntro">
              <p className="eyebrow">Output</p>
              <h2>A decision artifact, not a dashboard to babysit.</h2>
              <p>The point is to leave with a readable research memo: what hurts, who said it, how strong the signal is, what still needs manual review, and what to do next.</p>
              <a className="textLink" href={sampleReportUrl}>Read a simulated report format →</a>
            </div>
            <div className="paperReport">
              <div className="paperMeta">validation_report.md · simulated format</div>
              <pre>{`# Weekly Demand Scan: Shopify inventory forecasting

## Market summary
Scanned public Reddit-style conversations across Shopify and ecommerce communities. The strongest demand signal is not “inventory management” broadly — it is cash-flow stress caused by manual reorder planning.

## Ranked evidence
1. [Buying intent: High] [Review: pending]
   “I’d pay for something that tells me when to reorder based on velocity.”

2. [Pain: High] [Review: pending]
   Spreadsheet forecasting breaks whenever lead times change during Q4.

## Next action
Interview merchants doing $500k–$3M/year who still plan replenishment in Sheets.

## Limitation
This sample illustrates report shape. Real reports must include source links and review status.`}</pre>
            </div>
          </div>
        </section>

        <section id="access" className="section accessSection">
          <div className="container accessGrid">
            <div className="sectionIntro">
              <p className="eyebrow">Access / pricing</p>
              <h2>Closed preview, priced like research before it is priced like SaaS.</h2>
              <p>Charging early is the anti-toy filter. If a scan cannot save time, sharpen positioning, or create a real conversation, it should be killed before we build more software around it.</p>
              <p className="accessNote">Prices are provisional while the review loop is being validated. Early users should expect manual review, direct feedback, and fewer self-serve bells and whistles.</p>
            </div>
            <div className="offerGrid">
              {accessOffers.map((offer) => (
                <article key={offer.name} className="offerCard">
                  <p className="eyebrow">Research preview</p>
                  <h3>{offer.name}</h3>
                  <p>{offer.body}</p>
                  <strong>{offer.price}</strong>
                  <a className="button buttonSecondary" href={appUrl}>{offer.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section comparisonSection">
          <div className="container comparisonGrid">
            <article>
              <p className="eyebrow">Manual Reddit search</p>
              <h3>Tabs, anecdotes, and context loss.</h3>
              <p>You can find useful threads manually. The problem is keeping evidence ranked, deduplicated, and exportable.</p>
            </article>
            <article>
              <p className="eyebrow">Generic SaaS dashboard</p>
              <h3>Looks serious. Often avoids the hard question.</h3>
              <p>Charts are cheap. Reviewed, source-linked evidence that changes a decision is the scarcer thing.</p>
            </article>
            <article className="selected">
              <p className="eyebrow">Lead Radar preview</p>
              <h3>Brief → evidence → review status → next action.</h3>
              <p>Useful only if it helps someone save research time, contact better leads, or kill a weak market faster.</p>
            </article>
          </div>
        </section>

        <section id="faq" className="section faqSection">
          <div className="container faqGrid">
            <div className="sectionIntro">
              <p className="eyebrow">FAQ</p>
              <h2>Quiet by design. Skeptical by default.</h2>
            </div>
            <div className="faqList">
              {faqs.map((faq) => (
                <article key={faq.q}>
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="finalCta">
          <div className="container finalCtaInner">
            <LogoMark />
            <h2>Stop asking the idea to flatter you.</h2>
            <p>Run a small scan, review the evidence, and measure whether anything moves: replies, calls, saved research time, or revenue.</p>
            <div className="ctaRow centerRow">
              <a className="button buttonPrimary" href={appUrl}>{appCtaLabel}</a>
              <a className="button buttonSecondary" href="/examples">Browse simulated examples</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <a className="brand" href="#top" aria-label="Lead Radar home"><LogoMark small /><span>Lead Radar</span></a>
          <p>Evidence over vibes. Review over theater.</p>
        </div>
      </footer>
    </>
  );
}
