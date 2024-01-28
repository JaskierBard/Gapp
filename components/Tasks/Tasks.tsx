import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import * as NavigationBar from "expo-navigation-bar";
import { GetTimeNow } from "../common/GetTimeNow";
import React, { useEffect, useState } from "react";
import { CurrentTasks } from "./Options/CurrentTasks";
import FinishedTasks from "./Options/FinishedTasks";
import FailedTasks from "./Options/FailedTasks";
import Information from "./Options/Information";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { TaskDetails } from "./TaskDetails";
import { button, background, missionStyles } from "../Styles";
import { AddTask } from "./AddTask";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
  description: string;
}
export default function Tasks() {
  const [activeComponent, setActiveComponent] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [details, setDetails] = useState<any>("");
  const [addTaskVisible, setAddTaskVisible] = useState<boolean>(false);

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });
    return () => subscriber();
  }, []);

  const showTaskDetails = (data: any) => {
    setDetails(data);
  };
  const cancel = () => {
    setAddTaskVisible(false);
  };

  const pickComponent = (component: string) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "current-task":
        return <CurrentTasks todos={todos} show={showTaskDetails} />;
      case "failed-task":
        return <FinishedTasks />;
      case "finished-task":
        return <FailedTasks />;
      case "information":
        return <Information />;
      default:
        return <CurrentTasks todos={todos} show={showTaskDetails} />;
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={background.image}
    >
      <View
        style={{ width: "100%", height: "100%" }}
        onTouchStart={() => NavigationBar.setVisibilityAsync("hidden")}
      >
        <View style={missionStyles.container}>
          <TaskDetails details={details} show={showTaskDetails} />
          <View style={missionStyles.left}>
            <TouchableOpacity
              style={missionStyles.current}
              onPress={() => pickComponent("current-task")}
            >
              <Text style={missionStyles.text}>Obecne {"\n"}zadania </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={missionStyles.done}
              onPress={() => pickComponent("failed-task")}
            >
              <Text style={missionStyles.text}> Wykonane {"\n"} zadania </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={missionStyles.failture}
              onPress={() => pickComponent("finished-task")}
            >
              <Text style={missionStyles.text}>Popsute {"\n"}zadania </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={missionStyles.information}
              onPress={() => pickComponent("information")}
            >
              <Text style={missionStyles.text}>Informacje {"\n"}ogólne </Text>
            </TouchableOpacity>
            <View style={missionStyles.date}>
              <GetTimeNow />
            </View>
          </View>
          <View style={missionStyles.right}>{renderComponent()}</View>

          {!addTaskVisible ? (
            <TouchableOpacity
              style={button.buttonContainer}
              onPress={() => {
                setAddTaskVisible(true);
              }}
            >
              <View style={button.buttonContent}>
                <Text style={button.buttonText}>Dodaj</Text>
              </View>
            </TouchableOpacity>
          ) : null}
          <AddTask add={addTaskVisible} cancel={cancel} />
        </View>
      </View>
    </ImageBackground>
  );
}
