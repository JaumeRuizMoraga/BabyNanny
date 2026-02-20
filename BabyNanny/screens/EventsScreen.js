import User from "../context/User";
import Baby from "../context/Baby";
import { View, Text, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { Calendar } from 'react-native-calendars';
import { Modal } from "react-native-paper";
import { TarjetaDia } from "../components/TarjetaDia";

export const EventScreen = () => {
    const { user, setUser } = useContext(User)
    const { baby, setBaby } = useContext(Baby);
    const [showModal, setShowModal] = useState(false)
    const [day, setDay] = useState()
    const [events, setEvents] = useState({
        '2026-02-25': {
            dots: [
                { key: 'trabajo', color: '#2ecc71', selectedDotColor: 'white' },
                { key: 'personal', color: '#e74c3c' },
                { key: 'pago', color: 'orange' }
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
    const deleteEvent = (eventDate,eventName) =>{
        let newEvents = events
        newEvents[eventDate].dots = newEvents[eventDate].dots.filter(elem => elem.key != eventName)
        console.log(newEvents[eventDate].dots)
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2 }}>
            <View style={{ borderBlockColor: 'green', borderWidth: 2, height: 320 }}></View>
            <Calendar
                // Maneja el click en un día
                onDayPress={day => {
                    [setShowModal(true),setDay(day)];
                }}
                // Estilos básicos
                theme={{
                    todayTextColor: '#00adf5',
                    selectedDayBackgroundColor: '#00adf5',
                }}
                markedDates={events}
                markingType="multi-dot"
                style={{ borderWidth: 2 }}
            />
            <Modal style={{ flex: 2 }} visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.container}>
                <TarjetaDia day={day} events={events} deleteEvent={deleteEvent} addEvent={addEvent}></TarjetaDia>
            </Modal>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        borderWidth: 2,
    },
})