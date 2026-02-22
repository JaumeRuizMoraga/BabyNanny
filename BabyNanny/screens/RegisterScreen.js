import { View, StyleSheet, Animated, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText, PaperProvider, Modal } from 'react-native-paper';
import { useState, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { register, verify } from '../services/services';
import '../assets/i18n';
import { Trans } from 'react-i18next';
import Token from '../context/Token';
import * as Localization from 'expo-localization'


export const RegisterScreen = (props) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [sendCode, setSendCode] = useState(false)
    const [error, setError] = useState(false);
    const [code, setCode] = useState('');
    const { token, setToken } = useContext(Token)
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const { t } = useTranslation();

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start()
    };

    const sendEmail = async () => {
        const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'en'
        let newUser = {
            name: user,
            password: password,
            email: mail,
            babies: [],
            config: {
                language: deviceLanguage
            }
        }
        let response = await register(newUser);
        if (response.status === 200) {
            setSendCode(true)
        }
        else if (response.status === 401) {
            setError(true);
            shake();
        }
    };

    const newRegister = async () => {
        let newUser = {
            name: user,
            password: password,
            email: mail,
            babies: [],
            config: {
                language: "es"
            }
        }
        let response = await verify(newUser, code);
        if (response.status === 200) {
            await setToken(response.token);
            props.navigation.navigate("DrawerNavigator")
        }
        else if (response.status === 401) {
            setError(true);
            shake();
        }
    };

    const updateUser = (user) => {
        setUser(user);
        if (error) {
            setError(false);
        }
    };

    const updatePassword = (password) => {
        setPassword(password);
        if (error) {
            setError(false);
        }
    };

    const updateMail = (mail) => {
        setMail(mail);
        if (error) {
            setError(false);
        }
    };
    const updateCode = (newCode) => {
        setCode(newCode);
        if (error) {
            setError(false)
        }
    }


    return (
        <PaperProvider>
            <ImageBackground
                source={require("../assets/img/FondoBabyNannyMoons.png")}
                resizeMode='cover' style={styles.container}>
                <Text style={styles.title}>{t('register.register')}</Text>
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <TextInput
                        label={t('register.user')}
                        mode='outlined'
                        value={user}
                        onChangeText={(user) => updateUser(user)}
                        style={styles.input}
                        outlineColor={error ? 'red' : '#DA70D6'}
                        activeOutlineColor={error ? 'red' : '#DA70D6'}
                    />
                </Animated.View>
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <TextInput
                        label={t('register.password')}
                        mode='outlined'
                        value={password}
                        onChangeText={(password) => updatePassword(password)}
                        outlineColor={error ? 'red' : '#DA70D6'}
                        activeOutlineColor={error ? 'red' : '#DA70D6'}
                        style={styles.input}
                    />
                </Animated.View>
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <TextInput
                        label={t('register.mail')}
                        mode='outlined'
                        value={mail}
                        onChangeText={(mail) => updateMail(mail)}
                        outlineColor={error ? 'red' : '#DA70D6'}
                        activeOutlineColor={error ? 'red' : '#DA70D6'}
                        style={styles.input}
                    />
                </Animated.View>
                <HelperText type="error" visible={error} style={styles.error}>
                    {t('register.error')}
                </HelperText>
                <Button
                    mode="contained"
                    onPress={() => sendEmail()}
                    style={styles.button}
                >
                    {t('register.creatUser')}
                </Button>
            </ImageBackground>
            <Modal visible={sendCode} onDismiss={() => setSendCode(false)} contentContainerStyle={styles.modal}>
                <Text style={{ textAlign: 'center' }}><Trans
                    i18nKey="register.mailMessage"
                    values={{ mail: mail }}
                    components={[
                        <Text style={{ color: '#DA70D6' }} />
                    ]}
                /></Text>
                <TextInput style={styles.modalInput} value={code} mode='outlined' onChangeText={(newCode) => updateCode(newCode)}></TextInput>
                <Button
                    mode="contained"
                    onPress={() => newRegister()}
                    style={styles.button}
                >
                    {t('register.creatUser')}
                </Button>
                <HelperText type="error" visible={error} style={styles.error}>
                    {t('register.error')}
                </HelperText>
            </Modal>
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
    input: {
        marginBottom: 12
    },
    button: {
        backgroundColor: '#DA70D6'
    },
    error: {
        color: "red",
    },
    modal: {
        borderWidth: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#DA70D6',
        borderRadius: 10,
    },
    modalInput: {
        height: '10%',
        width: '80%',
        margin: 20
    }
});