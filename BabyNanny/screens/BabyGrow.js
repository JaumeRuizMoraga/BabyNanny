import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";

const GrowthChart = ({ growRegister }) => {

  const weightData = growRegister.map(item => ({
    value: item.weight, 
    label: item.age
  }));
  return (
    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 10 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>Evolución de Peso (kg)</Text>
      <LineChart
        data={weightData}
        color="#DA70D6"
        thickness={3}
        dataPointsColor="#dba6da"
        noOfSections={5}      // Divisiones horizontales
        yAxisLabelSuffix=" kg"
        xAxisLabelTextStyle={{ fontSize: 10 }}
        areaChart             // Esto le da un sombreado bonito debajo de la línea
        startFillColor="#DA70D6"
        startOpacity={0.2}
        endOpacity={0.05}
        curved                // Hace que la curva sea suave, no picos rectos
      />
    </View>
  );
};