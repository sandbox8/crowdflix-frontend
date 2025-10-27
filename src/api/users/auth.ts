import { api } from "../config/axios";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const login = async (email: string, password: string) => {
  // First, sign in to Firebase to get auth state
  await signInWithEmailAndPassword(auth, email, password);
  
  // Then call backend API
  const response = await api.post("/users/sign-in", { email, password });
  return response.data.data;
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  // First, create user in Firebase
  await createUserWithEmailAndPassword(auth, email, password);
  
  // Then call backend API
  const response = await api.post("/users/sign-up", {
    email,
    password,
    first_name: firstName.toLowerCase(),
    last_name: lastName.toLowerCase(),
    username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
  });
  return response.data.data;
};
