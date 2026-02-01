import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#2d2548]/50 bg-[#0a050f]">
      {/* Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#EB1B69]/50 to-transparent" />
      
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform shadow-lg">
                <img 
                  src="/perkos-logo.jpg" 
                  alt="PerkOS" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-xl font-bold tracking-tight gradient-text"
                  style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
                >
                  PERKY NEWS
                </span>
                <span className="text-xs text-[#a3a3a3] tracking-widest uppercase">
                  Agent Economy Chronicle
                </span>
              </div>
            </Link>
            <p className="text-[#a3a3a3] text-sm leading-relaxed max-w-sm mb-6">
              Your definitive source for x402, ERC-8004, AI agents, and the infrastructure 
              powering the next chapter of Web3. Analysis for builders, by builders.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <SocialLink href="https://twitter.com/zkNexus" label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://github.com/PerkOS-xyz" label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://discord.gg/perkos" label="Discord">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 
              className="text-xs font-semibold text-[#EB1B69] tracking-widest uppercase mb-4"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Navigate
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/articles">Articles</FooterLink>
              <FooterLink href="/subscribe">Subscribe</FooterLink>
              <FooterLink href="/about">About</FooterLink>
            </ul>
          </div>

          {/* Topics */}
          <div className="md:col-span-2">
            <h3 
              className="text-xs font-semibold text-[#EB1B69] tracking-widest uppercase mb-4"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Topics
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/articles?category=x402">x402 Protocol</FooterLink>
              <FooterLink href="/articles?category=erc-8004">ERC-8004</FooterLink>
              <FooterLink href="/articles?category=ai-agents">AI Agents</FooterLink>
              <FooterLink href="/articles?category=eliza">ElizaOS</FooterLink>
            </ul>
          </div>

          {/* Newsletter Teaser */}
          <div className="md:col-span-3">
            <h3 
              className="text-xs font-semibold text-[#EB1B69] tracking-widest uppercase mb-4"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Stay Updated
            </h3>
            <p className="text-[#a3a3a3] text-sm mb-4">
              Get weekly insights on the agent economy. No spam, ever.
            </p>
            <Link 
              href="/subscribe"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#FD8F50] hover:text-[#EB1B69] transition-colors group"
            >
              <span>Join the newsletter</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#2d2548]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#666]">
              © {currentYear} Perky News. Part of the{' '}
              <Link href="https://perkos.xyz" className="text-[#a3a3a3] hover:text-[#EB1B69] transition-colors">
                PerkOS
              </Link>
              {' '}ecosystem.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#666]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B1833] border border-[#2d2548]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB1B69] animate-pulse" />
                Powered by x402
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-sm text-[#a3a3a3] hover:text-white transition-colors inline-flex items-center gap-1 group"
      >
        <span>{children}</span>
      </Link>
    </li>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-[#1B1833] border border-[#2d2548] flex items-center justify-center text-[#a3a3a3] hover:text-[#EB1B69] hover:border-[#EB1B69]/50 transition-all"
    >
      {children}
    </a>
  );
}
