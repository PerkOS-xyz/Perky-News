import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAm4UtjO_eEwgqgKDsq0RQ1nfDnMee2A2U',
  authDomain: 'perky-news.firebaseapp.com',
  projectId: 'perky-news',
  storageBucket: 'perky-news.firebasestorage.app',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test query
try {
  console.log('Testing query...');
  const q = query(
    collection(db, 'articles'),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  console.log('Found', snapshot.docs.length, 'articles');
  
  snapshot.docs.forEach(doc => {
    console.log('-', doc.id, doc.data().title?.substring(0, 40));
  });
} catch (error) {
  console.error('Error:', error.message);
  if (error.message.includes('index')) {
    console.log('\n⚠️ NEED TO CREATE INDEX');
  }
}

process.exit(0);
