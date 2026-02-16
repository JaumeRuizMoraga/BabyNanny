import { View, Text, StyleSheet } from 'react-native'

import '../assets/i18n';
import { useTranslation } from 'react-i18next';

import { Surface, Avatar, Divider, Button, TextInput, List } from 'react-native-paper';
import { useState,useEffect } from 'react';
import { changeLanguage } from 'i18next';
export const UserData = (props) => {
        const { t } = useTranslation();

    const [userName,setUserName] = useState(props.user.user);
    const [leng,setLeng] = useState(props.user.config.lenguage);


   useEffect(() => { 
    changeLanguage(leng)
},[leng]); 

    return (
        <View>
        <Surface style={styles.container} elevation={3}>
            <Text style={styles.title}>{t('userData.data')}</Text>
            <Divider style={styles.divider}></Divider>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text>{t('userData.userName')}:</Text>
            <TextInput style={styles.input} textColor='#DA70D6' onChangeText={(newUser)=>setUserName(newUser)} placeholder={userName} ></TextInput>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text>{t('userData.lenguage')}:</Text>
            <Surface style={styles.list}>
            <List.Section style={{}} title={leng}>
            <List.Accordion style={{}} title={leng}>
                <List.Item title="es" onPress={()=>setLeng("es")}></List.Item>
                <List.Item title="en" onPress={()=>setLeng("en")}></List.Item>
            </List.Accordion>
            </List.Section>
            </Surface>
            </View>
        </Surface>
        <Button onPress={()=>props.save()} >{t('userData.save')}</Button>
        </View>
    );
}
const styles = new StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 15,
        padding: 15,
        backgroundColor: "white"
    },
    title: {
        fontSize: 23,
        color: '#DA70D6',
        fontWeight: 'bold',
        margin: 10
    },
    divider: {
        height: 20,
        color: 'red'
    },
    data:{
        color: '#DA70D6',
        fontWeight: 'bold',
    },
    input:{
        height: 30,
        marginLeft: 10,
    },
    list:{
        overflow: 'hidden',
        margin: 20
    }
})