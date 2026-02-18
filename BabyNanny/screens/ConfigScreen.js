import {View,Text} from 'react-native'
import { UserCard } from '../components/UserCard';
import { UserData } from '../components/UserData';
import User from '../context/User';
import { useContext } from 'react';
export const ConfigScreen = (props) =>{
    const {user,setUser} = useContext(User);
    return(
        <View>
            <UserCard user={user}></UserCard>
            <UserData user={user}></UserData>
        </View>
    );
}