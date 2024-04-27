import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { StandardStyles } from '../styles/StandardStyles'
import { primaryOrangeColor } from '../config'

const LineasScreen = ({ navigation,route }) => {

   const data = route.params;
   
    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems:"center", justifyContent:"center" }}>

            <TouchableOpacity style={StandardStyles.bluePrimaryButton} onPress={() => navigation.navigate("Preguntas", {category:4})}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:24}}>Encofrado Horizontal</Text>
            </TouchableOpacity>

        </View>
    )
}

export default LineasScreen

const styles = StyleSheet.create({})