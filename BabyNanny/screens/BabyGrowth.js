import { LineChart } from "react-native-gifted-charts";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import {
  Surface, PaperProvider
} from 'react-native-paper';
import { useContext } from 'react';
import Baby from "../context/Baby";
import { averageGrowthData } from "../assets/averageBabyGrowth";

export const BabyGrowth = () => {
  const { baby } = useContext(Baby);
  const records = [...baby.featuresRecord].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const weightData = records.map(item => ({
    value: item.features.weight,
    label: `${item.features.age}`,
  }));

  const averageWeight = averageGrowthData.map(item => ({
    value: item.weight,
    label: `${item.age}`,
  }));

  const averageHeight = averageGrowthData.map(item => ({
    value: item.height,
    label: `${item.age}`,
  }));

  const heightData = records.map(item => ({
    value: item.features.height,
    label: `${item.features.age}`,
  }));

  return (
    <ScrollView>
      <PaperProvider>
        <ImageBackground
          source={require("../assets/img/FondoBabyNannyMoons.png")}
          resizeMode='cover' style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#E6E6FA',
          }}>
          <View style={{ padding: 20 }}>
            <Surface style={{
              alignItems: 'center',
              margin: 20,
              padding: 20,
              borderRadius: 20,
              backgroundColor: '#FFF',
            }} elevation={2}>
              <Text style={{ fontWeight: 'bold', marginBottom: 30 }}>Evolución de Peso (kg)</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginLeft: -15 }}>
                <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    width: 100,
                    left: 7,
                    bottom: 40,
                    color: 'gray',
                    transform: [{ rotate: '-90deg' }]
                  }}>
                    Peso (kg)
                  </Text>
                </View>
                <LineChart
                  data={averageWeight}
                  data2={weightData}
                  color1="#7d7192f1"
                  dataPointsColor1="#7d7192f1"
                  startFillColor1="#7d7192f1"
                  color2="#DA70D6"
                  dataPointsColor2="#dba6da"
                  startFillColor2="#DA70D6"
                  thickness={3}
                  dataPointsColor="#dba6da"
                  noOfSections={5}
                  yAxisColor={"#dba6da"}
                  xAxisColor={"#dba6da"}
                  yAxisTextStyle={{ fontSize: 12, height: 40 }}
                  xAxisLabelTextStyle={{ fontSize: 12, width: 40 }}
                  areaChart2
                  startOpacity={0.2}
                  endOpacity={0.05}
                  curved
                  spacing={45}
                />
              </View>
              <Text style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 12,
                fontWeight: 'bold',
                color: 'gray'
              }}>
                Edad del Bebé (meses)
              </Text>
            </Surface>
            <Surface style={{
              alignItems: 'center',
              padding: 20,
              margin: 20,
              borderRadius: 20,
              backgroundColor: '#FFF',
            }} elevation={2}>
              <Text style={{ fontWeight: 'bold', marginBottom: 30 }}>Evolución de Altura (cm)</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginLeft: -15 }}>
                <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    width: 100,
                    left: 7,
                    bottom: 40,
                    color: 'gray',
                    transform: [{ rotate: '-90deg' }]
                  }}>
                    Altura (cm)
                  </Text>
                </View>
                {console.log(averageWeight)}
                {console.log(averageHeight)}
                <LineChart
                  data={averageHeight}
                  data2={heightData}
                  color2='#b8b8f7'
                  thickness={3}
                  color1="#7d7192f1"
                  dataPointsColor1="#7d7192f1"
                  startFillColor1="#7d7192f1"
                  dataPointsColor2='#9f9ff7'
                  yAxisColor={'#b8b8f7'}
                  xAxisColor={'#b8b8f7'}
                  noOfSections={5}
                  yAxisTextStyle={{ fontSize: 12, height: 40 }}
                  xAxisLabelTextStyle={{ fontSize: 12, width: 40 }}
                  areaChart
                  startFillColor2='#b8b8f7'
                  startOpacity={0.2}
                  endOpacity={0.05}
                  curved
                  spacing={45}
                />
              </View>
              <Text style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 12,
                fontWeight: 'bold',
                color: 'gray'
              }}>
                Edad del Bebé (meses)
              </Text>
            </Surface>
          </View>
        </ImageBackground>
      </PaperProvider>
    </ScrollView >
  );
};