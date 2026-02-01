import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { validateArticle } from './validate-article.mjs';

// Initialize if not already
if (!admin.apps.length) {
  const saPath = process.env.FIREBASE_SA_PATH || '/root/.config/firebase/perky-news-sa.json';
  if (!existsSync(saPath)) {
    console.error('❌ Firebase service account not found:', saPath);
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
const skipValidation = args.includes('--skip-validation');
const forceWarnings = args.includes('--force');
const articleArg = args.find(a => !a.startsWith('--'));

if (!articleArg) {
  console.error(`
📝 Create Article - Perky News
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usage: node create-article.mjs <article-json-or-file> [options]

Options:
  --force            Publish even with validation warnings
  --skip-validation  ⚠️  DANGEROUS: Skip validation entirely

Examples:
  node create-article.mjs article.json
  node create-article.mjs '{"slug": "my-article", "title": "...", "content": "...", "category": "x402"}'
`);
  process.exit(1);
}

// Load article data
let article;
try {
  if (existsSync(articleArg)) {
    article = JSON.parse(readFileSync(articleArg, 'utf8'));
    console.log(`📄 Loading article from: ${articleArg}\n`);
  } else {
    article = JSON.parse(articleArg);
  }
} catch (err) {
  console.error('❌ Failed to parse article JSON:', err.message);
  process.exit(1);
}

// Required fields
const REQUIRED_FIELDS = ['slug', 'title', 'content', 'category'];
const missing = REQUIRED_FIELDS.filter(f => !article[f]);
if (missing.length > 0) {
  console.error('❌ Missing required fields:', missing.join(', '));
  process.exit(1);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VALIDATION (mandatory unless --skip-validation)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

if (skipValidation) {
  console.log('⚠️  WARNING: Skipping validation (--skip-validation)');
  console.log('⚠️  This is NOT recommended. Content may have errors.\n');
} else {
  console.log('🔍 Validating article content...\n');
  const validation = validateArticle(article.content);

  if (validation.errors.length > 0) {
    console.log('❌ VALIDATION FAILED - Content has errors:\n');
    validation.errors.forEach(e => console.log(`   ❌ ${e}`));
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Article NOT created. Fix the errors above and try again.');
    console.log('See: scripts/CONTENT-REVIEW-PROCESS.md');
    process.exit(1);
  }

  if (validation.warnings.length > 0) {
    console.log('⚠️  VALIDATION WARNINGS:\n');
    validation.warnings.forEach(w => console.log(`   ⚠️  ${w}`));
    
    if (!forceWarnings) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Article has warnings. Use --force to publish anyway.');
      process.exit(1);
    }
    console.log('\n⚠️  Publishing with warnings (--force flag used)\n');
  } else {
    console.log('✅ Validation passed!\n');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CREATE ARTICLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function createArticle() {
  const slug = article.slug;
  
  // Check if exists
  const existing = await db.collection('articles').doc(slug).get();
  if (existing.exists) {
    console.error(`❌ Article already exists: ${slug}`);
    console.error('   Use update-article.mjs to modify existing articles');
    process.exit(1);
  }
  
  const articleData = {
    title: article.title,
    excerpt: article.excerpt || article.content.substring(0, 200) + '...',
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
    validatedAt: skipValidation ? null : new Date().toISOString(),
  };
  
  await db.collection('articles').doc(slug).set(articleData);
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Article created successfully!');
  console.log(`   Slug: ${slug}`);
  console.log(`   URL: https://perky.news/articles/${slug}`);
}

createArticle().catch(err => {
  console.error('❌ Firebase error:', err.message);
  process.exit(1);
});
