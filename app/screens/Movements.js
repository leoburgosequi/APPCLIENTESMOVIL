import * as WebBrowser from 'expo-web-browser';

import { Alert, Button, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BASE_URI_CES, grayStandardColor } from '../config';
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
import { simpleMsgAlert } from '../helpers/General';

const Movements = ({ navigation, route }) => {
    const [, , , logout, , user, , cesToken] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const data = route.params;

    const [result, setResult] = useState(null);
    const [cont, setCont] = useState(0);
    const [showWebView, setShowWebView] = useState(false);
    const webviewRef = useRef(null);
    const [finalUrl, setFinalUrl] = useState('');
    //const url = `http://193.122.159.234:8082/XSoft-Reportes/resources/GWTJReportGenerator.html?cn=com.xsoft.logistica.reportes.kardexclientefac.KardexClienteFactura&createPl=T&sessionId=EFFF5398E6FB1A58633D8ACB3A25D113&PARAMFORM=NO&DESTYPE=SCREEN&pempresa=1&ppto_venta=${data.obra.ptoVenta}&usuario=APPMOVIL&pfecha_ini=${fechaInicial}&pfecha_fin=${fechaFinal}&pcliente=${data.cliente}&pobra=${data.obra.codigo}&ver_anulado=NO&DESNAME=${cont}`;

    const [date, setDate] = useState(new Date());
    const [fechaInicial, setFechaInicial] = useState('');
    const [showPickerFechaInicial, setShowPickerFechaInicial] = useState(false);
    const [dateFinal, setDateFinal] = useState(new Date());
    const [fechaFinal, setFechaFinal] = useState('');
    const [showPickerFechaFinal, setShowPickerFechaFinal] = useState(false);


    useEffect(() => {
        if (cont !== 0) {
            const newUrl = makeUrl();
            setFinalUrl(newUrl);
        }
    }, [cont, fechaFinal, fechaInicial])

    const handleWebViewNavigationStateChange = async (navState) => {
        if (navState.url.includes('XSoft-Reportes')) {
            setTimeout(() => {
                setShowWebView(false);
                handlePressButtonAsync();
            }, 3000);

        }
    };

    function makeUrl() {
        return `http://193.122.159.234:8082/XSoft-Reportes/resources/GWTJReportGenerator.html?cn=com.xsoft.logistica.reportes.kardexclientefac.KardexClienteFactura&createPl=T&sessionId=EFFF5398E6FB1A58633D8ACB3A25D113&PARAMFORM=NO&DESTYPE=SCREEN&pempresa=1&ppto_venta=${data.obra.ptoVenta}&usuario=APPMOVIL&pfecha_ini=${fechaInicial.toLocaleDateString()}&pfecha_fin=${fechaFinal.toLocaleDateString()}&pcliente=${data.cliente}&pobra=${data.obra.codigo}&ver_anulado=NO&DESNAME=${cont}`
    }

    const openURL = () => {
        if (fechaFinal === '' || fechaInicial === '') {
            simpleMsgAlert("¡Atención!", "Las fechas son obligatorias.");
            return;
        }

        if (fechaInicial <= fechaFinal) {
            setIsLoading(true)
            setTimeout(() => {
                const number = Math.floor(Math.random() * 1000);
                setCont(number);
            }, 500);
            setShowWebView(true);
        } else {
            simpleMsgAlert("¡Error!", "La fecha inicial no puede ser mayor a la fecha final.");
            return;
        }

    };

    const handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(`http://193.122.159.234:8082/XSoft-Reportes/files//${cont}`);
        setIsLoading(false);
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
            <Text style={styles.title}>Consulta de movimientos de la obra <Text style={styles.resalt}>{data.obra.codigo} - {data.obra.nombre}</Text> </Text>

            <Text style={styles.label}>Desde: </Text>
            {
                showPickerFechaInicial && (
                    <DateTimePicker
                        mode="date"
                        display='spinner'
                        value={date}
                        onChange={onChangeFechaInicial}
                        style={styles.datePicker}
                        minimumDate={new Date('2016-01-01')}
                        maximumDate={new Date()}
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
                            placeholder="Fecha inicial"
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
                        minimumDate={new Date('2016-01-01')}
                        maximumDate={new Date()}
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


            <TouchableOpacity style={[StandardStyles.bluePrimaryButton, { marginTop: 20 }]} onPress={openURL} >
                <Text style={{ color: "white", fontWeight: "bold" }}>Generar PDF</Text>
            </TouchableOpacity>
            {showWebView && (
                <WebView
                    ref={webviewRef}
                    source={{ uri: (finalUrl === '') ? '' : finalUrl }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                    style={styles.webview}
                />
            )}
            <SimpleBackground width="100%" />
            {
                isLoading && (
                    <Loader text="Generando PDF" bg="white" />
                )
            }
        </View>
    )
}

export default Movements

const styles = StyleSheet.create({
    resalt: {
        fontWeight: "bold",
        color: "black"
    },
    title: {
        fontSize: 24,
        color: "gray",
        width: "90%",
        textAlign: "center",
        marginVertical: 30
    },
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    webview: {
        width: 0,
        height: 0,
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
        fontWeight: "bold"
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