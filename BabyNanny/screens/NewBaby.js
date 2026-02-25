import { StyleSheet, Text, View, Image, Animated, FlatList,ActivityIndicator, ScrollView } from 'react-native';
import { Icon, FAB, TextInput, Surface, HelperText, Button } from 'react-native-paper';
import { RulerPicker } from 'react-native-ruler-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useContext, useEffect } from 'react'
import { getAgeMonth, recargarDatos } from '../utils/utils';
import { newBaby } from '../services/services';
import Token from '../context/Token';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import { imageToBase64 } from '../utils/utils';
import { default_baby_img } from '../assets/img/baby_icon.js';

import User from '../context/User';
import Baby from '../context/Baby.js';

/**
 * Component responsible for creating a new baby profile. It allows users to input the baby's name, date of birth,
 *  height, weight, and other optional features. The component validates the input data and sends a request to the 
 * backend to create the new baby profile. After successful creation, it reloads the data and navigates back to the 
 * home screen.
 * @component
 * @param {Object} props - Component properties.
 * @example <Drawer.Screen name="New Baby" options={{ headerShown: !noBaby }} component={NewBaby} />
 * @returns {JSX.Element} 
 */
export const NewBaby = (props) => {
    const { t } = useTranslation()
    const [height, setHeight] = useState();
    const { user, setUser } = useContext(User)
    const { baby, setBaby } = useContext(Baby);

    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [name, setName] = useState(null);
    const [intakePre, setIntakePre] = useState(0);
    const [sleepPre, setSleepPre] = useState(0);
    const [errorSleep, setErrorSleep] = useState(false)
    const [errorIntake, setErrorIntake] = useState(false)
    const [date, setDate] = useState(new Date);
    const [showDate, setShowDate] = useState(false)
    const [isLoading,setIsLoading] = useState(false);
    const { token, setToken } = useContext(Token);
    const [isName, setIsname] = useState(true);


    const intakeFormat = /^(\d+)$|^(\d*\.\d+)$/;
    const sleepFormat = /^(\d+)$/;
    /**
     * Function that handles the change of the date input for the baby's date of birth. It updates the age state based on the selected date and sets the date state to the selected date.
     * @param {Object} date - The selected date object from the date picker.
     */
    const changeDate = (date) => {
        setShowDate(false)
        let tempData = new Date(date.nativeEvent.timestamp)
        setAge(getAgeMonth(tempData))
        setDate(tempData)
    }
    /**
     * createBaby function that is called when the user presses the save button to create a new baby profile. It assembles the baby data into the required format and sends a request to the backend to create the new baby. If the creation is successful, it reloads the data and navigates back to the home screen. If there is an error, it logs the error message.
     */
    const createBaby = async() => {
        let response = await newBaby(assembleBaby(), token.token);
        console.log(response)
        if(response.status === 200)
        {
            console.log("Bebe creado con exito")
            setIsLoading(true)
            await recargarDatos(token.token,setBaby,setUser,baby,setIsLoading); 
            props.navigation.navigate("Home");
        }
        else if (response.status === 401){
            console.log("Error al crear al bebe");
        }
    }
/**
 * function that assembles the baby data into the required format for the backend request.
 * @returns {Object} The assembled baby data object
 */
    const assembleBaby = () => {
        return {
            name: name,
            image: default_baby_img,
            tutors: [],
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

/**
 * Function used to check if the data that the user has introduced is correct. It validates the intake and sleep data using regular expressions and updates the error states accordingly to show error messages if the data is incorrect.
 * @param {double} intake Value of the baby's intake that the user has introduced, expected to be a number (integer or decimal). 
 * @param {double} sleep Value of the baby's sleep that the user has introduced, expected to be an integer number.
 * @returns {void} This function does not return a value, but it updates the error states for intake and sleep based on the validation results.
 */
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
        if(newName === '' || newName === null) {
            setIsname(true);
        }
        else {
            setIsname(false);
        }
    }

    const getImageDeffault = async () => {
        console.log("Entrando en get img default")
        return await imageToBase64(require('../assets/img/baby_icon.jpg'))
    };
        if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#DA70D6" />
            </View>)
    }

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
                
                <Button mode='outlined' textColor='#DA70D6' disabled={isName}
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
