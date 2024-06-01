import * as WebBrowser from 'expo-web-browser';

import { Alert, Button, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BASE_URI_CES, grayStandardColor, primaryOrangeColor, timeActivity } from '../config';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { checkActivity, simpleMsgAlert } from '../helpers/General';

import { AuthContext } from '../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import Loader from '../components/Loader';
import SimpleBackground from '../components/SimpleBackground';
import { StandardStyles } from '../styles/StandardStyles';
import axios from 'axios';

const Movements = ({ navigation, route }) => {
    const [, , , logout, , user, , cesToken] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const data = route.params;
    const range = 12;

    const [result, setResult] = useState(null);
    const [cont, setCont] = useState('');
    const [finalUrl, setFinalUrl] = useState('');
    //const url = `http://193.122.159.234:8082/XSoft-Reportes/resources/GWTJReportGenerator.html?cn=com.xsoft.logistica.reportes.kardexclientefac.KardexClienteFactura&createPl=T&sessionId=EFFF5398E6FB1A58633D8ACB3A25D113&PARAMFORM=NO&DESTYPE=SCREEN&pempresa=1&ppto_venta=${data.obra.ptoVenta}&usuario=APPMOVIL&pfecha_ini=${fechaInicial}&pfecha_fin=${fechaFinal}&pcliente=${data.cliente}&pobra=${data.obra.codigo}&ver_anulado=NO&DESNAME=${cont}`;

    const [date, setDate] = useState(new Date());
    const [fechaInicial, setFechaInicial] = useState('');
    const [showPickerFechaInicial, setShowPickerFechaInicial] = useState(false);
    const [dateFinal, setDateFinal] = useState(new Date());
    const [fechaFinal, setFechaFinal] = useState('');
    const [showPickerFechaFinal, setShowPickerFechaFinal] = useState(false);

    useEffect(() => {
        checkActivity(timeActivity, logout);
    }, []);


    useEffect(() => {
        async function updateUrlAndProcess() {
            if (cont !== '') {
                const newUrl = makeUrl();
                setFinalUrl(newUrl);
            }
        }
        updateUrlAndProcess();
    }, [cont])


    function makeUrl(fileName) {
        return `http://193.122.159.234:8082/XSoft-Reportes/resources/GWTJReportGenerator.html?cn=com.xsoft.logistica.reportes.kardexclientefac.KardexClienteFactura&createPl=T&sessionId=EFFF5398E6FB1A58633D8ACB3A25D113&PARAMFORM=NO&DESTYPE=SCREEN&pempresa=1&ppto_venta=${data.obra.ptoVenta}&usuario=APPMOVIL&pfecha_ini=${formatDate(fechaInicial)}&pfecha_fin=${formatDate(fechaFinal)}&pcliente=${data.cliente}&pobra=${data.obra.codigo}&ver_anulado=NO&DESNAME=${fileName}`
    }

    const openURL = async () => {
        if (fechaFinal === '' || fechaInicial === '') {
            simpleMsgAlert("¡Atención!", "Las fechas son obligatorias.");
            return;
        }

        if (validateDateRange(fechaInicial, fechaFinal)) {
            simpleMsgAlert("¡Atención!", `El rango de fechas debe estar entre ${range} meses.`);
            return;
        }

        if (fechaInicial <= fechaFinal) {
            setTimeout(async () => {
                const firstNumber = Math.floor(Math.random() * 100000);
                const secondNumber = Math.floor(Math.random() * (30000 - 20000 + 1)) * firstNumber;

                const fileName = `${secondNumber}_${data.obra.nombre.replace(/\s+/g, '_')}_${data.obra.ptoVenta}_${formatDate(fechaInicial)}_${formatDate(fechaFinal)}`;

                console.log(fileName);

                const newUrl = makeUrl(fileName);
                console.log(newUrl);
                WebBrowser.openBrowserAsync(newUrl);

                setTimeout(() => {
                    WebBrowser.openBrowserAsync(`http://193.122.159.234:8082/XSoft-Reportes/files//${fileName}`);
                }, 6000);

            }, 500);
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

    function validateDateRange(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        const earlierDate = new Date(Math.min(d1, d2));
        earlierDate.setMonth(earlierDate.getMonth() + range);

        if (earlierDate < new Date(Math.max(d1, d2))) {
            return true;
        } else {
            return false;
        }
    }


    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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
                            value={(fechaInicial) ? formatDate(fechaInicial) : fechaInicial}
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
                            value={(fechaFinal) ? formatDate(fechaFinal) : fechaFinal}
                            onChangeText={setFechaFinal}
                            editable={false}
                            onPressIn={toggleFechaFinalPicker}
                        />
                    </Pressable>
                )
            }
            <View style={{ alignItems: "center", width: "95%" }}>
                <Text style={{ marginTop: 20, color: "gray", }}><FontAwesome5 name="exclamation-circle" size={20} color={primaryOrangeColor} /> El rango de fechas debe estar comprendido en {range} meses.</Text>

            </View>



            <TouchableOpacity style={[StandardStyles.bluePrimaryButton, { marginTop: 20 }]} onPress={openURL} >
                <Text style={{ color: "white", fontWeight: "bold" }}>Generar PDF</Text>
            </TouchableOpacity>

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