import React from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";

import { main } from "../Styles";

export interface Props {
  details: any;
  show: (arg: string) => void;
}

export const TaskDetails = (props: Props) => {
  const closeModal = () => {
    props.show("");
  };

  if (props.details) {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={props.details !== ""}
        onRequestClose={closeModal}
      >
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
            <Text style={main.textTitle}>{props.details.title}</Text>
          </View>
          <View style={{ width: "100%", height: "40%" }}>
            <Text style={main.textRegular}>{props.details.description}</Text>
          </View>
          <View style={{ width: "100%", height: "40%" }}>
            <Text style={main.textRegular}>Doświadczenie</Text>
          </View>
          <TouchableOpacity style={styles.exit}>
            <Button onPress={closeModal} title="Zamknij"></Button>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  } else
    <Modal
      animationType="none"
      transparent={true}
      visible={props.details !== ""}
      onRequestClose={closeModal}
    >
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
    </Modal>;
};

const styles = StyleSheet.create({
  exit: {
    position: "absolute",
    bottom: "2%",
    left: "35%",
  },
});
