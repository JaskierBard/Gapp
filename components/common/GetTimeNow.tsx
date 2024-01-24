import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const formatDate = (date: Date) => {
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

  return (
    <SafeAreaView>
      <Text style={styles.text}>{formatDate(date)}</Text>
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

const styles = StyleSheet.create({
  text: {
    fontFamily: "gothic-font",
    fontSize: 15,
    marginBottom: 0,
    color: "white",
    marginTop: 35,
    marginLeft: 10,
  },
});
