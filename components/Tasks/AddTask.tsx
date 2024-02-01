import React, { useState } from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { main } from "../Styles";
import { addItem } from "../common/FirebaseService";
import { formatDate } from "../common/FormatDate";

export interface Props {
  add: boolean;
  cancel: () => void;
}

export const AddTask = (props: Props) => {
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [expires, setExpires] = useState<Date | null>(null);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const addTodo = async () => {
    addItem(title, description, expires);
    props.cancel;
    setTitle("");
    setDescription("");
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setExpires(currentDate);
  };

  if (props.add) {
    return (
      <View style={main.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.titleInput}
            placeholder="Dodaj tytuł taska"
            onChangeText={(text: string) => setTitle(text)}
            value={title}
          ></TextInput>
          <View>
            <Text style={styles.titleInput}>
              Misja wygasa: {expires && formatDate(expires)}
            </Text>
            <Button
              title="Misja wygasa?"
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={expires ? expires : new Date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Dodaj opis"
            onChangeText={(text: string) => setDescription(text)}
            value={description}
          ></TextInput>
          <View style={styles.buttonContainer}>
            <Button
              onPress={addTodo}
              title="Add Todo"
              disabled={title === ""}
            />
            <Button onPress={props.cancel} title="Anuluj" />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  titleInput: {
    color: "white",
    fontFamily: "gothic-font",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  descriptionInput: {
    color: "white",
    fontFamily: "gothic-font",
    height: 120,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
