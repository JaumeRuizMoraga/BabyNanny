import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
export const MedicalRecord = (props) => {
    return (
        <View>
            <Card style={{margin:5}}>
                <Card.Content>
                    <Text>Date: <Text style={{color:"#DA70D6"}}>{props.entry.date}</Text></Text>
                    <Text>Medicine: <Text style={{color:"#DA70D6"}}>{props.entry.recipe.medicine}</Text></Text>
                    <Text>Dosis: <Text style={{color:"#DA70D6"}}>{props.entry.recipe.medicine} mg</Text></Text>
                    <Text>Treatment duration: <Text style={{color:"#DA70D6"}}>{props.entry.recipe.dosisTime} horas</Text></Text>
                </Card.Content>
            </Card>
        </View>
    );
}