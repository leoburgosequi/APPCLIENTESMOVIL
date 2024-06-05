import { BASE_URI, primaryOrangeColor, secondBlueColor } from '../config'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../context/AuthContext'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../components/Loader';
import { StandardStyles } from '../styles/StandardStyles';
import axios from 'axios'
import { checkActivity } from '../helpers/General';
import { timeActivity } from '../config'

const ContactScreen = () => {
  const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
  const [puntos, setPuntos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkActivity(timeActivity, logout);
    const getPuntos = () => {
      setIsLoading(true);
      axios.get(`${BASE_URI}/getInfoAgencias`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(resp => {

        setPuntos(resp.data.puntos);
        setIsLoading(false);
      }).catch(error => {
        console.log("Error al obtener los puntos de venta ", error);
        setIsLoading(false);
      });
    }

    getPuntos();

  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.card, StandardStyles.androidShadow, StandardStyles.iosShadow]}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.row}>
          <Entypo name="mail" size={24} style={{ paddingHorizontal: 5, paddingVertical: 2 }} color={secondBlueColor} />
          <Text>{item.email}</Text>
        </View>

        <View style={styles.row}>
          <Entypo name="old-phone" size={24} style={{ paddingHorizontal: 5, paddingVertical: 2 }} color={primaryOrangeColor} />
          <Text>
            {item.contact}
          </Text>

        </View>
        <View style={styles.row}>
          <FontAwesome name="whatsapp" style={{ paddingHorizontal: 5, paddingVertical: 2 }} size={24} color="green" />
          <Text>{item.whatsapp}</Text>

        </View>

      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingBottom: 100, backgroundColor: "white" }}>
      <FlatList
        data={puntos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.wrapper}
      />

      {
        isLoading && (
          <Loader />
        )
      }

    </View>
  )
}

export default ContactScreen

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: primaryOrangeColor
  },
  wrapper: {
    marginTop: 50,
    width: "90%",


  },
  list: {
    width: "90%",
  },
  card: {
    borderRadius: 15,
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
    justifyContent: "center",
    width: "90%",
    margin: "auto"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",

  }
})