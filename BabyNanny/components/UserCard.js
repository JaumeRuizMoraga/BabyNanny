import {View,Text,StyleSheet} from 'react-native'
import { Surface,Avatar } from 'react-native-paper';
export const UserCard = (props) =>{
    return(
        <Surface style={styles.container} elevation={3}>
              <Avatar.Icon size={120} icon="account" />
              <Text style={styles.title}>{props.user.user}</Text>
        </Surface>
    );
}
const styles = new StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 15,
        padding: 15
    },
    title:{
        fontSize: 30,
        color: '#DA70D6',
        fontWeight: 'bold',
        margin: 10
    }
})