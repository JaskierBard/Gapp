import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
  const docRef = await addDoc(collection(FIRESTORE_DB, "todos"), {
    title: title,
    status: "undone",
  });
  return docRef.id;
};

export const addMission = async (
  NPCname: string,
  mission: string,
  todoId: string
) => {
  
  const docRef = await addDoc(collection(FIRESTORE_DB, "missions"), {
    NPCname: NPCname,
    mission: mission,
    todoId: todoId,
  });
  return docRef.id;

};

export const editItem = async (id: string, title: string) => {
  const ref = doc(FIRESTORE_DB, `todos/${id}`);
  await updateDoc(ref, {
    title: title,
    status: "undone",
  });
};

export const addHeroMission = async (heroID: string, missionID: string) => {
  const heroRef = doc(FIRESTORE_DB, `hero/${heroID}`);

  const heroDoc = await getDoc(heroRef);

  if (heroDoc.exists()) {
    const currentMissions = heroDoc.data()?.missions || [];

    const updatedMissions = [...currentMissions, missionID];

    await updateDoc(heroRef, {
      missions: updatedMissions,
    });
  } else {
    console.log(`Dokument o ID ${heroID} nie istnieje.`);
  }
  return heroDoc.id
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

export const getMissions = (
  heroID: string
): Promise<{ [NPCname: string]: number }> => {
  return new Promise((resolve) => {
    const unreadMissions: { [NPCname: string]: number } = {};
    const heroRef = doc(FIRESTORE_DB, `hero/${heroID}`);
    onSnapshot(heroRef, {
      next: (snapshot) => {
        const data = snapshot.get("missions");
        const promises: Promise<void>[] = [];
        data.forEach((element: string) => {
          const ref = doc(FIRESTORE_DB, `missions/${element}`);
          promises.push(
            new Promise((resolve) => {
              onSnapshot(ref, {
                next: (snapshot) => {
                  const NPCname = snapshot.get("NPCname");
                  if (NPCname) {
                    unreadMissions[NPCname] =
                      (unreadMissions[NPCname] || 0) + 1;
                  }
                  resolve();
                },
              });
            })
          );
        });
        Promise.all(promises).then(() => {
          resolve(unreadMissions);
        });
      },
    });
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
