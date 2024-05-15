import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { StandardStyles } from '../styles/StandardStyles'
import { primaryOrangeColor } from '../config'

const Loader = ({ text, bg }) => {
    return (

        <View style={[StandardStyles.loadingContainer, { backgroundColor: bg ? bg : 'rgba(255, 255, 255, 0.5)' }]}>
            <ActivityIndicator size="large" color={primaryOrangeColor} />
            <Text style={{ fontWeight: "bold" }}>{text ? text : "Procesando"}</Text>
        </View>

    )
}

export default Loader

const styles = StyleSheet.create({})