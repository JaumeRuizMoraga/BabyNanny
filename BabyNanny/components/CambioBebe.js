import { Text, View, FlatList, StyleSheet } from "react-native"
import { useContext, useState } from "react";
import { TarjetaBebe } from "./TarjetaBebe";
import { Button } from "react-native-paper";
import { logout } from "../services/services";
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import Token from "../context/Token";


export const BabyChange = (props) => {
    const [babies,setBabies] = useState(props.babies);
    const { t } = useTranslation();
    const {token,setToken} = useContext(Token)
    const pressLogout = () =>{
        // logout(token.id);
        props.goLogin();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{t('home.selectBaby')}</Text>
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