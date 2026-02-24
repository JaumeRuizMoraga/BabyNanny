import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export const ModalDelete = ({ visible, exit, onDelete }) => {
    const { t } = useTranslation();

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={exit}
        >
            <Pressable style={styles.overlay} onPress={exit}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                        {t('home.deleteConfirmation')}
                    </Text>

                    <View style={styles.buttonContainer}>
                        <Button
                            mode="text"
                            onPress={exit}
                            textColor="#757575"
                            style={styles.flexButton}
                        >
                            {t('home.no')}
                        </Button>

                        <Button
                            mode="contained"
                            onPress={onDelete}
                            buttonColor="#DA70D6"
                            style={styles.flexButton}
                            labelStyle={{ fontWeight: 'bold' }}
                        >
                            {t('home.yes')}
                        </Button>
                    </View>
                </View>

            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '85%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    flexButton: {
        minWidth: 80,
    },
});