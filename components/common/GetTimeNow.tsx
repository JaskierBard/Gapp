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
