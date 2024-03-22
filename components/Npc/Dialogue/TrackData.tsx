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
        return "świetnie że wykonałeś zadanie"
      },
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

 