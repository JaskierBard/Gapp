import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { main } from "../Styles";
import { addItem } from "../common/FirebaseService";
import { formatDate } from "../common/FormatDate";
import { Checkmark } from "../common/Checkmark";
import { UndoButton } from "../common/Buttons/UndoButtons";
import { ActionButton } from "../common/Buttons/ActionButton";
import { MissionAi } from "../common/AiMissions/MissionAi";

export interface Props {
  add: boolean;
  cancel: () => void;
  addLog: (arg: string) => void;
}

export const AddTask = (props: Props) => {
  const [title, setTitle] = useState<any>("");
  const [expires, setExpires] = useState<Date | null>(null);
  const [isCountdown, setIsCountdown] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCheckChange = (newState: boolean) => {
    setShowDatePicker(newState);
  };
  const handleCountdownChange = (newState: boolean) => {
    setIsCountdown(newState);
  };
  const addTodo = async () => {
    const description = await MissionAi(
      title + " podaj odpowiedź (jako `mission`)"
    );
    props.cancel();
    await addItem(title, description["mission"], expires);
    props.addLog("Nowa misja: " + title);
    setTitle("");
  };

  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate || new Date();
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
          {expires && (
            <View style={styles.expiresInfoContainer}>
              <Text style={styles.expiresInfoText}>
                Misja wygasa: {expires && formatDate(expires)}
              </Text>
            </View>
          )}
          <View style={styles.checkmarks}>
            <Checkmark
              text={"Wygaśnięcie misji"}
              isChecked={showDatePicker}
              onCheckChange={handleCheckChange}
            />
            <Checkmark
              text={"Dodać do Countdown?"}
              isChecked={isCountdown}
              onCheckChange={handleCountdownChange}
            />
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={expires ? expires : new Date()}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <ActionButton text={"Zapisz"} onClickButton={() => addTodo()} />
        <UndoButton onClickButton={props.cancel} />
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
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  expiresInfoContainer: {
    borderColor: "gray",
    borderWidth: 1,
  },
  expiresInfoText: {
    color: "white",
    fontFamily: "gothic-font",
    paddingHorizontal: 8,
    fontSize: 12,
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
  checkmarks: {
    height: 60,
    bottom: 10,
  },
});
