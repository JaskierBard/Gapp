export const formatDate = (date: Date) => {
    const options = {
      weekday: "long" as const,
      month: "long" as const,
      day: "numeric" as const,
      hour: "numeric" as const,
      minute: "numeric" as const,
      timeZone: "Europe/Warsaw",
    };

    const formattedDate = new Intl.DateTimeFormat("pl-PL", options).format(
      date
    );
    return formattedDate;
  };