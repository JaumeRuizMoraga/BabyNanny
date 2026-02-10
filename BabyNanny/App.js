import { NavigationContainer } from '@react-navigation/native';
import { SleepScreen } from "./screens/SleepScreen.js";
import { LoginScreen } from "./screens/LoginScreen.js";
import { Home } from "./screens/Home.js";
import { RegisterScreen } from "./screens/RegisterScreen.js";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="SleepScreen" component={SleepScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;