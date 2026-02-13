import { Text, View, FlatList, StyleSheet } from "react-native"
import { useState } from "react";
import { TarjetaBebe } from "./TarjetaBebe";
import { Button } from "react-native-paper";


export const BabyChange = (props) => {
    const [babies,setBabies] = useState(props.bebes);

    const pressLogout = () =>{
        console.log("Logout")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select other Baby</Text>
            <FlatList
                data={babies}
                keyExtractor={(item, index) => item + index.toString()}
                renderItem={({ item }) => {
                return(<TarjetaBebe baby={item} funCom={props.funCom}></TarjetaBebe>)
                }
                }
            />
            <Button textColor="#DA70D6" onPress={()=>pressLogout()} style={styles.button}>Logout</Button>
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
    },
    button:{
        borderColor: '#DA70D6',
        borderWidth: 2,
        margin: 10,
        
    }
})