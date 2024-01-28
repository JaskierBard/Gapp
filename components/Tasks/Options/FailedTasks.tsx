import { StyleSheet, Text, View } from "react-native";

export default function FailedTasks() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Failed Tasks</Text>
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