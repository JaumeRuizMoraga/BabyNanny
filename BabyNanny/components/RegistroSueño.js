import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
export const RegistroSueño = (props) => {
    return (
        <View>
            <Card style={{margin:10}}>
                <Card.Content>
                    <Text>Fecha: {props.entry.date}</Text>
                    <Text>Sueño: {props.entry.data} min</Text>
                </Card.Content>
            </Card>
        </View>
    );
}