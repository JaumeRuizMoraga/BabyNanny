import { View, StyleSheet, Animated, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText, PaperProvider } from 'react-native-paper';
import { useState, useRef,useContext } from 'react';
import { login } from '../services/services';
import Token from '../context/Token';
import User from '../context/User';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

export const LoginScreen = (props) => {
    const {token,setToken} = useContext(Token);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, SetError] = useState(false)
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const {t} = useTranslation();
    const [showPass,setShowPass] = useState(true);

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    const loginFull = async () => {
        let json = {
            name: user,
            password: password
        }
        let response = await login(json);
        if (response.status === 200) {
            setToken(response.token);
            props.navigation.navigate('DrawerNavigator')
        }
        else {
            SetError(true);
            shake();
        }
    };

    const updateUser = (user) => {
        setUser(user);
        if (error) {
            SetError(false);
        }
    };

    const updatePassword = (password) => {
        setPassword(password);
        if (error) {
            SetError(false);
        }
    };



    return (
        <PaperProvider>
            <ImageBackground
            
                source={require("../assets/img/FondoBabyNannyMoons.png")}
                resizeMode='cover' style={styles.container}>
                <Text style={styles.title}>{t('login.welcome')}</Text>
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <TextInput
                        label={t('login.user')}
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
                        label= {t('login.password')}
                        mode='outlined'
                        secureTextEntry = {showPass}
                        right={<TextInput.Icon icon="eye" onPress={()=>setShowPass(!showPass)} />}
                        value={password}
                        onChangeText={(password) => {
                            updatePassword(password);
                        }}
                        outlineColor={error ? 'red' : '#DA70D6'}
                        activeOutlineColor={error ? 'red' : '#DA70D6'}
                        style={styles.input}
                    />
                </Animated.View>
                <HelperText type="error" visible={error} style={styles.error}>
                    {t('login.error')}
                </HelperText>
                <Button
                    mode="contained"
                    onPress={loginFull}
                    style={styles.button}
                >
                    {t('login.login')}
                </Button>
                <Text style={styles.text} onPress={() => props.navigation.navigate('RegisterScreen')}>{t('login.noUser')}</Text>
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
        borderRadius: 16,
        backgroundColor: '#D88FD8',
        padding: 10,
    },
    text: {
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: '#1100ff',
        margin: 40,
        padding: 10,
        fontSize: 12,
        borderRadius: 16,
        backgroundColor: 'white',
        borderColor: '#1100ff',
        borderWidth: 1
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