import { BASE_URI_CES, defaultListaPrecio } from '../config';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'

import axios from 'axios';
import { getItem } from '../storage/GeneralStorage';

const SystemDetailScreen = ({ navigation, route }) => {

    const data = route.params;
    console.log(data.questions);
    console.log(`${BASE_URI_CES}/get-systems-by-id?${data.answers}&listaPrecio=${defaultListaPrecio}`);

    useEffect  (() => {
        
        const detailSystem = async () => {
            const cesToken = await getItem('ces:token');
            axios.get(`${BASE_URI_CES}/getSystemById?${data.answers}&listaPrecio=${defaultListaPrecio}&idSistema=${data.idSistema}`,{
                headers: {
                    'Authorization': `Bearer ${cesToken}`
                }
            })
            .then(d => {console.log("DEtalles del sistema: ", d.data)})
            .catch(e => console.log(`Error ${e}`));
        }

        detailSystem();
    }, [])


    return (
        <View>
            <Text>SystemDetailScreen</Text>
        </View>
    )
}

export default SystemDetailScreen

const styles = StyleSheet.create({})