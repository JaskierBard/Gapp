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

export interface Props {
  details: any;
  show: (arg: string) => void;
}

export const TaskDetails = (props: Props) => {
  const [toEdit, setToEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.details.title);
  const [description, setDescription] = useState<string>(props.details.description);

  const closeModal = () => {
    props.show("");
  };

  useEffect(() => {
  
  },[])

  const updateState = async () => {
    setTitle(props.details.title);
    setDescription(props.details.description);
    setToEdit(true)
    
  }

  const editTodo = async () => {
    editItem(props.details.id ,title, description)
    // props.cancel;
    setTitle("");
    setDescription("");
    setToEdit(false)
    closeModal()
  };

  if (toEdit) {


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
              onPress={editTodo}
              title="Edytuj"
              disabled={title === ""}
            />
            <Button onPress={()=>setToEdit(false)} title="Anuluj" />
          </View>
        </View>
      </View>
  );
  }

  if (props.details) {
    return (
        <View style={main.container}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: "10%",
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
            
          >
            <Text style={main.textTitle}>{props.details.title}</Text>
          </TouchableOpacity>
          <Checkmark/>
          <View style={{ width: "100%", height: "40%" }}>
            <Text style={main.textRegular}>{props.details.description}</Text>
          </View>
          <View style={{ width: "100%", height: "40%" }}>
            <Text style={main.textRegular}>Doświadczenie</Text>
          </View>
          <TouchableOpacity style={styles.exit}>
            <Button onPress={closeModal} title="Zamknij"></Button>
          </TouchableOpacity>
          <TouchableOpacity style={styles.edit}>
          <Button onPress={updateState} title="Edytuj"></Button>
        </TouchableOpacity>
        </View>
    );
  } else
    
      <View style={main.container}>
        <View
          style={{
            width: "100%",
            height: "10%",
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={main.textTitle}>Błąd przy pobieraniu taska!</Text>
        </View>

        <TouchableOpacity style={styles.exit}>
          <Button onPress={closeModal} title="Zamknij"></Button>
        </TouchableOpacity>
        
      </View>
};

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
