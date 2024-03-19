import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export const deleteItem = async (id: string) => {
  const ref = doc(FIRESTORE_DB, `todos/${id}`);
  deleteDoc(ref);
};

export const addItem = async (title: string, expires: Date | null) => {
  const docRef =  await addDoc(collection(FIRESTORE_DB, "todos"), {
    title: title,
    status: "undone",
  });
  return  docRef.id
};

export const addMission = async (NPCname: string, mission: string, todoId: string,) => {
  await addDoc(collection(FIRESTORE_DB, "missions"), {
    NPCname: NPCname,
    mission: mission,
    todoId: todoId,

  });
};

export const editItem = async (id: string, title: string) => {
  const ref = doc(FIRESTORE_DB, `todos/${id}`);
  await updateDoc(ref, {
    title: title,
    status: "undone",
  });
};

export const getNpc = () => {
  const todoRef = collection(FIRESTORE_DB, "npc");
  const npcs: [string] = [""];

  onSnapshot(todoRef, {
    next: (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const npc: any = {
          id: doc.id,
          ...doc.data(),
        };
        npcs.push(npc.nazwa);
        // console.log(npc.nazwa);
      });
    },
  });
  return npcs;
};

export const getMissions = (heroID: string) => {
  const heroRef = doc(FIRESTORE_DB, `hero/${heroID}`);
  onSnapshot(heroRef, {
    next: (snapshot) => {
      console.log(snapshot.get('missions'));
    },
  });
};

export const addManyDev = async (title: string) => {
  await setDoc(doc(collection(FIRESTORE_DB, "npc"), title), {
    nazwa: title,
    miejsce: "",
    ekwipunek: "",
    charakter: "",
    nastawienie: "",
    opis: "",
    poziom: "",
    rola: "",
    flaga: "",
  });
  console.log(title);
};
