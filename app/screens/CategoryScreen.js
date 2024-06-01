import { BASE_URI_CES, grayStandardColor, primaryOrangeColor } from '../config';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import SimpleBackground from '../components/SimpleBackground';
import { StandardStyles } from '../styles/StandardStyles';
import axios from 'axios';
import { checkActivity } from '../helpers/General';
import { simpleMsgAlert } from '../helpers/General';
import { timeActivity } from '../config';

const CategoryScreen = ({ navigation, route }) => {

    const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [categorys, setCategorys] = useState([]);
    const { linea } = route.params;
    console.log(linea)

    const dataFull = {
        "content": [
            {
                "id": 9,
                "nombre": "ANDAMIOS TUBULARES",
                "lineaNegocio": 3,
                "nombreLineaNegocio": "ANDAMIOS"
            },
            {
                "id": 4,
                "nombre": "ENCOFRADO HORIZONTAL",
                "lineaNegocio": 2,
                "nombreLineaNegocio": "ENCOFRADO"
            },
            {
                "id": 8,
                "nombre": "ANDAMIOS COLGANTES",
                "lineaNegocio": 3,
                "nombreLineaNegocio": "ANDAMIOS"
            },
            {
                "id": 7,
                "nombre": "TORRE",
                "lineaNegocio": 3,
                "nombreLineaNegocio": "ANDAMIOS"
            }
        ],
        "pageable": {
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "offset": 0,
            "pageSize": 15,
            "pageNumber": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 3,
        "totalPages": 1,
        "last": true,
        "size": 15,
        "number": 0,
        "first": true,
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "numberOfElements": 3,
        "empty": false
    }

    useEffect(() => {
        checkActivity(1, logout);
        const getCategorys = () => {
            setIsLoading(true);
            console.log(`${BASE_URI_CES}/getCategorys?pageIndex=${20}&pageSize=${0}&ln=${linea}`)
            axios.get(`${BASE_URI_CES}/getCategorys?pageIndex=${0}&pageSize=${20}&ln=${linea}`, {
                headers: {
                    'Authorization': `Bearer ${cesToken}`
                }
            }).then(resp => {
                console.log(resp.data.content);
                setCategorys(resp.data.content);
                setIsLoading(false);
            })
                .catch(error => {
                    simpleMsgAlert("Error", error.toString());
                    setIsLoading(false);
                })
        }
        getCategorys();
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.categoryBox, StandardStyles.androidShadow, StandardStyles.iosShadow]} onPress={() => navigation.navigate("Preguntas", { codCategory: item.id })}>
                <Text style={styles.title}>{item.nombre}</Text>
                <AntDesign name="right" size={24} color={primaryOrangeColor} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>

            <FlatList

                style={styles.wrapper}
                data={categorys}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />


            <SimpleBackground />

        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: {

        flex: 1,

        alignItems: "center"
    },
    wrapper: {
        width: "90%",
        marginTop: 100
    },
    categoryBox: {
        backgroundColor: "white",
        marginVertical: 15,
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "96%",
        margin: "auto"
    },
    title: {
        fontWeight: "bold",
        fontSize: 18
    }
})