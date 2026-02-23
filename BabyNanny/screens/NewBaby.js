import { StyleSheet, Text, View, Image, Animated, FlatList, ScrollView } from 'react-native';
import { Icon, FAB, TextInput, Surface, HelperText, Button } from 'react-native-paper';
import { RulerPicker } from 'react-native-ruler-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useContext } from 'react'
import { getAgeMonth, recargarDatos } from '../utils/utils';
import { newBaby } from '../services/services';
import Token from '../context/Token';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import { imageToBase64 } from '../utils/utils';
import { default_baby_img } from '../assets/img/baby_icon.js';

import User from '../context/User';
import Baby from '../context/Baby.js';

export const NewBaby = (props) => {
    const { t } = useTranslation()
    const [height, setHeight] = useState();
    const { user, setUser } = useContext(User)
    const { baby, setBaby } = useContext(Baby);

    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [name, setName] = useState("Nombreejemplo");
    const [intakePre, setIntakePre] = useState(0);
    const [sleepPre, setSleepPre] = useState(0);
    const [errorSleep, setErrorSleep] = useState(false)
    const [errorIntake, setErrorIntake] = useState(false)
    const [date, setDate] = useState(new Date);
    const [showDate, setShowDate] = useState(false)
    const { token, setToken } = useContext(Token);


    const intakeFormat = /^(\d+)$|^(\d*\.\d+)$/;
    const sleepFormat = /^(\d+)$/;

    const changeDate = (date) => {
        setShowDate(false)
        let tempData = new Date(date.nativeEvent.timestamp)
        setAge(getAgeMonth(tempData))
        setDate(tempData)
    }
    const createBaby = async() => {
        let response = await newBaby(assembleBaby(), token.token);
        console.log(response)
        if(response.status === 200)
        {
            console.log("Bebe creado con exito")
            props.navigation.navigate("Home");
        }
        else if (response.status === 401){
            console.log("Error al crear al bebe");
        }
    }

    const assembleBaby = () => {
        return {
            name: name,
            image: default_baby_img,
            tutors: [user.name],
            intakeRecord: [],
            sleepRecord: [],
            medicalRecord: [],
            featuresRecord:[],
            features: {
                height: height,
                weight: weight,
                age: age,
                intakePre: intakePre,
                sleepPre: sleepPre,
            },
            events:{}
        }
    }

    const checkData = (intake, sleep) => {
        if (intakeFormat.test(intake)) {
            setErrorIntake(false);

        } else {
            setErrorIntake(true);

        }
        if (sleepFormat.test(sleep)) {
            setErrorSleep(false)

        } else {


            setErrorSleep(true);
        }
    }
    const changeIntake = (newIntake) => {
        setIntakePre(newIntake)
        checkData(newIntake, sleepPre)
    }
    const changeSleep = (newSleep) => {
        setSleepPre(newSleep)
        checkData(intakePre, newSleep)
    }

    const changeName = (newName) => {
        setName(newName)
    }
    const getImageDeffault = async () => {
        console.log("Entrando en get img default")
        return await imageToBase64(require('../assets/img/baby_icon.jpg'))
    };

    return (
        <View style={styles.layout}>
            <ScrollView>
                <Surface elevation={2} style={styles.container}>
                    <Text style={styles.title}>{t('newBaby.babyData')}</Text>
                    <TextInput style={styles.input} onChangeText={(text) => changeName(text)} label={t('newBaby.babyName')}></TextInput>
                    <TextInput style={styles.input} mode='outlined' right={<TextInput.Icon icon="calendar" />} placeholder={date.toDateString()}
                        onPress={() => setShowDate(true)}></TextInput>
                    {
                        showDate && <DateTimePicker onChange={(date) => changeDate(date)} value={date} mode='date' display='calendar' />

                    }

                </Surface>
                <Surface elevation={2} style={styles.container}>
                    <Text style={styles.title}>{t('newBaby.intkSleepPre')}</Text>
                    <Text style={styles.helper}>({t('newBaby.optionalData')})</Text>
                    <View style={{ flexDirection: "column" }}>
                        <TextInput style={styles.input} label={t('newBaby.sleepPre')}
                            onChangeText={(text) => changeSleep(text)}></TextInput>
                        <HelperText type='error' visible={errorSleep}>{t('home.errorSleep')}</HelperText>

                        <TextInput style={styles.input} label={t('newBaby.tomaPre')}
                            onChangeText={(text) => changeIntake(text)}></TextInput>
                        <HelperText type='error' visible={errorIntake}>{t('home.errorIntk')}</HelperText>

                    </View>
                </Surface>
                <View style={{ backgroundColor: '#DA70D6', borderRadius: 10, margin: 10 }}>

                    <Text style={styles.title2}>{t('newBaby.babyHeight')}</Text>
                </View>
                <View style={styles.rotate}>
                    <RulerPicker
                        width={'99%'}
                        height={80}
                        min={0}
                        max={136}
                        indicatorHeight={90}
                        valueTextStyle={{ color: 'gray', fontSize: 25 }}
                        unitTextStyle={{ color: 'gray' }}
                        step={1}
                        fractionDigits={0}
                        initialValue={0}
                        onValueChange={(number) => setHeight(number)}
                        onValueChangeEnd={(number) => setHeight(number)}
                        unit="cm"
                        longStepColor='#DA70D6'
                        indicatorColor='#DA70D6'
                        shortStepColor='#c9c9db'
                    />
                </View>
                <View style={{ backgroundColor: '#DA70D6', borderRadius: 10, margin: 10 }}>

                    <Text style={styles.title2}>{t('newBaby.babyWeight')}</Text>
                </View>

                <View style={styles.rotate}>
                    <RulerPicker
                        width={'99%'}
                        height={80}
                        indicatorHeight={90}
                        valueTextStyle={{ color: 'gray', fontSize: 25 }}
                        unitTextStyle={{ color: 'gray' }}
                        min={0}
                        max={53}
                        step={1}
                        fractionDigits={1}
                        initialValue={0}
                        onValueChange={(number) => setWeight(number)}
                        onValueChangeEnd={(number) => setWeight(number)}
                        unit="kg"
                        longStepColor='#DA70D6'
                        indicatorColor='#DA70D6'
                        shortStepColor='#c9c9db'
                    />
                </View>
                <Button mode='outlined' textColor='#DA70D6'
                    style={styles.boton} onPress={() => createBaby()}>{t('newBaby.save')}</Button>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        borderRadius: 7,
        padding: 20,
        margin: 10,
        backgroundColor: "white",
        width: "97%",
        borderWidth: 1,
        borderColor: '#DA70D6'

    },
    title: { margin: 10, fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: "#DA70D6" },
    title2: {
        margin: 10, fontSize: 23,
        fontWeight: 'bold', textAlign: 'center',
        color: "white",
    },

    helper: {
        color: "gray",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 12,
        marginBottom: 10,
    },
    img: {
        width: 100,
        height: 100,
    },
    input: {
        height: 40,
        width: "100%",
        margin: 10,
    },
    rotate: {
        borderWidth: 2,
        borderWidth: 2,
        marginTop: 40,
        borderRadius: 5,
        borderColor: '#DA70D6',
        marginBlock: 25
    },
    boton: {
        borderWidth: 2,
        borderBlockColor: '#DA70D6',
        margin: 5,
        marginBottom: 25,
        width: '50%',
        alignSelf: 'center'
    }

}); 
