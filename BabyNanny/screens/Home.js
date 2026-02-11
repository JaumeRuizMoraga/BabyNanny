import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import {
    Button,
    Text,
    Avatar,
    FAB,
    Divider,
    Surface,
    SegmentedButtons
} from 'react-native-paper';
import { useState, useContext } from 'react';
import { BabyCard } from '../components/DatosBebe';
import { RegistroToma } from '../components/RegistroToma';
import { RegistroSueño } from '../components/RegistroSueño';
import Baby from '../context/Baby';
import { RegistroMedico } from '../components/RegistroMedico';


export const Home = () => {
    const [bebe] = useState(require('../assets/icon.png'));
    const [tipo, setTipo] = useState();
    const { baby, setBaby } = useContext(Baby);
    const [entradas, setEntradas] = useState(baby.registroTomas);

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Surface style={styles.header} elevation={2}>
                    <FAB
                        icon={() => (
                            <Avatar.Image
                                size={35}
                                source={bebe}
                                style={{ margin: 0, padding: 0, alignItems: 'center',justifyContent: 'center', }}
                            />)}
                        style={styles.fab}
                        onPress={() => console.log('Pressed')}
                    />
                    <Avatar.Image size={140} source={bebe} />
                    <Text variant="headlineMedium" style={styles.title}>
                        Mi Bebé
                    </Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        Panel principal
                    </Text>
                </Surface>
                <BabyCard sleepPre={baby.caracteristicas.sleepPre} tomaPre={baby.caracteristicas.tomaPre} edad={baby.caracteristicas.edad} peso={baby.caracteristicas.peso} altura={baby.caracteristicas.altura} />
                <SegmentedButtons
                    value={entradas}
                    onValueChange={setEntradas}
                    buttons={[
                        {
                            value: baby.registroTomas,
                            label: 'Tomas',
                        },
                        {
                            value: baby.registroSueño,
                            label: 'Sueño',
                        },
                        { value: baby.registroMedico, label: 'Medico' },
                    ]}
                />
            </View>
            <FlatList
                data={entradas}
                keyExtractor={(item, index) => item + index.toString()}
                renderItem={({ item }) => {
                    switch (item.tipo) {
                        case "Medico":
                            return <RegistroMedico entry={item} />;
                        case "Toma":
                            return <RegistroToma entry={item} />;
                        case "Sueño":
                            return <RegistroSueño entry={item} />;
                        default:
                            return;
                    }
                }
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#E6E6FA',
    },
    container: {
        margin: 20
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#FFF',
    },
    title: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#6A1B9A',
    },
    subtitle: {
        color: '#777',
    },
    fab: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: '#6A1B9A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        margin: 0

    },
});
