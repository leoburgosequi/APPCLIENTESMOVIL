import { BASE_URI_CES, grayStandardColor, primaryOrangeColor } from '../config';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { AntDesign } from '@expo/vector-icons';
import { StandardStyles } from '../styles/StandardStyles';

const CategoryScreen = ({ navigation, route }) => {
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
                data={dataFull.content}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />


        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: grayStandardColor,
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
        justifyContent: "space-between"
    },
    title: {
        fontWeight: "bold",
        fontSize: 18
    }
})