import { View, Text, StyleSheet } from "react-native";
import { useEffect } from 'react';
import { Avatar } from 'react-native-paper';


/**
 * SplashScreen Component
 * * Serves as the initial entry point of the application. It displays the brand 
 * identity (logo) and manages the initial delay before entering the app's 
 * authentication flow.
 * * @param {Object} props - Component properties.
 * @param {Object} props.navigation - React Navigation object used to redirect 
 * the user to the "LoginScreen".
 * * @returns {JSX.Element} A centered view featuring the application's logo.
 */
export const SplashScreen = (props) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      props.navigation.navigate("LoginScreen");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
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