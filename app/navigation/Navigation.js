import React, { useContext } from 'react';

import { AuthContext } from "../context/AuthContext";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from "../screens/RegisterScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();



function MyStack() {
    const [, , token] = useContext(AuthContext);
    return (
        <Stack.Navigator initialRouteName="Login">
            {
                (token !== '') ? <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
                    :
                    <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Registrarse" component={RegisterScreen} options={{ headerShown: true }} />
                    </>
            }

        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <MyStack />
    )
}