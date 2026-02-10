import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
export const EntradaBebe = (props) => {
    return (
        <View>
            <Card>
                <Card.Content>
                    <Text>{props.entry.date}</Text>
                    <Text>{props.entry.data}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}