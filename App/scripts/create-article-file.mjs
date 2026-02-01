import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Initialize if not already
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

// Get article data from file
const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node create-article-file.mjs <json-file>');
  process.exit(1);
}

const article = JSON.parse(readFileSync(filePath, 'utf8'));

async function createArticle() {
  const slug = article.slug;
  
  await db.collection('articles').doc(slug).set({
    ...article,
    status: 'published',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    publishedAt: article.publishedAt || new Date().toISOString().split('T')[0],
  });
  
  console.log('✅ Created:', slug);
}

createArticle().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
