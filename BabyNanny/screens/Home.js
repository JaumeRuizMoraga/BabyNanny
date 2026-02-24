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
import { changeImage, deleteBaby, changeFeatures } from '../services/services';
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

/**
 * Home Component
 * * Principal screen of the application that displays the baby's dashboard,
 * including their records (intake, sleep, medical) and management options.
 * * @param {Object} props - Component properties.
 * @param {Object} props.navigation - React Navigation object used to switch between screens
 * (e.g., navigating to "NoBaby", "Config", or "LoginScreen").
 * * @returns {JSX.Element|null} Returns the main dashboard view, a loading indicator, 
 * or redirects to "NoBaby" if no data is found.
 */

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


    /**
     * useEffect hook that checks if the user has any registered babies. If not, it redirects to the "NoBaby" screen.
     * It also triggers the initial data loading when the component mounts, ensuring that the baby's data is fetched and displayed correctly.
     */
    useEffect(() => {
        if (user.babies.length === 0 && (!isLoading && !refreshing)) {
            props.navigation.navigate("NoBaby");
        }
    }, [user.babies, props.navigation]);
    useEffect(() => {
        const cargaInicial = async () => {
            setIsLoading(true); // it's important to set loading to true at the beginning of the data fetching process
            await recargarDatos(token.token, setBaby, setUser, baby, setIsLoading);
        };
        cargaInicial();
    }, []); // only run once when the component mounts



    /**
     * Function to open the baby selection modal, allowing the user to switch between different babies if they have more than
     *  one registered. 
     * It sets the showModal state to true, which triggers the display of the BabyChange component where users can select a
     *  different baby or log out.
     */
    const openModal = () => {
        setShowModal(true)
    }

    /**
     * changeBaby function that updates the current baby context based on the user's selection from the BabyChange component.
     * 
     * @param {Object} baby - The baby object selected by the user.
     */
    const changeBaby = (baby) => {
        console.log("Bebe cambiado a: ")
        console.log(baby.name)
        setBaby(getLocalBaby(user.babies, baby.id))
        setShowModal(false)
    }

    /**
     * save function that updates the baby's characteristics based on the user's input from the EditarDatos component.
     * 
     * @param {Object} newChars - The updated baby characteristics object.
     */
    const save = (newChars) => {
        changeFeatures(newChars, baby.id, token.token);
    }

    /**
     * ereaseBaby function that handles the deletion of the current baby. It sends a request to the backend to
     *  delete the baby and then updates the local state to reflect this change. If the deletion is successful,
     *  it reloads the user's data and sets the current baby to the first one in the list (if any).
     */
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

    /**
     * goConfig function that navigates the user to the configuration screen where they can adjust their settings, such as changing the app's language or updating their profile information.
     * It uses the navigation prop to switch to the "Config" screen when called.
     */
    const goConfig = () => {
        props.navigation.navigate("Config");
    }

    /**
     * openCamera function that handles the process of taking a new photo using the device's camera.
     *  It requests the necessary permissions, launches the camera interface, and if a photo is taken successfully,
     *  it updates the baby's profile picture by sending the new image data to the backend.
     * 
     * @returns It does not return a value but updates the baby's profile picture and closes the modal upon successful photo capture.
     */
    const openCamera = async () => {
        // Expo ImagePicker requires permissions to access the camera, so we request them first
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Te has negado a permitir que esta aplicación use tu cámara");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // it allows the user to edit the photo after taking it (crop, rotate, etc.)
            aspect: [1, 1],      // it forces the aspect ratio to be 1:1 (square), which is common for profile pictures
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            let obj = {
                image: "data:image/jpeg;base64," + result.assets[0].base64
            }
            changeImage(obj, baby.id, token.token)
            // here it updates the baby's icon
            setModalVisible(false);
        }
    };

    /**
     * openLibrary function that allows the user to select an existing photo from their device's gallery
     *  to set as the baby's profile picture.
     * 
     * @returns It does not return a value but updates the baby's profile picture and closes the modal upon successful photo selection.
     */
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
            //result.assets[0].base64 it returns the image on base64
            //result.assets[0].uri it returns the path of the image on the device
            let obj = {
                image: "data:image/jpeg;base64," + result.assets[0].base64
            }
            changeImage(obj, baby.id, token.token)
            // here it updates the baby's icon
            setModalVisible(false);
        }
    };


    /**
     * onRefresh function that handles the pull-to-refresh action on the home screen. 
     * It triggers a data reload from the backend to ensure that the displayed information is up-to-date.
     * 
     * @returns It does not return a value but updates the baby's data and user information by fetching
     *  the latest data from the backend, and it also manages the refreshing state to show or hide the loading 
     * indicator during the refresh process.
     */
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {

            await recargarDatos(token.token, setBaby, setUser, baby, setIsLoading);
        } catch (error) {
            console.error("Error al recargar:", error);
        } finally {
            // stop the spinner
            setRefreshing(false);
        }
    }, [token, baby, user]);

    if (isLoading || user.babies.length === 0) {
        return (
            <View>
                <ActivityIndicator size="large" color="#DA70D6" />
            </View>)
    }

    /**
     * renderHeader function that defines the header component for the home screen, which includes the baby's
     *  profile picture, name, and a segmented control to switch between different types of records (intake, sleep, medical).
     *  It also includes a FAB for editing the baby's information and another for opening the baby selection modal.
     * 
     * @returns {JSX.Element} Returns the header view containing the baby's profile picture, name, and segmented buttons 
     * for record types, along with the FABs for editing and changing the baby. This header is used as the
     *  ListHeaderComponent in the FlatList to ensure it stays at the top of the screen.
     */
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
                    ListHeaderComponent={renderHeader}
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
                    contentContainerStyle={{ paddingBottom: 100 }} // space for the FABs
                />

                {/* the FABs and modals are outside the list */}
                <FAB icon="pencil" style={styles.fabEdit} size='small' onPress={() => setEdit(true)} />
                <FAB icon="account" style={styles.fabUser} size='small' onPress={() => goConfig()} />
                <FAB icon="delete" style={styles.fabDelete} size='small' onPress={() => setDel(true)} />

                <Modal visible={edit} onDismiss={() => setEdit(false)} contentContainerStyle={styles.modal}>
                    <EditarDatos baby={baby.features} save={(newChars) => { save(newChars); setEdit(false) }} onClose={() => setEdit(false)} />
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
