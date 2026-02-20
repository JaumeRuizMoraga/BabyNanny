import { View, Text, StyleSheet } from 'react-native'
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import { Surface, Avatar, Divider, Button, TextInput, List } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { changeLanguage } from 'i18next';

export const UserData = (props) => {
    const { t } = useTranslation();
    const [userName, setUserName] = useState(props.user.name);
    const [leng, setLeng] = useState(props.user.config.language);


    useEffect(() => {
        changeLanguage(leng)
    }, [leng]);
    return (
        <View>
            <Surface style={styles.container} elevation={3}>
                <Text style={styles.title}>{t('configScreen.data')}</Text>
                <Divider style={styles.divider}></Divider>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{t('configScreen.userName')}:</Text>
                    <TextInput  mode='outlined' activeOutlineColor='#DA70D6' outlineColor='#DA70D6' style={styles.input} textColor='#DA70D6' onChangeText={(newUser) => setUserName(newUser)} placeholder={userName} ></TextInput>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{t('configScreen.lenguage')}:</Text>
                    <View style={styles.list}>
                        <List.Section style={{backgroundColor:'#D88FD8',borderColor:'#DA70D6',borderWidth:5}} title={leng}>
                            <List.Accordion style={{backgroundColor:'#D88FD8'}} title={leng}>
                                <List.Item title="es" onPress={() => setLeng("es")}></List.Item>
                                <List.Item title="en" onPress={() => setLeng("en")}></List.Item>
                            </List.Accordion>
                        </List.Section>
                    </View>
                </View>
            </Surface>
            <Button onPress={() => props.save()} >{t('configScreen.save')}</Button>
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
    data: {
        color: '#DA70D6',
        fontWeight: 'bold',
    },
    input: {
        height: 30,
        marginLeft: 10,
        paddingLeft:60,
        paddingRight:60
    },
    list: {
        overflow: 'visible',
        margin: 20,
    }
})