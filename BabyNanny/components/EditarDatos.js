import { View, Text, StyleSheet, } from 'react-native'
import { Card, Divider, TextInput, HelperText, Button } from 'react-native-paper';
import { useState } from 'react';
import { comprobarDatosCompleto } from '../utils/utils';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

export const EditarDatos = (props) => {
    const {t} = useTranslation()
    const [newAge, setNewAge] = useState(props.baby.age);
    const [newHeight, setNewHeight] = useState(props.baby.height);
    const [newWeight, setNewWeight] = useState(props.baby.height);
    const [newIntakePre, setNewIntakePre] = useState(props.baby.intakePre);
    const [newSleepPre, setNewSleepPre] = useState(props.baby.sleepPre);
    const [errors, setErrors] = useState({ intake: false, sleep: false, height: false, weight: false, age: false });



    const changeAge = (dato) => {
        setNewAge(dato)
        setErrors(checkDataFull(newIntakePre, newSleepPre, dato, newAltura, newWeight))

    }
    const changeHeight = (dato) => {
        setNewHeight(dato)
        setErrors(checkDataFull(newIntakePre, newSleepPre, newAge, dato, newWeight))

    }
    const changeWeight = (dato) => {
        setNewWeight(dato)
        setErrors(checkDataFull(newIntakePre, newSleepPre, newAge, newHeight, dato))
    }
    const changeToma = (date) => {
        setNewIntakePre(date)
        setErrors(checkDataFull(date, newSleepPre, newEdad, newAltura, newWeight))

    }
    const changeSleep = (date) => {
        setNewSleepPre(date)
        setErrors(checkDataFull(newIntakePre, date, newAge, newHeight, newWeight))

    }
    const String = (value) => {
        return '' + value + ''
    }
    const checkVoids = (chars) => {
        if (chars.intakePre === '') {
            chars.intakePre = props.baby.intakePre
        }
        if (chars.sleepPre === '') {
            chars.sleepPre = props.bebe.sleepPre
        }
        if (chars.age === '') {
            chars.age = props.baby.age
        }
        if (chars.height === '') {
            chars.height = props.baby.height
        }
        if (chars.weight === '') {
            chars.weight = props.baby.weight
        }
        return chars
    }

    return (
        <Card style={styles.card} mode="elevated">
            <Card.Content>
                <Text variant="titleMedium" style={styles.title}>
                    {t('home.babyData')}                </Text>
                <Divider style={styles.divider} />
                <View style={{ flexDirection: 'column', justifyContent: "space-between" }}>
                    <View style={{ flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>{t('home.age')}: </Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.baby.age)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text="months" textStyle={{ color: '#DA70D6' }} />}
                                defaultValue={props.baby.age} value={newAge} onChangeText={(dato) => changeAge(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errors.age}>{t('home.errorAge')}</HelperText>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>{t('home.height')}: </Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.baby.height)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text="cm" textStyle={{ color: '#DA70D6' }} />} defaultValue={props.baby.height} value={newHeight} onChangeText={(dato) => changeHeight(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errors.height}>{t('home.errorHeight')}</HelperText>

                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>{t('home.weight')}: </Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.baby.weight)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text="kg" textStyle={{ color: '#DA70D6' }} />} defaultValue={props.baby.weight} value={newWeight} onChangeText={(dato) => changeWeight(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errors.weight}>{t('home.errorWeight')}</HelperText>

                        </View>
                    </View>
                    <Divider style={styles.divider} />

                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>{t('home.avgIntk')}:</Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.baby.intakePre)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text=".ml" textStyle={{ color: '#DA70D6' }} />} defaultValue={props.baby.intakePre} value={newIntakePre} onChangeText={(dato) => changeToma(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errors.toma}>{t('home.errorIntk')}</HelperText>

                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>{t('home.avgSleep')}:</Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.baby.sleepPre)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text=".min" textStyle={{ color: '#DA70D6' }} />} defaultValue={props.baby.sleepPre} value={newSleepPre} onChangeText={(dato) => changeSleep(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errors.sleep}>{t('home.errorSleep')}</HelperText>

                        </View>
                    </View>
                </View>
                <Divider style={styles.divider}></Divider>
                <Button textColor='#DA70D6' style={styles.button} onPress={() => props.save(checkVoids({sleepPre:newSleepPre,intakePre:newIntakePre,weight:newWeight,height:newHeight,age:newAge}))}>{t('home.save')}</Button>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginVertical: 12,
        backgroundColor: '#FFF',
        height: '100%',
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        color: '#DA70D6',
        marginBottom: 6,
        fontSize: 25
    },
    divider: {
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    label: {
        color: '#555',
        margin: '5',
        fontSize: 15,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 107,
    },
    input: {
        height: 30,
        width: '35%',
    },
    button: {
        borderColor: "#DA70D6",
        borderWidth: 2,
    }

});
