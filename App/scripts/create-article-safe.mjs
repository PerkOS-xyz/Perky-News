#!/usr/bin/env node
/**
 * Creates an article in Firebase with validation
 * Prevents publishing content with placeholders/incomplete data
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { validateArticle } from './validate-article.mjs';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const saPath = process.env.FIREBASE_SA_PATH || '/root/.config/firebase/perky-news-sa.json';
  if (!existsSync(saPath)) {
    console.error('❌ Firebase service account not found:', saPath);
    console.error('   Set FIREBASE_SA_PATH env var or use default path');
    process.exit(1);
  }
  const serviceAccount = JSON.parse(readFileSync(saPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'perky-news.firebasestorage.app'
  });
}

const db = admin.firestore();

// Parse arguments
const args = process.argv.slice(2);
const forceFlag = args.includes('--force');
const articleArg = args.find(a => !a.startsWith('--'));

if (!articleArg) {
  console.error(`
Usage: node create-article-safe.mjs <article-json-or-file> [--force]

Options:
  --force    Publish even with validation warnings (NOT errors)

Examples:
  node create-article-safe.mjs article.json
  node create-article-safe.mjs '{"slug": "my-article", ...}'
`);
  process.exit(1);
}

// Load article data
let article;
try {
  if (existsSync(articleArg)) {
    article = JSON.parse(readFileSync(articleArg, 'utf8'));
  } else {
    article = JSON.parse(articleArg);
  }
} catch (err) {
  console.error('❌ Failed to parse article JSON:', err.message);
  process.exit(1);
}

// Required fields
const REQUIRED_FIELDS = ['slug', 'title', 'excerpt', 'content', 'category'];
const missing = REQUIRED_FIELDS.filter(f => !article[f]);
if (missing.length > 0) {
  console.error('❌ Missing required fields:', missing.join(', '));
  process.exit(1);
}

// Validate content
console.log('🔍 Validating article content...\n');
const validation = validateArticle(article.content);

if (validation.errors.length > 0) {
  console.log('❌ VALIDATION ERRORS (must fix before publishing):');
  validation.errors.forEach(e => console.log(`   - ${e}`));
  console.log('\n❌ Article NOT created. Fix the errors and try again.');
  process.exit(1);
}

if (validation.warnings.length > 0) {
  console.log('⚠️  VALIDATION WARNINGS:');
  validation.warnings.forEach(w => console.log(`   - ${w}`));
  if (!forceFlag) {
    console.log('\n⚠️  Article has warnings. Use --force to publish anyway.');
    process.exit(1);
  }
  console.log('\n⚠️  Publishing with warnings (--force flag used)');
}

// Create article
async function createArticle() {
  const slug = article.slug;
  
  // Check if already exists
  const existing = await db.collection('articles').doc(slug).get();
  if (existing.exists) {
    console.error(`❌ Article already exists: ${slug}`);
    console.error('   Use update-article.mjs to modify existing articles');
    process.exit(1);
  }
  
  // Default values
  const articleData = {
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    tags: article.tags || [],
    author: article.author || 'Perky News Team',
    publishedAt: article.publishedAt || new Date().toISOString().split('T')[0],
    featured: article.featured || false,
    coverImage: article.coverImage || null,
    sources: article.sources || [],
    status: 'published',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    validatedAt: new Date().toISOString(),
  };
  
  await db.collection('articles').doc(slug).set(articleData);
  
  console.log('\n✅ Article created successfully!');
  console.log(`   Slug: ${slug}`);
  console.log(`   URL: https://perky.news/articles/${slug}`);
}

createArticle().catch(err => {
  console.error('❌ Firebase error:', err.message);
  process.exit(1);
});
