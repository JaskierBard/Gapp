import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export interface Props {
  logs: any;
}

export const ConsoleItems: React.FC<Props> = (props: Props) => {
  const [reversedLogs, setReversedLogs] = useState([...props.logs]);

  useEffect(() => {
    setReversedLogs([...props.logs].reverse());
  }, [props.logs]);

  const renderLogs = ({ item }: any) => {
    return (
      <View style={missionStyles.todoContainer}>
        <Text style={missionStyles.todoTextDone}>{item}</Text>
      </View>
    );
  };

  return (
    props.logs.length > 0 && (
      <>
        <View style={missionStyles.container}>
          <FlatList
            data={reversedLogs}
            renderItem={(item) => renderLogs(item)}
            keyExtractor={(todo) => todo.id}
          />
        </View>
      </>
    )
  );
};

export const missionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 1,
    marginVertical: 1,
  },

  todoContainer: {
    padding: 1,
    marginVertical: 1,
  },

  todoTextDone: {
    color: "wheat",
    fontSize: 11,
    flex: 1,
    paddingHorizontal: 4,
    fontFamily: "gothic-font",
  },
});
