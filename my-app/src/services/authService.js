import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// 회원가입
export const signup = async (email, password, nickname) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;
  await setDoc(doc(db, "users", uid), {
    nickname,
    email,
    createdAt: serverTimestamp(),
  });
};

// 로그인
export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

import { signOut as firebaseSignOut } from 'firebase/auth'; // 이름 충돌 방지위해 이름바꿈

export const logout = async () => {
  await firebaseSignOut(auth);
};