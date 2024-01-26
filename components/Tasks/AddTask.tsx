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
    setTitle("");
    setDescription("");
    props.cancel;
  };

  const closeModal = () => {
    // props.add(false);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.add}
      onRequestClose={closeModal}
    >
      <View style={main.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Dodaj tytuł taska"
            onChangeText={(text: string) => setTitle(text)}
            value={title}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Dodaj opis"
            onChangeText={(text: string) => setDescription(text)}
            value={description}
          ></TextInput>
          <Button onPress={addTodo} title="Add Todo" disabled={title === ""} />
          <Button onPress={props.cancel} title="Anuluj" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  form: {
    // flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: "0%",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  exit: {
    position: "absolute",
    bottom: "2%",
    left: "35%",
  },
});
