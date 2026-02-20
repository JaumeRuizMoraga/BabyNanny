import React, { useState, useContext } from 'react'; // Corregido useState
import { View, StyleSheet, FlatList, Modal, TextInput, Text, Pressable } from 'react-native';
import { FAB, Button, Card } from 'react-native-paper';
import { MedicalRecord } from '../components/RegistroMedico';
import Baby from '../context/Baby';
import Token from '../context/Token'
import { sendMedic } from '../utils/utils';

export const MedicalRecordScreen = (props) => {
    const { baby, setBaby } = useContext(Baby);
    const { token, setToken } = useContext(Token);

    // Estado para controlar si el modal es visible
    const [modalVisible, setModalVisible] = useState(false);

    // Estado para los campos del nuevo registro
    const [newEntry, setNewEntry] = useState({ recipe: { medicine: "", dosis: 0.0, dosisTime: 0 }});

    const handleSave = () => {
            console.log(newEntry.recipe.medicine, newEntry.recipe.dosis, newEntry.recipe.dosisTime, baby.id, token.token)
            sendMedic(newEntry.recipe.medicine, newEntry.recipe.dosis, newEntry.recipe.dosisTime, baby.id, token.token)
            // Limpiamos y cerramos
            setNewEntry({recipe: { medicine: "", dosis: 0.0, dosisTime: 0 }});
            setModalVisible(false);
        
    };

    return (
        <View style={styles.layout}>
            {/* Lista de Registros */}
            <FlatList
                data={baby.medicalRecord}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <MedicalRecord entry={item} />}
                style={{ width: '100%' }}
            />

            {/* Modal para Nuevo Registro */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Nuevo Registro Médico</Text>

                        <TextInput
                            placeholder="Medicina"
                            style={styles.input}
                            value={newEntry.recipe.medicine}
                            onChangeText={(text) => setNewEntry({
                                ...newEntry, recipe: {
                                    ...newEntry.recipe, 
                                    medicine: text      // Cambia solo medicine
                                }
                            })}
                        />

                        <TextInput
                            placeholder="Dosis"
                            style={[styles.input, { height: 80 }]}
                            multiline
                            value={newEntry.recipe.dosis}
                             onChangeText={(text) => setNewEntry({
                                ...newEntry, recipe: {
                                    ...newEntry.recipe,
                                    dosis: text      // Cambia solo dosis
                                }
                            })}
                        />

                        <TextInput
                            placeholder="Duración"
                            style={[styles.input, { height: 80 }]}
                            multiline
                            value={newEntry.recipe.dosisTime}
                             onChangeText={(text) => setNewEntry({
                                ...newEntry, recipe: {
                                    ...newEntry.recipe,
                                    dosisTime: text      // Cambia solo dosisTime
                                }
                            })}
                        />

                        <View style={styles.buttonContainer}>
                            <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.btn}>
                                Cancelar
                            </Button>
                            <Button mode="contained" onPress={() => handleSave()} style={styles.btn}>
                                Guardar
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Botón Flotante */}
            <FAB
                icon="plus"
                style={styles.fab}
                size='large'
                onPress={() => setModalVisible(true)} // Abrir modal
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
    }
});