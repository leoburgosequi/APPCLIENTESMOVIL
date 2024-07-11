import { BASE_URI, grayStandardColor, timeActivity } from '../config';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { deleteItem, getItem, saveItem } from "../storage/GeneralStorage";

import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import SimpleBackground from '../components/SimpleBackground';
import { StandardStyles } from '../styles/StandardStyles';
import axios from 'axios';
import { checkActivity } from '../helpers/General';
import { simpleMsgAlert } from '../helpers/General';

const { width, height } = Dimensions.get('window');

const ContentScreen = ({ navigation }) => {

  const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
  const [content, setContent] = useState([]);
  const [newContent, setNewContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    checkActivity(timeActivity, logout);

    const getContents = () => {
      setIsLoading(true);
      axios.get(`${BASE_URI}/getContents`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(resp => {

        setContent(resp.data.contents);
        setNewContent(resp.data.newContents);
        setIsLoading(false);

      }).catch(error => {
        setIsLoading(false)
        simpleMsgAlert("Error", `${error}`);
      })
    }
    getContents();
  }, []);



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Detalle del contenido", { item })} style={[styles.box, StandardStyles.iosShadow]}>

        <View style={styles.footer}>
          <Text style={styles.title}>{item.titulo}</Text>
        </View>
        <Image source={{ uri: item.imagen }} style={[styles.image, StandardStyles.androidShadow]} />

      </TouchableOpacity >
    )
  }


  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "white", alignItems: "center", paddingBottom: 110 }}>

      <Text style={{ fontSize: 20, marginTop: 100, marginBottom: 20, fontWeight: "bold", marginHorizontal: 20 }}>Más Relevante</Text>

      <FlatList
        data={content}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.wrapper}
      /*  horizontal
       showsHorizontalScrollIndicator={false}
       pagingEnabled */
      />

      {/*  <FlatList
        data={newContent}
        keyExtractor={item => item.id}
        renderItem={renderNewItem}
        style={newStyles.wrapper}

      /> */}
      {
        isLoading && (
          <Loader />
        )
      }

      <SimpleBackground />

    </View>
  )
}

export default ContentScreen

const styles = StyleSheet.create({
  box: {
    borderColor: grayStandardColor,
    height: 250,
    marginBottom: 40,
    borderTopWidth: 1

  },
  wrapper: {
    width: "90%",
    borderColor: "red",
    height: 0,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
    borderRadius: 15
  },
  footer: {
    paddingHorizontal: 15,
    marginTop: 20

  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  }
});

const newStyles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    width: "90%"
  },
  image: {
    height: 200,
    width: 100
  }
})