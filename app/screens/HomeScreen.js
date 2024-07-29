import { Alert, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { BASE_URI, BASE_URI_CES, primaryOrangeColor, timeActivity } from "../config";
import React, { useContext, useEffect, useState } from "react";
import { getItem, saveItem } from "../storage/GeneralStorage";

import { AuthContext } from "../context/AuthContext";
import { FontAwesome6 } from '@expo/vector-icons';
import Loader from "../components/Loader";
import Logout from "../components/Logout";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SimpleBackground from "../components/SimpleBackground";
import { StandardStyles } from "../styles/StandardStyles";
import axios from "axios";
import { checkActivity } from "../helpers/General";
import { simpleMsgAlert } from "../helpers/General";

const HomeScreen = ({ navigation }) => {

    const [login, testApi, token, logout, register, user, , cesToken] = useContext(AuthContext);

    const [lineas, setLineas] = useState({});
    const [code, setCode] = useState('');
    const [userVerified, setUserVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user.email_verified_at) {
            setUserVerified(true);
        } else {
            setUserVerified(false);
        }
    }, [user]);

    useEffect(() => {
        checkActivity(timeActivity, logout);
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

    function generateNewCode() {
        setIsLoading(true)


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
            setIsLoading(false)
            return;
        }).catch(e => {
            Alert.alert("Se ha producido un error inesperado", e.toString(), [
                {
                    text: 'Cerrar',
                    style: 'cancel',
                },
            ]);
            console.log(e)
            setIsLoading(false)
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
            if (res.data.user) {
                await saveItem('user:data', JSON.stringify(res.data.user));
                setUserVerified(true)
            }
            return;
        }).catch(e => console.log(`Error: ${e}`));
    }

    function toCapitalizeCase(str) {
        return str
            .toLowerCase()
            .replace(/\b\w/g, chr => chr.toUpperCase());
    }

    const handleGenerateCode = () => {
        generateNewCode();
    };

    const verifyResend = () => {
        console.log("verificar");
        Alert.alert(
            "¡Confirmar acción!",
            "¿Está seguro de generar un nuevo código de verificación?",
            [
                {
                    text: 'Generar',
                    style: 'cancel',
                    onPress: handleGenerateCode  // Pasar la referencia de la función
                },
                {
                    text: 'Cancelar',
                    style: 'destructive',
                    onPress: () => { }
                }
            ]
        );
    };

    function capitalizeEachWord(str) {
        return str.split(' ').map(word => {
            if (word.length > 0) {
                return word[0].toLocaleUpperCase('es-ES') + word.slice(1).toLocaleLowerCase('es-ES');
            }
            return word;
        }).join(' ');
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ alignItems: "center", flex: 1, backgroundColor: "white" }}>
                <View style={styles.contentWrapper}>
                    {
                        (!userVerified) ?
                            <>
                                <Text style={styles.title}>Se ha enviado un código al correo <Text style={{ fontWeight: "bold" }}>{user.email}</Text>, para poder verificarlo, insertelo y presione "Verificar código".</Text>
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
                                    <TouchableOpacity style={[StandardStyles.bluePrimaryButton, styles.buttons]} onPress={verifyResend}>

                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 14, }}> Generar uno nuevo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[StandardStyles.orangePrimaryButton, styles.buttons]} onPress={verifyCode}>

                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}> Verificar código</Text>
                                    </TouchableOpacity>

                                </View>
                            </>
                            :
                            <>
                                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: "35%", paddingHorizontal: 30 }}>
                                    Bienvenido, {user.name ? capitalizeEachWord(user.name) : ""}.
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: "2%", paddingHorizontal: 30 }}>
                                    A continuación, podrás cotizar soluciones estandares de <Text style={{ color: StandardStyles.primaryOrangeColor }}>Equinorte SA</Text>{(user.id_role === 3) && (<Text> y consultar información de tus obras</Text>)}.
                                </Text>
                                <View style={styles.optionWrapper}>
                                    {
                                        (user.id_role === 3) && (
                                            <TouchableOpacity style={styles.boxOption} onPress={() => navigation.navigate("Seleccionar cliente")}>
                                                <View style={styles.wrapperIconOption}>
                                                    <FontAwesome6 name="helmet-safety" size={70} style={styles.iconBoxOption} />
                                                </View>

                                                <View style={styles.textWrapperOption} >
                                                    <Text style={styles.textBoxOption}>Obras</Text>
                                                </View>

                                            </TouchableOpacity>
                                        )
                                    }

                                    <TouchableOpacity onPress={() => navigation.navigate("Lineas de Negocio", { lineas })} style={styles.boxOption}>
                                        <View style={styles.wrapperIconOption}>
                                            <MaterialCommunityIcons name="calculator-variant" size={70} style={styles.iconBoxOption} />
                                        </View>
                                        <View style={[styles.textWrapperOption]} >
                                            <Text style={[styles.textBoxOption, { fontSize: 16 }]}>Soluciones estándares</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </>
                    }
                </View>
                {
                    isLoading && (
                        <Loader bg="white" />
                    )
                }
                <SimpleBackground width="100%" />

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    optionWrapper: {
        flexDirection: "row",

    },
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
        marginTop: 60
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
        marginTop: 30,
        textAlign: "center",
        paddingHorizontal: 20,
        // fontWeight: "bold"
    },
    contentWrapper: {
        marginTop: 60,
        alignItems: "center"
    },
    boxOption: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",

        borderColor: "black",
        width: 190,
        marginHorizontal: 5,
        borderRadius: 20,
        marginTop: 20
    },
    textBoxOption: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#313C4b",
        textAlign: "center"

    },
    textWrapperOption: {
        backgroundColor: "#FFECE4",
        padding: 10,
        width: "100%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center"
    },
    iconBoxOption: {

        color: primaryOrangeColor,
        padding: 10,
        borderRadius: 20
    },
    wrapperIconOption: {
        padding: 30
    }
})

export default HomeScreen;