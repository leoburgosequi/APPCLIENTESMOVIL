import React, { createContext, useEffect, useState } from "react";
import { deleteItem, getItem, saveItem } from "../storage/GeneralStorage";

import { Alert } from "react-native";
import { BASE_URI } from "../config";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user,setUser] = useState({});
    const [token, setToken] = useState('');


    const login = async (email, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URI}/login`, {
            email, password
        }).then(async res => {
            console.log("Data. ",res.data);
            if(res.data.user === null){
                Alert.alert(res.data.message, '', [
                    {
                      text: 'Cerrar',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ]);
                  setIsLoading(false);
                  return;
            }
            
            await saveItem('user:data', JSON.stringify(res.data.user));
            await saveItem('user:token', res.data.access_token);
            await saveItem('ces:token', res.data.t_access );
            setUser(res.data.user);
            setToken(res.data.access_token);
            console.log("Mensjae: ",res.data.message);
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
            console.log("token: ", res);
            if (res !== null) {
                axios.post(`${BASE_URI}/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${res}`
                    }
                }).then(async res => {
                    console.log(res.data);
                    await deleteItem('user:token');
                    await deleteItem('user:data');
                    setUser({});
                    setToken('');
                    setIsLoading(false);
                }).catch(e => {
                    console.log("Error al realizar petición. ",e);
                    setIsLoading(false);
            });
            }
        }).catch(error => {
            console.log("Error al obtener data", error);
            setIsLoading(false);
        })
    }

    const register = (name, email, password, passwordConfirmation) => {
        setIsLoading(true);
        const data = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        }
        axios.post(`${BASE_URI}/register`, data).then(res => {
            console.log(res.data.message);
            if(res.data.user === null){
                Alert.alert("Error al registrar usuario", (email !== undefined) ? "* Este Correo ya existe": '' + "\n" + (password !== undefined) ? "* Las contraseñas no coinciden":'' , [
                    {
                      text: 'Cerrar',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ]);
                  setIsLoading(false);
                  return;
            }else{

                Alert.alert("Usuario creado exitosamente", '' , [
                    {
                      text: 'Cerrar',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ]);
                setUser(res.data.user);
                setIsLoading(false);
                console.log("data to login from register: ",email,password);
                login(email,password);
            }
            
        }).catch(e => {
            console.log(`Error register ${e}`);
            setIsLoading(false);
        });

    };



    return (
        <AuthContext.Provider value={[login, testApi,token,logout, register,user]} >
            {children}
        </AuthContext.Provider>
    );
}