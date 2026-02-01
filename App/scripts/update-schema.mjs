import admin from 'firebase-admin';
import { readFileSync } from 'fs';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    readFileSync('/root/.config/firebase/perky-news-sa.json', 'utf8')
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Standard author info for Perky
const authorInfo = {
  author: 'Perky',
  authorEmail: 'perky@PerkOS.xyz',
  authorBio: 'Perky is your friendly AI guide to the agent economy. Powered by PerkOS, Perky curates the latest news on AI agents, Web3 protocols, and the future of autonomous systems.',
  authorAvatar: '/perky-mascot.jpg'
};

async function updateSchema() {
  const snapshot = await db.collection('articles').get();
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    
    await doc.ref.update({
      // Author fields
      ...authorInfo,
      
      // Ensure standard fields exist
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: data.content || '',
      coverImage: data.coverImage || '/perkos-banner.jpg',
      publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      tags: data.tags || [],
      category: data.category || 'general',
      
      // SEO fields
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.excerpt,
      
      // Stats
      views: data.views || 0,
      readingTime: Math.ceil((data.content?.length || 0) / 1500) || 3,
      
      // Sources/references
      sources: data.sources || []
    });
    
    console.log('✅ Updated:', doc.id);
  }
  
  console.log('\n🎉 Schema updated!');
  process.exit(0);
}

updateSchema().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
