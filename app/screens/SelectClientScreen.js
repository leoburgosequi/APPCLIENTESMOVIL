import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../context/AuthContext';
import { BASE_URI_CES } from '../config';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { getItem } from '../storage/GeneralStorage';

const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    const [tokenCes, setTokenCes] = useState('');

    useEffect(() => {
        const getClients = async () => {
            const cesToken = await getItem('ces:token');
            setTokenCes(cesToken);
            try {
                const res = await axios.get(`${BASE_URI_CES}/get-customers-works-by-email?email=leonardobh96@gmail.com`, {
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
        console.log(tokenCes, cliente);
    }

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };

    return (
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
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
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
