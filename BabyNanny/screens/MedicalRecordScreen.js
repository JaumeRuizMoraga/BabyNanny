import { MedicalRecord } from '../components/RegistroMedico';
import { View, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';

export const MedicalRecordScreen = (props) => {
    const [type, setType] = useState();

    return (
        <FlatList
            data={entrys}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={({ item }) => {
                return <MedicalRecord entry={item} />;

            }
            }
        />
    )
}