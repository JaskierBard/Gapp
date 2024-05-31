import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface Props {
  
  end: (arg: string | null) => void;
}

export  const  Trade = (props:Props) => {
  console.log('handel')
  return (
    <View style={styles.container}>
      <View style={styles.top}><Text>Elooo</Text></View>
      <View style={styles.bottom}></View>
      <TouchableOpacity onPress={()=>props.end}>
              <Text style={styles.text}>Koniec</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // backgroundColor: 'red',
   

  },
  top: {
    position: "absolute",
    backgroundColor: 'yellow',
    // top: -610,

    height: 250,
    width: "94%",
  },
  bottom: {
    position: "absolute",
    backgroundColor: 'blue',
    bottom: 100,

    height: 250,
    width: "94%",
  },
  text: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: "gothic-font",
    color: "wheat",
    fontSize: 12,
  },
});
