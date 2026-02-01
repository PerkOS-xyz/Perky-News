import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    readFileSync('/root/.config/firebase/perky-news-sa.json', 'utf8')
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'perky-news.firebasestorage.app'
  });
}

const db = admin.firestore();

// Fixed article content
const fixedArticle = {
  title: "x402 V2: Major Upgrade Brings Multi-Chain Payments",
  excerpt: "The x402 protocol reaches a significant milestone with V2, introducing wallet identity, API discovery, and multi-chain support after processing over 100M payments.",
  content: `# x402 V2: Major Upgrade Brings Multi-Chain Payments

The x402 protocol has reached a significant milestone with its V2 upgrade, introducing wallet identity, API discovery, and multi-chain support. After six months of real-world usage since launching in May 2025, the protocol has processed over **100 million payments** across APIs, apps, and AI agents.

## What is x402?

x402 is an open standard for HTTP-native payments that enables AI agents, APIs, and applications to transact value seamlessly. Using the HTTP 402 status code (Payment Required), it creates a universal payment layer for the web.

## Key V2 Features

### Wallet-Based Identity
Agents can now establish verifiable identity through their wallets, enabling trust relationships between services. This means clients can skip repaying on every call if the resource was previously purchased.

### Automatic API Discovery
New discovery mechanisms allow agents to find and connect with x402-enabled services automatically. Facilitators can now crawl and index available endpoints without manual updates.

### Multi-Chain Support
V2 expands beyond Base to support multiple networks including Polygon, Solana, and more. The protocol now uses CAIP standards for cross-chain compatibility.

### Dynamic Payment Routing
The new 'payTo' routing enables per-request routing to addresses, roles, or callback-based payout logic—perfect for marketplaces and multi-tenant APIs.

## Protocol Growth

According to the official x402.org announcement:

- **100M+ payments** processed since May 2025 launch
- **Multi-chain support** for Base, Solana, and other L2s
- **Backward compatible** with V1 implementations
- **Plugin-driven SDK** for easy chain/asset additions

## Developer Experience

The x402 protocol offers SDKs for TypeScript, Python, and Go. Check out the [official documentation](https://docs.cdp.coinbase.com/x402/welcome) to get started.

Key SDK improvements in V2:
- Modular paywall package (@x402/paywall)
- Lifecycle hooks for custom payment logic
- Multi-facilitator support out of the box
- Cleaner HTTP headers (PAYMENT-REQUIRED, PAYMENT-RESPONSE)

## x402 Foundation

The newly announced x402 Foundation, a partnership between Coinbase and Cloudflare, will drive standardization and adoption of HTTP-native payments. This independent foundation ensures the protocol remains open and community-driven.

---

**Read More:**
- [x402 V2 Launch Announcement](https://www.x402.org/writing/x402-v2-launch)
- [Coinbase Developer Documentation](https://docs.cdp.coinbase.com/x402/welcome)
- [GitHub Repository](https://github.com/coinbase/x402)`,
  sources: [
    { name: "x402.org", url: "https://www.x402.org/writing/x402-v2-launch" },
    { name: "Coinbase Docs", url: "https://docs.cdp.coinbase.com/x402/welcome" },
    { name: "The Block", url: "https://www.theblock.co/post/382284/coinbase-incubated-x402-payments-protocol-built-for-ais-rolls-out-v2" },
    { name: "Cryptonomist", url: "https://en.cryptonomist.ch/2025/12/12/x402-payments-multi-chain-v2/" }
  ],
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
};

// Hackathons topic
const hackathonsTopic = {
  name: 'Hackathons',
  description: 'Web3 hackathons, competitions and builder events',
  color: '#06b6d4',
};

async function fix() {
  console.log('🔧 Fixing x402-v2 article and adding hackathons topic (Admin SDK)...\n');

  try {
    // 1. Add hackathons topic
    console.log('📁 Adding hackathons topic...');
    await db.collection('topics').doc('hackathons').set(hackathonsTopic);
    console.log('   ✅ hackathons topic added');

    // 2. Update the article
    console.log('📝 Updating x402-v2 article...');
    await db.collection('articles').doc('x402-v2-major-upgrade-multi-chain-payments').update(fixedArticle);
    console.log('   ✅ Article updated with verified content');

    console.log('\n🎉 Done! Changes applied to Firebase.');
    console.log('   View: https://perky.news/articles/x402-v2-major-upgrade-multi-chain-payments');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fix();
