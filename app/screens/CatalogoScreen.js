import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AuthContext } from '../context/AuthContext'
import { checkActivity } from '../helpers/General'
import { timeActivity } from '../config'

const CatalogoScreen = () => {
  const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
  useEffect(() => {
    checkActivity(timeActivity, logout);
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>CatalogoScreen</Text>
    </View>
  )
}

export default CatalogoScreen

const styles = StyleSheet.create({})