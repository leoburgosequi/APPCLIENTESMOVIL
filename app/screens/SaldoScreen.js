import { BASE_URI_CES, grayStandardColor, primaryOrangeColor } from '../config';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import SimpleBackground from '../components/SimpleBackground';
import { StandardStyles } from '../styles/StandardStyles';
import axios from 'axios';
import { simpleMsgAlert } from '../helpers/General';

const SaldoScreen = ({ route }) => {
    const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
    const { obra } = route.params;
    const itemsPerPage = 10; // Cambiado a 10 items por página
    const [isLoading, setIsLoading] = useState(false);
    const [allSkus, setAllSkus] = useState([]);
    const [displaySkus, setDisplaySkus] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URI_CES}/get-saldo-obra?obra=${obra.codigo}&ptoVenta=${obra.ptoVenta}`, {
                headers: {
                    'Authorization': `Bearer ${cesToken}`
                }
            });
            const sortedData = sortItems(response.data.content);
            setAllSkus(sortedData);
            setDisplaySkus(sortedData.slice(0, itemsPerPage));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const sortItems = (data) => {
        return data.sort((a, b) => a.category.localeCompare(b.category));
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        const startIndex = nextPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const nextItems = allSkus.slice(startIndex, endIndex);
        if (nextItems.length > 0) {
            setDisplaySkus(prevSkus => [...prevSkus, ...nextItems]);
            setPage(nextPage);
        }
    };

    const renderSku = ({ item }) => {
        return (<View style={styles.box}>
            <Text style={{ color: primaryOrangeColor, fontSize: 10, fontWeight: "bold" }}>{item.category}</Text>
            <View style={styles.title}>

                <View>
                    <Text style={{ fontWeight: "bold" }}>{item.sku} - {(item.interno) ? item.interno : ''}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: "bold" }}>
                        {item.nombre}
                    </Text>
                </View>

            </View>
            <View><Text style={{ color: "gray" }}>Cantidad: {item.cantidad}</Text></View>
        </View>)
    };

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>Saldo en obra</Text>
                <Text>{obra.nombre}</Text>
            </View>

            <View style={styles.contentWrapper}>
                <FlatList
                    data={displaySkus}
                    keyExtractor={item => item.sku}
                    renderItem={renderSku}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
                {/*  {allSkus.length > displaySkus.length && (
                    <TouchableOpacity style={StandardStyles.orangePrimaryButton} onPress={handleLoadMore}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Mostrar más</Text>
                    </TouchableOpacity>
                )} */}
            </View>
            {
                isLoading && (
                    <Loader />
                )
            }
            <SimpleBackground width="100%" />
        </View>
    );
};

export default SaldoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEF8F6",
    },
    contentWrapper: {
        alignItems: "center"
    },
    box: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "white"
    },
    title: {
        flexDirection: "row"
    },
    banner: {
        marginVertical: 15,
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: "white"
    },
});
