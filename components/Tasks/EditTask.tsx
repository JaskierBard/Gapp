import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";

import { main } from "../Styles";
import { editItem } from "../common/FirebaseService";
import { Checkmark } from "../common/Checkmark";
import { ActionButton } from "../common/Buttons/ActionButton";
import { UndoButton } from "../common/Buttons/UndoButtons";

export interface Props {
  details: any;
//   show: (arg: string) => void;
}

export const EditTask = (props: Props) => {
  const [toEdit, setToEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.details.title);
  const [description, setDescription] = useState<string>(
    props.details.description
  );
  const [isCyclical, setIsCyclical] = useState<boolean>(false);

  const handleCheckChange = (newState: boolean) => {
    setIsCyclical(newState);
  };
//   const handleUndoButton = (newState: boolean) => {
//     if (newState === false) {
//       props.show("");
//     }
//   };

  // const closeModal = () => {
  //   props.show("");
  // };

  useEffect(() => {}, []);

  const updateState = async () => {
    setTitle(props.details.title);
    setDescription(props.details.description);
    setToEdit(true);
  };

  const editTodo = async () => {
    editItem(props.details.id, title);
    // props.cancel;
    setTitle("");
    setDescription("");
    setToEdit(false);
    // handleUndoButton;
  };

  if (toEdit) {
    return (
      <View style={main.container}>
        <Text>Edycja</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.titleInput}
            placeholder="Dodaj tytuł taska"
            onChangeText={(text: string) => setTitle(text)}
            value={title}
          ></TextInput>
          <Checkmark
            text={"Misja cykliczna"}
            isChecked={isCyclical}
            onCheckChange={handleCheckChange}
          />
          <Checkmark
            text={"Misje poboczne"}
            isChecked={isCyclical}
            onCheckChange={handleCheckChange}
          />
          <TextInput
            style={styles.descriptionInput}
            placeholder="Dodaj opis"
            onChangeText={(text: string) => setDescription(text)}
            value={description}
          ></TextInput>
          <View style={styles.buttonContainer}>
            <Button onPress={editTodo} title="Zapisz" disabled={title === ""} />
          </View>
        </View>
        <UndoButton onClickButton={()=> setToEdit(false)} />

      </View>
    );
  }}

  const styles = StyleSheet.create({
    exit: {
      position: "absolute",
      bottom: "2%",
      left: "35%",
    },
    edit: {
      position: "absolute",
      bottom: "2%",
      left: "65%",
    },
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
  