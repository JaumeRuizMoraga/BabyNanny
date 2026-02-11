import { StyleSheet, View } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';

export const BabyCard = (props) => {

    return (
        <Card style={styles.card} mode="elevated">
            <Card.Content>
                <Text variant="titleMedium" style={styles.title}>
                    Características del bebé
                </Text>

                <Divider style={styles.divider} />
                <View style={{flexDirection: 'row' }}>
                    <View style={{flexDirection: 'column' }}>

                        <Text style={styles.label}>Edad {props.edad} meses</Text>

                        <Text style={styles.label}>Altura  {props.altura} cm</Text>

                        <Text style={styles.label}>Peso  {props.peso} kg</Text>

                    </View>

                    <View style={{flexDirection: 'column' }}>
                        <Text style={styles.label}>Tomas promedio {props.tomaPre} oz</Text>

                        <Text style={styles.label}>Sueño promedio  {props.sleepPre} min</Text>

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
    title: {
        fontWeight: 'bold',
        color: '#6A1B9A',
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

});
