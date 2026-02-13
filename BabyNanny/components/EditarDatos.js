import { View, Text, StyleSheet, } from 'react-native'
import { Card, Divider, TextInput, HelperText, Button } from 'react-native-paper';
import { useState } from 'react';
import { comprobarDatosCompleto } from '../utils/utils';

export const EditarDatos = (props) => {
    const [newEdad, setNewEdad] = useState(props.bebe.edad);
    const [newAltura, setNewAltura] = useState(props.bebe.altura);
    const [newWeight, setNewWeight] = useState(props.bebe.peso);
    const [newTomaPre, setNewTomaPre] = useState(props.bebe.tomaPre);
    const [newSleepPre, setNewSleepPre] = useState(props.bebe.sleepPre);
    const [errores, setErrores] = useState({ toma: false, sleep: false, height: false, weight: false, age: false });



    const changeAge = (dato) => {
        setNewEdad(dato)
        setErrores(comprobarDatosCompleto(newTomaPre, newSleepPre, dato, newAltura, newWeight))

    }
    const changeHeight = (dato) => {
        setNewAltura(dato)
        setErrores(comprobarDatosCompleto(newTomaPre, newSleepPre, newEdad, dato, newWeight))

    }
    const changeWeight = (dato) => {
        setNewWeight(dato)
        setErrores(comprobarDatosCompleto(newTomaPre, newSleepPre, newEdad, newAltura, dato))
    }
    const changeToma = (date) => {
        setNewTomaPre(date)
        setErrores(comprobarDatosCompleto(date, newSleepPre, newEdad, newAltura, newWeight))

    }
    const changeSleep = (date) => {
        setNewSleepPre(date)
        setErrores(comprobarDatosCompleto(newTomaPre, date, newEdad, newAltura, newWeight))

    }
    const String = (value) => {
        return '' + value + ''
    }
    const checkVoids = (chars) => {
        if (chars.tomaPre === '') {
            chars.tomaPre = props.bebe.tomaPre
        }
        if (chars.sleepPre === '') {
            chars.sleepPre = props.bebe.sleepPre
        }
        if (chars.edad === '') {
            chars.edad = props.bebe.edad
        }
        if (chars.altura === '') {
            chars.altura = props.bebe.altura
        }
        if (chars.peso === '') {
            chars.peso = props.bebe.peso
        }
        return chars
    }

    return (
        <Card style={styles.card} mode="elevated">
            <Card.Content>
                <Text variant="titleMedium" style={styles.title}>
                    Baby Data                </Text>
                <Divider style={styles.divider} />
                <View style={{ flexDirection: 'column', justifyContent: "space-between" }}>
                    <View style={{ flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>Age: </Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.bebe.edad)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text="months" textStyle={{ color: '#DA70D6' }} />}
                                defaultValue={props.bebe.edad} value={newEdad} onChangeText={(dato) => changeAge(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errores.age}>Wrong age format</HelperText>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>Height: </Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.bebe.altura)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text="cm" textStyle={{ color: '#DA70D6' }} />} defaultValue={props.bebe.altura} value={newAltura} onChangeText={(dato) => changeHeight(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errores.height}>Wrong height format</HelperText>

                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>Weight: </Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.bebe.peso)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text="kg" textStyle={{ color: '#DA70D6' }} />} defaultValue={props.bebe.peso} value={newWeight} onChangeText={(dato) => changeWeight(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errores.weight}>Wrong weight format</HelperText>

                        </View>
                    </View>
                    <Divider style={styles.divider} />

                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>Predefined toma: </Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.bebe.tomaPre)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text=".ml" textStyle={{ color: '#DA70D6' }} />} defaultValue={props.bebe.tomaPre} value={newTomaPre} onChangeText={(dato) => changeToma(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errores.toma}>Wrong toma format</HelperText>

                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.label}>Predefined sleep: </Text>
                            <TextInput textColor='#DA70D6' placeholder={String(props.bebe.sleepPre)} activeOutlineColor='#DA70D6' right={<TextInput.Affix text=".min" textStyle={{ color: '#DA70D6' }} />} defaultValue={props.bebe.sleepPre} value={newSleepPre} onChangeText={(dato) => changeSleep(dato)} style={styles.input} mode='outlined'></TextInput>
                            <HelperText type='error' visible={errores.sleep}>Wrong sleep format</HelperText>

                        </View>
                    </View>
                </View>
                <Divider style={styles.divider}></Divider>
                <Button textColor='#DA70D6' style={styles.button} onPress={() => props.save(checkVoids({sleepPre:newSleepPre,tomaPre:newTomaPre,peso:newWeight,altura:newAltura,edad:newEdad}))}>Save</Button>
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
