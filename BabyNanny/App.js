<<<<<<< HEAD
import { SleepScreen } from "./screens/SleepScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { Home } from "./screens/Home";

const App = () =>{
  return(
    <Home></Home>
  );
}
export default App
=======
import { SleepScreen } from "./screens/SleepScreen.js";
import { UserProvider } from "./context/User.js";
import { BabyProvider } from "./context/Baby.js";

const App = () =>{
  return(
    <UserProvider>
    <BabyProvider>
    <SleepScreen></SleepScreen>
    </BabyProvider>
    </UserProvider>
  );
}
export default App;
>>>>>>> Screens
