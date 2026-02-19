import { View, Text, StyleSheet, } from 'react-native'
import { Card, Divider, TextInput, HelperText, Button } from 'react-native-paper';
import { useState } from 'react';
import { comprobarDatosCompleto } from '../utils/utils';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

export const ModalDelete = () => {
    return (
        <View>
            <Text style={styles.modalTitle}>Seleccionar imagen</Text>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    icon="camera"
                    style={styles.optionButton}
                    buttonColor="#DA70D6"
                >
                    Usar Cámara
                </Button>

                <Button
                    mode="contained"
                    icon="image-album"
                    style={styles.optionButton}
                    buttonColor="#DA70D6"
                >
                    Abrir Galería
                </Button>
            </View>

            <Button
                onPress={() => setModalVisible(false)}
                textColor="red"
                style={{ marginTop: 10 }}
            >
                Cancelar
            </Button>
        </View>
    )
} 
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
    fabDelete: {
        position: 'absolute',
        margin: 16,
        right: 20,
        top: 190,
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