import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";

export const SelectorSleepToma = (props) => {
    const [intake, setIntake] = useState("")
    const [sleep, setSleep] = useState("")
    const [wrongIntake, setWrongIntake] = useState(true);
    const [wrongSleep, setWrongSleep] = useState(true);

    const intakeFormat = /^(\d+)$|^(\d*\.\d+)$/;
    const intakeSleep = /^(\d+)$/;


    const checkData = (intake, sleep) => {
        if (intakeFormat.test(intake)) {
            setWrongIntake(false);

        } else {
            setWrongIntake(true);

        }
        if (intakeSleep.test(sleep)) {
            setWrongSleep(false)

        } else {


            setWrongSleep(true);
        }
    }
    const changeIntake = (newIntake)=>{
        setIntake(newIntake)
        checkData(newIntake,sleep)
    }
    const changeSleep = (newSleep)=>{
        setSleep(newSleep)
        checkData(intake,newSleep)
    }

    const sendData = () => {
        const date = new Date();
        let intakeEntry = {
            date: (date.getHours()+":"+date.getMinutes()+"/"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()),
            type: "intakerecord",
            data: intake
        }
        console.log(intakeEntry)
        let sleepEntry = {
            date: (date.getHours()+":"+date.getMinutes()+"/"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()),
            type: "sleeprecord",
            data: sleep
        }
        props.exit(false);
    }

    return (
        <View style={styles.container}>            <TextInput
                label={"Intake"}
                value={toma}
                onChangeText={(newToma) => cambiarToma(newToma)}
                style={styles.textInput}
                right={<TextInput.Affix text=".ml" />}
                mode="flat"
            ></TextInput>
            <HelperText type="error" visible={tomaIncorrecta}>
                Wrong intake format
            </HelperText>
            <TextInput
                label={"Sleep"}
                value={sleep}
                onChangeText={(newSleep) => changeSleep(newSleep)}
                style={styles.textInput}
                right={<TextInput.Affix text=".min" />}
            ></TextInput>
            <HelperText type="error" visible={wrongSleep}>
                Wrong sleep format
            </HelperText>
            <Button onPress={sendData} textColor="white" style={styles.botonManual}>Save</Button>
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