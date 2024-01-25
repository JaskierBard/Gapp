
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Todo } from "../Tasks";




const { width, height } = Dimensions.get("window");


export default function CurrentTasks({todos}:any) {
  useEffect(() => {
    console.log(todos)
  }, []);


  const renderTodo = ({ item }: any) => {
    return (
      <View style={missionStyles.todoContainer}>
        <TouchableOpacity
          // onPress={() => showTaskDetails(item.id, item.description, item.done)}
          style={missionStyles.todo}
        >
          <Text style={missionStyles.todoTextDone}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    todos.length > 0 && (
      
      <View style={missionStyles.right}>
        <FlatList
          data={todos} 
          renderItem={(item) => renderTodo(item)}
          keyExtractor={(todo: Todo) => todo.id}
        />
      </View>
    )
  );
}

export const missionStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: (width * 94) / 100,
    height: (height * 50) / 100,
    marginTop: 100,
    marginLeft: (width * 3) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.726)",
    // fontSize: "115%",
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    padding: 10,
    marginVertical: 4,
  },
  todoTextUndone: {
    flex: 1,
    paddingHorizontal: 4,
    fontFamily: "gothic-font",
  },
  todoTextDone: {
    color: "white",
    flex: 1,
    paddingHorizontal: 4,
    fontFamily: "gothic-font",
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  left: {
    width: "30%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 2,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  current: {
    height: "20%",
    position: "relative",
    flex: 2,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  done: {
    height: "20%",
    position: "relative",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  failture: {
    height: "20%",
    position: "relative",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  information: {
    height: "20%",
    position: "relative",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  date: {
    height: "20%",
    position: "relative",
    flex: 2,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "gothic-font",

  },
  descriptionText: {
    color: "white",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "gothic-font",

  },
  right: {
    width: "50%",
    height: "100%",
    flex: 3,
    // borderWidth: 0.6,
    // borderColor: "yellow",
  },
});

