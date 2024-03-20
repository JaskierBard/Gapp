import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");
const windowBadckground = "rgba(0, 0, 0, 0.726)";

export const main = StyleSheet.create({
  container: {
    position: "absolute",
    width: (width * 94) / 100,
    height: (height * 50) / 100,
    borderWidth: 0.5,
    borderColor: "yellow",
    backgroundColor: "black",
    zIndex: 2,
  },
  textTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "gothic-font",
  },
  textRegular: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    fontFamily: "gothic-font",
  },
});



export const background = StyleSheet.create({
  image: {
    position: 'absolute',
    width: width ,
    height: (height * 1.1),
        // height: (height * 1.055),

    // resizeMode: 'cover',

  },
});

export const missionStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: (width * 94) / 100,
    height: (height * 50) / 100,
    marginTop: 200,
    marginLeft: (width * 3) / 100,
    backgroundColor: windowBadckground,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  todoContainer: {
    // backgroundColor: 'grey',
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 1,
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

  missionTodo: {
      color: "green",
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
    borderRightWidth: 0.5,
    borderColor: "yellow",
  },
  current: {
    height: "20%",
    position: "relative",
    flex: 2,
    borderBottomWidth: 0.5,
    borderColor: "yellow",
    justifyContent: 'flex-end', // Umieść tekst na dole
    alignItems: 'center',     // Umieść tekst po prawej stronie
    padding: 10,    
  },
  done: {
    height: "20%",
    position: "relative",
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: "yellow",
    justifyContent: 'flex-end', // Umieść tekst na dole
    alignItems: 'flex-end',     // Umieść tekst po prawej stronie
    padding: 10,    
  },
  failture: {
    height: "20%",
    position: "relative",
    flex: 1,
    justifyContent: 'flex-end', // Umieść tekst na dole
    alignItems: 'center',     // Umieść tekst po prawej stronie
    padding: 10,        borderBottomWidth: 0.5,
    borderColor: "yellow",
  },
  information: {
    height: "20%",
    position: "relative",
    flex: 1,
    justifyContent: 'flex-end', // Umieść tekst na dole
    alignItems: 'flex-end',     // Umieść tekst po prawej stronie
    padding: 10,        borderBottomWidth: 0.5,
    borderColor: "yellow",
  },
  date: {
    height: "20%",
    position: "relative",
    flex: 2,
    justifyContent: 'flex-start', // Umieść tekst na dole
    alignItems: 'flex-end',     // Umieść tekst po prawej stronie
    padding: 10,        // borderWidth: 0.5,
    // borderColor: "yellow",
  },
  text: {
    // textAlign: "center",
    color: "white",
    fontSize: 15,
    // marginLeft: 10,
    // marginTop: 5,
    // marginBottom: 5,
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
