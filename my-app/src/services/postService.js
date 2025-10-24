import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// 글 작성
export const createPost = async (authorId, text) => {
  const docRef = await addDoc(collection(db, "posts"), {
    authorId,
    text,
    createdAt: serverTimestamp(),
    replyCount: 0,
    heartCount: 0
  });
  return docRef.id;
};