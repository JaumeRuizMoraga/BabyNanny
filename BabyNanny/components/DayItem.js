import { View, Text, StyleSheet } from "react-native"
import { Surface, IconButton } from "react-native-paper"
/**
 * Component that represents an individual event item in the list of events for a specific day.
 * It displays the event's name and time, and includes a delete button that allows users to remove 
 * the event from the list.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element}
 */
export const DayItem = (props) => {
    let partes = props.item.key.split(';')
    let eventName = partes[0]
    let hour = partes[1]
    return (
        <Surface elevation={2} style={styles.container}>
            <View>
                <Text style={styles.subTitle}>{hour}</Text>
                <Text>{eventName}</Text>
            </View>
            <IconButton style={{ borderWidth: 2 }} onPress={() => props.Delete(eventName)} icon={'delete'}></IconButton>
        </Surface>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 6,
        margin: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fabDelete: {
        position: 'absolute',
        margin: 16,
        right: 20,
        top: 190,
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        color: '#DA70D6'
    },
    subTitle: {
        fontSize: 18,
        color: '#DA70D6'
    },
})