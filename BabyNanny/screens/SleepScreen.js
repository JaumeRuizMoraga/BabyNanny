import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { IconButton, Button, Surface, Modal, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import { SelectorSleepToma } from '../components/SelectorSleepToma';
import { useContext } from 'react';
import { Audio } from 'expo-av';
import User from '../context/User';
import Token from '../context/Token';
import { sendSleep, sendIntake } from '../utils/utils';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

export const SleepScreen = (props) => {
    const {t} = useTranslation()
    const [manual, setManual] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [song, setSong] = useState();
    const { user, setUser } = useContext(User);
    const {token,setToken} = useContext(Token);
    const [ baby, setBaby ] = useContext(user.babies[0]);



    const postSleep = () => {
        sendSleep(baby.assets.sleepPre,baby.id,token.token);
    }
    const postIntake = () => {
        sendIntake(baby.assets.intakePre,baby.id,token.token);
    }
    const playAudio = async () => {
        if (!playing) {
            const { sound } = await Audio.Sound.createAsync(
                (user.favSongs)[0].uri
            );
            setSong(sound);
            setPlaying(true)
            await sound.playAsync();
        } else {
            await song.stopAsync();
            setPlaying(false)
        }
    }

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
                    <SelectorSleepToma exit={(value) => setManual(value)}></SelectorSleepToma>
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
