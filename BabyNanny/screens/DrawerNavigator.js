import { createDrawerNavigator } from '@react-navigation/drawer';
import { SleepScreen } from './SleepScreen';
import { Home } from './Home.js';
import { NoBaby } from './NoBaby.js';
import { NewBaby } from './NewBaby.js';
const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" options={{headerShown: true}} component={Home} />
            <Drawer.Screen name ="NoBaby" component={NoBaby}/>
            <Drawer.Screen name="NewBaby" component={NewBaby}/>
            <Drawer.Screen name="SleepScreen" options={{headerShown: true}} component={SleepScreen} />
        </Drawer.Navigator>
    );
}