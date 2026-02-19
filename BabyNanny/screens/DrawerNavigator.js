import { createDrawerNavigator } from '@react-navigation/drawer';
import { SleepScreen } from './SleepScreen';
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
import { MedicalRecordScreen } from './MedicalRecordScreen.js';
import { changeLanguage } from 'i18next';

import '../assets/i18n';

import { useContext, useState, useEffect } from 'react';
const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
    const { user, setUser } = useContext(User)
    const { token, setToken } = useContext(Token);
    const [isLoading, setIsLoading] = useState(true);
    const [noBaby, setNoBaby] = useState()
    const { baby, setBaby } = useContext(Baby);

    const getAllData = async () => {
        try {
            let babies = await getDataBabies(token.token)
            let userReal = await getDataUser(token.token);
            userReal.babies = babies.babies;
            await setUser(userReal);
            await setBaby(userReal.babies[0]);
            console.log(baby)
            const userLang = userReal.config.language;
            if (userLang === "es" || userLang === "en") {
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
        console.log(user)
        console.log("Fin log")
    }

    const goLogin = () => {
        props.navigation.navigate("LoginScreen")
    }

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

    useEffect(() => {
        getAllData(token);
    }, []);

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#DA70D6" />
            </View>)
    }

    return (
        <Drawer.Navigator screenOptions={draweOptrions} initialRouteName={noBaby ? "NoBaby" : "Home"}>
            <Drawer.Screen name="Home" options={{ headerShown: true }} goLogin={goLogin} component={Home} />
            {noBaby &&
                <Drawer.Screen name="NoBaby" options={{ headerShown: false }} component={NoBaby} />
            }
            <Drawer.Screen name="NewBaby" options={{ headerShown: !noBaby }} component={NewBaby} />
            <Drawer.Screen name="Config" options={{ headerShown: true }} component={ConfigScreen} />
            <Drawer.Screen name="SleepScreen" options={{ headerShown: true }} component={SleepScreen} />
            <Drawer.Screen name="MedicalRecordScreen" options={{ headerShown: true }} component={MedicalRecordScreen} />

        </Drawer.Navigator>
    );
}