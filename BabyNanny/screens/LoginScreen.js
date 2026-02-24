import { View, StyleSheet, Animated, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText, PaperProvider } from 'react-native-paper';
import { useState, useRef, useContext } from 'react';
import { login } from '../services/services';
import Token from '../context/Token';
import User from '../context/User';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

/**
 * LoginScreen Component
 * * Provides a user interface for authentication. It features a controlled form, and
 * input validation feedback
 * * @param {Object} props - Component properties.
 * @param {Object} props.navigation - React Navigation object used for routing 
 * (to 'DrawerNavigator' on success or 'RegisterScreen').
 * * @returns {JSX.Element} A screen with a background image, login form, and error handling.
 */

export const LoginScreen = (props) => {
    const { token, setToken } = useContext(Token);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, SetError] = useState(false)
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const { t } = useTranslation();
    const [showPass, setShowPass] = useState(true);

    /**
     * shake function that triggers a shaking animation on the login form when there is an error during login.
     */
    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    /**
     * loginFull function that handles the complete login process. It sends the user's credentials to the backend,
     */

    const loginFull = async () => {
        let json = {
            name: user,
            password: password
        }
        let response = await login(json);
        console.log(response);
        if (response.status === 200) {
            setToken(response.token);
            props.navigation.navigate('DrawerNavigator')
        }
        else if (response.status == 401) {
            SetError(true);
            shake();
        }
    };

    /**
     * updateUser function that updates the user state with the input from the login form. 
     * If there is an error, it resets the error state to false to allow for new input without showing the error message.
     * 
     * @param {String} user - The user String to update the state with.
     */
    const updateUser = (user) => {
        setUser(user);
        if (error) {
            SetError(false);
        }
    };

    /**
     * updatePassword function that updates the password state with the input from the login form. 
     * Similar to updateUser, if there is an error, it resets the error state to false to allow for new
     *  input without showing the error message.
     * 
     * @param {String} password - The password String to update the state with.
     */
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
                        label={t('login.password')}
                        mode='outlined'
                        secureTextEntry={showPass}
                        right={<TextInput.Icon icon="eye" onPress={() => setShowPass(!showPass)} />}
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