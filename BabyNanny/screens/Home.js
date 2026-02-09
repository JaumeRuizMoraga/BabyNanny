import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text,Avatar,FAB,Divider } from 'react-native-paper';
import { useState } from 'react';

export const Home = (props) => {

    const [bebe,setBebe] = useState(require('../assets/icon.png')) 
    return (
        <View style={styles.container}>
            <FAB
                icon="baby-bottle-outline"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
            />
             <Avatar.Image size={200} source={bebe} />
             <Divider style={styles.divider} />
             <Button onPress={()=>props.navigation.navigate('SleepScreen')}
            >SleepSreen</Button>
             <Divider style={styles.divider} />
             <Button >AA</Button>
             <Divider style={styles.divider} />
             <Button>AA</Button>
             <Divider style={styles.divider} />
             <Button>AA</Button>
             <Divider style={styles.divider} />
             <Button>AA</Button>
             <Divider style={styles.divider} />
             <Button>AA</Button>
             <Divider style={styles.divider} />
             <Button>AA</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 40,
        backgroundColor: '#E6E6FA',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#D88FD8',
        fontSize: 40
    },
    input: {
        marginBottom: 12
    },
    button: {
        marginTop: 10,
        backgroundColor:'#DA70D6'
    },
    fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 630,
  },
  divider: {
    width: '130%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 10,
},
});