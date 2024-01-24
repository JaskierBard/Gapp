import { StyleSheet, Text, View } from "react-native";

export default function Information() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Information</Text>
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
