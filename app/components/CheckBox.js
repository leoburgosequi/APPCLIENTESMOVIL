import { Appearance, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CheckBox = ({ isChecked, onChange, label, isButton, sizeFont, link, containerWidth, width = 20, height = 20 }) => {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    contentWrapper: {
      width,
      height,
      backgroundColor: isChecked ? "#E45417" : "#fff",
      borderColor: "#E45417",
      borderWidth: 2,
      borderRadius: 5,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    chulo: { color: isChecked ? "white" : "transparent", fontSize: 10, marginBottom: 2, fontWeight: "bold" }
  })

  return (

    <View style={{ flexDirection: "row", width: containerWidth, marginVertical: 10 }}>
      <TouchableOpacity onPress={() => { onChange(!isChecked) }} style={{ alignItems: "center", marginVertical: 10 }}>
        <View style={styles.contentWrapper}>
          <Text style={styles.chulo}>√</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { isButton ? navigation.navigate(link) : console.log("is not a button") }} >
        <Text style={{ textDecorationLine: isButton ? "underline" : "none", fontSize: sizeFont }}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>


  )
}



export default CheckBox;