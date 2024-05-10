import * as WebBrowser from 'expo-web-browser';

import { BASE_URI_CES, grayStandardColor } from '../config';
import { Button, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../components/Loader';
import SimpleBackground from '../components/SimpleBackground';
import { StandardStyles } from '../styles/StandardStyles';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Movements = ({ navigation, route }) => {
    const [, , , logout, , user, , cesToken] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const data = route.params;
    console.log(data);
    const [result, setResult] = useState(null);
    const [cont, setCont] = useState(0);
    const [showWebView, setShowWebView] = useState(false);
    const webviewRef = useRef(null);
    const url = `http://193.122.159.234:8082/XSoft-Reportes/resources/GWTJReportGenerator.html?cn=com.xsoft.logistica.reportes.kardexclientefac.KardexClienteFactura&createPl=T&sessionId=EFFF5398E6FB1A58633D8ACB3A25D113&PARAMFORM=NO&DESTYPE=SCREEN&pempresa=1&ppto_venta=BAQ&usuario=APPMOVIL&pfecha_ini=01/02/2021&pfecha_fin=14/11/2023&pcliente=890115406&pobra=22504&ver_anulado=NO&DESNAME=${cont}`;

    const [date, setDate] = useState(new Date());
    const [fechaInicial, setFechaInicial] = useState('');
    const [showPickerFechaInicial, setShowPickerFechaInicial] = useState(false);
    const [dateFinal, setDateFinal] = useState(new Date);
    const [fechaFinal, setFechaFinal] = useState('');
    const [showPickerFechaFinal, setShowPickerFechaFinal] = useState(false);

    const handleWebViewNavigationStateChange = async (navState) => {
        if (navState.url.includes('XSoft-Reportes')) {
            setTimeout(() => {
                setShowWebView(false);
                console.log("en setimeout");
                handlePressButtonAsync();
            }, 3000);

        }
    };

    const openURL = () => {
        console.log(fechaInicial, fechaFinal);
        if (fechaInicial > fechaFinal) {

            console.log("La fecha es mayor");

        } else {
            console.log("es menor")
        }
        const number = Math.floor(Math.random() * 1000);
        console.log(number)
        setCont(number);
        setShowWebView(true);
    };

    const handlePressButtonAsync = async () => {
        console.log("abreidno link");
        let result = await WebBrowser.openBrowserAsync(`http://193.122.159.234:8082/XSoft-Reportes/files//${cont}`);
        setResult(result);
    };

    /****** PICKER METHODS *************/

    const toggleFechaInicialPicker = () => {
        setShowPickerFechaInicial(!showPickerFechaInicial);
    }

    const toggleFechaFinalPicker = () => {
        setShowPickerFechaFinal(!showPickerFechaFinal);
    }

    const onChangeFechaInicial = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleFechaInicialPicker();
                setFechaInicial(currentDate);
            }
        } else {
            toggleFechaInicialPicker();
        }
    }

    const onChangeFechaFinal = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDateFinal(currentDate);
            if (Platform.OS === 'android') {
                toggleFechaFinalPicker();
                setFechaFinal(currentDate);
            }
        } else {
            toggleFechaFinalPicker();
        }
    }


    const iosChangeFechaInicial = () => {
        setFechaInicial(date);
        toggleFechaInicialPicker();
    }

    const iosChangeFechaFinal = () => {
        setFechaFinal(dateFinal);
        toggleFechaFinalPicker();
    }

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Desde: </Text>
            {
                showPickerFechaInicial && (
                    <DateTimePicker
                        mode="date"
                        display='spinner'
                        value={date}
                        onChange={onChangeFechaInicial}
                        style={styles.datePicker}
                    />
                )
            }

            {showPickerFechaInicial && Platform.OS === "ios" &&
                (
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity style={[StandardStyles.bluePrimaryButton, { marginHorizontal: 10 }]} onPress={toggleFechaInicialPicker}>
                            <Text style={styles.buttonTextPicker}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginHorizontal: 10 }]} onPress={iosChangeFechaInicial}>
                            <Text style={styles.buttonTextPicker}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                )}

            {
                !showPickerFechaInicial && (
                    <Pressable
                        onPress={toggleFechaInicialPicker}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="fecha inicial"
                            value={(fechaInicial) ? fechaInicial.toLocaleDateString() : fechaInicial}
                            onChangeText={setFechaInicial}
                            editable={false}
                            onPressIn={toggleFechaInicialPicker}
                        />
                    </Pressable>
                )
            }

            <Text style={styles.label}>Hasta: </Text>
            {
                showPickerFechaFinal && (
                    <DateTimePicker
                        mode="date"
                        display='spinner'
                        value={dateFinal}
                        onChange={onChangeFechaFinal}
                        style={styles.datePicker}
                    />
                )
            }

            {showPickerFechaFinal && Platform.OS === "ios" &&
                (
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity style={[StandardStyles.bluePrimaryButton, { marginHorizontal: 10 }]} onPress={toggleFechaFinalPicker}>
                            <Text style={styles.buttonTextPicker}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginHorizontal: 10 }]} onPress={iosChangeFechaFinal}>
                            <Text style={styles.buttonTextPicker}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                )}

            {
                !showPickerFechaFinal && (
                    <Pressable
                        onPress={toggleFechaFinalPicker}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha final"
                            value={(fechaFinal) ? fechaFinal.toLocaleDateString() : fechaFinal}
                            onChangeText={setFechaFinal}
                            editable={false}
                            onPressIn={toggleFechaFinalPicker}
                        />
                    </Pressable>
                )
            }


            <TouchableOpacity style={StandardStyles.bluePrimaryButton} onPress={openURL} >
                <Text style={{ color: "white", fontWeight: "bold" }}>Generar PDF</Text>
            </TouchableOpacity>
            {showWebView && (
                <WebView
                    ref={webviewRef}
                    source={{ uri: url }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                    style={styles.webview}
                />
            )}
            <SimpleBackground width="100%" />
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
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        width: 250
    },
    label: {
        padding: 7,
    },
    datePicker: {
        height: 120,
        marginTop: -10
    },
    buttonTextPicker: {
        color: "white",
        fontWeight: "bold"
    },
});