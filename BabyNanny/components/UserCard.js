import {View,Text,StyleSheet} from 'react-native'
import { Surface,Avatar } from 'react-native-paper';
export const UserCard = (props) => {
    return (
        <Surface style={styles.container} elevation={2}>
            <View style={styles.avatarContainer}>
                <Avatar.Icon 
                    size={110} 
                    icon="account" 
                    color="#DA70D6" 
                    style={{ backgroundColor: 'transparent' }} 
                />
            </View>
            <Text style={styles.title}>{props.user.name}</Text>
            {/* Añadimos un subtítulo opcional para dar contexto */}
            <Text style={styles.subtitle}>Tutor</Text>
        </Surface>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 30, // Más espacio arriba y abajo
        paddingHorizontal: 20,
        margin: 16,
        borderRadius: 25, // Bordes más circulares y modernos
        alignItems: 'center',
        backgroundColor: '#ffffff',
        // Sombra suave y profesional
        elevation: 5,
        shadowColor: '#DA70D6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        // Un borde sutil para dar definición
        borderWidth: 1,
        borderColor: 'rgba(218, 112, 214, 0.1)', 
    },
    avatarContainer: {
        backgroundColor: '#F8F0F8', // Fondo suave para el avatar
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#DA70D6', // Anillo de color alrededor del avatar
        padding: 5,
        borderRadius: 100,
    },
    title: {
        fontSize: 26,
        color: '#333', // Color oscuro para mejor lectura
        fontWeight: '800',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#DA70D6', // El color principal en el texto secundario
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    }
});