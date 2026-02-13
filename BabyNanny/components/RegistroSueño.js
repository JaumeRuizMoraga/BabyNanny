import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
export const SleepRecord = (props) => {
    return (
        <View>
            <Card style={{margin:5}}>
                <Card.Content>
                    <Text>Date: <Text style={{color:"#DA70D6"}}>{props.entry.date}</Text></Text>
                    <Text>Sleep: <Text style={{color:"#DA70D6"}}>{props.entry.data} mins</Text></Text>
                </Card.Content>
            </Card>
        </View>
    );
}