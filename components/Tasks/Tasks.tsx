import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

import { GetTimeNow } from "../common/GetTimeNow";
import React, { useEffect, useState } from "react";
import {CurrentTasks} from "./Options/CurrentTasks";
import FinishedTasks from "./Options/FinishedTasks";
import FailedTasks from "./Options/FailedTasks";
import Information from "./Options/Information";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { TaskDetails } from "./TaskDetails";
import { main, button, background } from "../Styles";
import { AddTask } from "./AddTask";

const { width, height } = Dimensions.get("window");
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
        // console.log(details)
        setTodos(todos);
      },
    });
    return () => subscriber();
  }, []);

  const showTaskDetails = (data:any) => {
    setDetails(data)
  }
  const cancel = () => {
    setAddTaskVisible(false)
  }


  const pickComponent = (component: string) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "current-task":
        return <CurrentTasks todos={todos} show={showTaskDetails}/>;
      case "failed-task":
        return <FinishedTasks />;
      case "finished-task":
        return <FailedTasks />;
      case "information":
        return <Information />;
      default:
        return <Text>Wybierz komponent</Text>;
    }
  };

  return (
    <ImageBackground
    source={require("../../assets/images/background.jpg")}
    style={background.image}
  >
    <View style={missionStyles.container}>
      <TaskDetails details={details} show={showTaskDetails}/>
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
    

      <TouchableOpacity
       style={button.buttonContainer}
       onPress={() => {
         setAddTaskVisible(true)
       }}
    >
      <View style={button.buttonContent}>
        <Text style={button.buttonText}>Dodaj</Text>
      </View>
    </TouchableOpacity>
      <AddTask add={addTaskVisible} cancel={cancel}/>
    </View>
    </ImageBackground>

  );
}

const missionStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: (width * 94) / 100,
    height: (height * 50) / 100,
    marginTop: 200,
    marginLeft: (width * 3) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.726)",
    position: "relative",
  },
  left: {
    width: "30%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 3,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  right: {
    width: "50%",
    height: "100%",
    flex: 6,
    // borderWidth: 0.6,
    // borderColor: "yellow",
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
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "gothic-font",
  },
  date: {
    height: "20%",
    position: "relative",
    flex: 2,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
});
