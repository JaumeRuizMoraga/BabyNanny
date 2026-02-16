import { createStackNavigator } from '@react-navigation/stack';
import { SleepScreen } from "./SleepScreen.js";
import { LoginScreen } from "./LoginScreen.js";
import { RegisterScreen } from "./RegisterScreen.js";
const Stack = createStackNavigator();
export const StackNavigator = () => (
        <Stack.Navigator options="false">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="SleepScreen" component={SleepScreen} />
        </Stack.Navigator>
);