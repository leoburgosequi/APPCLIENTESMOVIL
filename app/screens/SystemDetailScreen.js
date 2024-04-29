import { BASE_URI_CES, defaultListaPrecio } from '../config';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import Collapsible from 'react-native-collapsible';
import axios from 'axios';
import { formatPrice } from '../helpers/General';
import { getItem } from '../storage/GeneralStorage';

const SystemDetailScreen = ({ navigation, route }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [details, setDetails] = useState({});
    const [basicDetails, setBasicDetails] = useState([]);
    const [groupedData, setGroupedData] = useState([]);
    const [basicPrice, setBasicPrice] = useState(0);
    const [collapses, setCollapses] = useState({});
    const data = route.params;

    useLayoutEffect(() => {
        const detailSystem = async () => {
            const cesToken = await getItem('ces:token');
            try {
                await axios.get(`${BASE_URI_CES}/getSystemById?${data.answers}&listaPrecio=${defaultListaPrecio}&idSistema=${data.idSistema}`, {
                    headers: {
                        'Authorization': `Bearer ${cesToken}`
                    }
                })
                    .then(d => {
                        setDetails(d.data)
                        const detalles = d.data.preCotizaciones.filter(item => item.opcionL1 === null && item.opcionL2 === null);
                        const totalBasics = detalles.reduce((total, item) => total + (item.precio * item.cantidad), 0);
                        setBasicDetails(detalles);
                        setBasicPrice(totalBasics);
                        const optionalDetails = d.data.preCotizaciones
                            .filter(item => item.opcionL1 !== null && item.opcionL2 !== null);

                        const groupedData = optionalDetails.reduce((acc, item) => {
                            const { opcionL1, opcionL2 } = item;
                            if (!acc[opcionL1]) {
                                acc[opcionL1] = {};
                            }
                            if (!acc[opcionL1][opcionL2]) {
                                acc[opcionL1][opcionL2] = [];
                            }
                            acc[opcionL1][opcionL2].push(item);
                            return acc;
                        }, {});

                        setGroupedData(groupedData);

                        const newCollapses = {};
                        Object.keys(groupedData).forEach(opcionL1 => {
                            newCollapses[opcionL1] = true; // Initialize each main group as collapsed
                            Object.keys(groupedData[opcionL1]).forEach(opcionL2 => {
                                newCollapses[`${opcionL1}_${opcionL2}`] = true; // Initialize each subgroup as collapsed
                            });
                        });
                        setCollapses(newCollapses);
                    })
                    .catch(e => { console.log(`Error ${e}`) });
            } catch (error) {
                console.log("Error del catch: ", error);
            }
        }
        detailSystem();
    }, []);

    const toggleCollapse = (key) => {
        setCollapses(prevState => {
            const newState = {
                ...prevState,
                [key]: !prevState[key]
            };
            console.log(`Toggling collapse for ${key}:`, newState[key]);
            return newState;
        });
    };

    const renderSubItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.nombreSku} - Cantidad: {item.cantidad}, Precio: ${formatPrice(item.precio)}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.group}>
            <Text style={styles.headerText}>{item.pregunta} (Opcional)</Text>
            <FlatList
                data={item.opciones}
                renderItem={({ item, index }) => renderSubGroup({ item, index, section: item })}
                keyExtractor={option => option.opcion}
            />
        </View>
    );

    const renderSubGroup = ({ item, index, section }) => (
        <View style={styles.subGroup}>
            <TouchableOpacity onPress={() => toggleCollapse(`${section.pregunta}_${item.opcion}`)} style={styles.subHeader}>
                <Text style={styles.subTitle}>{item.opcion}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapses[`${section.pregunta}_${item.opcion}`]}>
                <FlatList
                    data={item.items}
                    renderItem={renderSubItem}
                    keyExtractor={subItem => `${subItem.id}`}
                />
            </Collapsible>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titleSistema}>{details.sistema ? details.sistema.nombre : 'Cargando...'}</Text>
            <TouchableOpacity style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", paddingVertical: 10 }} onPress={() => setIsCollapsed(!isCollapsed)}>
                <Text style={{ fontSize: 20 }}>Elementos básicos</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>$ {formatPrice(basicPrice)}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                <View style={{ padding: 20, backgroundColor: '#FAFAFA', height: "100%" }}>
                    <FlatList
                        data={basicDetails}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 }}>
                                <View style={{ width: "70%" }}>
                                    <Text>{item.nombreSku}</Text>
                                    <Text style={{ color: "gray", fontSize: 13 }}>Cantidad: {item.cantidad}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>$ {formatPrice(item.cantidad * item.precio)}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </Collapsible>

            <FlatList
                data={Object.keys(groupedData).map(key => ({
                    pregunta: key,
                    opciones: Object.keys(groupedData[key]).map(subKey => ({
                        opcion: subKey,
                        items: groupedData[key][subKey]
                    }))
                }))}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default SystemDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "white"
    },
    titleSistema: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20
    },
    group: {
        padding: 10,
        
    },
    headerText: {
        fontSize: 16,
        textAlign:"left"
    },
    subGroup: {
        marginTop: 5,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    subHeader: {
        padding: 8,

    },
    subTitle: {
        fontSize: 16,

    },
    item: {
        padding: 10,
        backgroundColor: '#fafafa'
    }
});
