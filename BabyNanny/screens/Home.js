import { View, StyleSheet, ScrollView, FlatList, Pressable, RefreshControl } from 'react-native';
import {
    Button,
    Text,
    Avatar,
    FAB,
    Divider,
    Surface,
    SegmentedButtons,
    Modal,
    ActivityIndicator
} from 'react-native-paper';
import { useState, useContext, useTransition, useEffect, useCallback } from 'react';
import { recargar } from '../utils/utils';
import { useFocusEffect } from '@react-navigation/native';
import { BabyCard } from '../components/DatosBebe'
import { changeImage, deleteBaby,changeFeatures } from '../services/services';
import User from '../context/User';
import Token from '../context/Token';
import { BabyChange } from '../components/CambioBebe';
import { EditarDatos } from '../components/EditarDatos';
import { SleepRecord } from '../components/RegistroSueño';
import { MedicalRecord } from '../components/RegistroMedico';
import { IntakeRecord } from '../components/RegistroToma';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import { getLocalBaby, recargarDatos, getBabyPos } from '../utils/utils';
import * as ImagePicker from 'expo-image-picker';
import { default_baby_img } from '../assets/img/baby_icon';
import Baby from '../context/Baby';
import { ModalDelete } from '../components/ModalDelete';

export const Home = (props) => {
    const [type, setType] = useState();
    const { user, setUser } = useContext(User);
    const { baby, setBaby } = useContext(Baby);
    const { token, setToken } = useContext(Token);
    const [showModal, setShowModal] = useState(false);
    const [entrys, setEntrys] = useState();
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { t } = useTranslation()
    const [modalVisible, setModalVisible] = useState(false);


    const openModal = () => {
        setShowModal(true)
    }
    const changeBaby = (baby) => {
        console.log("Bebe cambiado a: ")
        console.log(baby.name)
        setBaby(getLocalBaby(user.babies, baby.id))
        setShowModal(false)
    }
    const save = (newChars) => {
        changeFeatures(newChars,baby.id, token.token);
    }
    const erraseBaby = async () => {
        let response = await deleteBaby(baby.id, token.token)
        setDel(false)
        if (response === 204) {
            let index = getBabyPos(user.babies, baby.id);
            await recargarDatos(token.token, setBaby, setUser, index, setIsLoading);
            await setBaby(user.babies[0]);


        }
        else {
            console.log("Fallo")
        }
    }
    const goConfig = () => {
        props.navigation.navigate("Config");
    }


    const openCamera = async () => {
        // Expo pide los permisos automáticamente con esta función
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Te has negado a permitir que esta aplicación use tu cámara");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // Permite recortar la foto
            aspect: [1, 1],      // La deja cuadrada para el Avatar
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            let obj = {
                image: "data:image/jpeg;base64," + result.assets[0].base64
            }
            changeImage(obj, baby.id, token.token)
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
            base64: true,
        });

        if (!result.canceled) {
            //result.assets[0].base64 esto devuelve la imagen en base64
            //result.assets[0].uri esto devuelve la ruta de la imagen en el movil
            let obj = {
                image: "data:image/jpeg;base64," + result.assets[0].base64
            }
            changeImage(obj, baby.id, token.token)
            // Aquí se actualiza el icono del bebé
            setModalVisible(false);
        }
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         recargarDatos(token.token,setBaby,setUser,baby,setIsLoading);
    //         return () => {
    //             // Opcional: Lógica cuando la pantalla pierde el foco
    //         };
    //     }, [token.token, baby?.id, user?.id])
    // );


    const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Aquí ejecutas la lógica que tenías antes
      await recargarDatos(token.token,setBaby,setUser,baby,setIsLoading); 
    } catch (error) {
      console.error("Error al recargar:", error);
    } finally {
      // Importante: detener el spinner
      setRefreshing(false);
    }
  }, [token, baby, user]);
    

    // if (isLoading) {
    //     return (
    //         <View>
    //             <ActivityIndicator size="large" color="#DA70D6" />
    //         </View>)
    // }
    const renderHeader = () => (
        <View style={styles.container}>
            <Surface style={styles.header} elevation={2}>
                <FAB
                    icon={() => (
                        <Avatar.Image
                            size={40}
                            source={{ uri: baby.image }}
                            style={{ margin: -6.7, padding: 0 }}
                        />)}
                    style={styles.fab}
                    onPress={() => openModal()}
                />
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Avatar.Image size={140} source={{ uri: baby.image }} />
                </Pressable>

                <Text variant="headlineMedium" style={styles.title}>
                    {baby.name}
                </Text>
            </Surface>

            <BabyCard baby={baby.features} />

            {/* AQUÍ PODRÁS AÑADIR TU GRÁFICA DE CRECIMIENTO EN EL FUTURO */}
            {/* <TuGrafica baby={baby} /> */}

            <SegmentedButtons
                value={entrys}
                onValueChange={setEntrys}
                style={{ marginTop: 15 }}
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
                    {
                        value: baby.medicalRecord,
                        label: t('home.med'),
                        labelStyle: { color: "#DA70D6" },
                        style: { backgroundColor: "white" },
                    },
                ]}
            />
        </View>
    );

    if (!(user.babies.length === 0)) {
        return (
            <View style={{ flex: 1, backgroundColor: '#E6E6FA' }}>
                <FlatList
                    data={entrys}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={renderHeader} // <--- Metemos el contenido arriba
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh} 
                            colors={['#DA70D6']} 
                        />
                    }
                    renderItem={({ item }) => {
                        if ("intakeAmount" in item) {
                            return <IntakeRecord entry={item} />;
                        } else if ("timeSleep" in item) {
                            return <SleepRecord entry={item} />;
                        } else {
                            return <MedicalRecord entry={item} />;
                        }
                    }}
                    contentContainerStyle={{ paddingBottom: 100 }} // Espacio para que los FAB no tapen el último item
                />

                {/* LOS FABS Y MODALES SE QUEDAN FUERA DE LA LISTA */}
                <FAB icon="pencil" style={styles.fabEdit} size='small' onPress={() => setEdit(true)} />
                <FAB icon="account" style={styles.fabUser} size='small' onPress={() => goConfig()} />
                <FAB icon="delete" style={styles.fabDelete} size='small' onPress={() => setDel(true)} />

                <Modal visible={edit} onDismiss={() => setEdit(false)} contentContainerStyle={styles.modal}>
                    <EditarDatos baby={baby.features} save={(newChars) => save(newChars)} />
                </Modal>
                <Modal visible={del} onDismiss={() => setDel(false)}>
                    <ModalDelete baby={baby.assets} onDelete={() => erraseBaby()} exit={() => setDel(false)} />
                </Modal>
                <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
                    <BabyChange goLogin={() => props.navigation.navigate("LoginScreen")} babies={user.babies} funCom={(nameBaby) => changeBaby(nameBaby)} />
                </Modal>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.imagePickerModal}>
                    <Text style={styles.modalTitle}>{t('home.selectImage')}</Text>
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" icon="camera" onPress={openCamera} style={styles.optionButton} buttonColor="#DA70D6">{t('home.useCamera')}</Button>
                        <Button mode="contained" icon="image-album" onPress={openLibrary} style={styles.optionButton} buttonColor="#DA70D6">{t('home.openGaleri')}</Button>
                    </View>
                    <Button onPress={() => setModalVisible(false)} textColor="red" style={{ marginTop: 10 }}>{t('home.cancel')}</Button>
                </Modal>
            </View>
        );
    } else {
        props.navigation.navigate("NoBaby");
        return null;
    }
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
        right: 14,
        top: 250,
    },
    fabDelete: {
        position: 'absolute',
        margin: 16,
        right: 14,
        top: 180,
    },
    fabUser: {
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
