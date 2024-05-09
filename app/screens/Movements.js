import * as WebBrowser from 'expo-web-browser';

import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { BASE_URI_CES } from '../config';
import Loader from '../components/Loader';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Movements = ({ navigation, route }) => {
    const [, , , logout, , user, , cesToken] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const data = route.params;
    const [result, setResult] = useState(null);
    const [cont, setCont] = useState(0);

    const [showWebView, setShowWebView] = useState(false);
    const webviewRef = useRef(null);

    const url = `http://193.122.159.234:8082/XSoft-Reportes/resources/GWTJReportGenerator.html?cn=com.xsoft.logistica.reportes.kardexclientefac.KardexClienteFactura&createPl=T&sessionId=EFFF5398E6FB1A58633D8ACB3A25D113&PARAMFORM=NO&DESTYPE=SCREEN&pempresa=1&ppto_venta=BAQ&usuario=CALTAMAR&pfecha_ini=01/02/2021&pfecha_fin=14/11/2023&pcliente=890115406&pobra=22504&ver_anulado=NO&DESNAME=${cont}`;

    const handleWebViewNavigationStateChange = (navState) => {
        if (navState.url.includes('XSoft-Reportes')) {
            setTimeout(() => {
                setShowWebView(false);
            }, 3000); // Espera 500ms antes de cerrar
        }
    };

    const openURL = () => {
        const number = Math.floor(Math.random() * 1000);
        console.log(number)
        setCont(number);
        setShowWebView(true);
    };

    const handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(`http://193.122.159.234:8082/XSoft-Reportes/files//${cont}`);
        setResult(result);
    };

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
        /*   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>Movements</Text>
              <Button title="Generar PDF" onPress={generatePruebaPDF} />
              <Button title="dsjkgfskdj" onPress={handlePressButtonAsync} />
  
              {
                  isLoading && (
                      <Loader text="Cargando kardex" />
                  )
              }
          </View> */

        <View style={styles.container}>
            <Button title="dsjkgfskdj" onPress={handlePressButtonAsync} />
            <Button title="Activar URL" onPress={openURL} />
            {showWebView && (
                <WebView
                    ref={webviewRef}
                    source={{ uri: url }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                    style={styles.webview}
                />
            )}
        </View>
    )
}

export default Movements

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    webview: {
        width: 0, // Hacerlo invisible
        height: 0, // Hacerlo invisible
    },
});