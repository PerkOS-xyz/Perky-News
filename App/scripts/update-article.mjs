import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Initialize if not already
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    readFileSync(process.env.FIREBASE_SA_PATH || '/root/.config/firebase/perky-news-sa.json', 'utf8')
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'perky-news.firebasestorage.app'
  });
}

const db = admin.firestore();

const slug = process.argv[2];
const updateJson = process.argv[3];

if (!slug || !updateJson) {
  console.error('Usage: node update-article.mjs <slug> <update-json>');
  console.error('Example: node update-article.mjs my-article \'{"content": "new content"}\'');
  process.exit(1);
}

const updates = JSON.parse(updateJson);

async function updateArticle() {
  const docRef = db.collection('articles').doc(slug);
  const docSnap = await docRef.get();
  
  if (!docSnap.exists) {
    console.error('❌ Article not found:', slug);
    process.exit(1);
  }
  
  await docRef.update({
    ...updates,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  
  console.log('✅ Updated:', slug);
  console.log('   Fields:', Object.keys(updates).join(', '));
}

updateArticle().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
