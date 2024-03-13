import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

export const getNpc = () => {
    const todoRef = collection(FIRESTORE_DB, "npc");
    const npcs:[string] = [''];

    onSnapshot(todoRef, {
      next: (snapshot) => {
  

        snapshot.docs.forEach((doc) => {
          const npc: any = {
            id: doc.id,
            ...doc.data(),
          };
          npcs.push(npc.nazwa);
          console.log(npc.nazwa)

        });
        
      },
    });
    return npcs;
  }