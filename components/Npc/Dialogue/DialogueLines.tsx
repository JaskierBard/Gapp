import { TouchableOpacity, StyleSheet, Text } from "react-native";

export interface Props {
    line: any
    fillText: (beziTalk :string, data:any , conversationTrack?:any) => void;

  }


export const DialogueLines = (props:Props) => {
  const dialogLine = Object.values(props.line)[0] ? Object.values(props.line)[0] : "bład";
  const executeAction = async (beziTalk: string, action: any, conversationTrack?:any) => {
    // console.log(conversationTrack)
    if (conversationTrack) {
        props.fillText(beziTalk ,await action(), conversationTrack)

    } else {
        props.fillText(beziTalk ,await action())

    }
    

    
  };
  return (
    <TouchableOpacity
      onPress={() => {
        executeAction(dialogLine as string ,Object.values(props.line)[1], Object.values(props.line)[2]);
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
