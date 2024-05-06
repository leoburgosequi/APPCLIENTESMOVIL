import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../context/AuthContext'
import SimpleBackground from '../components/SimpleBackground'
import { StandardStyles } from '../styles/StandardStyles'
import { primaryOrangeColor } from '../config'
import { simpleMsgAlert } from '../helpers/General'

const LineasScreen = ({ navigation, route }) => {

    const data = route.params;
    function msg() {
        simpleMsgAlert("Warning", "No hay sistemas cargados para esta linea de negocio.");
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>

            <TouchableOpacity style={StandardStyles.bluePrimaryButton} onPress={() => navigation.navigate("Preguntas", { category: 4 })}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Encofrado Horizontal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[StandardStyles.bluePrimaryButton, { marginTop: 20 }]} onPress={msg}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>Encofrado Vertical</Text>
            </TouchableOpacity>
            <SimpleBackground width="100%" />
        </View>
    )
}

export default LineasScreen

const styles = StyleSheet.create({})