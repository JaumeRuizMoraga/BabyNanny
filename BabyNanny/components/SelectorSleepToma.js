import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";

export const SelectorSleepToma = (props) => {
    const [toma, setToma] = useState("")
    const [sleep, setSleep] = useState("")
    const [tomaIncorrecta, setTomaIncorrecta] = useState(true);
    const [sleepIncorrecto, setSleepIncorrecto] = useState(true);

    const formatoToma = /^(\d+)$|^(\d*\.\d+)$/;
    const formatoSleep = /^(\d+)$/;


    const comprobarDatos = (toma, sleep) => {
        if (formatoToma.test(toma)) {
            setTomaIncorrecta(false);

        } else {
            setTomaIncorrecta(true);

        }
        if (formatoSleep.test(sleep)) {
            setSleepIncorrecto(false)

        } else {


            setSleepIncorrecto(true);
        }
    }
    const cambiarToma = (newToma)=>{
        setToma(newToma)
        comprobarDatos(newToma,sleep)
    }
    const cambiarSleep = (newSleep)=>{
        setSleep(newSleep)
        comprobarDatos(toma,newSleep)
    }

    const enviarDatos = () => {
        const date = new Date();
        let entradaToma = {
            date: (date.getHours()+":"+date.getMinutes()+"/"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()),
            type: "Toma",
            descrip: toma
        }
        console.log(entradaToma)
        let entradaSleep = {
            date: (date.getHours()+":"+date.getMinutes()+"/"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()),
            type: "Sueño",
            descrip: sleep
        }
        console.log(entradaSleep)
        props.salir(false);
    }

    return (
        <View style={styles.container}>            <TextInput
                label={"Toma"}
                value={toma}
                onChangeText={(newToma) => cambiarToma(newToma)}
                style={styles.textInput}
                right={<TextInput.Affix text=".ml" />}
                mode="flat"
            ></TextInput>
            <HelperText type="error" visible={tomaIncorrecta}>
                Formato de toma incorrecto
            </HelperText>
            <TextInput
                label={"Sueño"}
                value={sleep}
                onChangeText={(newSleep) => cambiarSleep(newSleep)}
                style={styles.textInput}
                right={<TextInput.Affix text=".min" />}
            ></TextInput>
            <HelperText type="error" visible={sleepIncorrecto}>
                Formato de sueño incorrecto
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