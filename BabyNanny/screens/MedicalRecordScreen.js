import { MedicalRecord } from '../components/RegistroMedico';
import { View, StyleSheet, ScrollView, FlatList, Pressable, Button } from 'react-native';
import { userState, useContext } from 'react';
import Baby from '../context/Baby';


export const MedicalRecordScreen = (props) => {
    const {baby, setBaby} = useContext(Baby);
   
    return (

       
        <FlatList
            data={baby.medicalRecord}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={({ item }) => {
                return <MedicalRecord entry={item} />;

            }
            }
        />
    )
}