import { View, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
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
import { BabyCard } from '../components/DatosBebe'
import { PermissionsAndroid, Platform, Alert } from 'react-native';
;
import { logout } from '../services/services';
import { deleteBaby } from '../services/services';

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
import { getLocalBaby } from '../utils/utils';
import * as ImagePicker from 'expo-image-picker';




export const Home = (props) => {
    const [type, setType] = useState();
        const { user, setUser } = useContext(User);
    const [ baby, setBaby ] = useState(user.babies[0]);
    const [showModal, setShowModal] = useState(false);
    const [entrys, setEntrys] = useState(baby.intakeRecord);
    const [edit, setEdit] = useState(false);
    const {t} = useTranslation()
     const [modalVisible, setModalVisible] = useState(false);
     const [babyImage, setBabyImage] = useState("");


    const openModal = () => {
        setShowModal(true)
    }
    const changeBaby = (baby) => {
        console.log("Cambiando bebe")
       setBaby(getLocalBaby(user.babies,baby.name))
       setShowModal(false)
    }
        const save = (newChars) => {
        let newBaby = baby;
        newBaby.assets = newChars
        console.log(newBaby)
    }
    const DeleteBaby = () =>{
        let response = deleteBaby(baby.id)
        if(response === 0){
            console.log("Todo bien")
        }
    }
    const goConfig = () =>{
        props.navigation.navigate("Config");
    }


const openCamera = async () => {
    // Expo pide los permisos automáticamente con esta función
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("¡Te has negado a permitir que esta aplicación use tu cámara!");
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, // Permite recortar la foto
        aspect: [1, 1],      // La deja cuadrada para el Avatar
        quality: 1,
    });

    if (!result.canceled) {
        console.log(result.assets[0].uri);
        setBabyImage(result.assets[0].uri)
        // Aquí se actualiza el icono del bebé
        setModalVisible(false);
    }
};

const openLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("¡Te has negado a permitir que esta aplicación acceda a tus fotos!");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.canceled) {
        console.log(result.assets[0].uri);
        setBabyImage(result.assets[0].uri)
        // Aquí se actualiza el icono del bebé
        setModalVisible(false);
    }
};
  

    return (
        <View style={styles.root}>
            {console.log(user.babies)}
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
                   <Pressable onPress={() => setModalVisible(!modalVisible)}>
                   <Avatar.Image size={140} source={baby.icon} />
                   </Pressable>
                   

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
                onPress={() => DeleteBaby()}
                animated={true}
            />
            <Modal visible={edit} onDismiss={() => setEdit(false)} contentContainerStyle={styles.modal}>
                <EditarDatos baby={baby.assets} save={(newChars)=>save(newChars)}></EditarDatos>
            </Modal>
            <Modal visible={showModal} onDismiss={() => setShowModal(false)}
                contentContainerStyle={styles.modal}>
                <BabyChange goLogin={props.goLogin} babies={user.babies} funCom={(nameBaby)=>changeBaby(nameBaby)}></BabyChange>
            </Modal>
            <Modal 
    visible={modalVisible} 
    onDismiss={() => setModalVisible(false)} 
    contentContainerStyle={styles.imagePickerModal} 
>
    <Text style={styles.modalTitle}>Seleccionar imagen</Text>
    
    <View style={styles.buttonContainer}>
        <Button 
            mode="contained" 
            icon="camera" 
            onPress={openCamera}
            style={styles.optionButton}
            buttonColor="#DA70D6"
        >
            Usar Cámara
        </Button>

        <Button 
            mode="contained" 
            icon="image-album" 
            onPress={openLibrary}
            style={styles.optionButton}
            buttonColor="#DA70D6"
        >
            Abrir Galería
        </Button>
    </View>

    <Button 
        onPress={() => setModalVisible(false)} 
        textColor="red" 
        style={{marginTop: 10}}
    >
        Cancelar
    </Button>
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
    imagePickerModal: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 40, // Esto le da el ancho centrado
        borderRadius: 20,
        alignItems: 'center',
       
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DA70D6',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
    },
    optionButton: {
        marginBottom: 10,
        width: '100%',
        paddingVertical: 5,
    },
});
