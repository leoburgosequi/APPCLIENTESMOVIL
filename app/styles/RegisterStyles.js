import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import React from 'react';

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: "white",
        alignItems:"center"
    },
    inputWrapper: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        height: "95%",
        zIndex: 1,
        shadowColor: "black",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10,
        alignItems:"center",
        
    },
});

export {RegisterStyles}