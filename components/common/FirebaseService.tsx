import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export const deleteItem = async (id: string) => {
  const ref = doc(FIRESTORE_DB, `todos/${id}`);
  deleteDoc(ref);
};

export const addItem = async (title: string, description: string) => {
  console.log("ADD");
  await addDoc(collection(FIRESTORE_DB, "todos"), {
    title: title,
    done: false,
    description: description,
  });
};

export const editItem = async (id: string, title: string, description: string) => {
  const ref = doc(FIRESTORE_DB, `todos/${id}`);
  console.log("UPDATED");

  await updateDoc(ref, {
    title: title,
    done: false,
    description: description,
  });
};
