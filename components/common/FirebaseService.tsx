import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_STORAGE, FIRESTORE_DB } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { shortMissionAsk, shortTalkDown } from "./AiMissions/MissionAi";

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
  todoId: string,
) => {
   const talkDown:string = await shortTalkDown(mission);
   const missionAsk:string = await shortMissionAsk(mission);

  const docRef = await addDoc(collection(FIRESTORE_DB, "missions"), {
    NPCname: NPCname,
    mission: mission,
    todoId: todoId,
    isAccepted: false,
    talkDown: talkDown,
    missionAsk: missionAsk
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

export const manageMissionStatus = async (id: string, decision: boolean) => {
  const ref = doc(FIRESTORE_DB, `missions/${id}`);
  await updateDoc(ref, {
    isAccepted: decision,
    isDone: false
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

export const getMissionsCount = (
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
                  const isAccepted = snapshot.get("isAccepted");
                  if (NPCname && !isAccepted) {
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


export const getNpcMissions = async (heroID: string, NPCname: string) => {
  const docRef = collection(FIRESTORE_DB, "missions");
  const q = query(docRef, where('NPCname', '==', NPCname));
  try {
    const querySnapshot = await getDocs(q);

    const missions: { id: string; isAccepted: boolean, mission: any, talkDown:string }[] = [];

    querySnapshot.forEach((doc) => {
        missions.push({ id: doc.id, isAccepted:doc.data().isAccepted, mission:doc.data().mission, talkDown:doc.data().talkDown});
    });
    return missions;
  } catch (error) {
    console.error('Błąd pobierania misji:', error);
    return [];
  }
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



export const getImage = async (folder: string, imageName: string) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `${folder}/${imageName}`);
    const url = await getDownloadURL(storageRef);
    return url

  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  };
};



export const getAudio = async (folder: string, audioName: string) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `${folder}/${audioName}`);


    const url = await getDownloadURL(storageRef);
    return url

  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  };
};

