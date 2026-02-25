import { StyleSheet, Text, View } from 'react-native';
import { Icon, FAB } from 'react-native-paper';
import '../assets/i18n';
import { useTranslation } from 'react-i18next';

/**
 * NoBaby Component
 * * An "Empty State" screen that is displayed when the application detects 
 * that the user has no registered babies. It provides a visual cue and 
 * a direct call to action (CTA) to create a new profile.
 * * @param {Object} props - Component properties.
 * @param {Object} props.navigation - React Navigation object used to 
 * route the user to the "NewBaby" form.
 * * @returns {JSX.Element} A simplified view featuring descriptive icons, 
 * a localized message, and a Floating Action Button (FAB).
 */

export const NoBaby = (props) => {
    const { t } = useTranslation()
    return (
        <View style={styles.layout}>
            <Text style={styles.title}>{t('noBaby.message')}</Text>

            <View style={{ flexDirection: "row" }}>
                <Icon source={"baby-face-outline"} color='gray' size={170}></Icon>
                <Icon source={"comment-question-outline"} color='gray' size={70}></Icon>
            </View>
            <FAB
                icon="plus"
                style={styles.fab}
                size='large'
                onPress={() => props.navigation.navigate("New Baby")}
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
