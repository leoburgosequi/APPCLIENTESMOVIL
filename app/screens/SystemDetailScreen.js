import { BASE_URI_CES, defaultListaPrecio } from '../config';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { AntDesign } from '@expo/vector-icons';
import CheckBox from '../components/CheckBox';
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
    const [selectedSubgroup, setSelectedSubgroup] = useState({});
    const [subtotals, setSubtotals] = useState({});
    const [totalGlobal, setTotalGlobal] = useState(0);

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

                        const newSubtotals = {};

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

                        optionalDetails.forEach(item => {
                            const { opcionL1, opcionL2, precio, cantidad } = item;
                            if (!newSubtotals[opcionL1]) {
                                newSubtotals[opcionL1] = {};
                            }
                            if (!newSubtotals[opcionL1][opcionL2]) {
                                newSubtotals[opcionL1][opcionL2] = 0;
                            }
                            newSubtotals[opcionL1][opcionL2] += precio * cantidad;
                        });

                        setSubtotals(newSubtotals);
                        setGroupedData(groupedData);

                        const newCollapses = {};
                        Object.keys(groupedData).forEach(opcionL1 => {
                            newCollapses[opcionL1] = true;
                            Object.keys(groupedData[opcionL1]).forEach(opcionL2 => {
                                newCollapses[`${opcionL1}_${opcionL2}`] = true;
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

    const updateTotalGlobal = (selectedSubgroups, subtotals) => {
        let newTotal = 0;
        Object.keys(selectedSubgroups).forEach(opcionL1 => {
            const opcionL2 = selectedSubgroups[opcionL1];
            if (opcionL2 && subtotals[opcionL1] && subtotals[opcionL1][opcionL2]) {
                newTotal += subtotals[opcionL1][opcionL2];
            }
        });
        setTotalGlobal(newTotal);
    };

    const toggleCollapse = (key) => {
        setCollapses(prevState => {
            const newState = {
                ...prevState,
                [key]: !prevState[key]
            };
            return newState;
        });
    };

    const renderSubItem = ({ item }) => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 }}>
            <View style={{ width: "70%" }}>
                <Text>{item.nombreSku}</Text>
                <Text style={{ color: "gray", fontSize: 13 }}>Cantidad: {item.cantidad}</Text>
            </View>
            <View>
                <Text style={{ fontWeight: "bold" }}>$ {formatPrice(item.cantidad * item.precio)}</Text>
            </View>
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
    const handleCheckboxChange = (opcionL1, opcionL2) => {
        setSelectedSubgroup(prev => {
            const newState = {
                ...prev,
                [opcionL1]: prev[opcionL1] === opcionL2 ? null : opcionL2
            };
            updateTotalGlobal(newState, subtotals);
            return newState;
        });
    };

    const renderSubGroup = ({ item, index, section }) => {
        const subtotal = item.items.reduce((acc, curr) => acc + (curr.cantidad * curr.precio), 0);
        const checkBoxKey = `${item.items[0].opcionL1}_${item.opcion}`;
        const isChecked = selectedSubgroup[item.items[0].opcionL1] === item.opcion;

        return (
            <View style={styles.subGroup}>
                <TouchableOpacity onPress={() => toggleCollapse(checkBoxKey)} style={styles.subHeader}>
                    <CheckBox
                        isChecked={isChecked}
                        onChange={() => handleCheckboxChange(item.items[0].opcionL1, item.opcion, subtotal)}
                        label=""
                        sizeFont={16}
                    />
                    <Text style={[styles.subTitle, isChecked ? styles.selectedTitle : null]}>{item.opcion} - ${formatPrice(subtotal)}  </Text>
                    <AntDesign name="caretdown" size={14} color="gray" />
                </TouchableOpacity>
                <Collapsible collapsed={collapses[checkBoxKey]}>
                    <FlatList
                        data={item.items}
                        renderItem={renderSubItem}
                        keyExtractor={subItem => `${subItem.id}`}
                    />
                </Collapsible>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleSistema}>{details.sistema ? details.sistema.nombre : 'Cargando...'}</Text>
            <TouchableOpacity style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", paddingVertical: 10 }} onPress={() => setIsCollapsed(!isCollapsed)}>
                <Text style={{ fontSize: 20 }}>Elementos básicos</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>$ {formatPrice(basicPrice)}</Text>
                <AntDesign name="caretdown" size={14} color="black" />
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
            <View style={styles.containerSubtotal}>
                <Text style={styles.textTotal}>Total: $ {formatPrice(totalGlobal + basicPrice)}</Text></View>
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
        fontSize: 18,
        textAlign: "center",
        marginTop: 20
    },
    subGroup: {
        marginTop: 5,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    subHeader: {
        padding: 8,
        flexDirection: "row",
        alignItems: "center",


    },
    subTitle: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: "gray"
    },
    item: {
        padding: 10,
        backgroundColor: '#fafafa',

    },
    selectedTitle: {
        textDecorationLine: 'none',
        color: "black"
    },
    containerSubtotal: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 10,
        bottom: 80,
        right: 10,
        padding: 20,
        shadowColor: "black",
        alignItems: "center",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    textTotal: {
        fontSize: 18,
        fontWeight: "bold"
    }

});
