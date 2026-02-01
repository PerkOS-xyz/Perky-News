import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Initialize Admin SDK
const serviceAccount = JSON.parse(
  readFileSync('/root/.config/firebase/perky-news-sa.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'perky-news.firebasestorage.app'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Topics
const topics = [
  { id: 'x402', name: 'x402 Protocol', description: 'HTTP-native payment protocol for the web', color: '#9333ea' },
  { id: 'erc-8004', name: 'ERC-8004', description: 'Trustless agent identity and reputation on Ethereum', color: '#3b82f6' },
  { id: 'ai-agents', name: 'AI Agents', description: 'Autonomous AI systems and agent infrastructure', color: '#22c55e' },
  { id: 'openclaw', name: 'OpenClaw', description: 'Open-source AI agent framework', color: '#f97316' },
  { id: 'eliza', name: 'ElizaOS', description: 'Crypto-native AI agent framework', color: '#ec4899' },
  { id: 'defi', name: 'DeFi', description: 'Decentralized finance protocols', color: '#eab308' },
  { id: 'general', name: 'General', description: 'General news and updates', color: '#6b7280' },
];

// Settings
const settings = {
  autoPublish: true,
  requireReview: false,
  adminWallets: ['0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f'],
};

async function seed() {
  console.log('🌱 Seeding Firebase with Admin SDK...');

  // Seed topics
  console.log('📁 Creating topics...');
  for (const topic of topics) {
    await db.collection('topics').doc(topic.id).set({
      name: topic.name,
      description: topic.description,
      color: topic.color,
    });
    console.log('  ✅', topic.id);
  }

  // Seed settings
  console.log('⚙️ Creating settings...');
  await db.collection('settings').doc('config').set(settings);
  console.log('  ✅ config');

  console.log('\n🎉 Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
