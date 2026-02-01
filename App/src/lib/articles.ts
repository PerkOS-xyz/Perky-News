export type Category = 'x402' | 'erc-8004' | 'ai-agents' | 'openclaw' | 'eliza' | 'defi' | 'general';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: Category;
  tags: string[];
  author: string;
  publishedAt: string;
  featured: boolean;
}

export const categoryLabels: Record<Category, string> = {
  'x402': 'x402 Protocol',
  'erc-8004': 'ERC-8004',
  'ai-agents': 'AI Agents',
  'openclaw': 'OpenClaw',
  'eliza': 'ElizaOS',
  'defi': 'DeFi',
  'general': 'General',
};

export const categoryColors: Record<Category, string> = {
  'x402': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'erc-8004': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'ai-agents': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'openclaw': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'eliza': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'defi': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'general': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

// Sample articles for MVP - in production, these would come from MDX files or a CMS
export const articles: Article[] = [
  {
    slug: 'what-is-x402-http-payment-protocol',
    title: 'What is x402? The HTTP Payment Protocol Explained',
    excerpt: 'Discover how x402 enables native payments on the web through HTTP status codes, making micropayments seamless for AI agents and humans alike.',
    content: `
# What is x402? The HTTP Payment Protocol Explained

The web is evolving, and so are its payment mechanisms. **x402** is a revolutionary protocol that brings native payments to HTTP, enabling seamless transactions between AI agents, services, and users.

## The Problem

Traditional web payments are cumbersome:
- Credit card forms with multiple fields
- Redirects to payment processors
- High fees for micropayments
- No support for machine-to-machine payments

## The Solution: x402

x402 uses HTTP status code 402 (Payment Required) to negotiate payments directly in the protocol layer:

1. Client requests a resource
2. Server responds with 402 and payment requirements
3. Client makes payment (crypto, stablecoin, etc.)
4. Server provides the resource

## Benefits for AI Agents

- **Automated**: No human intervention needed
- **Micropayments**: Pay per API call, per token, per second
- **Trustless**: Blockchain verification
- **Universal**: Works with any HTTP service

## Getting Started

Check out the [x402 specification](https://x402.org) and start building payment-enabled APIs today.
    `,
    coverImage: '/images/x402-hero.png',
    category: 'x402',
    tags: ['payments', 'protocol', 'http', 'micropayments'],
    author: 'Perky News Team',
    publishedAt: '2026-01-30',
    featured: true,
  },
  {
    slug: 'erc-8004-trustless-agents-identity',
    title: 'ERC-8004: Identity and Trust for AI Agents',
    excerpt: 'How ERC-8004 enables AI agents to have verifiable on-chain identity, manage funds, and build reputation in a trustless manner.',
    content: `
# ERC-8004: Identity and Trust for AI Agents

As AI agents become more autonomous, they need a way to establish identity and build trust. **ERC-8004** provides exactly that.

## What is ERC-8004?

ERC-8004 is an Ethereum standard for "Trustless Agents" - AI systems that can:
- Own wallets and manage funds
- Build verifiable reputation
- Execute transactions autonomously
- Interact with DeFi protocols

## Key Features

### On-Chain Identity
Each agent gets a unique on-chain identity tied to their behavior and reputation.

### Programmable Trust
Define trust rules: spending limits, approved contracts, time-based restrictions.

### Reputation Scoring
Agents build reputation through successful interactions, visible to all.

## Use Cases

- **Trading Bots**: Autonomous trading with transparent track record
- **Service Agents**: Customer support with accountability
- **DAO Operators**: Agents that execute governance decisions

## The Future

ERC-8004 is the foundation for an agent economy where AI and humans collaborate trustlessly.
    `,
    coverImage: '/images/erc-8004-hero.png',
    category: 'erc-8004',
    tags: ['ethereum', 'identity', 'trust', 'agents'],
    author: 'Perky News Team',
    publishedAt: '2026-01-28',
    featured: true,
  },
  {
    slug: 'agent-protocol-stack-a2a-mcp-x402',
    title: 'The Agent Protocol Stack: A2A + MCP + x402',
    excerpt: 'Understanding how A2A, MCP, and x402 work together to create the infrastructure for autonomous AI agents.',
    content: `
# The Agent Protocol Stack: A2A + MCP + x402

The future of AI isn't just about models—it's about infrastructure. Here's how three protocols combine to power autonomous agents.

## The Stack

### 1. A2A (Agent-to-Agent Protocol)
- Enables direct communication between AI agents
- Standardized message formats
- Discovery and routing
- Google's contribution to agent interoperability

### 2. MCP (Model Context Protocol)
- Connects AI models to tools and data
- Standardized function calling
- Context management
- Created by Anthropic

### 3. x402 (HTTP Payment Protocol)
- Native web payments
- Micropayment support
- Agent-to-service payments
- Based on HTTP 402 status code

## How They Work Together

1. Agent A discovers Agent B via **A2A**
2. Agent B exposes capabilities via **MCP**
3. Agent A pays for services via **x402**
4. Both agents complete the transaction trustlessly

## Building on the Stack

Developers can now build agents that:
- Communicate with other agents
- Access tools and APIs
- Pay for resources automatically

This is the foundation of the agent economy.
    `,
    coverImage: '/images/protocol-stack-hero.png',
    category: 'ai-agents',
    tags: ['a2a', 'mcp', 'x402', 'protocols', 'infrastructure'],
    author: 'Perky News Team',
    publishedAt: '2026-01-25',
    featured: false,
  },
  {
    slug: 'getting-started-openclaw',
    title: 'Getting Started with OpenClaw',
    excerpt: 'A beginner\'s guide to building and deploying AI agents with the OpenClaw framework.',
    content: `
# Getting Started with OpenClaw

OpenClaw is a powerful framework for building autonomous AI agents. Here's how to get started.

## What is OpenClaw?

OpenClaw is an open-source framework that provides:
- Agent runtime and orchestration
- Tool integration (MCP compatible)
- Memory and context management
- Multi-platform deployment

## Quick Start

\`\`\`bash
# Install OpenClaw
npm install -g openclaw

# Create a new agent
openclaw init my-agent

# Configure your agent
cd my-agent
# Edit openclaw.json

# Run locally
openclaw dev
\`\`\`

## Key Concepts

### Agents
The core unit - an AI with specific capabilities and personality.

### Skills
Modular abilities: web search, code execution, file management.

### Memory
Persistent context across conversations and sessions.

### Channels
Where agents live: Telegram, Discord, API, etc.

## Deploy Your Agent

\`\`\`bash
# Deploy to a server
openclaw deploy --target vps

# Or use the cloud
openclaw deploy --target cloud
\`\`\`

Start building your first agent today!
    `,
    coverImage: '/images/openclaw-hero.png',
    category: 'openclaw',
    tags: ['tutorial', 'framework', 'getting-started'],
    author: 'Perky News Team',
    publishedAt: '2026-01-22',
    featured: false,
  },
  {
    slug: 'elizaos-crypto-native-ai-agents',
    title: 'ElizaOS: Building Crypto-Native AI Agents',
    excerpt: 'Explore ElizaOS, the open-source framework for building AI agents with native crypto and DeFi capabilities.',
    content: `
# ElizaOS: Building Crypto-Native AI Agents

ElizaOS is leading the charge in crypto-native AI agents. Here's what makes it special.

## Why ElizaOS?

ElizaOS is purpose-built for the crypto ecosystem:
- Native wallet integration
- DeFi protocol support
- On-chain actions
- Token-gated features

## Architecture

\`\`\`
┌─────────────┐
│  Character  │ ← Personality & Goals
├─────────────┤
│   Runtime   │ ← Core Agent Logic
├─────────────┤
│   Plugins   │ ← Capabilities
├─────────────┤
│  Providers  │ ← AI Models
└─────────────┘
\`\`\`

## Key Plugins

- **Wallet**: Manage crypto assets
- **DeFi**: Interact with protocols
- **NFT**: Mint, trade, display
- **Social**: Twitter, Telegram, Discord

## Building Your Agent

1. Define character (personality, knowledge)
2. Choose plugins (capabilities)
3. Configure providers (AI models)
4. Deploy and iterate

## Community

ElizaOS has a vibrant community building:
- Trading agents
- Social agents
- DAO agents
- Creative agents

Join the revolution at [elizaos.ai](https://elizaos.ai)
    `,
    coverImage: '/images/eliza-hero.png',
    category: 'eliza',
    tags: ['elizaos', 'crypto', 'defi', 'framework'],
    author: 'Perky News Team',
    publishedAt: '2026-01-20',
    featured: false,
  },
];

export function getArticles(category?: Category): Article[] {
  if (category) {
    return articles.filter(a => a.category === category);
  }
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(a => a.featured);
}

export function getAllCategories(): Category[] {
  return ['x402', 'erc-8004', 'ai-agents', 'openclaw', 'eliza', 'defi', 'general'];
}
