import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { BASE_URI, BASE_URI_CES, primaryOrangeColor } from "../config";
import React, { useContext, useEffect, useState } from "react";
import { getItem, saveItem } from "../storage/GeneralStorage";

import { AuthContext } from "../context/AuthContext";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StandardStyles } from "../styles/StandardStyles";
import axios from "axios";

const HomeScreen = ({ navigation }) => {

    const [, , token, logout, , user] = useContext(AuthContext);

    const [lineas, setLineas] = useState({});
    const [code, setCode] = useState('');
    const [userVerified, setUserVerified] = useState((!user.email_verified_at) ? false : true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cesToken = await getItem('ces:token').then(t => { return t });
                axios.get(`${BASE_URI_CES}/LineasNegocio?pageIndex=0&pageSize=5`, {
                    headers: {
                        'Authorization': `Bearer ${cesToken}`
                    }
                }).then(resp => {
                    setLineas(resp.data.content);
                })
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    async function generateNewCode() {
        console.log(`${BASE_URI}/verifyEmail`)

        axios.post(`${BASE_URI}/verifyEmail`, { email: user.email }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => {
            console.log(resp.data.message);
            Alert.alert("Operación exitosa", resp.data.message, [
                {
                    text: 'Cerrar',
                    style: 'cancel',
                },
            ]);
            return;
        }).catch(e => {
            Alert.alert("Se ha producido un error inesperado", '', [
                {
                    text: 'Cerrar',
                    style: 'cancel',
                },
            ]);
            console.log(e)

        });
    }


    async function verifyCode() {
        if (code.length < 5) {
            Alert.alert("Error al verificar", 'El código debe ser de 5 digitos', [
                {
                    text: 'Cerrar',
                    style: 'cancel',
                },
            ]);
            return;
        }

        axios.post(`${BASE_URI}/verifyCode`, { email: user.email, code }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(async res => {
            Alert.alert(res.data.message, '', [
                {
                    text: 'Cerrar',
                    style: 'cancel',
                },
            ]);
            console.log(res.data);
            if (res.data.user) {
                await saveItem('user:data', JSON.stringify(res.data.user));
                setUserVerified(true)

            }
            return;
        }).catch(e => console.log(`Error: ${e}`));
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ alignItems: "center", flex: 1, backgroundColor: "white" }}>
                <View style={styles.contentWrapper}>
                    {
                        (!userVerified) ?
                            <>
                                <Text style={styles.title}>Se ha enviado una notificación con un código de 5 digitos a su correo, para poder verificarlo inserte el código abajo y presione "Verificar código".</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.inputCode}
                                        keyboardType="numeric"
                                        maxLength={5}
                                        value={code}
                                        onChangeText={(text) => setCode(text)}
                                    />
                                </View>
                                <View style={styles.buttonWrapper}>
                                    <TouchableOpacity style={[StandardStyles.orangePrimaryButton, styles.buttons]} onPress={verifyCode}>

                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}> Verificar código</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[StandardStyles.bluePrimaryButton, styles.buttons]} onPress={generateNewCode}>

                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}> Generar uno nuevo</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            :
                            <><Text style={{ fontSize: 22, fontWeight: "bold" }}>
                                Bienvenido, {user.name}.
                            </Text><TouchableOpacity style={styles.boxOption}>
                                    <FontAwesome6 name="building-user" size={30} style={styles.iconBoxOption} />
                                    <Text style={styles.textBoxOption}> Consultar Obras</Text>
                                </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate("Lineas", { data: lineas })} style={styles.boxOption}>

                                    <MaterialCommunityIcons name="calculator-variant" size={30} style={styles.iconBoxOption} />
                                    <Text style={styles.textBoxOption}>Autocotizador</Text>
                                </TouchableOpacity></>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 50,
        marginHorizontal: 5
    },
    buttonWrapper: {
        flexDirection: "row"
    },
    inputWrapper: {
        width: 350,
        alignItems: "center",
        marginTop: 110
    },
    inputCode: {
        width: "70%",
        paddingLeft: 20,
        paddingTop: 40,
        fontSize: 50,
        textAlign: "center",
        borderBottomWidth: 3,
        backgroundColor: "#F9F7F7",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        letterSpacing: 15
    },
    title: {
        fontSize: 24,
        marginTop: 70,
        textAlign: "center",
        paddingHorizontal: 20,
        // fontWeight: "bold"
    },
    contentWrapper: {
        marginTop: 60,
        alignItems: "center"
    },
    boxOption: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "black",
        width: 300,
        paddingHorizontal: 10,
        paddingVertical: 30,
        borderRadius: 20,
        marginTop: 20
    },
    textBoxOption: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#313C4b"
    },
    iconBoxOption: {
        backgroundColor: "#313C4b",
        color: "white",
        padding: 10,
        borderRadius: 10
    }
})

export default HomeScreen;