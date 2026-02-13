import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
export const RegistroToma = (props) => {
    return (
        <View>
            <Card style={{margin:5}}>
                <Card.Content>
                    <Text>Date: <Text style={{color:"#DA70D6"}}>{props.entry.date}</Text></Text>
                    <Text>Intake: <Text style={{color:"#DA70D6"}}>{props.entry.data} .ml</Text></Text>
                </Card.Content>
            </Card>
        </View>
    );
}