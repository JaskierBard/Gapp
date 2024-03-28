import { aiDialogLinesCreator, fastResponse } from "../../common/AiMissions/MissionAi";
import { addOpression } from "../../common/FirebaseService";

export const acceptMission = [
  {
    text: "Zgoda",
    action: async () => {
      return await fastResponse("dobrze, wykonam zadanie", "thanks");

    },
  },
  {
    text: "Porozmawiajmy o nagrodzie",
    action: async () => {
      return "Dobrze. Co proponujesz?";
    },
  },
  {
    text: "Odrzucam",
    action: async () => {
      return await fastResponse("nie zgadzam się", "thanks");
    },
  },
];

export const doneMission = [
  {
    text: "Wykonałem zadanie!",
    action: async () => {
      return await fastResponse("Wykonałem zadanie", "thanks");
    },
    conversationTrack: async () => {
      return null;
    },
  },
  {
    text: "Co dokładnie miałem dla ciebie zrobić?",
    action: async () => {
      return "no misję, a co innego?";
    },
  },
  {
    text: "Nie dam rady zrobić tego o co mnie prosisz",
    action: async () => {
      return "szkoda że nie dasz rady";
    },
  },
];
const lines = [
  "Czy masz dla mnie jakieś zadanie?",
  "W czym mogę ci pomóc?",
  "W czym mogę ci pomóc?",
  "W czym mogę ci pomóc?",
  "W czym mogę ci pomóc?",
  ,
];
export const TrackDialogue = async(data: any, conversationTrack: string | null, selectedNpc:string, oppression: any) => {
  const dialogLines: { text: any; action: any; conversationTrack: any }[] = [];
  

  if (conversationTrack === null) {
    data.forEach((element: any, index: number) => {
      if (data[index].isAccepted) {
        dialogLines.push({
          text: data[index].talkDown,
          action: async () => {
            return "Jak ci idzie?";
          },
          conversationTrack: async () => {
            return "doneMission";
          },
        });
      } else {
        dialogLines.push({
          text: lines[index],
          action: () => {
            return data[index].mission;
          },
          conversationTrack: async () => {
            return "acceptMission";
          },
        });
      }
    });
    // if (dialogLines) {
      let lvlOpression = 0

      // if (oppression["Co słychać?"]) {
      //    lvlOpression = oppression["Co słychać?"]
      //   }
    
    dialogLines.push({
      text: "Co słychać?",
      action: async () => {
        addOpression("g4tPE1itk3vJTDAj19PO", selectedNpc, "Co słychać?")
        return await fastResponse("Co słychać?", "about", lvlOpression, selectedNpc);
      },
      conversationTrack: async () => {
        return null;
      },
    });
  // }
    return dialogLines;
  } else {
    switch (conversationTrack) {
      case "doneMission":
        return doneMission;
      case "acceptMission":
        return acceptMission;
      default:
        null;
    }
  }
};
