import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import axios from 'axios'

const SystemsScreen = ({ navigation, route }) => {

    const data = route.params;
    console.log(data);
    const transformedArray = Object.keys(data[0]).map(key => ({
        id: parseInt(key),
        value: data[0][key]
    }));

    console.log(transformedArray);

  /*  useEffect(() => {



        axios.get(`https://api.equinorte.co/xsoftCes/api/v1/ext/get-systems-by-answers`)

    }, [])*/


    return (
        <View>
            <Text>SystemsScreen</Text>
        </View>
    )
}

export default SystemsScreen

const styles = StyleSheet.create({})