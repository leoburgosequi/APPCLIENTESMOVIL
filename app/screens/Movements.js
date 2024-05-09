import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { BASE_URI_CES } from '../config';
import Loader from '../components/Loader';
import axios from 'axios';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Movements = ({ navigation, route }) => {
    const [, , , logout, , user, , cesToken] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const data = route.params;

    const getEnc = () => {
        axios.get(`${BASE_URI_CES}/getKardexEnc?obra=22504&cliente=890115406&empresa=1&ptoVenta=BAQ`, {
            headers: {
                'Authorization': `Bearer ${cesToken}`
            }
        }).then(resp => {
            console.log(resp.data);
        }).catch(error => console.log(`Error: ${error}`));
    }

    const getDet = () => {
        setIsLoading(true);
        axios.get(`${BASE_URI_CES}/getKardexDet?obra=22504&cliente=890115406&empresa=1&ptoVenta=BAQ&fechaIni=01/02/2021&fechaFin=14/05/2021`, {
            headers: {
                'Authorization': `Bearer ${cesToken}`
            }
        }).then(resp => {
            console.log(resp.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(`Details error: ${error}`);
            setIsLoading(false);
        })
    }



    const html = `
        <html>
            <body>
                <h1> PDF NEW </h1>
            </body>
        </html>
    `;

    const generatePdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });

        await shareAsync(file.uri);
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Movements</Text>
            <Button title="Generar PDF" onPress={generatePdf} />
            {
                isLoading && (
                    <Loader text="Cargando kardex" />
                )
            }
        </View>
    )
}

export default Movements

const styles = StyleSheet.create({})