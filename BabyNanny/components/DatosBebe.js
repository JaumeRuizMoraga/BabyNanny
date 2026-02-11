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

                        <Text style={styles.label}>Edad: <Text style={{color:"#DA70D6"}}>{props.edad} meses</Text></Text>

                        <Text style={styles.label}>Altura:  <Text style={{color:"#DA70D6"}}>{props.altura} cm</Text></Text>

                        <Text style={styles.label}>Peso:  <Text style={{color:"#DA70D6"}}>{props.peso} kg</Text></Text>

                    </View>

                    <View style={{flexDirection: 'column' }}>
                        <Text style={styles.label}>Tomas promedio: <Text style={{color:"#DA70D6"}}>{props.tomaPre} .mil</Text></Text>

                        <Text style={styles.label}>Sueño promedio:  <Text style={{color:"#DA70D6"}}>{props.sleepPre} .min</Text></Text>

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

});
