import { Metadata } from 'next';
import Link from 'next/link';
import { NewsletterForm } from '@/components/newsletter-form';
import { PremiumSubscribe } from '@/components/premium-subscribe';
import { ConfirmationBanner } from '@/components/confirmation-banner';

export const metadata: Metadata = {
  title: 'Subscribe | Perky News — The Agent Economy Chronicle',
  description: 'Subscribe to Perky News for weekly insights on x402, ERC-8004, AI agents, and the Web3 AI ecosystem.',
};

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ confirmed?: string; error?: string }>;
}) {
  const params = await searchParams;
  const isConfirmed = params.confirmed === 'true';
  const error = params.error;

  const topics = [
    { emoji: '💰', label: 'x402 Protocol' },
    { emoji: '🔐', label: 'ERC-8004' },
    { emoji: '🤖', label: 'AI Agents' },
    { emoji: '🦊', label: 'OpenClaw' },
    { emoji: '💜', label: 'ElizaOS' },
    { emoji: '📈', label: 'DeFi + AI' },
    { emoji: '🔗', label: 'A2A Protocol' },
    { emoji: '🛠️', label: 'MCP' },
  ];

  const faqs = [
    {
      q: 'How often will I receive emails?',
      a: 'We send one carefully curated weekly digest every Friday with the best insights from the week.',
    },
    {
      q: 'Can I unsubscribe?',
      a: 'Absolutely. Every email includes a one-click unsubscribe link. No questions asked, no hard feelings.',
    },
    {
      q: 'What payment methods does Premium accept?',
      a: 'Premium subscriptions are powered by x402, enabling seamless crypto payments via stablecoins and other digital currencies.',
    },
    {
      q: 'What do I get with Premium?',
      a: 'Exclusive technical deep-dives, early access to breaking coverage, an ad-free experience, and access to our Discord community.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden hero-bg">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#EB1B69]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#FD8F50]/10 blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-[#76437B]/10 blur-[80px]" />

        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Confirmation/Error Banner */}
          <ConfirmationBanner isConfirmed={isConfirmed} error={error} />

          <div className="text-center">
            {/* Perky Mascot */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-300 border-2 border-[#EB1B69]/30">
                  <img 
                    src="/perky-mascot.jpg" 
                    alt="Perky - the PerkOS mascot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#EB1B69] to-[#FD8F50] opacity-20 blur-xl -z-10" />
              </div>
            </div>

            <span 
              className="text-xs font-semibold text-[#EB1B69] tracking-widest uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Join the Community
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              <span className="gradient-text">Subscribe</span>
            </h1>
            <p className="text-xl text-[#a3a3a3] max-w-2xl mx-auto leading-relaxed">
              Stay ahead of the agent economy. Get weekly analysis on x402, ERC-8004, 
              AI agents, and the infrastructure shaping Web3&apos;s future.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2d2548] to-[#2d2548] rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative h-full p-8 rounded-3xl bg-[#0E0716] border border-[#2d2548]">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#1B1833] border border-[#2d2548] flex items-center justify-center text-3xl mx-auto mb-4">
                    📧
                  </div>
                  <h2 
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
                  >
                    Free Newsletter
                  </h2>
                  <p className="text-[#a3a3a3] text-sm mb-6">
                    Weekly digest of the best Web3 AI news
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span 
                      className="text-5xl font-bold"
                      style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
                    >
                      $0
                    </span>
                    <span className="text-[#a3a3a3]">/forever</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  <FeatureItem included>Weekly email digest</FeatureItem>
                  <FeatureItem included>Access to all public articles</FeatureItem>
                  <FeatureItem included>Category filtering</FeatureItem>
                  <FeatureItem>Exclusive deep-dives</FeatureItem>
                  <FeatureItem>Early access</FeatureItem>
                  <FeatureItem>Discord community</FeatureItem>
                </ul>

                <div className="max-w-sm mx-auto">
                  <NewsletterForm variant="full" />
                </div>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="relative">
              {/* Highlight Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span 
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#EB1B69] to-[#FD8F50] text-white text-xs font-bold uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
                >
                  Recommended
                </span>
              </div>
              <PremiumSubscribe variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 px-6 border-t border-[#2d2548]/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span 
              className="text-xs font-semibold text-[#FD8F50] tracking-widest uppercase mb-2 block"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              What We Cover
            </span>
            <h2 
              className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Topics & Technologies
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic) => (
              <span
                key={topic.label}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B1833]/50 border border-[#2d2548] text-sm font-medium"
              >
                <span className="text-lg">{topic.emoji}</span>
                {topic.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <TrustSignal
              icon="🔒"
              title="Privacy First"
              description="We never sell your data. Your email stays with us."
            />
            <TrustSignal
              icon="⚡"
              title="Instant Unsubscribe"
              description="One-click unsubscribe in every email. No tricks."
            />
            <TrustSignal
              icon="🔗"
              title="x402 Powered"
              description="Premium uses seamless crypto payments. No friction."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 border-t border-[#2d2548]/50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span 
              className="text-xs font-semibold text-[#EB1B69] tracking-widest uppercase mb-2 block"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Got Questions?
            </span>
            <h2 
              className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div 
                key={faq.q}
                className="p-6 rounded-2xl bg-[#1B1833]/30 border border-[#2d2548]"
              >
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
                >
                  {faq.q}
                </h3>
                <p className="text-[#a3a3a3]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            Ready to dive in?
          </h2>
          <p className="text-[#a3a3a3] mb-8">
            Start with the free newsletter — upgrade to Premium whenever you&apos;re ready.
          </p>
          <Link 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-[#EB1B69] font-semibold hover:text-[#FD8F50] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to top
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ children, included = false }: { children: React.ReactNode; included?: boolean }) {
  return (
    <li className={`flex items-center gap-3 ${included ? '' : 'text-[#666]'}`}>
      {included ? (
        <span className="w-5 h-5 rounded-full bg-[#EB1B69]/20 flex items-center justify-center text-[#EB1B69] text-xs">
          ✓
        </span>
      ) : (
        <span className="w-5 h-5 rounded-full bg-[#2d2548] flex items-center justify-center text-[#666] text-xs">
          ✗
        </span>
      )}
      <span className="text-sm">{children}</span>
    </li>
  );
}

function TrustSignal({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div>
      <div className="w-14 h-14 rounded-2xl bg-[#1B1833] border border-[#2d2548] flex items-center justify-center text-2xl mx-auto mb-4">
        {icon}
      </div>
      <h3 
        className="font-semibold mb-2"
        style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-sm text-[#a3a3a3]">{description}</p>
    </div>
  );
}
