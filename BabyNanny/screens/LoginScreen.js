import { View, StyleSheet, Animated, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText, PaperProvider } from 'react-native-paper';
import { useState, useRef } from 'react';

export const LoginScreen = (props) => {
    const [usuario, setUsuario] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [error, SetError] = useState(false)
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    const login = () => {
        const response  = {status: 204};
        if (response.status === 204) {
            props.navigation.navigate('Home')
        }
        else {
            SetError(true);
            shake();
        }
    };

    const actualizarUsuario = (usuario) => {
        setUsuario(usuario);
        if (error) {
            SetError(false);
        }
    };

    const actualizarContrasenya = (contrasenya) => {
        setContrasenya(contrasenya);
        if (error) {
            SetError(false);
        }
    };

    return (
        <PaperProvider>
            <ImageBackground
                source={require("../assets/img/FondoBabyNannyMoons.png")}
                resizeMode='cover' style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <TextInput
                        label="Usuario"
                        mode='outlined'
                        value={usuario}
                        onChangeText={(usuario) => {
                            actualizarUsuario(usuario);
                        }}
                        style={styles.input}
                        outlineColor={error ? 'red' : '#DA70D6'}
                        activeOutlineColor={error ? 'red' : '#DA70D6'}
                    />
                </Animated.View>
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <TextInput
                        label="Contraseña"
                        mode='outlined'
                        value={contrasenya}
                        onChangeText={(contrasenya) => {
                            actualizarContrasenya(contrasenya);
                        }}
                        outlineColor={error ? 'red' : '#DA70D6'}
                        activeOutlineColor={error ? 'red' : '#DA70D6'}
                        style={styles.input}
                    />
                </Animated.View>
                <HelperText type="error" visible={error} style={styles.error}>
                    Contraseña o usuario incorrectos
                </HelperText>
                <Button
                    mode="contained"
                    onPress={login}
                    style={styles.button}
                >
                    Iniciar Sesión
                </Button>
                <Text style={styles.text} onPress={() => props.navigation.navigate('RegisterScreen')}>No tengo usuario</Text>
            </ImageBackground>
        </PaperProvider>
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
        color: 'white',
        fontSize: 40,
        borderRadius:16,
        backgroundColor: '#D88FD8',
        padding:10,
    },
    text: {
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: '#1100ff',
        margin:40,
        padding:10,
        fontSize: 12,
        borderRadius:16,
        backgroundColor: 'white',
        borderColor: '#1100ff',
        borderWidth:1
    },
    input: {
        marginBottom: 12
    },
    button: {
        marginTop: 10,
        backgroundColor: '#DA70D6'
    },
    error: {
        color: "red",
    },
});