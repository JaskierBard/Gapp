export const acceptMission = [
    {
      text: "Zgoda",
      action: async () => {
        return "fajnie że sie zgadzasz"
      },
    },
    {
        text: "Porozmawiajmy o nagrodzie",
        action: async () => {
          return "Dobrze. Co proponujesz?"
        },
      },
    {
      text: "Odrzucam",
      action: async () => {
        // setText(await fastResponse("nie zgadzam się", "thanks"));
        return "szkoda że odrzucasz"
      },
    },
  ];


  export const doneMission = [
    {
      text: "Wykonałem zadanie!",
      action: async () => {
        return "świetnie że wykonałeś zadanie oto twoja nagroda"
      },
      conversationTrack:async () => { return null }

    },
    {
        text: "Co dokładnie miałem dla ciebie zrobić?",
        action: async () => {
          return "no misję, a co innego?"
        },
      },
    {
      text: "Nie dam rady zrobić tego o co mnie prosisz",
      action: async () => {
        return "szkoda że nie dasz rady"
      },
    },
  ];
  const lines = [
    "W czym mogę ci pomóc?",
    "W czym mogę ci pomóc?",
    "W czym mogę ci pomóc?",
    "W czym mogę ci pomóc?",
    "W czym mogę ci pomóc?",
    ,
  ];
  export const TrackDialogue = (data: any, conversationTrack:string | null) => {
    const dialogLines: { text: any; action: any; conversationTrack: any }[] = [];
    console.log('ładowanie nowych linii dialogowych')
    if (conversationTrack === null) {
      data.forEach((element: any, index: number) => {
        if (data[index].isAccepted) {
          dialogLines.push({
            text: data[index].talkDown,
            action: async () => {
              return "Jak ci idzie?";
            },
            conversationTrack:async () => { return "doneMission" }
          });
        } else {
          dialogLines.push({
            text: lines[index],
            action: () => {
              return data[index].mission;
            },
            conversationTrack:async () => { return "acceptMission" }

          });
        }
        
      });
      dialogLines.push({
        text: "Co słychać?",
        action: async () => {
          return "Stare kury nie chcą zdychać!";
        },
        conversationTrack:async () => { return null }
      });

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