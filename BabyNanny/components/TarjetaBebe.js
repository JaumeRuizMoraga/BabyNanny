import { Text, View, StyleSheet, Pressable } from "react-native"
import { Avatar, Surface } from 'react-native-paper';

export const TarjetaBebe = (props) => {
    return (
        <Pressable onLongPress={()=>props.funCom(props.baby)}>
        <Surface style={styles.container} elevation={4}>
            <Avatar.Image size={60} source={props.baby.icon}></Avatar.Image>
            <Text style={styles.label}>{props.baby.name}</Text>
        </Surface>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        justifyContent:"space-evenly",
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