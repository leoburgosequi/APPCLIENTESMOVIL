import React, { createContext, useEffect, useState } from "react";
import { deleteItem, getItem, saveItem } from "../storage/GeneralStorage";

import { Alert } from "react-native";
import { BASE_URI } from "../config";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [cesToken, setCesToken] = useState('');

    const login = async (email, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URI}/login`, {
            email, password
        }).then(async res => {
            if (res.data.user === null) {
                Alert.alert(res.data.message, '', [
                    {
                        text: 'Cerrar',
                        style: 'cancel',
                    },
                ]);
                setIsLoading(false);
                return;
            }

            await saveItem('user:data', JSON.stringify(res.data.user));
            await saveItem('user:token', res.data.access_token);
            await saveItem('ces:token', res.data.t_access);
            setUser(res.data.user);
            setToken(res.data.access_token);
            setCesToken(res.data.t_access);
            setIsLoading(false);
        }).catch(error => {
            console.log(`Login error ${error}`);
            setIsLoading(false);
        });
    }

    const testApi = () => {
        console.log("testApi");
        setIsLoading(true);
        axios.get(`${BASE_URI}/testApi`).then(res => {
            Alert.alert(res.data.nombre, '', [
                {
                    text: 'Cerrar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ]);
            setIsLoading(false);
            return;
        }).catch(e => {
            setIsLoading(false);
            console.log("test api error: ", e);
        })
    }

    const logout = async () => {
        setIsLoading(true);
        const token = await getItem('user:token').then(res => {
            if (res !== null) {
                axios.post(`${BASE_URI}/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${res}`
                    }
                }).then(async res => {
                    await deleteItem('user:token');
                    await deleteItem('user:data');
                    setUser({});
                    setToken('');
                    setIsLoading(false);
                }).catch(e => {
                    console.log("Error al realizar petición. ", e);
                    setIsLoading(false);
                });
            }
        }).catch(error => {
            console.log("Error al obtener data", error);
            setIsLoading(false);
        })
    }

    const register = (name, email, password, passwordConfirmation, tratamientoCheck) => {
        setIsLoading(true);
        if (!tratamientoCheck) {
            Alert.alert("Error al registrar usuario", "Debe Autorizar el tratamiento de sus datos.", [
                {
                    text: 'Cerrar',
                    style: 'cancel',
                },
            ]);
            setIsLoading(false);
            return;
        }
        const data = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        }
        axios.post(`${BASE_URI}/register`, data).then(res => {
            if (res.data.user === null) {
                Alert.alert("Error al registrar usuario", (res.data.message.email) ? res.data.message.email[0] : '' + "\n" + (res.data.message.password) ? res.data.message.password[0] : '', [
                    {
                        text: 'Cerrar',
                        style: 'cancel',
                    },
                ]);
                setIsLoading(false);
                return;
            } else {

                Alert.alert("Usuario creado exitosamente", '', [
                    {
                        text: 'Cerrar',
                        style: 'cancel',
                    },
                ]);
                setUser(res.data.user);
                setIsLoading(false);
                login(email, password);
            }

        }).catch(e => {
            console.log(`Error register ${e}`);
            setIsLoading(false);
        });

    };



    return (
        <AuthContext.Provider value={[login, testApi, token, logout, register, user, isLoading, cesToken]} >
            {children}
        </AuthContext.Provider>
    );
}