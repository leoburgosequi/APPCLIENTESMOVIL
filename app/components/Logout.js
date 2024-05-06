import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { MaterialIcons } from '@expo/vector-icons';

const Logout = () => {

    const [, , token, logout, , user] = useContext(AuthContext);

    function confirmable() {
        Alert.alert("Cerrar sesión", "¿Está seguro de querer cerrar sesión?", [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Si',
                onPress: logout,
                style: 'cancel'
            }
        ]);
    }

    return (
        <TouchableOpacity onPress={() => { confirmable() }} style={styles.buttonLogout} >
            <MaterialIcons name="logout" size={34} color="black" />
            <Text>Salir</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonLogout: {
        position: "absolute",
        top: 10,
        right: 20
    }
})

export default Logout;