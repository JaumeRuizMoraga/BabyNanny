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
                    <Text>{t('home.date')}: <Text style={{color:"#DA70D6"}}>{props.entry.date}</Text></Text>
                    <Text>{t('home.intk')}: <Text style={{color:"#DA70D6"}}>{props.entry.intakeAmount} .ml</Text></Text>
                </Card.Content>
            </Card>
        </View>
    );
}