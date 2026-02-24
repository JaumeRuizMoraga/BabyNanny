import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import { sendIntake, sendSleep } from "../utils/utils";
import Token from "../context/Token";
import User from "../context/User";
import Baby from "../context/Baby";

export const SelectorSleepToma = (props) => {
    const { t } = useTranslation();
    const { user, setUser } = useContext(User)
    const { baby, setBaby } = useContext(Baby);
    const { token, setToken } = useContext(Token)
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
    const changeIntake = (newIntake) => {
        setIntake(newIntake)
        checkData(newIntake, sleep)
    }
    const changeSleep = (newSleep) => {
        setSleep(newSleep)
        checkData(intake, newSleep)
    }


    const sendData = async () => {
        sendIntake(intake, baby.id, token.token);
        sendSleep(sleep, baby.id, token.token);
        let data = (await recargarDatos(token.token))
        if (data && data.user && data.babies) {
            setUser(data.user);
            setBaby(data.babies[0]);

        }
        props.exit(false);
    }

    return (
        <View style={styles.container}>
            <TextInput
                label={t('home.intk')}
                value={intake}
                onChangeText={(newIntake) => changeIntake(newIntake)}
                style={styles.textInput}
                right={<TextInput.Affix text=".ml" />}
                mode="flat"
            ></TextInput>
            <HelperText type="error" visible={wrongIntake}>
                {t('home.errorIntk')}            </HelperText>
            <TextInput
                label={t('home.sleep')}
                value={sleep}
                onChangeText={(newSleep) => changeSleep(newSleep)}
                style={styles.textInput}
                right={<TextInput.Affix text=".min" />}
            ></TextInput>
            <HelperText type="error" visible={wrongSleep}>
                {t('home.errorSleep')}            </HelperText>
            <Button onPress={sendData} textColor="white" style={styles.botonManual}>{t('home.save')}</Button>
        </View>
    )
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