import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Button } from 'react-native-paper';

export const SleepScreen = () => {

    const postSleep = (sleep) => {
        if (sleep === undefined) {
            console.log('Post predefinido')
        } else {
            console.log('Post cantidad fijada: ' + sleep)
        }
    }
    const postToma = (toma) => {
        if (toma === undefined) {
            console.log('Post predefinido')
        } else {
            console.log('Post cantidad fijada: ' + toma)
        }
    }

    return (
        <View style={styles.container}>
            <IconButton
                icon="baby-bottle"
                size={200}
                iconColor='white'
                style={styles.botonToma}
                onPress={() => postToma()}
            ></IconButton>
            <IconButton
                icon="weather-night"
                size={200}
                iconColor='white'
                style={styles.botonSleep}
                onPress={() => postSleep()}
            ></IconButton>
            <Button textColor='#DA70D6' labelStyle={{ fontSize: 20 }} style={styles.botonManual}>M A N U A L</Button>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eaeaea',
    },
    botonToma: {
        margin: 20,
        borderWidth: 2,
        borderColor: 'black',
        padding: 15,
        backgroundColor: '#DA70D6',
    },
    botonSleep: {
        margin: 20,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#b8b8f7',
    },
    botonManual: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 90,
        width: '100%',
        height: '12%',
        borderWidth: 2,
        borderColor: "#DA70D6",
        color: 'white'
    },
});