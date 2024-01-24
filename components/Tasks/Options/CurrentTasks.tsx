import { StyleSheet, Text, View } from "react-native";

export default function CurrentTasks() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "gothic-font",
    fontSize: 22,
  },
});
