import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { grayStandardColor, primaryOrangeColor, secondBlueColor } from '../config'

import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header'
import Logout from '../components/Logout'
import SimpleBackground from '../components/SimpleBackground'
import { StandardStyles } from '../styles/StandardStyles'
import { checkActivity } from '../helpers/General';
import { simpleMsgAlert } from '../helpers/General'
import { timeActivity } from '../config';

const { width, height } = Dimensions.get('window');
const LineasScreen = ({ navigation, route }) => {

    const [, , token, logout, , user, , cesToken] = useContext(AuthContext);

    useEffect(() => {
        checkActivity(timeActivity, logout);
    }, [])

    const { lineas } = route.params;
    function msg() {
        simpleMsgAlert("Warning", "No hay sistemas cargados para esta linea de negocio.");
    }

    const renderLine = ({ item }) => {
        return (
            <TouchableOpacity style={styles.lineWrapper}>
                <View style={styles.boxImg} >
                    <Image
                        source={{
                            uri: item.imgUrl
                        }}
                        style={styles.img}
                    />
                </View>
                <View style={styles.boxTitle}>
                    <Text style={styles.title}>{item.nombre}</Text>
                    <AntDesign name="right" size={24} color={primaryOrangeColor} />
                </View>
            </TouchableOpacity>
        )
    }

    const rendetuLine = ({ item }) => {
        return (
            <TouchableOpacity style={estilos.lineWrapper} onPress={() => goToCategorys(item)}>
                <View style={estilos.boxImg} >
                    <Image
                        source={{ uri: item.imgUrl }}
                        style={estilos.img}
                    />
                    <View style={estilos.boxTitle}>

                    </View>
                    <Text style={estilos.title}>{item.nombre}</Text>

                </View>

            </TouchableOpacity>
        )
    }


    function goToCategorys(item) {
        if (item.id === 5) {
            simpleMsgAlert("¡Atención!", "Esta linea de negocio no tiene sistemas disponibles.");
            return;
        }
        navigation.navigate("Categorías", { linea: item.id })
    }

    return (
        <View style={{ flex: 1, backgroundColor: grayStandardColor, alignItems: "center" }}>

            {/*   <FlatList
                data={lineas}
                keyExtractor={item => item.id}
                renderItem={renderLine}
                style={styles.wrapper}
            /> */}
            <FlatList
                data={lineas}
                keyExtractor={item => item.id}
                renderItem={rendetuLine}
                style={estilos.wrapper}
            />

            {/* <TouchableOpacity style={StandardStyles.bluePrimaryButton} onPress={() => navigation.navigate("Preguntas", { category: 4 })}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Encofrado Horizontal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[StandardStyles.bluePrimaryButton, { marginTop: 20 }]} onPress={msg}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Encofrado Vertical</Text>
            </TouchableOpacity>
            <SimpleBackground width="100%" /> */}

            <SimpleBackground />
        </View>
    )
}

export default LineasScreen

const estilos = StyleSheet.create({
    lineWrapper: {
        width: "100%",
        height: height * 0.2,
        marginVertical: 20
    },
    boxImg: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",

    },
    wrapper: {
        width: "80%"
    },
    img: {
        borderRadius: 15,
        width: "100%",
        height: "100%",
        zIndex: -1,
    },
    title: {
        position: "absolute",
        fontSize: 20,
        fontWeight: "bold",

        color: "white",
        zIndex: 9999

    },
    boxTitle: {
        backgroundColor: primaryOrangeColor,
        opacity: 0.4,
        padding: 5,
        borderRadius: 20,
        position: "absolute",
        width: "50%",
        height: "20%",
        zIndex: -1
    },

})

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50,
        width: "80%",
    },
    lineWrapper: {
        width: "100%",
        flexDirection: "row",
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: "white"
    },
    boxImg: {
        width: "50%",
        height: 100
    },
    img: {
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        width: "100%",
        height: "100%",
        //opacity: 0.6
    },
    boxTitle: {
        flexDirection: "row",

        alignItems: "center"

    },
    title: {
        marginLeft: 10,
        fontWeight: "bold"
    },
})