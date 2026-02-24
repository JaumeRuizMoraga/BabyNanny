import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { IconButton, Button, Surface, Modal, PaperProvider } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { SelectorSleepToma } from '../components/SelectorSleepToma';
import { useContext } from 'react';
import { Audio } from 'expo-av';
import User from '../context/User';
import Token from '../context/Token';
import Baby from '../context/Baby';
import { sendSleep, sendIntake } from '../utils/utils';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

/**
 * SleepScreen Component
 * * An interactive dashboard designed to manage the baby's rest and feeding. 
 * It features three main functionalities:
 * 1. Quick Logging: Sends pre-configured intake and sleep data to the server.
 * 2. Audio Player: Controls a continuous lullaby loop using `expo-av`.
 * 3. Manual Entry: Allows adjusting specific values through a selector component in a modal.
 * * @returns {JSX.Element} Screen with a themed background, quick-action buttons, and audio controls.
 */

export const SleepScreen = () => {
    const songSleep = (require("../assets/audio/lullaby.mp3"))
    const { t } = useTranslation()
    const [manual, setManual] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [song, setSong] = useState();
    const { user, setUser } = useContext(User);
    const { token, setToken } = useContext(Token);
    const { baby, setBaby } = useContext(Baby);


    /**
     * postSleep and postIntake functions that are called when the user presses the respective buttons for sleep and intake.
     */
    const postSleep = async () => {
        sendSleep(baby.features.sleepPre, baby.id, token.token);

    }
    /**
     * postIntake function that is called when the user presses the intake button. It sends the pre-configured intake data to the backend.
     */
    const postIntake = async () => {
        sendIntake(baby.features.intakePre, baby.id, token.token);

    }

    /**
     * playAudio function that controls the playback of a lullaby audio file. 
     * It uses the `expo-av` library to play
     */
    const playAudio = async () => {
        if (!playing) {
            const { sound } = await Audio.Sound.createAsync(
                songSleep, {
                shouldPlay: true, // Reproduce automatically
                isLooping: true,  // Repite en bucle
            }
            );
            setSong(sound);
            setPlaying(true)
            await sound.playAsync();
        } else {
            await song.stopAsync();
            setPlaying(false)
        }
    }
    useEffect(() => {
        return () => {
            if (song) {
                song.unloadAsync(); // stop and unload the sound when the component unmounts
            }
        };
    }, [song]);

    return (
        <PaperProvider>
            <ImageBackground
                source={require("../assets/img/FondoBabyNannyStars.png")}
                resizeMode='cover'
                style={styles.container}>
                <Surface style={{ borderRadius: 240, margin: 10 }}>
                    <IconButton
                        icon="baby-bottle"
                        size={200}
                        iconColor='white'
                        style={styles.butonIntake}
                        onPress={() => postIntake()}
                    ></IconButton>
                </Surface>
                <IconButton
                    icon="music-note"
                    size={50}
                    iconColor='white'
                    style={styles.butonSong}
                    onPress={() => playAudio()}
                ></IconButton>
                <Surface style={{ borderRadius: 240, margin: 10 }}>
                    <IconButton
                        icon="weather-night"
                        size={200}
                        iconColor='white'
                        style={styles.butonSleep}
                        onPress={() => postSleep()}
                    ></IconButton>
                </Surface>
                <Surface elevation={3} style={{ borderRadius: 10, width: '100%', height: '12%', marginTop: 20 }}>
                    <Button onPress={() => setManual(true)}
                        textColor='#DA70D6'
                        labelStyle={{ fontSize: 20 }}
                        style={styles.butonManual}>{t('sleepScreen.manual')}</Button>
                </Surface>
                <Modal visible={manual} onDismiss={() => setManual(false)}
                    contentContainerStyle={styles.modal}>
                    <SelectorSleepToma baby={baby} exit={(value) => setManual(value)}></SelectorSleepToma>
                </Modal>
            </ImageBackground>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    butonIntake: {
        margin: 10,
        borderWidth: 2,
        borderColor: 'black',
        padding: 15,
        backgroundColor: '#DA70D6',
    },
    butonSleep: {
        margin: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#b8b8f7',
    },
    butonManual: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 2,
        borderColor: "#DA70D6",
        backgroundColor: 'white',
        marginBottom: 10
    },
    butonSong: {
        backgroundColor: '#5353f9',
        borderWidth: 2,
        padding: 7,
        borderColor: 'black',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#DA70D6"
    },
});
