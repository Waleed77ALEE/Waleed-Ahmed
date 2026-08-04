import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface FirebaseServiceReview {
  id?: string;
  service_id: string;
  user_id?: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  created_at?: string;
}

export async function fetchServiceReviewsFirestore(serviceId: string): Promise<FirebaseServiceReview[]> {
  try {
    const q = query(
      collection(db, 'service_reviews'),
      where('service_id', '==', serviceId),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const reviews: FirebaseServiceReview[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      reviews.push({
        id: docSnap.id,
        service_id: data.service_id,
        user_id: data.user_id,
        user_name: data.user_name,
        user_avatar: data.user_avatar,
        rating: data.rating,
        comment: data.comment,
        created_at: data.created_at?.toDate ? data.created_at.toDate().toISOString() : (data.created_at || new Date().toISOString())
      });
    });
    return reviews;
  } catch (error) {
    console.warn('Firestore fetchServiceReviews warning:', error);
    return [];
  }
}

export async function submitServiceReviewFirestore(review: Omit<FirebaseServiceReview, 'id' | 'created_at'>): Promise<FirebaseServiceReview | null> {
  try {
    const docRef = await addDoc(collection(db, 'service_reviews'), {
      ...review,
      created_at: serverTimestamp()
    });
    return {
      id: docRef.id,
      ...review,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Firestore submitServiceReview warning:', error);
    return null;
  }
}

export async function saveProfileFirestore(userId: string, data: Record<string, any>): Promise<boolean> {
  try {
    await setDoc(doc(db, 'profiles', userId), {
      ...data,
      updated_at: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('Firestore saveProfile warning:', error);
    return false;
  }
}

export async function saveOrderFirestore(order: Record<string, any>): Promise<boolean> {
  try {
    await addDoc(collection(db, 'orders'), {
      ...order,
      created_at: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.warn('Firestore saveOrder warning:', error);
    return false;
  }
}

export async function fetchOrdersFirestore(userId: string): Promise<any[]> {
  try {
    const q = query(
      collection(db, 'orders'),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders: any[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      orders.push({
        id: docSnap.id,
        ...data,
        created_at: data.created_at?.toDate ? data.created_at.toDate().toISOString() : (data.created_at || new Date().toISOString())
      });
    });
    return orders;
  } catch (error) {
    console.warn('Firestore fetchOrders warning:', error);
    return [];
  }
}

