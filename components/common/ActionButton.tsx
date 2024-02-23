import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export interface Props {
  text: string;
  isClicked: boolean;
  onClickButton: (isChecked: boolean) => void;
}

export const ActionButton = (props: Props) => {
  const [isClicked, setisClicked] = useState<boolean>(props.isClicked);

  useEffect(() => {
    props.onClickButton(isClicked);
  }, [isClicked]);

  return (
    <TouchableOpacity
      style={buttonStyle.buttonContainer}
      onPress={() => {
        setisClicked(!isClicked);
      }}
    >
      <View style={buttonStyle.buttonContent}>
        <Text style={buttonStyle.buttonText}>{!isClicked ? props.text : 'Anuluj' }</Text>
      </View>
    </TouchableOpacity>
  );
};

export const buttonStyle = StyleSheet.create({
    buttonContainer: {
      position: "absolute",
      bottom: -70, // Odstęp od dołu
      right: 10, // Odstęp od prawej
      backgroundColor: "rgba(0, 0, 0, 0.726)",
  
      borderWidth: 0.5, // Grubość obramówki
      borderColor: "yellow", // Kolor obramówki (żółty)
      borderRadius: 8, // Zaokrąglenie narożników
      paddingHorizontal: 16, // Wypełnienie poziome
      paddingVertical: 8, // Wypełnienie pionowe
    },
    buttonContent: {
      flexDirection: "row", // Domyślnie przycisk będzie centrował tekst i ikonę w poziomie
      alignItems: "center", // Centrowanie zawartości w pionie
      justifyContent: "center", // Centrowanie zawartości w poziomie
    },
    buttonText: {
      color: "white", // Kolor tekstu (czarny)
      fontSize: 16, // Rozmiar tekstu
      fontFamily: "gothic-font",
    },
  });
