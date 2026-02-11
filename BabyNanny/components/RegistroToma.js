import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
export const RegistroToma = (props) => {
    return (
        <View>
            <Card style={{margin:10}}>
                <Card.Content>
                    <Text>Fecha: {props.entry.date}</Text>
                    <Text>Toma: {props.entry.data} ml</Text>
                </Card.Content>
            </Card>
        </View>
    );
}