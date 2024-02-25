import React, { useState } from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { main } from "../Styles";
import { addItem } from "../common/FirebaseService";
import { formatDate } from "../common/FormatDate";
import { Checkmark } from "../common/Checkmark";
import { UndoButton } from "../common/Buttons/UndoButtons";
import { ActionButton } from "../common/Buttons/ActionButton";

export interface Props {
  add: boolean;
  cancel: () => void;
}

export const AddTask = (props: Props) => {
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [expires, setExpires] = useState<Date | null>(null);
  const [isCountdown, setIsCountdown] = useState<boolean>(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCheckChange = (newState: boolean) => {
    // console.log(newState + " newstate");
    setShowDatePicker(newState);
  };
  const handleCountdownChange = (newState: boolean) => {
    setIsCountdown(newState);
  };
  const addTodo = async () => {
    console.log('add')
    addItem(title, description, expires);
    props.cancel();
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
                <Text>Dodanie taska</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.titleInput}
            placeholder="Dodaj tytuł taska"
            onChangeText={(text: string) => setTitle(text)}
            value={title}
          ></TextInput>
          <View>
            <Checkmark
              text={"Wygaśnięcie misji"}
              isChecked={showDatePicker}
              onCheckChange={handleCheckChange}
            />

            {expires && (
              <View style={styles.expiresInfoContainer}>
                <Text style={styles.expiresInfoText}>
                  Misja wygasa: {expires && formatDate(expires)}
                </Text>
                <Checkmark
                  text={"Dodać do Countdown?"}
                  isChecked={isCountdown}
                  onCheckChange={handleCountdownChange}
                />
              </View>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={expires ? expires : new Date()}
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
    
          
        </View>
        <ActionButton
            text={"Zapisz"}            
            onClickButton={()=>addTodo()}
          />
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
    // height: 40,
    borderColor: "gray",
    borderWidth: 1,
    // marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  expiresInfoContainer: {
    borderColor: "gray",
    borderWidth: 1,
    // height: 40,
    // width: 40,
    // backgroundColor:'red'
  },
  expiresInfoText: {
    color: "white",
    fontFamily: "gothic-font",
    // height: 40,

    // marginBottom: 16,
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
});
