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
import { deleteItem, editItem } from "../../utils/firebase/firebaseNpc";
import { Checkmark } from "../common/Checkmark";
import { ActionButton } from "../common/Buttons/ActionButton";
import { UndoButton } from "../common/Buttons/UndoButtons";
import { EditTask } from "./EditTask";
import { BinButton } from "../common/Buttons/BinButton";

export interface Props {
  details: any;
  show: (arg: string) => void;
  addLog: (arg: string) => void;

}

export const TaskDetails = (props: Props) => {
  const [toEdit, setToEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.details.title);
  const [description, setDescription] = useState<string>(
    props.details.description
  );
  const [isCyclical, setIsCyclical] = useState<boolean>(false);

  const handleCheckChange = (newState: boolean) => {
    setIsCyclical(newState);
  };


 

  useEffect(() => {}, []);

  // const updateState = async () => {
  //   setTitle(props.details.title);
  //   setDescription(props.details.description);
  //   setToEdit(true);
  // };

  // const editTodo = async () => {
  //   editItem(props.details.id, title, description);
  //   // props.cancel;
  //   setTitle("");
  //   setDescription("");
  //   setToEdit(false);
  //   handleUndoButton;
  // };

  // if (toEdit) {
  //   return (
  //    <EditTask details={props.details}/>
  //   );
  // }

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
        <View style={{ width: "100%", height: "40%" }}>
          <Text style={main.textRegular}>{props.details.description}</Text>
        </View>
        <View style={{ width: "100%", height: "40%" }}>
          <Text style={main.textRegular}>Doświadczenie +300</Text>
        </View>
        <BinButton
            name={props.details.title}
            onClickButton={() => deleteItem(props.details.id)}
            undo={() => props.show("")}
            addLog={props.addLog}
          />
        <UndoButton onClickButton={() => props.show("")} />
        {/* <TouchableOpacity style={styles.edit}>
          <Button onPress={updateState} title="Edytuj"></Button>
        </TouchableOpacity> */}
         {/* <ActionButton
              text={"Edytuj"}
              isClicked={toEdit}
              onClickButton={()=>setToEdit(true)}
            /> */}
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
    </View>;
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
