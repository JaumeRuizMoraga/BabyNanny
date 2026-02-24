import {View,Text} from 'react-native'
import { UserCard } from '../components/UserCard';
import { UserData } from '../components/UserData';
import User from '../context/User';
import { useContext } from 'react';
import Token from '../context/Token';
export const ConfigScreen = (props) =>{
    const { token, setToken } = useContext(Token);
    const {user,setUser} = useContext(User);
    return(
        <View>
            <UserCard user={user}></UserCard>
            <UserData user={user} token={token}></UserData>
        </View>
    );
}