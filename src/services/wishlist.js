import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

const WISHLIST_COLLECTION = "wishlists";

const wishlistDocId = (userId, productId) => `${userId}_${productId}`;

export const addToWishlist = async (userId, product) => {
  const docRef = doc(db, WISHLIST_COLLECTION, wishlistDocId(userId, product.id));
  await setDoc(docRef, {
    userId,
    productId: product.id,
    title: product.title,
    price: product.price,
    photo: product.photos?.[0] || null,
    addedAt: new Date().toISOString(),
  });
};

export const removeFromWishlist = async (userId, productId) => {
  const docRef = doc(db, WISHLIST_COLLECTION, wishlistDocId(userId, productId));
  await deleteDoc(docRef);
};

export const isInWishlist = async (userId, productId) => {
  if (!userId) return false;
  const docRef = doc(db, WISHLIST_COLLECTION, wishlistDocId(userId, productId));
  const snapshot = await getDoc(docRef);
  return snapshot.exists();
};

export const getWishlist = async (userId) => {
  const q = query(
    collection(db, WISHLIST_COLLECTION),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};