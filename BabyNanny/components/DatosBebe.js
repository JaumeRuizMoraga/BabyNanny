import { StyleSheet, View } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';

export const BabyCard = (props) => {
 
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Características del bebé
        </Text>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Edad</Text>
          <Text style={styles.value}>{props.edad} meses</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Altura</Text>
          <Text style={styles.value}>{props.altura} cm</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Peso</Text>
          <Text style={styles.value}>{props.peso} kg</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Tomas promedio</Text>
          <Text style={styles.value}>{props.tomaPre} oz</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Sueño promedio</Text>
          <Text style={styles.value}>{props.sleepPre} min</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginVertical: 12,
    backgroundColor: '#FFF',
  },
  title: {
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 6,
  },
  divider: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    color: '#555',
  },
  value: {
    fontWeight: '600',
    color: '#333',
  },
});
