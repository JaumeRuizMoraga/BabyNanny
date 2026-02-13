import { StyleSheet, Text, View, Image, Animated, FlatList, ScrollView } from 'react-native';
import { Icon, FAB, TextInput, Surface, HelperText, Button } from 'react-native-paper';
import { RulerPicker } from 'react-native-ruler-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useContext } from 'react'
import { getAgeMonth } from '../utils/utils';

import User from '../context/User';

export const NewBaby = (props) => {
    const [altura, setAltura] = useState();
    const { user, setUser } = useContext(User)
    const [peso, setPeso] = useState(0);
    const [edad, setEdad] = useState(0);
    const [nombre, setNombre] = useState("Nombreejemplo");
    const [tomaPre, setTomaPre] = useState(0);
    const [sleepPre, setSleepPre] = useState(0);
    const [errorSleep, SetErrorSleep] = useState(false)
    const [errorToma, SetErrorToma] = useState(false)
    const [date, setDate] = useState(new Date);
    const [showDate, setShowDate] = useState(false)


    const formatoToma = /^(\d+)$|^(\d*\.\d+)$/;
    const formatoSleep = /^(\d+)$/;

    const changeDate = (date) => {
        setShowDate(false)
        let tempData = new Date(date.nativeEvent.timestamp)
        setEdad(getAgeMonth(tempData))
        setDate(tempData)

    }

    const montarBebe = () => {
        let bebe = {
            id: "idMongo",
            nombre: nombre,
            tutores: [user.usuario],
            icon: require('../assets/img/baby_icon.png'),
            registroTomas: [],
            registroSueño: [],
            registroMedico: [],
            caracteristicas: {
                altura: altura,
                peso: peso,
                edad: edad,
                tomaPre: tomaPre,
                sleepPre: sleepPre,
            },
            eventos: []
        }
        console.log(bebe)
        props.navigation.navigate("Home")
    }

    const comprobarDatos = (toma, sleep) => {
        if (formatoToma.test(toma)) {
            SetErrorToma(false);

        } else {
            SetErrorToma(true);

        }
        if (formatoSleep.test(sleep)) {
            SetErrorSleep(false)

        } else {


            SetErrorSleep(true);
        }
    }
    const cambiarToma = (newToma) => {
        setTomaPre(newToma)
        comprobarDatos(newToma, sleepPre)
    }
    const cambiarSleep = (newSleep) => {
        setSleepPre(newSleep)
        comprobarDatos(tomaPre, newSleep)
    }

    const cambiarNombre = (newName) => {
        setNombre(newName)
    }

    return (
        <View style={styles.layout}>
            {console.log(edad)}
            <ScrollView>
                <Surface elevation={2} style={styles.container}>
                    <Text style={styles.title}>Datos de tu bebé</Text>
                    <TextInput style={styles.input} onChangeText={(text) => cambiarNombre(text)} label={"Nombre del bebé"}></TextInput>
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
                            onChangeText={(text) => cambiarSleep(text)}></TextInput>
                        <HelperText type='error' visible={errorSleep}>Formato de sueño incorrecto</HelperText>

                        <TextInput style={styles.input} label={"Toma predeterminada"}
                            onChangeText={(text) => cambiarToma(text)}></TextInput>
                        <HelperText type='error' visible={errorToma}>Formato de toma incorrecto</HelperText>

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
                        onValueChange={(number) => setAltura(number)}
                        onValueChangeEnd={(number) => setAltura(number)}
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
                        onValueChange={(number) => setPeso(number)}
                        onValueChangeEnd={(number) => setPeso(number)}
                        unit="kg"
                        longStepColor='#DA70D6'
                        indicatorColor='#DA70D6'
                        shortStepColor='#c9c9db'
                    />
                </View>
                <Button mode='outlined' textColor='#DA70D6'
                    style={styles.boton} onPress={() => montarBebe()}>Guardar</Button>
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
