import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export const Flame = () => {
    const [opacity, setOpacity] = useState(0.5);

    useEffect(() => {
        const intervalId = setInterval(() => {
          // Losowanie wartości z zakresu 0.0 do 1.0 z jednym miejscem po przecinku
          const randomOpacity = parseFloat((Math.random() * (1 - 0) + 0).toFixed(1));
          setOpacity(randomOpacity);
        }, 100); // 500 milisekund (co pół sekundy)
    
        // Oczyszczanie intervalu po opuszczeniu komponentu
        return () => clearInterval(intervalId);
      }, []);

  return (
    <View
      style={{
        top: '50%',
        left: '12%',
        position: "absolute",
        backgroundColor: "orange",
        width: 1,
        height: 1,
        zIndex: 2,
        opacity: opacity,
        shadowColor: "orange",
        // shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        borderRadius:50,
        // shadowRadius: 1,
        elevation: 180,        
      }}
    ></View>
  );
};

// const styles = StyleSheet.create({
//   flame: {
//     position: "absolute",
//     backgroundColor: "red",
//     width: "10%",
//     height: "10%",
//     zIndex: 2,
//   },
// });
