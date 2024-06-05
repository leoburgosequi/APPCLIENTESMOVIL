import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { primaryOrangeColor, timeActivity } from '../config'

import { AuthContext } from '../context/AuthContext'
import SimpleBackground from '../components/SimpleBackground'
import { checkActivity } from '../helpers/General'

const CatalogoScreen = () => {
  const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
  useEffect(() => {
    checkActivity(timeActivity, logout);
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: primaryOrangeColor }}>¡En construcción!</Text>

      <SimpleBackground />
    </View>
  )
}

export default CatalogoScreen

const styles = StyleSheet.create({})