import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from "./screens/LoginScreen.js";
import { Home } from "./screens/Home.js";
import { RegisterScreen } from "./screens/RegisterScreen.js";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { BabyProvider } from './context/Baby.js';
import { UserProvider } from './context/User.js';
const App = () => {
  return (
    <UserProvider>
    <BabyProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Home" options={{headerShown: false,}} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </BabyProvider>
    </UserProvider>
  );
}
export default App;