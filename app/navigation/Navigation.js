import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from "../context/AuthContext";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import { ProfileScreen } from '../screens';
import RegisterScreen from "../screens/RegisterScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { primaryOrangeColor } from '../config';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 80,
        backgroundColor: primaryOrangeColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
}

const styles = StyleSheet.create({
    iconFocus: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 8,
        borderRadius: 10
    },
    iconNotFocus: {
        backgroundColor: primaryOrangeColor
    },
    textFocus:{
        fontSize:14,
        color:"white",
        fontWeight:"bold"
    },
    textNotFocus:{
        fontSize:13,
        color:"#FF976B" ,

    }
})


function MyStack() {
    const [, , token] = useContext(AuthContext);
    return (
        <Stack.Navigator initialRouteName="Login">
            {
                (token !== '') ? <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
                    :
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Registrarse" component={RegisterScreen} options={{ headerShown: true }} />
                    </>
            }

        </Stack.Navigator>
    )
}

function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <View style={focused ? styles.iconFocus : styles.iconNotFocus}>
                                    <Entypo name="home" size={30} color={focused ? primaryOrangeColor : "#FF976B"} />
                                </View>
                                <Text style={focused ? styles.textFocus : styles.textNotFocus}>Inicio</Text>
                            </>

                        )
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <View style={focused ? styles.iconFocus : styles.iconNotFocus}>
                                    <FontAwesome name="user" size={30} color={focused ? primaryOrangeColor : "#FF976B"} />
                                </View>
                                <Text style={focused ? styles.textFocus : styles.textNotFocus}>Perfil</Text>
                            </>

                        )
                    }
                }} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <MyStack />
    )
}