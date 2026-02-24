import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import User from '../context/User';
import { useContext } from 'react';
export const IntakeRecord = (props) => {
    const { t } = useTranslation();
    const { user, setUser } = useContext(User);
    const language = () =>{
        if(user.config.language == "es"){
            return "es-ES"
        }
        else if(user.config.language == "en"){
            return "en-EN"
        }
    }
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return (
        <View>
            <Card style={{ margin: 5 }}>
                <Card.Content>
                    <Text>{t('home.date')}: <Text style={{ color: "#DA70D6" }}>{new Date(props.entry.date).toLocaleDateString(language(), options)}</Text></Text>
                    <Text>{t('home.intk')}: <Text style={{ color: "#DA70D6" }}>{props.entry.intakeAmount} .ml</Text></Text>
                </Card.Content>
            </Card>
        </View>
    );
}