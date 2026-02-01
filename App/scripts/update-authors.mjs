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

async function updateAuthors() {
  const snapshot = await db.collection('articles').get();
  
  for (const doc of snapshot.docs) {
    await doc.ref.update({
      author: 'Perky',
      authorEmail: 'perky@PerkOS.xyz'
    });
    console.log('✅ Updated:', doc.id);
  }
  
  console.log('\n🎉 All authors updated!');
  process.exit(0);
}

updateAuthors().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
