import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export const deleteItem = async (id: string) => {
  const ref = doc(FIRESTORE_DB, `todos/${id}`);
  deleteDoc(ref);
};

export const addItem = async (title: string, expires: Date | null) => {
  await addDoc(collection(FIRESTORE_DB, "todos"), {
    title: title,
    status: 'undone',
  });
};

export const editItem = async (id: string, title: string) => {
  const ref = doc(FIRESTORE_DB, `todos/${id}`);
  console.log("UPDATED");

  await updateDoc(ref, {
    title: title,
    status: 'undone',
  });
};


export const addManyDev = async (title: string) => {
  await setDoc(doc(collection(FIRESTORE_DB, "npc"),title), {
    nazwa: title,
    miejsce: '',
    ekwipunek: '',
    charakter: '',
    nastawienie: '',
    opis: '',
    poziom: '',
    rola: '',
    flaga: ''


  });
  console.log(title)

};