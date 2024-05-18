import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AuthContext } from '../context/AuthContext'
import { BASE_URI_CES } from '../config'
import axios from 'axios'

const SaldoScreen = ({ route }) => {
    const [, , token, logout, , user, , cesToken] = useContext(AuthContext);

    useEffect(() => {
        const getSaldoObra = async () => {
            axios.get(`${BASE_URI_CES}/get-saldo-obra?obra=${obra.codigo}&ptoVenta=${obra.ptoVenta}`, {
                headers: {
                    'Authorization': `Bearer ${cesToken}`
                }
            }).then(response => {
                console.log(response.data.content);
                const gruped = groupByCategory(response.data.content);
                console.log(gruped);
            }).catch(error => {
                console.log(`Error: ${error}`);
            })
        }

        getSaldoObra();
    }, [])

    function groupByCategory(data) {
        const grouped = {};

        data.forEach(item => {
            const category = item.category;
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(item);
        });

        return grouped;
    }

    const { obra } = route.params;
    console.log(obra);
    return (
        <View style={styles.container}>
            <Text>Saldos screen</Text>
        </View>
    )
}

export default SaldoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    }
})