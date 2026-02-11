import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
export const RegistroMedico = (props) => {
    return (
        <View>
            <Card style={{margin:10}}>
                <Card.Content>
                    <Text>Fecha: {props.entry.date}</Text>
                    <Text>Medicamento: {props.entry.receta.medicamento}</Text>
                    <Text>Dosis: {props.entry.receta.dosis} mg</Text>
                    <Text>Duracion: {props.entry.receta.duracion} horas</Text>
                </Card.Content>
            </Card>
        </View>
    );
}