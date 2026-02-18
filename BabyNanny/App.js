import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from "./screens/LoginScreen.js";
import { DrawerNavigator} from "./screens/DrawerNavigator.js";
import { RegisterScreen } from "./screens/RegisterScreen.js";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { UserProvider } from './context/User.js';
import { TokenProvider } from './context/Token.js';
const App = () => {
  return (
    <TokenProvider>
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" options={{headerShown: false}} component={RegisterScreen} />
        <Stack.Screen name="DrawerNavigator"  options={{headerShown: false}} component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
    </TokenProvider>
  );
}
export default App;
