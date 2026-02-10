import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text,HelperText } from 'react-native-paper';
import { useState } from 'react';

export const LoginScreen = (props) => {
    const [usuario, setUsuario] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [error,SetError] = useState(false)

    const login = () => {
        const data = true;
        ///Aqui iria la funcion getData que devolvera un Codigo http dependiendo de si se ha encontrado o no el usuario
        if (data) {
            props.navigation.navigate('Home')
        }
        else {
            SetError(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <TextInput
                label="Usuario"
                mode='outlined'
                value={usuario}
                onChangeText={setUsuario}
                style={styles.input}
            />
            <HelperText type="error" visible={error}>
                Usuario incorrecto
            </HelperText>
            <TextInput
                label="Contraseña"
                mode='outlined'
                value={contrasenya}
                onChangeText={setContrasenya}
                style={styles.input}
            />
            <HelperText type="error" visible={error}>
                Contraseña incorrecta
            </HelperText>
            <Button
                mode="contained"
                onPress={login}
                style={styles.button}
            >
                Iniciar Sesión
            </Button>
            <Text style={styles.text} onPress={() =>props.navigation.navigate('RegisterScreen')}>No tengo usuario</Text>
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
    text: {
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: '#1100ff',
        fontSize: 12
    },
    input: {
        marginBottom: 12
    },
    button: {
        marginTop: 10,
        backgroundColor: '#DA70D6'
    },
});