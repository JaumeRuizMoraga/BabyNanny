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
            {/* Overlay: Fondo oscurecido para centrar la atención */}
            <Pressable style={styles.overlay} onPress={exit}>
                
                {/* Contenedor del Modal: Aquí controlamos el tamaño */}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece el fondo
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '85%', // Ocupa casi todo el ancho pero deja márgenes
        maxWidth: 400, // Evita que se vea gigante en tablets
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        elevation: 10, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
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
        justifyContent: 'flex-end', // Alinea botones a la derecha (estándar de UI)
        gap: 10,
    },
    flexButton: {
        minWidth: 80,
    },
});