import { StyleSheet, View } from 'react-native';
import { Card, Text, Divider, FAB, Modal } from 'react-native-paper';
import { useState } from 'react';
import { EditarDatos } from './EditarDatos';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

/**
 * Component used to render the features of the selected baby. 
 * @component
 * @param {Object} props- Component propierties. 
 * @param {Array} props.baby- Features of the selected baby.
 * @example <BabyCard baby={baby.features} />
 * @returns {JSX.Element}
 * */
export const BabyCard = (props) => {
    const [edit, setEdit] = useState(false);
    const { t } = useTranslation()
    return (
        <Card style={styles.card} mode="elevated">
            <Card.Content>
                <Text variant="titleMedium" style={styles.title}>
                    {t('home.babyData')}
                </Text>
                <FAB icon="pencil" style={styles.fabEdit} size='small' onPress={() => props.setEdit(true)} />
                <Divider style={styles.divider} />
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ flexDirection: 'column' }}>

                        <Text style={styles.label}>{t('home.age')} <Text style={{ color: "#DA70D6" }}>{props.baby.age} {t('home.months')}</Text></Text>

                        <Text style={styles.label}>{t('home.height')}  <Text style={{ color: "#DA70D6" }}>{props.baby.height} cm</Text></Text>

                        <Text style={styles.label}>{t('home.weight')}  <Text style={{ color: "#DA70D6" }}>{props.baby.weight} kg</Text></Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.label}>{t('home.avgIntk')} <Text style={{ color: "#DA70D6" }}>{props.baby.intakePre} .mil</Text></Text>

                        <Text style={styles.label}>{t('home.avgSleep')}  <Text style={{ color: "#DA70D6" }}>{props.baby.sleepPre} .min</Text></Text>

                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginVertical: 12,
        backgroundColor: '#FFF',
    },
    fabEdit: {
        position: 'absolute',
        margin: 16,
        right: 5,
        top: -8,
    },
    title: {
        fontWeight: 'bold',
        color: '#DA70D6',
        marginBottom: 6,
    },
    divider: {
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    label: {
        color: '#555',
        margin: '5',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 107,
    },

});
