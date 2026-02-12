import { StyleSheet, Text, View } from 'react-native';
import { Icon, FAB } from 'react-native-paper';
export const NoBaby = () => {
    return (
        <View style={styles.layout}>
            <Text style={styles.title}>Vaya! Parace que no tienes ningún bebé registrado</Text>

            <View style={{ flexDirection: "row" }}>
                <Icon source={"baby-face-outline"} color='gray' size={170}></Icon>
                <Icon source={"comment-question-outline"} color='gray' size={70}></Icon>
            </View>
            <FAB
                icon="plus"
                style={styles.fab}
                size='large'
                onPress={() => console.log('Pressed')}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    title: { margin: 24, fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: "gray", marginBottom: 80 },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 20,
    },
}); 
