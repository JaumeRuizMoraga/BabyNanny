import { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { 
  SegmentedButtons, 
  Card, 
  Text 
} from 'react-native-paper';

export const BabyRecordsList = (props) => {
  const [selected, setSelected] = useState('Tomas');

  const data = useMemo(() => {
    switch (selected) {
      case 'Sueno':
        return props.registroSueño;
      case 'Medico':
        return props.registroMedico;
      default:
        return props.registroTomas;
    }
  }, [selected, props.registroTomas, props.registroSueño, props.registroMedico]);

  const renderItem = ({ item }) => {
    if (item.tipo === 'Medico') {
      return (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Consulta médica</Text>
            <Text>Fecha: {item.date}</Text>
            <Text>Medicamento: {item.receta.medicamento}</Text>
            <Text>Dosis: {item.receta.dosis} mg</Text>
            <Text>Duración: {item.receta.duracion} h</Text>
          </Card.Content>
        </Card>
      );
    }

    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">{item.tipo}</Text>
          <Text>Fecha: {item.date}</Text>
          <Text>
            {item.tipo === 'Toma' ? 'Cantidad' : 'Duración'}: {item.data}
            {item.tipo === 'Toma' ? ' ml' : ' min'}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View >
        
      <SegmentedButtons
        value={selected}
        onValueChange={setSelected}
        buttons={[
          { value: 'Tomas', label: 'Tomas', icon: 'baby-bottle' },
          { value: 'Sueno', label: 'Sueño', icon: 'sleep' },
          { value: 'Medico', label: 'Médico', icon: 'medical-bag' },
        ]}
        style={styles.segment}
      />
        
      <FlatList
        data={data}
        keyExtractor={(index) => index.toString()}
        renderItem={renderItem}
       
        showsVerticalScrollIndicator={false}
      />
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segment: {
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 12,
    borderRadius: 14,
  },
});
