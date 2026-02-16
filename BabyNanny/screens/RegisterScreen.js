import { View, StyleSheet, Animated, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText, PaperProvider } from 'react-native-paper';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/i18n';

export const RegisterScreen = (props) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [error, SetError] = useState(false)
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const {t} = useTranslation();

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

    const updateMail = (mail) => {
        setMail(mail);
        if (error) {
            SetError(false);
        }
    };

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
                        label={t('register.password')}
                        mode='outlined'
                        value={password}
                        onChangeText={(password) => {
                            updatePassword(password);
                        }}
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
                        onChangeText={(mail) => {
                            updateMail(mail);
                        }}
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
                    onPress={login}
                    style={styles.button}
                >
                    {t('register.creatUser')}
                </Button>
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
    input: {
        marginBottom: 12
    },
    button: {
        backgroundColor: '#DA70D6'
    },
    error: {
        color: "red",
    },
});