import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import {
    Button,
    Text,
    Avatar,
    FAB,
    Divider,
    Surface,
    SegmentedButtons,
    Modal
} from 'react-native-paper';
import { useState, useContext } from 'react';
import { BabyCard } from '../components/DatosBebe';
import { RegistroToma } from '../components/RegistroToma';
import { RegistroSueño } from '../components/RegistroSueño';
import Baby from '../context/Baby';
import User from '../context/User';
import { RegistroMedico } from '../components/RegistroMedico';
import { CambioBebe } from '../components/CambioBebe';
import { EditarDatos } from '../components/EditarDatos';



export const Home = () => {
    const [tipo, setTipo] = useState();
    const { baby, setBaby } = useContext(Baby);
    const { user, setUser } = useContext(User);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [entradas, setEntradas] = useState(baby.registroTomas);
    const [editar, setEditar] = useState(false);


    const openModal = () => {
        setMostrarModal(true)
    }
    const cambiarBebe = (bebe) => {
        console.log("Cambiando a bebe: " + bebe.nombre)
    }
        const save = (newChars) => {
        let bebe = baby;
        bebe.caracteristicas = newChars
        console.log(bebe)
    }
    const deleteBaby = () =>{
        console.log("Removing: baby:"+baby.id)
    }

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Surface style={styles.header} elevation={2}>

                    <FAB
                        icon={() => (
                            <Avatar.Image
                                size={40}
                                source={baby.icon}
                                style={{ margin: -6.7, padding: 0 }}
                            />)}
                        style={styles.fab}
                        onPress={() => openModal()}
                    />
                    <Avatar.Image size={140} source={baby.icon} />


                    <Text variant="headlineMedium" style={styles.title}>
                        {baby.nombre}
                    </Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        Panel principal
                    </Text>
                </Surface>
                <BabyCard bebe={baby.caracteristicas} />
                <SegmentedButtons
                    value={entradas}
                    onValueChange={setEntradas}
                    buttons={[
                        {
                            value: baby.registroTomas,
                            labelStyle: { color: "#DA70D6" },
                            label: 'Tomas',
                            style: { backgroundColor: "white" },
                        },
                        {
                            value: baby.registroSueño,
                            labelStyle: { color: "#DA70D6" },
                            label: 'Sueño',
                            style: { backgroundColor: "white" },
                        },
                        { value: baby.registroMedico, label: 'Medico', labelStyle: { color: "#DA70D6" }, style: { backgroundColor: "white" }, },
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
            <FAB
                icon="pencil"
                style={styles.fabEdit}
                size='small'
                onPress={() => setEditar(true)}
                animated={true}
            />
            <FAB
                icon="delete"
                style={styles.fabDelete}
                size='small'
                onPress={() => deleteBaby()}
                animated={true}
            />
            <Modal visible={editar} onDismiss={() => setEditar(false)} contentContainerStyle={styles.modal}>
                <EditarDatos bebe={baby.caracteristicas} save={(newChars)=>save(newChars)}></EditarDatos>
            </Modal>
            <Modal visible={mostrarModal} onDismiss={() => setMostrarModal(false)}
                contentContainerStyle={styles.modal}>
                <CambioBebe bebes={user.bebes} funCom={cambiarBebe}></CambioBebe>
            </Modal>
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
        color: '#DA70D6',
    },
    subtitle: {
        color: '#777',
    },
    fab: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: '#E6E6FA',
        padding: 0,
        borderRadius: 180,
        margin: 0

    },
    fabEdit: {
        position: 'absolute',
        margin: 16,
        right: 20,
        top: 270,
    },
    fabDelete:{
        position: 'absolute',
        margin: 16,
        right: 20,
        top: 190,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '65%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#DA70D6"
    },
});
