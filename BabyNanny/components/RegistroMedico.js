import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
export const RegistroMedico = (props) => {
    return (
        <View>
            <Card style={{margin:5}}>
                <Card.Content>
                    <Text>Fecha: <Text style={{color:"#DA70D6"}}>{props.entry.date}</Text></Text>
                    <Text>Medicamento: <Text style={{color:"#DA70D6"}}>{props.entry.receta.medicamento}</Text></Text>
                    <Text>Dosis: <Text style={{color:"#DA70D6"}}>{props.entry.receta.dosis} mg</Text></Text>
                    <Text>Duracion: <Text style={{color:"#DA70D6"}}>{props.entry.receta.duracion} horas</Text></Text>
                </Card.Content>
            </Card>
        </View>
    );
}