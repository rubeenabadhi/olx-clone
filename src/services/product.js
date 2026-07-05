import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const PRODUCTS_COLLECTION = "products";
const PAGE_SIZE = 8; // how many ads to load per "page"

export const addProduct = async (productData) => {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...productData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// UPDATED: now supports pagination via a cursor (lastDoc)
export const getProductsPage = async (lastDoc = null) => {
  let q;

  if (lastDoc) {
    q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );
  }

  const snapshot = await getDocs(q);

  const products = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));

  // The last raw doc snapshot is needed as the cursor for the next page
  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
  const hasMore = snapshot.docs.length === PAGE_SIZE;

  return { products, lastVisible, hasMore };
};

// Keep this for other places that still want everything at once (e.g. My Ads)
export const getAllProducts = async () => {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
};

export const getProductById = async (id) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const getProductsBySeller = async (sellerId) => {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("sellerId", "==", sellerId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
};

export const updateProduct = async (id, updatedData) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, updatedData);
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
};