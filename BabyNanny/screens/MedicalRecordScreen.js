import React, { useState, useContext, useCallback } from 'react'; // Corregido useState
import { View, StyleSheet, FlatList, Modal, TextInput, Text, Pressable, RefreshControl } from 'react-native';
import { FAB, Button, Card } from 'react-native-paper';
import { MedicalRecord } from '../components/RegistroMedico';
import Baby from '../context/Baby';
import Token from '../context/Token'
import User from '../context/User'
import { sendMedic } from '../utils/utils';
import { recargarDatos } from '../utils/utils';

/**
 * MedicalRecordScreen Component
 * * Displays a list of medical records for a specific baby and provides 
 * a modal interface to add new prescriptions or medical entries.
 * * @param {Object} props - Component properties.
 * @param {Object} props.navigation - Navigation object to handle screen transitions.
 * * @returns {JSX.Element} A view containing a FlatList of medical records and 
 * a Floating Action Button (FAB) to trigger the entry modal.
 */

export const MedicalRecordScreen = (props) => {
    const { baby, setBaby } = useContext(Baby);
    const { token, setToken } = useContext(Token);
    const { user, setUser } = useContext(User);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    // state to control the visibility of the modal for adding a new medical record
    const [modalVisible, setModalVisible] = useState(false);


    const [newEntry, setNewEntry] = useState({ recipe: { medicine: "", dosis: 0.0, dosisTime: 0 } });


    /**
     * handleSave function that is called when the user presses the save button in the modal to add a new medical record.
     *  It sends the new record data to the backend and then resets the newEntry state and closes the modal.
     */
    const handleSave = () => {
        console.log(newEntry.recipe.medicine, newEntry.recipe.dosis, newEntry.recipe.dosisTime, baby.id, token.token)
        sendMedic(newEntry.recipe.medicine, newEntry.recipe.dosis, newEntry.recipe.dosisTime, baby.id, token.token)
        setNewEntry({ recipe: { medicine: "", dosis: 0.0, dosisTime: 0 } });
        setModalVisible(false);

    };

    /**
     * handlePressMedicine function that updates the newEntry state with the medicine name and checks if the
     *  input is empty to enable
     * 
     * @param {String} text - The text input from the medicine field in the modal.
     *  This function updates the newEntry state with the medicine name and checks if the input is empty to enable
     *  or disable the save button accordingly. 
     */

    const handlePressMedicine = (text) => {
        setNewEntry({
            ...newEntry, recipe: {
                ...newEntry.recipe,
                medicine: text      // it only changes medicine
            }
        })
        if (text === null || text === '') {
            setIsEmpty(true)
        }
        else {
            setIsEmpty(false)
        }
    }

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

    return (
        <View style={styles.layout}>
            {/* record list */}
            <FlatList
                data={baby.medicalRecord}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#DA70D6']} // Android
                        tintColor={'#DA70D6'} // iOS
                    />
                }
                renderItem={({ item }) => <MedicalRecord entry={item} />}
                style={{ width: '100%' }}
            />

            {/* Modal for new record */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>New Medical Record</Text>

                        <TextInput
                            placeholder="Medicine"
                            style={styles.input}
                            value={newEntry.recipe.medicine}
                            onChangeText={(text) => handlePressMedicine(text)} // it only changes medicine calling a separate function to handle the empty check
                        />

                        <TextInput
                            placeholder="Dosis"
                            style={[styles.input, { height: 80 }]}
                            multiline
                            value={newEntry.recipe.dosis}
                            onChangeText={(text) => setNewEntry({
                                ...newEntry, recipe: {
                                    ...newEntry.recipe,
                                    dosis: text      // it only changes dosis
                                }
                            })}
                        />

                        <TextInput
                            placeholder="Dosis Time"
                            style={[styles.input, { height: 80 }]}
                            multiline
                            value={newEntry.recipe.dosisTime}
                            onChangeText={(text) => setNewEntry({
                                ...newEntry, recipe: {
                                    ...newEntry.recipe,
                                    dosisTime: text      // it only changes dosisTime
                                }
                            })}
                        />

                        <View style={styles.buttonContainer}>
                            <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.btn}>
                                Discard
                            </Button>
                            <Button disabled={isEmpty} mode="contained" onPress={() => handleSave()} style={styles.btn}>
                                Save
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <FAB
                icon="plus"
                style={styles.fab}
                size='large'
                onPress={() => setModalVisible(true)} // open modal on press
            />
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        padding: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#DA70D6'
    }
});