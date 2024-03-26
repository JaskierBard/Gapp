import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import * as NavigationBar from "expo-navigation-bar";
import { GetTimeNow } from "../common/GetTimeNow";
import React, { useEffect, useState } from "react";
import { CurrentTasks } from "../CurrentTasks";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { TaskDetails } from "./TaskDetails";
import { background, missionStyles } from "../Styles";
import { AddTask } from "./AddTask";
import { ActionButton } from "../common/Buttons/ActionButton";
import { Daily } from "./DailyTasks";


export interface Todo {
  id: string;
  title: string;
  status: string;
  description: string;
}

export interface Habbit {
  id: string;
  title: string;
  target: number;
  dates: any;
  date: Date;
}


export interface Props {
  addLog: (arg: string) => void;
}
export default function Tasks(props: Props) {
  const [activeComponent, setActiveComponent] = useState("");
  const [undoneTodos, setUndoneTodos] = useState<Todo[]>([]);
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
  const [failedTodos, setFailedTodos] = useState<Todo[]>([]);
  const [habbits, setHabbits] = useState<Habbit[]>([]);

  const [details, setDetails] = useState<any>("");
  const [addTaskVisible, setAddTaskVisible] = useState<boolean>(false);

  const handleClickAddButton = (newState: boolean) => {
    setAddTaskVisible(newState);
  };

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");
    const habbitsRef = collection(FIRESTORE_DB, "habbits");


    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const doneTodos: Todo[] = [];
        const undoneTodos: Todo[] = [];
        const failedTodos: Todo[] = [];

        snapshot.docs.forEach((doc) => {
          const todo: any = {
            id: doc.id,
            ...doc.data(),
          };

          if (todo.status === "done") {
            doneTodos.push(todo);
          } else if (todo.status === "undone") {
            undoneTodos.push(todo);
          } else if (todo.status === "failed") {
            failedTodos.push(todo);
          }
        });
        setDoneTodos(doneTodos);
        setUndoneTodos(undoneTodos);
        setFailedTodos(failedTodos);
      },
    });

    const getHabbits = onSnapshot(habbitsRef, {
      next: (snapshot) => {
        const habbits: Habbit[] = [];


        snapshot.docs.forEach((doc) => {
          const habbit: any = {
            id: doc.id,
            ...doc.data(),
          };

            habbits.push(habbit);
    
        });
        setHabbits(habbits);    

        
      },
    });
    return () => {subscriber(), getHabbits()};
  }, []);

  const showTaskDetails = (data: any) => {
    setDetails(data);
  };

  const pickComponent = (component: string) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "current-task":
        return <CurrentTasks todos={undoneTodos} show={showTaskDetails} />;
      case "finished-task":
        return <CurrentTasks todos={doneTodos} show={showTaskDetails} />;
      case "failed-task":
        return <CurrentTasks todos={failedTodos} show={showTaskDetails} />;
      case "information":
        return <Daily habbits={habbits}/>;
      default:
        return <CurrentTasks todos={undoneTodos} show={showTaskDetails} />;
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
          <TaskDetails
            addLog={props.addLog}
            details={details}
            show={showTaskDetails}
          />
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
              <Text style={missionStyles.text}>Nawyki</Text>
            </TouchableOpacity>
            <View style={missionStyles.date}>
              <GetTimeNow />
            </View>
          </View>
          <View style={missionStyles.right}>{renderComponent()}</View>

          {!addTaskVisible && details == "" && (
            <ActionButton
              text={"Dodaj Task"}
              // isClicked={addTaskVisible}
              onClickButton={handleClickAddButton}
            />
          )}

         

          <AddTask
            addLog={props.addLog}
            add={addTaskVisible}
            cancel={() => setAddTaskVisible(false)}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
