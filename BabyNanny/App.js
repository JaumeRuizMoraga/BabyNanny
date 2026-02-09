
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