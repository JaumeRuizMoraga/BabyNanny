import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenOne from './src/screens/ScreenOne';
import ScreenTwo from './src/screens/ScreenTwo';
import Home from './src/screens/Home';
const Drawer = createDrawerNavigator();
export default function App() {
    return (
            <Drawer.Navigator useLegacyImplementation={false} initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="ScreenOne" component={ScreenOne} />
                <Drawer.Screen name="ScreenTwo" component={ScreenTwo} />
            </Drawer.Navigator>
    );
}