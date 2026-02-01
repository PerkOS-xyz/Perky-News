#!/usr/bin/env node
/**
 * Generate Professional Article Cover Images
 * Uses Replicate FLUX for high-quality images
 */

import Replicate from 'replicate';
import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
if (!REPLICATE_API_TOKEN) {
  console.error('❌ REPLICATE_API_TOKEN not set');
  process.exit(1);
}

const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

// Professional prompts for each article
const ARTICLE_PROMPTS = {
  'a2a-protocol-google-linux-foundation': {
    prompt: 'Futuristic abstract visualization of AI agents communicating through digital pathways, glowing neural network connections, Google and Linux Foundation style, corporate tech aesthetic, blue and white color scheme, professional illustration, 4K, clean minimal design, no text',
    title: 'A2A Protocol'
  },
  'agent-protocol-stack-a2a-mcp-x402-erc8004': {
    prompt: 'Abstract layered architecture diagram visualization, four interconnected glowing layers representing protocol stack, futuristic blockchain and AI fusion, purple and cyan gradients, clean minimal tech illustration, isometric 3D style, professional corporate aesthetic, no text',
    title: 'Agent Protocol Stack'
  },
  'erc-8004-trustless-agents-ethereum-standard': {
    prompt: 'Futuristic AI robot with Ethereum diamond logo integrated into its design, digital identity concept, holographic ID card floating, blockchain nodes in background, orange and purple gradient, professional tech illustration, clean minimal style, no text',
    title: 'ERC-8004'
  },
  'ethglobal-2026-hackathon-calendar': {
    prompt: 'Vibrant collage of 5 iconic city skylines (Brussels, Prague, Bangkok, San Francisco, Cannes) connected by glowing digital lines, hackathon energy, developers coding, Ethereum logo subtle in sky, colorful festival atmosphere, professional event poster style, no text',
    title: 'ETHGlobal 2026'
  },
  'x402-v2-multi-chain-payments-100m-transactions': {
    prompt: 'Abstract futuristic network visualization with glowing interconnected nodes, multiple blockchain chains merging into central hub, digital streams flowing, professional tech illustration, green and teal color scheme, clean minimal design, corporate fintech aesthetic, no text no numbers',
    title: 'x402 V2'
  }
};

async function generateImage(slug, promptData) {
  console.log(`\n🎨 Generating image for: ${promptData.title}`);
  console.log(`   Prompt: ${promptData.prompt.substring(0, 80)}...`);
  
  try {
    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro",
      {
        input: {
          prompt: promptData.prompt,
          aspect_ratio: "16:9",
          output_format: "webp",
          output_quality: 90,
          safety_tolerance: 5,
          prompt_upsampling: true
        }
      }
    );
    
    // Convert to string if needed
    const imageUrl = typeof output === 'string' ? output : String(output);
    console.log(`   ✓ Generated: ${imageUrl}`);
    return imageUrl;
  } catch (err) {
    console.error(`   ✗ Failed: ${err.message}`);
    return null;
  }
}

function initFirebase() {
  if (admin.apps.length) return;
  const saPath = process.env.HOME + '/.config/firebase/perky-news-sa.json';
  if (existsSync(saPath)) {
    const sa = JSON.parse(readFileSync(saPath, 'utf8'));
    admin.initializeApp({ 
      credential: admin.credential.cert(sa),
      storageBucket: 'perky-news.firebasestorage.app'
    });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const specificSlug = args[0];
  
  console.log('🖼️  Perky News - Image Generator\n');
  
  // Generate images
  const results = {};
  
  for (const [slug, promptData] of Object.entries(ARTICLE_PROMPTS)) {
    if (specificSlug && slug !== specificSlug) continue;
    
    const imageUrl = await generateImage(slug, promptData);
    if (imageUrl) {
      results[slug] = imageUrl;
    }
    
    // Rate limit
    await new Promise(r => setTimeout(r, 2000));
  }
  
  // Update Firebase with new image URLs
  if (Object.keys(results).length > 0) {
    console.log('\n📤 Updating Firebase...');
    initFirebase();
    const db = admin.firestore();
    
    for (const [slug, imageUrl] of Object.entries(results)) {
      try {
        await db.collection('articles').doc(slug).update({
          coverImage: String(imageUrl),
          imageUpdatedAt: new Date().toISOString()
        });
        console.log(`   ✓ Updated ${slug}`);
      } catch (err) {
        console.error(`   ✗ Failed to update ${slug}: ${err.message}`);
      }
    }
  }
  
  console.log('\n🎉 Done!');
  console.log('\nGenerated images:');
  for (const [slug, url] of Object.entries(results)) {
    console.log(`  ${slug}: ${url}`);
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
