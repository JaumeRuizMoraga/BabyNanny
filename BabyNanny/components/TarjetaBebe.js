import { Text, View, StyleSheet, Pressable } from "react-native"
import { Avatar, Surface } from 'react-native-paper';

/**
 * Component used to render the baby that is given for parameter.
 * If you press on the component, the baby given for parameter became the actual baby.  
 * @component
 * @param {Object} props- Component propierties. 
 * @param {Function} props.funCom- Function to make the baby given for parameter became the actual baby. 
 * @example <TarjetaBebe baby={item} funCom={props.funCom}></TarjetaBebe>
 * @returns {JSX.Element}
 * */
export const TarjetaBebe = (props) => {
    return (
        <Pressable onLongPress={() => props.funCom(props.baby)}>
            <Surface style={styles.container}>
                <Avatar.Image size={60} source={{ uri: props.baby.image }}></Avatar.Image>
                <Text style={styles.label}>{props.baby.name}</Text>
            </Surface>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: 10,
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 10,
        marginBottom: 15,

    },
    title: {
        fontWeight: 'bold',
        color: '#DA70D6',
        marginBottom: 6,
    },
    divider: {

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    label: {
        color: '#555',
        margin: '5',
        fontWeight: "bold",
        fontSize: 15,
    },

});