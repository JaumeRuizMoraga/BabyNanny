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
import { useState, useContext, useTransition } from 'react';
import { BabyCard } from '../components/DatosBebe';
import Baby from '../context/Baby';
import User from '../context/User';
import { BabyChange } from '../components/CambioBebe';
import { EditarDatos } from '../components/EditarDatos';
import { SleepRecord } from '../components/RegistroSueño';
import { MedicalRecord } from '../components/RegistroMedico';
import { IntakeRecord } from '../components/RegistroToma';
import { comprobarDatosCompleto } from '../utils/utils';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';



export const Home = (props) => {
    const [type, setType] = useState();
    const { baby, setBaby } = useContext(Baby);
    const { user, setUser } = useContext(User);
    const [showModal, setShowModal] = useState(false);
    const [entrys, setEntrys] = useState(baby.intakeRecord);
    const [edit, setEdit] = useState(false);
    const {t} = useTranslation()


    const openModal = () => {
        setShowModal(true)
    }
    const changeBaby = (baby) => {
        console.log("Cambiando a bebe: " + baby.name)
    }
        const save = (newChars) => {
        let newBaby = baby;
        newBaby.assets = newChars
        console.log(newBaby)
    }
    const deleteBaby = () =>{
        console.log("Removing baby:"+baby.id)
    }
    const goConfig = () =>{
        props.navigation.navigate("Config");
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
                        {baby.name}
                    </Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        
                    </Text>
                </Surface>
                <BabyCard baby={baby.assets} />
                <SegmentedButtons
                    value={entrys}
                    onValueChange={setEntrys}
                    buttons={[
                        {
                            value: baby.intakeRecord,
                            labelStyle: { color: "#DA70D6" },
                            label: t('home.intk'),
                            style: { backgroundColor: "white" },
                        },
                        {
                            value: baby.sleepRecord,
                            labelStyle: { color: "#DA70D6" },
                            label: t('home.sleep'),
                            style: { backgroundColor: "white" },
                        },
                        { value: baby.medicalRecord, label: t('home.med'), labelStyle: { color: "#DA70D6" }, style: { backgroundColor: "white" }, },
                    ]}
                />
            </View>
            <FlatList
                data={entrys}
                keyExtractor={(item, index) => item + index.toString()}
                renderItem={({ item }) => {
                    switch (item.type) {
                        case "Medico":
                            return <MedicalRecord entry={item} />;
                        case "Toma":
                            return <IntakeRecord entry={item} />;
                        case "Sueño":
                            return <SleepRecord entry={item} />;
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
                onPress={() => setEdit(true)}
                animated={true}
            />
                        <FAB
                icon="account"
                style={styles.fabUser}
                size='small'
                onPress={() => goConfig()}
                animated={true}
            />
            <FAB
                icon="delete"
                style={styles.fabDelete}
                size='small'
                onPress={() => deleteBaby()}
                animated={true}
            />
            <Modal visible={edit} onDismiss={() => setEdit(false)} contentContainerStyle={styles.modal}>
                <EditarDatos baby={baby.assets} save={(newChars)=>save(newChars)}></EditarDatos>
            </Modal>
            <Modal visible={showModal} onDismiss={() => setShowModal(false)}
                contentContainerStyle={styles.modal}>
                <BabyChange babies={user.babies} funCom={changeBaby}></BabyChange>
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
    fabUser:{
        position: 'absolute',
        margin: 16,
        right: 325,
        top: 10,
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
