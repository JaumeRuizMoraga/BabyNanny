import { View, Text, StyleSheet } from 'react-native'
import '../assets/i18n';
import { useTranslation } from 'react-i18next';
import { Surface, Avatar, Divider, Button, TextInput, List } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { changeConfig } from '../services/services';
import { changeLanguage } from 'i18next';

export const UserData = (props) => {
    const { t } = useTranslation();
    const [leng, setLeng] = useState(props.user.config.language);

    useEffect(() => {
        changeLanguage(leng);
    }, [leng]);

    return (
        <Surface style={styles.container} elevation={2}>
            <Text style={styles.title}>{t('configScreen.data')}</Text>
            <Divider style={styles.divider} />
            <View style={styles.settingRow}>
                <Text style={styles.label}>{t('configScreen.lenguage')}</Text>
                <View style={styles.accordionContainer}>
                    <List.Accordion
                        title={leng.toUpperCase()}
                        style={styles.accordion}
                        titleStyle={{ color: '#DA70D6', fontWeight: 'bold' }}
                        left={props => <List.Icon {...props} icon="translate" color="#DA70D6" />}
                    >
                        <List.Item
                            title="Español (ES)"
                            onPress={() => setLeng("es")}
                            style={styles.listItem}
                        />
                        <List.Item
                            title="English (EN)"
                            onPress={() => setLeng("en")}
                            style={styles.listItem}
                        />
                    </List.Accordion>
                </View>
            </View>
            <Button
                mode="text"
                onPress={() => changeConfig({ language: leng }, props.user.id, props.token.token)}
                textColor="#757575"
            >
                {t('configScreen.save')}
            </Button>
        </Surface>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 16,
        borderRadius: 25,
        backgroundColor: "white",
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 20,
        color: '#DA70D6',
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 20,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 15,
        color: '#666',
        fontWeight: '600',
        flex: 1,
    },
    input: {
        flex: 2,
        height: 40,
        backgroundColor: '#FFF',
        fontSize: 14,
    },
    accordionContainer: {
        flex: 2,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#DA70D6',
    },
    accordion: {
        backgroundColor: '#FDF7FD',
        paddingVertical: 0,
    },
    listItem: {
        backgroundColor: '#FFF',
    }
});