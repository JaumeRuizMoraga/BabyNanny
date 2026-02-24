import { View, Text } from 'react-native'
import { UserCard } from '../components/UserCard';
import { UserData } from '../components/UserData';
import User from '../context/User';
import { useContext } from 'react';

/**
 * Component used as a helper for language switching, 
 * displaying the user who is currently changing the language.
 * * @returns {JSX.element} Returns the UserCard and UserData components, 
 * which retrieve and display the current user's information.
 */
export const ConfigScreen = () => {
    const { user, setUser } = useContext(User);
    return (
        <View>
            <UserCard user={user}></UserCard>
            <UserData user={user}></UserData>
        </View>
    );
}