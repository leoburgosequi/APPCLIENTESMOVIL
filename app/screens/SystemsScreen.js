import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { checkActivity, formatPrice } from '../helpers/General'
import { defaultListaPrecio, defaultZone, primaryOrangeColor, timeActivity } from '../config'

import { AuthContext } from '../context/AuthContext'
import { BASE_URI_CES } from '../config'
import SimpleBackground from '../components/SimpleBackground'
import { StandardStyles } from '../styles/StandardStyles'
import axios from 'axios'
import { getItem } from '../storage/GeneralStorage'

const SystemsScreen = ({ navigation, route }) => {

    const data = route.params;
    const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
    const dataKey = data[0];
    const params = Object.keys(dataKey).map(key => `q_${key}=${encodeURIComponent(dataKey[key])}`);
    const resp = params.join('&');

    const [systems, setSystems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [priceList, setPriceList] = useState(0);
    const [pricesSystem, setPricesSystem] = useState([]);


    useEffect(() => {
        checkActivity(timeActivity, logout)
        const getSystems = async () => {
            setLoading(true);
            const cesToken = await getItem('ces:token');

            try {
                let listaPrecio = await axios.get(`${BASE_URI_CES}/getZone?idZone=${defaultZone}`, {
                    headers: {
                        'Authorization': `Bearer ${cesToken}`
                    }
                });
                setPriceList(listaPrecio.data.listaPrecio);


                let systemsResponse = await axios.get(`${BASE_URI_CES}/get-systems-by-answers?${resp}`, {
                    headers: {
                        'Authorization': `Bearer ${cesToken}`
                    }
                });

                // Preparar para actualizar cada sistema con su precio
                const systemsWithPrices = await Promise.all(systemsResponse.data.map(async (system) => {
                    const priceSystem = await getPricesystem(system.id, resp, cesToken);
                    console.log(`Precio del sistema! ${system.nombre}: `, priceSystem);
                    return { ...system, price: priceSystem };  // Retorna una nueva versión del objeto system con el precio incluido
                }));
                systemsWithPrices.sort((a, b) => a.price - b.price);
                setSystems(systemsWithPrices);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        async function getPricesystem(idSystem, answers, cesToken) {
            try {
                const response = await axios.get(`${BASE_URI_CES}/getSystemById?${answers}&listaPrecio=${priceList}&idSistema=${idSystem}`, {
                    headers: {
                        'Authorization': `Bearer ${cesToken}`
                    }
                });
                const basicSkus = response.data.preCotizaciones.filter(item => item.opcionL1 === null && item.opcionL2 === null);
                const totalBasics = basicSkus.reduce((total, item) => total + (item.precio * item.cantidad), 0);
                return totalBasics;
            } catch (error) {
                console.log("Error in getPricesystem:", error);
                return 0;
            }
        }

        getSystems();
    }, []);




    return (
        (systems.length > 0) ?
            <View style={styles.systemContainer}>


                <Text style={styles.title}>SISTEMAS ENCONTRADOS</Text>
                <FlatList
                    data={systems}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.cardSystem}
                            onPress={() => navigation.navigate("Sistema", { answers: resp, idSistema: item.id, questions: data[1], priceList })}>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{
                                        uri: item.imgUrl,
                                    }}
                                />
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.titleSystem}>{item.nombre}</Text>
                                <Text style={styles.textCategory}>{item.categoria.nombre}</Text>
                                <Text style={styles.price}>${formatPrice(item.price)} / Día</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

                {loading && (
                    <View style={[StandardStyles.loadingContainer]}>
                        <ActivityIndicator size="large" color={primaryOrangeColor} />
                        <Text style={{ fontWeight: "bold" }}>Procesando</Text>
                    </View>
                )}
                <SimpleBackground width="100%" />
            </View>
            :
            <View style={[styles.systemContainer, { justifyContent: "center", alignItems: "center" }]}>
                <Text style={styles.title}>No se han encontrado sistemas. Por favor, verifique la información suministrada y de ser correcta, contactar a uno de nuestros desarrolladores de negocios.</Text>
                {loading && (
                    <View style={[StandardStyles.loadingContainer, { backgroundColor: "white" }]}>
                        <ActivityIndicator size="large" color={primaryOrangeColor} />
                        <Text style={{ fontWeight: "bold" }}>Procesando</Text>
                    </View>
                )}
                <SimpleBackground />
            </View>
    )
}

export default SystemsScreen

const styles = StyleSheet.create({
    systemContainer: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",

    },
    cardSystem: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: "row",

    },
    imgContainer: {
        width: "50%",
        shadowColor: "black",
        alignItems: "center",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    detailsContainer: {
        width: "50%",
        alignItems: "left",
        justifyContent: "center"
    },
    tinyLogo: {
        width: 150,
        height: 150,
        borderRadius: 15
    },
    titleSystem: {
        fontSize: 16,
        fontWeight: "bold",
    },
    price: {
        color: "gray",
    },
    textCategory: {
        color: primaryOrangeColor,
        fontSize: 12,
        fontWeight: "bold"
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
        fontWeight: "bold",
        textAlign: "center",
        width: "95%"
    }

})