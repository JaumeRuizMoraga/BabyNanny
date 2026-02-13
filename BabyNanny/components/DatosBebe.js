import { StyleSheet, View } from 'react-native';
import { Card, Text, Divider, FAB, Modal } from 'react-native-paper';
import { useState } from 'react';
import { EditarDatos } from './EditarDatos';

export const BabyCard = (props) => {

    const [edit,setEdit] = useState(false);

    return (
        <Card style={styles.card} mode="elevated">
            <Card.Content>
                <Text variant="titleMedium" style={styles.title}>
                    Baby data
                </Text>
            
                <Divider style={styles.divider} />
                <View style={{flexDirection: 'row',justifyContent: "space-between" }}>
                    <View style={{flexDirection: 'column' }}>

                        <Text style={styles.label}>Age: <Text style={{color:"#DA70D6"}}>{props.bebe.edad} months</Text></Text>

                        <Text style={styles.label}>Height:  <Text style={{color:"#DA70D6"}}>{props.bebe.altura} cm</Text></Text>

                        <Text style={styles.label}>Weight:  <Text style={{color:"#DA70D6"}}>{props.bebe.peso} kg</Text></Text>

                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.label}>Average intake: <Text style={{color:"#DA70D6"}}>{props.bebe.tomaPre} .mil</Text></Text>

                        <Text style={styles.label}>Average sleep:  <Text style={{color:"#DA70D6"}}>{props.bebe.sleepPre} .min</Text></Text>

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
        fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 107,
    },

});
