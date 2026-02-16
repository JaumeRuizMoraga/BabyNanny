import { View, StyleSheet, Animated, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText, PaperProvider } from 'react-native-paper';
import { useState, useRef } from 'react';
import { login } from '../services/services';

export const LoginScreen = (props) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
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
            props.navigation.navigate('DrawerNavigator')
        }
        else {
            SetError(true);
            shake();
        }
    };

    const updateUser = (user) => {
        setUsuario(user);
        if (error) {
            SetError(false);
        }
    };

    const updatePassword = (password) => {
        setContrasenya(password);
        if (error) {
            SetError(false);
        }
    };

    const Login = async () =>{
        let json = {
            name:user,
            password:password
        }
        console.log(json)
        let objTemp = await login(json);
        props.navigation.navigate('RegisterScreen')
    }

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
                        value={user}
                        onChangeText={(user) => {
                            updateUser(user);
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
                        value={password}
                        onChangeText={(password) => {
                            actualizarContrasenya(password);
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
                <Text style={styles.text} onPress={() => Login()}>No tengo usuario</Text>
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