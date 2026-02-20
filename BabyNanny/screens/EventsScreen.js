import User from "../context/User";
import Baby from "../context/Baby";
import { View,Text } from "react-native";
import { useContext } from "react";
export const EventScreen = () =>{
    const {user,setUser} = useContext(User)
    const {baby,setBaby} = useContext(Baby); 
    return(
        <View>
            <Text>{user.name}</Text>
        </View>
    );
}