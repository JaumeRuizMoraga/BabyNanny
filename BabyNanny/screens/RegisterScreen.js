import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';

export const RegisterScreen = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [email, setEmail] = useState('');

    const login = () => {
        console.log("Iniciando sesión con:", usuario, contrasenya);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>

            <TextInput
                label="Usuario" 
                mode='outlined'
                value={usuario}
                onChangeText={setUsuario}
                style={styles.input}
            />

            <TextInput
                label="Email" 
                mode='outlined'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                label="Contraseña"
                mode='outlined'
                value={contrasenya}
                onChangeText={setContrasenya}
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={login}
                style={styles.button}
            >
                Crear Usuario
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
        backgroundColor: '#E6E6FA',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#D88FD8',
        fontSize: 40
    },
    input: {
        marginBottom: 12
    },
    button: {
        marginTop: 10,
        backgroundColor:'#DA70D6'
    },
});