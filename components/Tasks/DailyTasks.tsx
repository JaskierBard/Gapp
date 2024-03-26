import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Habbit } from "./Tasks";
import { getDateToday } from "../common/GetTimeNow";
import { editHabbitProgress } from "../common/FirebaseService";

export interface Props {
  habbits: Habbit[];
}

type DataItem = {
  id: string;
  title: string;
  left: any; // Tutaj należy określić odpowiedni typ dla danych
};

export const Daily = (props: Props) => {
  const [date, setDate] = useState<string>();
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    setData([]);
    const today = getDateToday();
    setDate(today);
    props.habbits.forEach((element, id) => {
      if (element.dates.hasOwnProperty(today)) {
        setData((prevData: any) => [
          ...prevData,
          { id: element.id, title: element.title, left: element.dates[today] },
        ]);
      } else {
        editHabbitProgress(element.id, today, element.target);
      }
    });
  }, [props.habbits]);

  const increaseValue = (id: string, date: string, left: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, left: item.left - 1 } : item
      )
    );
    editHabbitProgress(id, date, left - 1);
  };

  const decreaseValue = (id: string, date: string, left: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, left: item.left + 1 } : item
      )
    );
    editHabbitProgress(id, date, left + 1);
  };

  return (
    <View style={styles.container}>
      {data && date
        ? data.map((element) => (
            <View style={styles.buttonsContainer} key={element.id}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => increaseValue(element.id, date, element.left)}
              >
                <Text style={styles.plusButton}>+</Text>
              </TouchableOpacity>

              {element.left <= 0 ? (
                <TouchableOpacity style={styles.habbitDoneDiv}>
                  <Text style={styles.textTitle}>{element.title}</Text>
                  <Text style={styles.targetText}>Dzienny cel osiągnięty!</Text>
                  {element.left < 0 && (
                    <Text style={styles.targetText}>
                      dodatkowe {Math.abs(element.left)} razy!
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.habbitUndoneDiv}>
                  <Text style={styles.textTitle}>{element.title}</Text>
                  <Text style={styles.targetText}>Dzienny cel: </Text>
                  <Text style={styles.targetText}>
                    pozostało {element.left} razy
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={() => decreaseValue(element.id, date, element.left)}
              >
                <Text style={styles.minusButton}>-</Text>
              </TouchableOpacity>
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textTitle: {
    fontSize: 12,
    fontFamily: "gothic-font",
    color: "wheat",
  },
  targetText: {
    fontSize: 10,
    fontFamily: "gothic-font",
    color: "white",
  },
  habbitDoneDiv: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    backgroundColor: "rgba(0, 220, 0, 0.4)",
    borderColor: "yellow",
    height: "100%",
    width: "60%",
  },

  habbitUndoneDiv: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    backgroundColor: "rgba(255, 255, 255,",
    borderColor: "yellow",
    height: "100%",
    width: "60%",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    width: "96%",
    height: "14%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  button: {
    height: "100%",
    aspectRatio: 0.5,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    fontSize: 50,

    color: "green",
  },
  minusButton: {
    fontSize: 50,
    color: "red",
  },
});
