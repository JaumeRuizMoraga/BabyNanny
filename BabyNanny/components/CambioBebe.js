import { Text, View, FlatList, StyleSheet } from "react-native"
import { useState } from "react";
import { TarjetaBebe } from "./TarjetaBebe";


export const CambioBebe = (props) => {
    const [bebes,setBebes] = useState(props.bebes);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Seleccione otro bebé</Text>
            <FlatList
                data={bebes}
                keyExtractor={(item, index) => item + index.toString()}
                renderItem={({ item }) => {
                return(<TarjetaBebe bebe={item} funCom={props.funCom}></TarjetaBebe>)
                }
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    label:{
        fontSize: 30,
        margin: 20,
        marginBottom: 40,
        color: "#DA70D6"
    },
    container:{
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    }
})