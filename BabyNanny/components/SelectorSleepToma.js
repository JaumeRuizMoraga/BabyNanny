import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";

export const SelectorSleepToma = () => {
    const [toma, setToma] = useState("")
    const [sleep, setSleep] = useState("")
    const [tomaIncorrecta,setTomaIncorrecta] = useState(false);
    const [sleepIncorrecto,setSleepIncorrecto] = useState(false);

    const formatoToma = /^(\d+)$|^(\d*\.\d+)$|/gm;
    const formatoSleep = 0;


    const comprobarDatos = (toma,sleep) => {

    }

    const enviarDatos = () =>{
        console.log("Enviando nuevo registro: "+toma+", "+sleep)
    }

    return (
        <View style={styles.container}>
            <TextInput
                label={"Toma"}
                value={toma}
                onChangeText={(newToma) => setToma(newToma)}
                style={styles.textInput}
                right={<TextInput.Affix text=".ml" />}
                mode="flat"
            ></TextInput>
            <HelperText type="error" visible={tomaIncorrecta}>
        Email address is invalid!
      </HelperText>
            <TextInput
                label={"Sueño"}
                value={sleep}
                onChangeText={(newSleep) => setSleep(newSleep)}
                style={styles.textInput}
                right={<TextInput.Affix text=".h" />}
            ></TextInput>
                        <HelperText type="error" visible={sleepIncorrecto}>
        Email address is invalid!
      </HelperText>
            <Button onPress={enviarDatos} textColor="white" style={styles.botonManual}>Guardar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        margin: 10,
        backgroundColor: '#dedef7',
        borderRadius: 5,
    },
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
        width: '100%',
        borderWidth: 2,
        borderColor: "#DA70D6",
        backgroundColor: '#DA70D6'
    },
});