// Server-side article fetching using Firebase Admin SDK
// This replaces the hardcoded articles with Firebase data

export type Category = 'x402' | 'erc-8004' | 'ai-agents' | 'openclaw' | 'eliza' | 'defi' | 'general';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: Category;
  tags: string[];
  author: string;
  authorEmail?: string;
  authorBio?: string;
  authorAvatar?: string;
  publishedAt: string;
  featured: boolean;
  sources?: { name: string; url: string }[];
  readingTime?: number;
}

export const categoryLabels: Record<Category, string> = {
  'x402': 'x402 Protocol',
  'erc-8004': 'ERC-8004',
  'ai-agents': 'AI Agents',
  'openclaw': 'OpenClaw',
  'eliza': 'ElizaOS',
  'defi': 'DeFi',
  'general': 'General',
};

export const categoryColors: Record<Category, string> = {
  'x402': 'bg-purple-100 text-purple-800',
  'erc-8004': 'bg-blue-100 text-blue-800',
  'ai-agents': 'bg-green-100 text-green-800',
  'openclaw': 'bg-orange-100 text-orange-800',
  'eliza': 'bg-pink-100 text-pink-800',
  'defi': 'bg-yellow-100 text-yellow-800',
  'general': 'bg-gray-100 text-gray-800',
};

// Firebase Admin initialization (server-side only)
let adminInitialized = false;
let db: FirebaseFirestore.Firestore | null = null;

async function getDb() {
  if (db) return db;
  
  // Dynamic import to avoid client-side issues
  const admin = await import('firebase-admin');
  
  if (!adminInitialized && admin.apps.length === 0) {
    // Use environment variable for service account
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT || '{}'
    );
    
    if (serviceAccount.project_id) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      adminInitialized = true;
    }
  }
  
  db = admin.firestore();
  return db;
}

// Fetch articles from Firebase
export async function getArticles(category?: Category): Promise<Article[]> {
  try {
    const firestore = await getDb();
    if (!firestore) return [];
    
    let query = firestore.collection('articles')
      .where('status', '==', 'published')
      .orderBy('publishedAt', 'desc');
    
    if (category) {
      query = firestore.collection('articles')
        .where('category', '==', category)
        .where('status', '==', 'published')
        .orderBy('publishedAt', 'desc');
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
      slug: doc.id,
      ...doc.data()
    } as Article));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  try {
    const firestore = await getDb();
    if (!firestore) return undefined;
    
    const doc = await firestore.collection('articles').doc(slug).get();
    
    if (doc.exists) {
      return { slug: doc.id, ...doc.data() } as Article;
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching article:', error);
    return undefined;
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const firestore = await getDb();
    if (!firestore) return [];
    
    const snapshot = await firestore.collection('articles')
      .where('status', '==', 'published')
      .where('featured', '==', true)
      .orderBy('publishedAt', 'desc')
      .limit(5)
      .get();
    
    return snapshot.docs.map(doc => ({
      slug: doc.id,
      ...doc.data()
    } as Article));
  } catch (error) {
    console.error('Error fetching featured:', error);
    return [];
  }
}

export function getAllCategories(): Category[] {
  return ['x402', 'erc-8004', 'ai-agents', 'openclaw', 'eliza', 'defi', 'general'];
}
