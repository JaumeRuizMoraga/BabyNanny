import { StyleSheet, Text, View, Image, Animated, FlatList, ScrollView } from 'react-native';
import { Icon, FAB, TextInput, Surface, HelperText, Button } from 'react-native-paper';
import { RulerPicker } from 'react-native-ruler-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useContext } from 'react'
import { getAgeMonth } from '../utils/utils';

import User from '../context/User';

export const NewBaby = (props) => {
    const [height, setHeight] = useState();
    const { user, setUser } = useContext(User)
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [name, setName] = useState("Nombreejemplo");
    const [intakePre, setIntakePre] = useState(0);
    const [sleepPre, setSleepPre] = useState(0);
    const [errorSleep, setErrorSleep] = useState(false)
    const [errorIntake, setErrorIntake] = useState(false)
    const [date, setDate] = useState(new Date);
    const [showDate, setShowDate] = useState(false)


    const intakeFormat = /^(\d+)$|^(\d*\.\d+)$/;
    const sleepFormat = /^(\d+)$/;

    const changeDate = (date) => {
        setShowDate(false)
        let tempData = new Date(date.nativeEvent.timestamp)
        setAge(getAgeMonth(tempData))
        setDate(tempData)

    }

    const assembleBaby = () => {
        let baby = {
            id: "idMongo",
            name: name,
            tutors: [user.user],
            icon: require('../assets/img/baby_icon.png'),
            intakeRecord: [],
            sleepRecord: [],
            medicalRecord: [],
            assets: {
                height: height,
                weight: weight,
                age: age,
                intakePre: intakePre,
                sleepPre: sleepPre,
            },
            events: []
        }
        console.log(baby)
        props.navigation.navigate("Home")
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

    return (
        <View style={styles.layout}>
            <ScrollView>
                <Surface elevation={2} style={styles.container}>
                    <Text style={styles.title}>Datos de tu bebé</Text>
                    <TextInput style={styles.input} onChangeText={(text) => changeName(text)} label={"Baby's name"}></TextInput>
                    <TextInput style={styles.input} mode='outlined' right={<TextInput.Icon icon="calendar" />} placeholder={date.toDateString()}
                        onPress={() => setShowDate(true)}></TextInput>
                    {
                        showDate && <DateTimePicker onChange={(date) => changeDate(date)} value={date} mode='date' display='calendar' />

                    }

                </Surface>
                <Surface elevation={2} style={styles.container}>
                    <Text style={styles.title}>Introduce el sueño y toma predeterminado</Text>
                    <Text style={styles.helper}>(Estos campos no son obligatorios)</Text>
                    <View style={{ flexDirection: "column" }}>
                        <TextInput style={styles.input} label={"Sueño predeterminado"}
                            onChangeText={(text) => changeSleep(text)}></TextInput>
                        <HelperText type='error' visible={errorSleep}>Formato de sueño incorrecto</HelperText>

                        <TextInput style={styles.input} label={"Toma predeterminada"}
                            onChangeText={(text) => changeIntake(text)}></TextInput>
                        <HelperText type='error' visible={errorIntake}>Formato de toma incorrecto</HelperText>

                    </View>
                </Surface>
                <View style={{ backgroundColor: '#DA70D6', borderRadius: 10, margin: 10 }}>

                    <Text style={styles.title2}>Indica la altura del bebe</Text>
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

                    <Text style={styles.title2}>Indica el peso</Text>
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
                    style={styles.boton} onPress={() => assembleBaby()}>Guardar</Button>
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
