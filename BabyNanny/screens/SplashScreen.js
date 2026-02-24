import { View,Text,StyleSheet } from "react-native";
import { useEffect } from 'react';
import { Avatar } from 'react-native-paper';


 export const SplashScreen = (props) =>{
    // Dentro de tu componente de Splash
useEffect(() => {
  const timer = setTimeout(() => {
    // Aquí ejecutas tu función o navegación
    props.navigation.navigate("LoginScreen"); 
  }, 2000);

  // Limpieza del timer si el componente se desmonta
  return () => clearTimeout(timer);
}, []);
    return(
        <View style={styles.container}>
              <Avatar.Image size={130} source={require('../assets/img/baby_icon.jpg')} />
        </View>
    );
 }
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    });