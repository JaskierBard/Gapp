import { TouchableOpacity, StyleSheet, Text } from "react-native";

export interface Props {
    line: any
    fillText: (data:any , conversationTrack?:any) => void;

  }


export const DialogueLines = (props:Props) => {
  const dialogLine = Object.values(props.line)[0] ? Object.values(props.line)[0] : "bład";
  const executeAction = async (action: any, conversationTrack?:any) => {
    if (conversationTrack) {
        props.fillText(await action(), await conversationTrack())

    } else {
        props.fillText(await action())

    }
    

    
  };
  return (
    <TouchableOpacity
      onPress={() => {
        executeAction(Object.values(props.line)[1], Object.values(props.line)[2]);
        // setID(props.missionsText[index].id);
      }}
    >
      <Text style={styles.text}>{dialogLine as string}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: "gothic-font",
    color: "wheat",
    fontSize: 12,
  },
});
