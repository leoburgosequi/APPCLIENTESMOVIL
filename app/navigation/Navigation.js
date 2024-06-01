import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/AuthContext";
import CatalogoScreen from '../screens/CatalogoScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ContactScreen from '../screens/ContactScreen';
import ContentScreen from '../screens/ContentScreen';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import LineasScreen from '../screens/LineasScreen';
import LoginScreen from "../screens/LoginScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Movements from '../screens/Movements';
import { NavigationContainer } from '@react-navigation/native';
import PolicyScreen from '../screens/PolicyScreen';
import { ProfileScreen } from '../screens';
import QuestionsScreen from '../screens/QuestionsScreen';
import RegisterScreen from "../screens/RegisterScreen";
import SaldoScreen from '../screens/SaldoScreen';
import SelectClientScreen from '../screens/SelectClientScreen';
import SystemDetailScreen from '../screens/SystemDetailScreen';
import SystemsScreen from '../screens/SystemsScreen';
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
        height: 100,
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
    textFocus: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold"
    },
    textNotFocus: {
        fontSize: 13,
        color: "#FF976B",

    }
})


function MyStack() {

    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [login, testApi, token, logout, register, user, , cesToken] = useContext(AuthContext);

    return (
        <Stack.Navigator initialRouteName="Login">
            {
                (token) ?
                    <>
                        <Stack.Screen name="Inicio" component={HomeTabs} options={{ headerShown: false }} />
                        <Stack.Screen name="Lineas de Negocio" component={LineasScreen} options={{ headerShown: true }} />
                        <Stack.Screen name="Preguntas" component={QuestionsScreen} />
                        <Stack.Screen name="Sistemas" component={SystemsScreen} />
                        <Stack.Screen name="Sistema" component={SystemDetailScreen} />
                        <Stack.Screen name="Seleccionar cliente" component={SelectClientScreen} />
                        <Stack.Screen name="Movimientos" component={Movements} />
                        <Stack.Screen name="Saldo en obra" component={SaldoScreen} />
                        <Stack.Screen name="Categorías" component={CategoryScreen} />

                    </>
                    :
                    <>

                        <Stack.Screen name="Registrarse" component={RegisterScreen} options={{ headerShown: true }} />
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Politica de tratamiento de datos" component={PolicyScreen} />
                    </>
            }

        </Stack.Navigator>
    )
}

function HomeTabs() {
    return (

        <Tab.Navigator screenOptions={screenOptions} initialRouteName='Home'>
            <Tab.Screen
                name="Contenido"
                component={ContentScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <View style={focused ? styles.iconFocus : styles.iconNotFocus}>
                                    <MaterialCommunityIcons name="dots-grid" size={30} color={focused ? primaryOrangeColor : "#FF976B"} />

                                </View>
                                <Text style={focused ? styles.textFocus : styles.textNotFocus}>Contenido</Text>
                            </>

                        )
                    }
                }} />
            <Tab.Screen
                name="Catalogo"
                component={CatalogoScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <View style={focused ? styles.iconFocus : styles.iconNotFocus}>
                                    <MaterialCommunityIcons name="web" size={30} color={focused ? primaryOrangeColor : "#FF976B"} />
                                </View>
                                <Text style={focused ? styles.textFocus : styles.textNotFocus}>Catálogo</Text>
                            </>

                        )
                    }
                }} />
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
                    },

                }}
            />
            <Tab.Screen
                name="Contacto"
                component={ContactScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                <View style={focused ? styles.iconFocus : styles.iconNotFocus}>
                                    <Feather name="message-circle" size={30} color={focused ? primaryOrangeColor : "#FF976B"} />
                                </View>
                                <Text style={focused ? styles.textFocus : styles.textNotFocus}>Contacto</Text>
                            </>

                        )
                    }
                }} />
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