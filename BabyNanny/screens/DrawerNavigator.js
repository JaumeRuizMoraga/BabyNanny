import { createDrawerNavigator } from '@react-navigation/drawer';
import { SleepScreen } from './SleepScreen';
import { Home } from './Home.js';
const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" options={{headerShown: true}} component={Home} />
            <Drawer.Screen name="SleepScreen" options={{headerShown: true}} component={SleepScreen} />
        </Drawer.Navigator>
    );
}