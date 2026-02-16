import { View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
export const IntakeRecord = (props) => {
    const {t} = useTranslation();
    return (
        <View>
            <Card style={{margin:5}}>
                <Card.Content>
                    <Text>{t('date')}: <Text style={{color:"#DA70D6"}}>{props.entry.date}</Text></Text>
                    <Text>{t('intk')}: <Text style={{color:"#DA70D6"}}>{props.entry.data} .ml</Text></Text>
                </Card.Content>
            </Card>
        </View>
    );
}