import { ImageBackground, View, Text, StyleSheet } from "react-native";
import { equipmentStyles } from "../themes/equipment";
import { height, width } from "../themes/main";

export default function StatisticsScreen({ route }: any) {
  const { statistics, equipped } = route.params;

  console.log(equipped);

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={equipmentStyles.backgroundImage}
    >
      <View style={statisticsStyles.container}>
        <View style={statisticsStyles.statsContainer}>
          <Text style={statisticsStyles.title}>POSTAĆ</Text>
          <View style={statisticsStyles.box}>
            <View style={statisticsStyles.namesContainer}>
              <Text style={statisticsStyles.names}>{statistics.statistics.class}</Text>
              <Text style={statisticsStyles.names}>Magia</Text>
              <Text style={statisticsStyles.names}>Doświadczenie</Text>
              <Text style={statisticsStyles.names}>Nast. Poziom</Text>
              <Text style={statisticsStyles.names}>Punkty nauki</Text>
            </View>
            <View style={statisticsStyles.valuesContainer}>
              <Text style={statisticsStyles.values}>Poz. {statistics.statistics.lvl}</Text>
              <Text style={statisticsStyles.values}>Krąg 0</Text>
              <Text style={statisticsStyles.values}>1111111</Text>
              <Text style={statisticsStyles.values}>1111111</Text>
              <Text style={statisticsStyles.values}>11121</Text>
            </View>
          </View>
          <Text style={statisticsStyles.title}>ATRYBUTY</Text>
          <View style={statisticsStyles.box}>
            <View style={statisticsStyles.namesContainer}>
              <Text style={statisticsStyles.names}>Siła</Text>
              <Text style={statisticsStyles.names}>Zręczność</Text>
              <Text style={statisticsStyles.names}>Mana</Text>
              <Text style={statisticsStyles.names}>Punkty trafień</Text>
            </View>
            <View style={statisticsStyles.valuesContainer}>
              <Text style={statisticsStyles.values}>{statistics.parameters.strength + equipped.parameters.strength}</Text>
              <Text style={statisticsStyles.values}>{statistics.parameters.dexterity + equipped.parameters.dexterity}</Text>
              <Text style={statisticsStyles.values}>{statistics.parameters.maxMana + equipped.parameters.maxMana}</Text>
              <Text style={statisticsStyles.values}>{statistics.parameters.maxHitpoints + equipped.parameters.maxHitpoints}</Text>
            </View>
          </View>
          <View>
            <Text style={statisticsStyles.title}>OCHRONA</Text>
            <View style={statisticsStyles.box}>
              <View style={statisticsStyles.namesContainer}>
                <Text style={statisticsStyles.names}>Broń</Text>
                <Text style={statisticsStyles.names}>Pociski</Text>
                <Text style={statisticsStyles.names}>Smoczy ogień</Text>
                <Text style={statisticsStyles.names}>Magia</Text>
              </View>

              <View style={statisticsStyles.valuesContainer}>
                <Text style={statisticsStyles.values}>{equipped.defense.weapon}</Text>
                <Text style={statisticsStyles.values}>{equipped.defense.arrow}</Text>
                <Text style={statisticsStyles.values}>{equipped.defense.fire}</Text>
                <Text style={statisticsStyles.values}>{equipped.defense.magic}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={statisticsStyles.skillsContainer}>
          <Text style={statisticsStyles.title}>UMIEJĘTNOŚCI</Text>
          <View style={statisticsStyles.box}>
            <View style={statisticsStyles.namesContainer}>
              <Text style={statisticsStyles.names}>Br. jednoręczna</Text>
              <Text style={statisticsStyles.names}>Br. dwuręczna</Text>
              <Text style={statisticsStyles.names}>Łuki</Text>
              <Text style={statisticsStyles.names}>Kusze{"\n"}</Text>

              <Text style={statisticsStyles.names}>Skradanie się</Text>
              <Text style={statisticsStyles.names}>Włamywanie się</Text>
              <Text style={statisticsStyles.names}>Kradzież kiesz.{"\n"}</Text>

              <Text style={statisticsStyles.names}>Tworzenie run</Text>
              <Text style={statisticsStyles.names}>Alchemia</Text>
              <Text style={statisticsStyles.names}>Kowalstwo</Text>
              <Text style={statisticsStyles.names}>Zbieranie trofeów</Text>
            </View>

            <View style={statisticsStyles.valuesContainer}>
              <Text style={statisticsStyles.values}>Zielony</Text>
              <Text style={statisticsStyles.values}>Zielony</Text>
              <Text style={statisticsStyles.values}>Zielony</Text>
              <Text style={statisticsStyles.values}>Zielony{"\n"}</Text>

              <Text style={statisticsStyles.values}>Uczony</Text>
              <Text style={statisticsStyles.values}>-</Text>
              <Text style={statisticsStyles.values}>Mistrz{"\n"}</Text>

              <Text style={statisticsStyles.values}>-</Text>
              <Text style={statisticsStyles.values}>-</Text>
              <Text style={statisticsStyles.values}>-</Text>
              <Text style={statisticsStyles.values}>-</Text>
            </View>
            <View style={statisticsStyles.percentContainer}>
              <Text style={statisticsStyles.values}>{statistics.parameters.one_handed + equipped.parameters.one_handed}%</Text>
              <Text style={statisticsStyles.values}>{statistics.parameters.two_handed + equipped.parameters.two_handed}%</Text>
              <Text style={statisticsStyles.values}>{statistics.parameters.bow + equipped.parameters.bow}%</Text>
              <Text style={statisticsStyles.values}>{statistics.parameters.crossbow + equipped.parameters.crossbow}%{"\n"}</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export const statisticsStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderColor: 'wheat',
    borderWidth: 1,
    width: (width * 94) / 100,
    height: (height * 40) / 100,
    marginTop: 160,
    marginLeft: (width * 3) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.726)",
    fontFamily: "gothic-font",
  },

  statsContainer: {
    borderColor: "3px solid rgba(255, 255, 0, 0.534)",
    width: (width * 50) / 100,

    flex: 4,

    height: "98%",
  },
  skillsContainer: {
    top: 0,
    width: (width * 40) / 100,
    flex: 5,
  },

  box: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  namesContainer: {
    padding: 1,
    color: "wheat",
    flex: 4,

    fontFamily: "gothic-font",
    fontSize: 10,
  },
  names: {
    padding: 1,
    color: "wheat",

    marginTop: 1,
    marginLeft: 1,

    fontFamily: "gothic-font",
    fontSize: 9,
  },
  valuesContainer: {
    color: "wheat",
    padding: 1,
    fontFamily: "gothic-font",
    fontSize: 9,
    flex: 2,
  },
  values: {
    color: "wheat",
    padding: 1,
    fontFamily: "gothic-font",
    fontSize: 9,
  },
  title: {
    top: 0,
    backgroundColor: "rgb(27, 27, 27)",
    marginTop: 5,
    marginBottom: 3,

    paddingLeft: 30,
    padding: 2,
    width: (width * 50) / 100,
    fontSize: 15,
    justifyContent: "center",
    fontFamily: "gothic-font",
    color: "wheat",
  },
  percentContainer: {
    color: "wheat",
    flex: 1,
    width: "16%",

    right: 1,
  },
});
