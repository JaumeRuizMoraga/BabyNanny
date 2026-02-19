import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
export const MedicalRecord = (props) => {
    const {t} = useTranslation()
    return (
        <View>
            <Card style={{margin:5}}>
                <Card.Content>
                    <Text>{t('home.date')}: <Text style={{color:"#DA70D6"}}>{props.entry.date}</Text></Text>
                    <Text>{t('home.medicine')}: <Text style={{color:"#DA70D6"}}>{props.entry.recipe.medicine}</Text></Text>
                    <Text>{t('home.dosis')}: <Text style={{color:"#DA70D6"}}>{props.entry.recipe.dosis} mg</Text></Text>
                    <Text>{t('home.treatTime')} <Text style={{color:"#DA70D6"}}>{props.entry.recipe.dosisTime} horas</Text></Text>
                </Card.Content>
            </Card>
        </View>
    );
}