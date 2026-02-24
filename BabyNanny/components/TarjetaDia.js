import { View, Text, StyleSheet, FlatList } from "react-native"
import { Button, Surface, IconButton, TextInput } from "react-native-paper"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

import { DayItem } from "./DayItem"


export const TarjetaDia = (props) => {

    const {t} = useTranslation()
    const [events, setEvents] = useState(props.events[props.day.dateString]?.dots ?? [])
    const [showForm, setShowForm] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventHour, setEventHour] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false)



    const createEvent = () => {
        let date = props.day.dateString;
        let dots = [...events]
        let fullName = eventName+";"+formatTime(eventHour)
        dots.push({ key: fullName, color: '#Da70D6' })
        let event = { date: date, dots: { dots: dots } }
        return event
    }

    const formatTime = (date) => {
// Verificamos que 'date' sea un objeto Date válido
        if (!(date instanceof Date) || isNaN(date)) return "Seleccionar hora";

        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Formato HH:MM con ceros a la izquierda
        const strHours = hours.toString().padStart(2, '0');
        const strMinutes = minutes.toString().padStart(2, '0');
        console.log("Return de funcion")
        console.log(`${strHours}:${strMinutes}`)
        return `${strHours}:${strMinutes}`;
    };
    const onTimeChange = (_, selectedDate) => {
        // En Android, al seleccionar, el picker se debe cerrar
        setShowPicker(false);
        
        // Solo actualizamos si el usuario no canceló (selectedDate no es undefined)
        if (selectedDate) {
            setEventHour(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ borderWidth: 2, borderRadius: 2, borderRadius: 20, backgroundColor: '#DA70D6' }}>
                <Text style={styles.title}>{props.day.day}</Text>
            </View>
            <View style={{ borderWidth: 2, borderRadius: 2, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 5, margin: 10, borderColor: '#b8b8f7' }}>

                <Text style={styles.subTitle}>{t('eventScreen.events')}:</Text>
                <IconButton style={{ backgroundColor: '#b8b8f7' }} icon={'plus'} size={20} onPress={() => setShowForm(!showForm)}></IconButton>

            </View>
            {showForm && (
                <View style={{ borderWidth: 1.5, padding: 5, borderColor: 'gray', borderRadius: 10 }}>
                    <TextInput value={eventName} onChangeText={(newName) => setEventName(newName)} placeholder="Event name"></TextInput>
                    <TextInput
                        label="Time"
                        style={styles.input}
                        mode='outlined'
                        value={formatTime(eventHour)}
                        editable={false}
                        right={<TextInput.Icon icon="clock" onPress={() => setShowPicker(true)} />}
                        // onPressIn funciona mejor que onPress cuando editable es false
                        onPressIn={() => setShowPicker(true)}
                    />
                    {
                        showPicker && <DateTimePicker 
                            value={eventHour} 
                            mode='time' 
                            is24Hour={true}
                            display={'default'}
                            onChange={onTimeChange} 
                        />

                    }
            <Button onPress={() => props.addEvent(createEvent())}>{t('eventScreen.add')}</Button>
                </View>
            )

            }
            <FlatList
                data={events}
                keyExtractor={(item, index) => item + index.toString()}
                renderItem={({ item }) => { return (<DayItem Delete={(eventName) => props.deleteEvent(props.day.dateString, eventName)} item={item}></DayItem>); }
                }
            />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 2,
        padding: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        color: 'white'
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
})