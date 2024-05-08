import { BASE_URI_CES, grayStandardColor, primaryOrangeColor, secondBlueColor } from '../config';
import { FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../context/AuthContext';
import { Dropdown } from 'react-native-element-dropdown';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Loader from '../components/Loader';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import { getItem } from '../storage/GeneralStorage';
import notFoundClients from '../resources/notFoundClients.png';

const DropdownComponent = ({ navigation }) => {
    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
    const [obras, setObras] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getClients = async () => {
            try {
                const res = await axios.get(`${BASE_URI_CES}/get-customers-works-by-email?email=${user.email}`, {
                    headers: {
                        'Authorization': `Bearer ${cesToken}`
                    }
                });
                setData(res.data.clientes.map(item => ({
                    label: item.nombre,
                    value: item.nide,
                })));
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        };
        getClients();
    }, []);

    function getObras(cliente) {
        setIsLoading(true);
        axios.get(`${BASE_URI_CES}/get-obra-by-cliente?nide_cliente=${cliente}&email=${user.email}`, {
            headers: {
                'Authorization': `Bearer ${cesToken}`
            }
        }).then(obra => {
            console.log(obra.data.content);
            setObras(obra.data.content);
            setIsLoading(false);
        })
            .catch(e => {
                console.log(`Error al consultar las obras ${e}`);
                setIsLoading(false);
            });
    }

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Seleccionar cliente"
                searchPlaceholder="Buscar"
                value={value}
                onChange={item => {
                    setValue(item.value);
                    console.log(item.value, item.label)
                    getObras(item.value);
                }}
                renderItem={renderItem}
            />
            {
                (obras.length > 0)
                    ?
                    <FlatList
                        data={obras}
                        keyExtractor={item => item.codigo}
                        renderItem={({ item }) => (
                            <View style={styles.box}>
                                <View style={styles.titleWrapper}>
                                    <View style={{ borderRadius: 15, backgroundColor: grayStandardColor, marginLeft: 10 }}>
                                        <FontAwesome5 name="building" size={30} color={secondBlueColor} style={{ padding: 10 }} />
                                    </View>
                                    <Text style={{ color: secondBlueColor, fontSize: 18, marginLeft: 10, fontWeight: "bold", width: 300 }}>{item.nombre}</Text>
                                </View>
                                <View>
                                    <View style={[styles.row]}>
                                        <Entypo name="location-pin" size={30} color={primaryOrangeColor} />
                                        <Text style={{ fontSize: 16 }}>{item.ptoVenta}</Text>
                                    </View>
                                    <View style={[styles.row]}>
                                        <MaterialIcons name="numbers" size={24} color={primaryOrangeColor} />
                                        <Text style={{ fontSize: 18 }}>{item.codigo}</Text>
                                    </View>
                                    <TouchableOpacity style={[styles.row, styles.rowButton]}>
                                        <View style={{ backgroundColor: grayStandardColor, padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                            <Ionicons name="cube" size={30} color={primaryOrangeColor} />
                                        </View>
                                        <Text style={{ fontSize: 18, marginLeft: 20, marginRight: 130, fontWeight: "bold" }}>Saldo en obra</Text>
                                        <AntDesign name="right" size={20} color={primaryOrangeColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.row, styles.rowButton]} onPress={() => navigation.navigate("Movimientos")} >
                                        <View style={{ backgroundColor: grayStandardColor, padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                            <MaterialIcons name="compare-arrows" size={30} color={primaryOrangeColor} />
                                        </View>
                                        <Text style={{ fontSize: 18, marginLeft: 20, marginRight: 139, fontWeight: "bold" }} >Movimientos</Text>
                                        <AntDesign name="right" size={20} color={primaryOrangeColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                    : <View style={styles.wrapperNotFound}>
                        <Image
                            source={notFoundClients}
                            style={styles.imgNotFound}
                        />
                    </View>

            }
            {isLoading && (
                <Loader />
            )}


        </View>

    );
};

export default DropdownComponent;

const styles = StyleSheet.create({

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10
    },
    titleWrapper: {
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: "center",
        borderBottomColor: grayStandardColor,
        borderBottomWidth: 1
    },
    box: {
        width: "100%",
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 20,

    },
    container: {
        flex: 1,
        backgroundColor: "#FBF6F2",
        alignItems: "center"
    },
    wrapperNotFound: {
        marginTop: "30%",
        alignItems: "center"
    },
    dropdown: {
        margin: 30,
        height: 50,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
