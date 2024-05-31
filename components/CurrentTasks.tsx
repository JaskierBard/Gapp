import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Todo } from "./Tasks/Tasks";
import { missionStyles } from "./Styles";
import { Spinner } from "./common/Spinner";

export interface Props {
  todos: Todo[];
  show: (arg: string) => void;
}

export const CurrentTasks: React.FC<Props> = ({ todos, show }) => {
  const renderTodo = ({ item }: any) => {
    if (item.isMission === true) {
      return (
        <View style={missionStyles.todoContainer}>
          <TouchableOpacity onPress={() => show(item)} style={missionStyles.todo}>
            <Text style={missionStyles.missionTodo}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={missionStyles.todoContainer}>
          <TouchableOpacity onPress={() => show(item)} style={missionStyles.todo}>
            <Text style={missionStyles.todoTextDone}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
  };


  return (
    todos.length > 0 ? (
      <>
        <View>
          <FlatList
            data={todos}
            renderItem={(item) => renderTodo(item)}
            keyExtractor={(todo: Todo) => todo.id}
          />
        </View>
      </>
    ) : (
      <Spinner />
    )
  );
};
