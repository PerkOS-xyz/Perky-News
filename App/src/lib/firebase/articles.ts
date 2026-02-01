import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './config';
import type { Article, Category } from '../articles';

const ARTICLES_COLLECTION = 'articles';
const TOPICS_COLLECTION = 'topics';

// Convert Firestore document to Article type
function docToArticle(docData: DocumentData, id: string): Article {
  return {
    slug: id,
    title: docData.title || '',
    excerpt: docData.excerpt || '',
    content: docData.content || '',
    coverImage: docData.coverImage || '',
    category: docData.category || 'general',
    tags: docData.tags || [],
    author: docData.author || 'Perky News Team',
    publishedAt: docData.publishedAt instanceof Timestamp 
      ? docData.publishedAt.toDate().toISOString().split('T')[0]
      : docData.publishedAt || '',
    featured: docData.featured || false,
  };
}

// Fetch all articles
export async function getFirebaseArticles(category?: Category): Promise<Article[]> {
  try {
    let q = query(
      collection(db, ARTICLES_COLLECTION),
      orderBy('publishedAt', 'desc')
    );
    
    if (category) {
      q = query(
        collection(db, ARTICLES_COLLECTION),
        where('category', '==', category),
        orderBy('publishedAt', 'desc')
      );
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => docToArticle(doc.data(), doc.id));
  } catch (error) {
    console.error('Error fetching articles from Firebase:', error);
    return [];
  }
}

// Fetch single article by slug
export async function getFirebaseArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const docRef = doc(db, ARTICLES_COLLECTION, slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docToArticle(docSnap.data(), docSnap.id);
    }
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Fetch featured articles
export async function getFirebaseFeaturedArticles(): Promise<Article[]> {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('featured', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(5)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => docToArticle(doc.data(), doc.id));
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}

// Topic/Category info
export interface Topic {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
}

export async function getFirebaseTopics(): Promise<Topic[]> {
  try {
    const snapshot = await getDocs(collection(db, TOPICS_COLLECTION));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Topic));
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
}

export async function getFirebaseTopic(topicId: string): Promise<Topic | null> {
  try {
    const docRef = doc(db, TOPICS_COLLECTION, topicId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Topic;
    }
    return null;
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
}
