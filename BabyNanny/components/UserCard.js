import { View, Text, StyleSheet } from 'react-native'
import { Surface, Avatar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import '../assets/i18n';
/**
 * Component that renders a card displaying a user's profile information, including their name and an avatar default icon.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element}
 */
export const UserCard = (props) => {
    const { t } = useTranslation();
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
            <Text style={styles.subtitle}>{t('configScreen.userName')}</Text>
        </Surface>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        margin: 16,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: '#DA70D6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(218, 112, 214, 0.1)',
    },
    avatarContainer: {
        backgroundColor: '#F8F0F8',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#DA70D6',
        padding: 5,
        borderRadius: 100,
    },
    title: {
        fontSize: 26,
        color: '#333',
        fontWeight: '800',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#DA70D6',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    }
});