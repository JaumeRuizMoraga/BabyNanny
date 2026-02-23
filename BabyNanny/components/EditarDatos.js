import { View, Text, StyleSheet, } from 'react-native'
import { Card, Divider, TextInput, HelperText, Button } from 'react-native-paper';
import { useState } from 'react';
import { checkDataFull } from '../utils/utils';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

export const EditarDatos = (props) => {
    const { t } = useTranslation()
    const [newAge, setNewAge] = useState(props.baby.age);
    const [newHeight, setNewHeight] = useState(props.baby.height);
    const [newWeight, setNewWeight] = useState(props.baby.weight);
    const [newIntakePre, setNewIntakePre] = useState(props.baby.intakePre);
    const [newSleepPre, setNewSleepPre] = useState(props.baby.sleepPre);
    const [errors, setErrors] = useState({ intake: false, sleep: false, height: false, weight: false, age: false });



    const changeAge = (dato) => {
        setNewAge(dato)
        setErrors(checkDataFull(newIntakePre, newSleepPre, dato, newHeight, newWeight))

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
        setErrors(checkDataFull(date, newSleepPre, newAge, newHeight, newWeight))

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

                        <View style={styles.inputSection}>
                            <View style={styles.row}>
                                <Text style={styles.label}>{t('home.age')}:</Text>
                                <TextInput
                                    mode='outlined'
                                    style={styles.input}
                                    outlineColor="#E0E0E0"
                                    activeOutlineColor="#DA70D6"
                                    textColor='#555'
                                    right={<TextInput.Affix text="m" />}
                                    value={newAge}
                                    onChangeText={changeAge}
                                />
                            </View>
                            <HelperText type='error' visible={errors.age} style={styles.helper}>
                                {t('home.errorAge')}
                            </HelperText>
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
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        margin: 16,
        backgroundColor: '#FFFFFF',
        elevation: 4, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontWeight: '700',
        color: '#DA70D6',
        fontSize: 22,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 15,
    },
    inputSection: {
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center', // Alinea verticalmente label e input
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
    },
    input: {
        flex: 1.5,
        height: 45, // Un poco más alto para mejor usabilidad
        backgroundColor: '#FBFAFB',
        fontSize: 14,
    },
    helper: {
        textAlign: 'right',
        marginTop: -5,
        marginBottom: 5,
    },
    button: {
        marginTop: 10,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#DA70D6",
    }
});