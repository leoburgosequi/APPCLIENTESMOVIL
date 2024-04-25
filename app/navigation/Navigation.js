import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RegisterScreen from "../screens/RegisterScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Registrarse" component={RegisterScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default function Navigation (){
    return (
        <MyStack />
    )
}