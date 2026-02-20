import { View,Text,StyleSheet,FlatList } from "react-native"
import { Button } from "react-native-paper"
import { parseDate } from "../utils/utils"
import { useState } from "react"


export const TarjetaDia = (props) =>{

    const [events,setEvents] = useState(props.events[props.day.dateString]?.dots ?? [])
    const [showForm,setShowForm] = useState(false);


    const createEvent = () =>{
        let date = props.day.dateString;
        let dots = {dots : [{key:'nombreEvento',color:'#Da70D6'}]}
        let event = {date: date, dots: dots}
        return event
    }

    return(
        <View style={styles.container}>
            {console.log(props.day)}
            <Text>{props.day.day}</Text>
            <Text>Events</Text>
            <FlatList
                            data={events}
                            keyExtractor={(item, index) => item + index.toString()}
                            renderItem={({ item }) => {return(
                                <View>
                                    <Text>{item.key}</Text>
                                    </View>
                            );}
                            }
                        />

            <Button onPress={()=>props.addEvent(createEvent())}>Save</Button>
            <Button onPress={()=>props.deleteEvent(props.day.dateString,'nombreEvento')}>Delete</Button>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 2,
    },
})