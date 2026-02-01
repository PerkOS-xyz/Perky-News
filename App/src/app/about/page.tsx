import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About | Perky News',
  description: 'Learn about Perky News, your source for Web3 AI ecosystem news covering x402, ERC-8004, AI agents, and more.',
};

export default function AboutPage() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🐧</div>
          <h1 className="text-4xl font-bold mb-4">About Perky News</h1>
          <p className="text-lg text-zinc-400">
            Your source for Web3 AI ecosystem news
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-zinc-400 mb-4">
            The AI agent economy is emerging rapidly, but keeping up with the pace of innovation is challenging. 
            New protocols, standards, and frameworks launch every week. Perky News exists to cut through the noise 
            and bring you the most important developments in Web3 AI infrastructure.
          </p>
          <p className="text-zinc-400">
            We focus on the protocols and standards that will power the next generation of autonomous agents: 
            x402 for payments, ERC-8004 for identity and trust, A2A for agent communication, MCP for tool access, 
            and the frameworks like ElizaOS and OpenClaw that bring it all together.
          </p>
        </section>

        {/* What We Cover */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">What We Cover</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-800/50 rounded-xl">
              <span className="text-2xl block mb-3">💰</span>
              <h3 className="font-semibold mb-2">x402 Protocol</h3>
              <p className="text-sm text-zinc-400">
                HTTP-native payments enabling micropayments and agent-to-service transactions.
              </p>
            </div>
            <div className="p-6 bg-zinc-800/50 rounded-xl">
              <span className="text-2xl block mb-3">🔐</span>
              <h3 className="font-semibold mb-2">ERC-8004</h3>
              <p className="text-sm text-zinc-400">
                On-chain identity and trust for AI agents, enabling autonomous operation.
              </p>
            </div>
            <div className="p-6 bg-zinc-800/50 rounded-xl">
              <span className="text-2xl block mb-3">🤖</span>
              <h3 className="font-semibold mb-2">AI Agents</h3>
              <p className="text-sm text-zinc-400">
                The latest in autonomous AI agents and their applications in Web3.
              </p>
            </div>
            <div className="p-6 bg-zinc-800/50 rounded-xl">
              <span className="text-2xl block mb-3">🛠️</span>
              <h3 className="font-semibold mb-2">Infrastructure</h3>
              <p className="text-sm text-zinc-400">
                A2A, MCP, and other protocols enabling agent interoperability.
              </p>
            </div>
          </div>
        </section>

        {/* Part of PerkOS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Part of PerkOS</h2>
          <p className="text-zinc-400 mb-4">
            Perky News is part of the <strong className="text-zinc-100">PerkOS ecosystem</strong>, a platform focused on bringing 
            AI agents to Web3. PerkOS builds tools and infrastructure for the agent economy, including 
            implementations of x402 and ERC-8004.
          </p>
          <p className="text-zinc-400">
            Our mascot Perky 🐧 guides you through the complex world of AI and crypto, making technical 
            concepts accessible and engaging.
          </p>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">The Team</h2>
          <p className="text-zinc-400 mb-6">
            Perky News is maintained by the PerkOS team, a group of developers and builders passionate 
            about AI agents and Web3 infrastructure.
          </p>
          <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl">
              👨‍💻
            </div>
            <div>
              <h3 className="font-semibold">Julio Cruz</h3>
              <p className="text-sm text-zinc-400">Founder & Lead Developer</p>
              <Link 
                href="https://twitter.com/zkNexus" 
                className="text-sm text-purple-400 hover:underline"
              >
                @zkNexus
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-zinc-400 mb-4">
            Have a story tip? Want to collaborate? Interested in advertising?
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="https://twitter.com/zkNexus">Twitter</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/PerkOS-xyz">GitHub</Link>
            </Button>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Ready to Stay Informed?</h2>
          <p className="text-zinc-400 mb-6">
            Subscribe to our weekly newsletter and never miss an important update.
          </p>
          <Button asChild size="lg">
            <Link href="/subscribe">Subscribe Now</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
