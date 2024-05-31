import React, { useState, useEffect } from "react";
import { Text, SafeAreaView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { missionStyles } from "../Styles";
import { formatDate } from "./FormatDate";

export const GetTimeNow = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      setDate(currentDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <SafeAreaView>
      <Text style={missionStyles.text}>{formatDate(date)}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export const getDateToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const getTimeNow = (format: string) => {
  const date = new Date();

  if (format === "hh:mm") {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
};

export const getTimeOfDayMessage = (timeOfDay: any) => {
  const time = getTimeNow("hh:mm");
  if (time) {
    for (const range in timeOfDay) {
      const [start, end] = range.split("-");
      const [startHour, startMinute] = start.split(":");
      const [endHour, endMinute] = end.split(":");
      const [hour, minute] = time.split(":");

      const startTime = new Date();
      startTime.setHours(Number(startHour), Number(startMinute), 0);
      const endTime = new Date();
      endTime.setHours(Number(endHour), Number(endMinute), 0);
      const currentTime = new Date();
      currentTime.setHours(Number(hour), Number(minute), 0);

      if (currentTime >= startTime && currentTime <= endTime) {
        // console.log(timeOfDay[range]);
        return timeOfDay[range];
      }
    }

    return "";
  }
};
