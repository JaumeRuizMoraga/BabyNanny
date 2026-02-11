import { createDrawerNavigator } from '@react-navigation/drawer';
import SleepScreen from './SleepScreen';

import Home from './src/screens/Home';
const Drawer = createDrawerNavigator();
export default function App() {
    return (
            <Drawer.Navigator useLegacyImplementation={false} initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="SleepScreen" component={SleepScreen} />
            </Drawer.Navigator>
    );
}