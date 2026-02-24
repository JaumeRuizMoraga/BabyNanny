import { createDrawerNavigator } from '@react-navigation/drawer';
import { SleepScreen } from './SleepScreen';
import { BabyGrowth } from './BabyGrowth.js';
import { Home } from './Home.js';
import { NoBaby } from './NoBaby.js';
import { ConfigScreen } from './ConfigScreen.js';
import { NewBaby } from './NewBaby.js';
import User from '../context/User.js'
import Token from '../context/Token.js';
import Baby from '../context/Baby.js';
import { getDataBabies } from '../services/services.js';
import { getDataUser } from '../services/services.js';
import { View, ActivityIndicator } from 'react-native'
import { EventScreen } from './EventsScreen.js';
import { MedicalRecordScreen } from './MedicalRecordScreen.js';
import { changeLanguage } from 'i18next';
import '../assets/i18n';
import { useContext, useState, useEffect } from 'react';

const Drawer = createDrawerNavigator();

/**
 * Component responsible for displaying the side menu, providing navigation options 
 * throughout the app, such as Home, Profile, Settings, etc.
 *
 * @returns {JSX.element} Returns a loading screen if data is still fetching. 
 * Once loaded, it returns either a "No Baby" screen (if the user has no 
 * registered babies) or the main dashboard (if the user has at least one 
 * registered baby), along with the app's navigation options.
 */
export const DrawerNavigator = () => {

    const { user, setUser } = useContext(User);
    const { baby, setBaby } = useContext(Baby);
    const { token, setToken } = useContext(Token);
    const [isLoading, setIsLoading] = useState(true);
    const [noBaby, setNoBaby] = useState();

    /**
     * Function responsible for fetching the user's data and their babies from the backend,
     * and then setting the user and baby contexts accordingly. It also checks the user's 
     * preferred language and applies it to the app. Finally, it updates the loading state.
     * 
     */
    const getAllData = async () => {
        try {
            let babies = await getDataBabies(token.token)
            let userReal = await getDataUser(token.token);
            userReal.babies = babies.babies;
            await setUser(userReal);
            await setBaby(userReal.babies[0]);
            console.log(userReal)
            const userLang = userReal.config.language;
            if (userLang == "es" || userLang == "en") {
                changeLanguage(userLang);
            } else {
                console.log("Idioma no encontrado");
            }
            setNoBaby(userReal.babies.length === 0)
        } catch (error) {
            console.error("Error cargando datos" + error)
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * useEffect hook that triggers the getAllData function when the component mounts,
     * ensuring that the user's data and babies are fetched and the app is set up 
     * correctly before rendering the main content.
     */
    useEffect(() => {
        getAllData();
    }, []);


    const draweOptrions = {
        drawerType: 'slide',
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: '#DA70D6',
        drawerInactiveBackgroundColor: 'white',
        drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
        },
        drawerItemStyle: {
            borderColor: 'black',
            borderWidth: 2,
            borderRadiues: 0,
            opacity: 0.8,
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#dba6da' },
    }

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#DA70D6" />
            </View>)
    }

    return (
        /**
         * Drawer.Navigator component that defines the structure of the side menu and the screens it contains.
         * It conditionally renders the "NoBaby" screen if the user has no registered babies, 
         * and the "Home" screen if they do. It also includes screens for adding a new baby, 
         * configuring settings, viewing sleep data, medical records, events, and baby growth.
         */
        <Drawer.Navigator screenOptions={draweOptrions} initialRouteName={noBaby ? "NoBaby" : "Home"}>
            <Drawer.Screen name="Home" options={{ headerShown: true }} component={Home} />
            <Drawer.Screen name="NoBaby" options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} component={NoBaby} />
            <Drawer.Screen name="NewBaby" options={{ headerShown: !noBaby }} component={NewBaby} />
            <Drawer.Screen name="Config" options={{ headerShown: true }} component={ConfigScreen} />
            <Drawer.Screen name="SleepScreen" options={{ headerShown: true }} component={SleepScreen} />
            <Drawer.Screen name="MedicalRecordScreen" options={{ headerShown: true }} component={MedicalRecordScreen} />
            <Drawer.Screen name="EventScreen" options={{ headerShown: true }} component={EventScreen} />
            <Drawer.Screen name="BabyGrowth" options={{ headerShown: true }} component={BabyGrowth} />
        </Drawer.Navigator>
    );
}