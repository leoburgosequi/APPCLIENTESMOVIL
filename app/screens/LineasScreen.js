import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { grayStandardColor, primaryOrangeColor } from '../config'

import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header'
import Logout from '../components/Logout'
import SimpleBackground from '../components/SimpleBackground'
import { StandardStyles } from '../styles/StandardStyles'
import { simpleMsgAlert } from '../helpers/General'

const LineasScreen = ({ navigation, route }) => {

    const data = route.params;
    function msg() {
        simpleMsgAlert("Warning", "No hay sistemas cargados para esta linea de negocio.");
    }

    return (
        <View style={{ flex: 1, backgroundColor: grayStandardColor, alignItems: "center", justifyContent: "center" }}>


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