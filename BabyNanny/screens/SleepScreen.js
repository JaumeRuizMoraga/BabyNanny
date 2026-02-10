import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { IconButton, Button, Surface, Modal, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import { SelectorSleepToma } from '../components/SelectorSleepToma';
import { useContext } from 'react';
import { Audio } from 'expo-av';
import User from '../context/User';
import Baby from '../context/Baby';
import { enviarSleep,enviarToma } from '../utils/utils';

export const SleepScreen = (props) => {
    const [manual, setManual] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [song, setSong] = useState();
    const { user, setUser } = useContext(User);
    const {baby, setBaby}  = useContext(Baby);



    const postSleep = () => {
        enviarSleep(baby.caracteristicas.sleepPre);
    }
    const postToma = () => {
        enviarToma(baby.caracteristicas.tomaPre);
    }
    const playAudio = async () => {
        if (!playing) {
            const { sound } = await Audio.Sound.createAsync(
                (user.cancionesFav)[0].uri
            );
            setSong(sound);
            setPlaying(true)
            await sound.playAsync();
        } else {
            await song.stopAsync();
            setPlaying(false)
        }
    };

    return (
        <PaperProvider>
            <ImageBackground
                source={require("../assets/img/FondoBabyNanny.png")}
                resizeMode='cover'
                style={styles.container}>
                <Surface style={{ borderRadius: 240, margin: 10 }}>
                    <IconButton
                        icon="baby-bottle"
                        size={200}
                        iconColor='white'
                        style={styles.botonToma}
                        onPress={() => postToma()}
                    ></IconButton>
                </Surface>
                <IconButton
                    icon="music-note"
                    size={50}
                    iconColor='white'
                    style={styles.botonSong}
                    onPress={() => playAudio()}
                ></IconButton>
                <Surface style={{ borderRadius: 240, margin: 10 }}>
                    <IconButton
                        icon="weather-night"
                        size={200}
                        iconColor='white'
                        style={styles.botonSleep}
                        onPress={() => postSleep()}
                    ></IconButton>
                </Surface>
                <Surface elevation={3} style={{ borderRadius: 10, width: '100%', height: '12%', marginTop: 20 }}>
                    <Button onPress={() => setManual(true)}
                        textColor='#DA70D6'
                        labelStyle={{ fontSize: 20 }}
                        style={styles.botonManual}>M A N U A L</Button>
                </Surface>
                <Modal visible={manual} onDismiss={() => setManual(false)}
                    contentContainerStyle={styles.modal}>
                    <SelectorSleepToma salir={(valor)=>setManual(valor)}></SelectorSleepToma>
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
    botonToma: {
        margin: 10,
        borderWidth: 2,
        borderColor: 'black',
        padding: 15,
        backgroundColor: '#DA70D6',
    },
    botonSleep: {
        margin: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#b8b8f7',
    },
    botonManual: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 2,
        borderColor: "#DA70D6",
        backgroundColor: 'white'
    },
    botonSong:{
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
