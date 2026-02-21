import User from "../context/User";
import Baby from "../context/Baby";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useContext, useState } from "react";
import { Calendar } from 'react-native-calendars';
import { Modal } from "react-native-paper";
import { TarjetaDia } from "../components/TarjetaDia";
import { DayItemDate } from "../components/DayItemDate";

export const EventScreen = () => {
    const { user, setUser } = useContext(User)
    const { baby, setBaby } = useContext(Baby);
    const [isLoading, setIsLoading] = useState(true);


    const [showModal, setShowModal] = useState(false)
    const [day, setDay] = useState()
    const [events, setEvents] = useState({
        '2026-02-25': {
            dots: [
                { key: 'trabajo;20:30', color: '#2ecc71', selectedDotColor: 'white' },
                { key: 'personal;19:30', color: '#e74c3c' },
                { key: 'pago;18:30', color: 'orange' }
            ],
        },
        '2026-02-26': {
            dots: [
                { key: 'urgente', color: 'black' }
            ]
        }
    }

    );
    const addEvent = (event) => {
        let newEvents = events
        newEvents[event.date] = event.dots;
        console.log(newEvents)
    }
    const deleteEvent = (eventDate, eventName) => {
        let newEvents = events
        newEvents[eventDate].dots = newEvents[eventDate].dots.filter(elem => elem.key.split(';')[0] != eventName)
        console.log(newEvents[eventDate].dots)
        console.log(newEvents)
    }
    const filterEvents = (entryNumber) => {
        const todayDate = new Date().toISOString().split('T')[0];
        let dates = [];
        let dates2 = [];
        dates = (Object.entries(events).filter(([fecha, info]) => fecha >= todayDate));

        (dates.forEach(([fecha, dots]) => dots.dots.forEach(elem => dates2.push({ key: elem.key, date: fecha }))))
        return (dates2.slice(0, entryNumber))
    }
    useFocusEffect(
        useCallback(() => {
            recargarDatos(token.token, setBaby, setUser, baby, setIsLoading);
            return () => {
                // Opcional: Lógica cuando la pantalla pierde el foco
            };
        }, [token.token, baby?.id, user?.id])
    );

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#DA70D6" />
            </View>)
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            {console.log(events)}
            <View style={styles.container}>
                <View style={{ borderWidth: 1.5, borderColor: '#DA70D6', padding: 10, borderRadius: 10, margin: 5 }}>
                    <Text style={styles.title}>Upcoming events</Text>
                </View>
                <FlatList
                    data={filterEvents(2)}
                    keyExtractor={(item, index) => item + index.toString()}
                    renderItem={({ item }) => { return (<DayItemDate Delete={(eventName) => props.deleteEvent(props.day.dateString, eventName)} item={item}></DayItemDate>); }
                    }
                />
            </View>
            <Calendar
                // Maneja el click en un día
                onDayPress={day => {
                    [setShowModal(true), setDay(day)];
                }}
                // Estilos básicos
                theme={styles.calendarIn}
                markedDates={events}
                markingType="multi-dot"
                style={styles.calendarOut}
            />
            <Modal style={{ flex: 2 }} visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.container}>
                <TarjetaDia day={day} events={events} deleteEvent={deleteEvent} addEvent={addEvent}></TarjetaDia>
            </Modal>

        </View>
    );
}
const styles = StyleSheet.create({
    container: { height: '40%', padding: 10, width: '100%' },
    calendarIn: {
        todayTextColor: '#DA70D6',
        selectedDayBackgroundColor: '#b8b8f7',
        textSectionTitleColor: '#DA70D6',
        dayTextColor: '#b8b8f7',
        monthTextColor: '#DA70D6',
        arrowColor: '#DA70D6',
    },
    calendarOut: { borderWidth: 2, width: 'auto', borderRadius: 10, borderColor: '#b8b8f7' },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DA70D6',
        textAlign: 'center',
    },
})