import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Button, 
  Text, 
  Avatar, 
  FAB, 
  Divider,
  Surface
} from 'react-native-paper';
import { useState, useContext } from 'react';
import { BabyCard } from '../components/DatosBebe';
import Baby from '../context/Baby';

export const Home = () => {
  const [bebe] = useState(require('../assets/icon.png'));
    const {baby, setBaby} =useContext(Baby);

  return (
    <View style={styles.root}>
      <FAB
        icon="baby-bottle-outline"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {console.log(baby.caracteristicas.edad)}
        <Surface style={styles.header} elevation={2}>
          <Avatar.Image size={140} source={bebe} />
          <Text variant="headlineMedium" style={styles.title}>
            Mi Bebé
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Panel principal
          </Text>
        </Surface>

        <BabyCard sleepPre={baby.caracteristicas.sleepPre} tomaPre={baby.caracteristicas.tomaPre} edad={baby.caracteristicas.edad}  peso={baby.caracteristicas.peso} altura={baby.caracteristicas.altura}  />
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginBottom: 25,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  subtitle: {
    color: '#777',
  },
  menu: {
    gap: 12,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 6,
    backgroundColor: '#DA70D6',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6A1B9A',
  },
});
