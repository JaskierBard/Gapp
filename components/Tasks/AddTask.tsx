import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  TextInput,
} from "react-native";

import { main } from "../Styles";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export interface Props {
  add: boolean;
  cancel: () => void;
}

export const AddTask = (props: Props) => {
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");

  const addTodo = async () => {
    console.log("ADD");
    await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: title,
      done: false,
      description: description,
    });
    props.cancel;
    setTitle("");
    setDescription("");
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
