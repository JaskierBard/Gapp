import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Todo } from "../Tasks";
import { missionStyles } from "../../Styles";

export interface Props {
  todos: Todo[];
  show: (arg: string) => void;
}

export const CurrentTasks: React.FC<Props> = ({ todos, show }) => {
  const renderTodo = ({ item }: any) => {
    return (
      <View style={missionStyles.todoContainer}>
        <TouchableOpacity onPress={() => show(item)} style={missionStyles.todo}>
          <Text style={missionStyles.todoTextDone}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    todos.length > 0 && (
      <>
        <View style={{ borderWidth: 0.5, borderColor: "yellow" }}>
          <FlatList
            data={todos}
            renderItem={(item) => renderTodo(item)}
            keyExtractor={(todo: Todo) => todo.id}
          />
        </View>
      </>
    )
  );
};
