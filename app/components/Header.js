import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import HeaderImg from '../resources/HeaderImg.png'
import Mezcladora from '../resources/Mezcladora.png'
import React from 'react'
import { grayStandardColor } from '../config'

const Header = () => {
    return (
        <View style={styles.wrapper}>
            <Image
                source={Mezcladora}
                style={styles.image}
            />
            <Text>Cerrar sesión</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        top: 0,
        backgroundColor: "white",
        width: "100%",
        paddingBottom: 20,
        paddingTop: 70,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    image: {
        width: 40,
        height: 40
    }
})