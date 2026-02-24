import User from "../context/User";
import Baby from "../context/Baby";
import Token from "../context/Token";
import { recargarDatos } from "../utils/utils";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useContext, useState, useCallback, useEffect } from "react";
import { createEvent } from "../services/services";
import { Calendar } from 'react-native-calendars';
import { Modal } from "react-native-paper";
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import { TarjetaDia } from "../components/TarjetaDia";
import { DayItemDate } from "../components/DayItemDate";

/**
 * EventScreen component responsible for displaying the calendar with the baby's events, allowing users to view, add, and delete events for specific days.
 * 
 * @returns it returns a calendar view with marked dates based on the baby's events. Users can click on a date to open a modal where they can add new events or delete existing ones. 
 * The component also handles fetching and updating the events data from the backend.
 */

export const EventScreen = () => {
    const { token, setToken } = useContext(Token)
    const { user, setUser } = useContext(User)
    const { baby, setBaby } = useContext(Baby);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false)
    const { t } = useTranslation()
    const [day, setDay] = useState()
    const [events, setEvents] = useState(baby?.events?.dates ?? {});


    /**
     * Function responsible for adding a new event to the calendar. It updates the local state with the new event and then sends the updated events data to the backend to be saved.
     * 
     * @param {Object} event - The event object to be added to the calendar.
     */
    const addEvent = (event) => {
        let newEvents = events
        newEvents[event.date] = event.dots;
        setEvents(newEvents)
        console.log("Lo que le entra a al endPoint")
        console.log({ dates: newEvents })
        console.log(baby.id)
        console.log(token.token)
        createEvent({ dates: newEvents }, baby.id, token.token);
    }

    /**
     * Function responsible for deleting an event from the calendar. It updates the local state by removing the specified event and then sends the updated events data to the backend to be saved.
     * 
     * @param {String} eventDate it is the date of the event to be deleted, used to identify which date's events need to be updated after deletion.
     * @param {String} eventName it is the name of the event to be deleted, used to identify which specific event needs to be removed from the list of events for the given date.
     * 
     */
    const deleteEvent = (eventDate, eventName) => {
        let newEvents = events
        newEvents[eventDate].dots = newEvents[eventDate].dots.filter(elem => elem.key.split(';')[0] != eventName)
        console.log(newEvents[eventDate].dots)
        setEvents(newEvents)
        createEvent({ dates: newEvents }, baby.id, token.token);
    }

    /**
     * filterEvents function responsible for filtering the events to be displayed on the calendar. It checks the current date and filters out past events, showing only upcoming events. It also limits the number of events returned based on the entryNumber parameter.
     * 
     * @param {Int16Array} entryNumber it is used to limit the events that is showed on the screen
     * @returns it returns a filtered list of events based on the current date, showing only those that are upcoming and limiting the number of events returned based on the entryNumber parameter. 
     */
    const filterEvents = (entryNumber) => {
        if ("dates" in baby?.events) {
            const todayDate = new Date().toISOString().split('T')[0];
            let dates = [];
            let dates2 = [];
            dates = (Object.entries(events).filter(([fecha, info]) => fecha >= todayDate));
            (dates?.forEach(([fecha, dots]) => dots.dots.forEach(elem => dates2.push({ key: elem.key, date: fecha }))))
            return (dates2.slice(0, entryNumber))
        }
        else {
            return [];
        }
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            {console.log("Events")}
            {console.log(baby)}
            <View style={styles.container}>
                <View style={{ borderWidth: 1.5, borderColor: '#DA70D6', padding: 10, borderRadius: 10, margin: 5 }}>
                    <Text style={styles.title}>{t("eventScreen.title")}</Text>
                </View>

                {
                    /**
                     * FlatList component that displays a list of upcoming events for the baby. It uses the filterEvents function to get the relevant events and renders each event using the DayItemDate component. Users can also delete events directly from this list.
                     */
                }
                <FlatList
                    data={filterEvents(2)}
                    keyExtractor={(item, index) => item + index.toString()}
                    renderItem={({ item }) => { return (<DayItemDate Delete={(eventName) => props.deleteEvent(props.day.dateString, eventName)} item={item}></DayItemDate>); }
                    }
                />
            </View>
            <Calendar

                onDayPress={day => {
                    [setShowModal(true), setDay(day)];
                }}

                theme={styles.calendarIn}
                markedDates={events}
                markingType="multi-dot"
                style={styles.calendarOut}
            />
            {
                /**
                 * Modal component that displays the events for a specific day.
                 * It is shown when a user taps on a day in the calendar.
                 */
            }
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