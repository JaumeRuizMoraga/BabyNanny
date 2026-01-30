import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';

export const LoginScreen = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasenya, setContrasenya] = useState('');

    const login = () => {
        console.log("Iniciando sesión con:", usuario, contrasenya);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>

            <TextInput
                label="Email o Usuario" 
                mode="outlined"
                value={usuario}
                onChangeText={setUsuario}
                style={styles.input}
            />

            <TextInput
                label="Contraseña"
                mode="outlined"
                value={contrasenya}
                onChangeText={setContrasenya}
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
            >
                Iniciar Sesión
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 10,
    },
});