import { View, Text, StyleSheet, } from 'react-native'
import { Card, Divider, TextInput, HelperText, Button } from 'react-native-paper';
import { useState } from 'react';
import { comprobarDatosCompleto } from '../utils/utils';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

export const ModalDelete = (props) => {
    return (
        <View>
            <Text style={styles.modalTitle}>Estas seguro de que quieres eliminar al bebe?</Text>
            <View style={styles.modalView}>
                <Button
                    mode="contained"
                    style={styles.optionButton}
                    onPress={() => props.delete()}
                    buttonColor="#DA70D6"
                >
                    Si
                </Button>

                <Button
                    mode="contained"
                    style={styles.optionButton}
                    onPress={() => props.exit()}
                    buttonColor="#DA70D6"
                >
                    No
                </Button>
            </View>
        </View>
    )
} 
const styles = StyleSheet.create({
    modalView:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DA70D6',
        marginBottom: 20,
    },
    optionButton: {
        margin: 10,
        width: '20%',
        paddingVertical: 5,
    },
});