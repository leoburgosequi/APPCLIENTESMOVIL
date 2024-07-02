import { BASE_URI, timeActivity } from '../config';
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

const ContentScreen = () => {

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
      <View /* onPress={() => console.log(`Clicked: ${item.titulo}`)}  */ style={[styles.box, StandardStyles.iosShadow]} activeOpacity={1}>
        <Image source={{ uri: item.imagen }} style={[styles.image, StandardStyles.androidShadow]} />
        <View style={styles.footer}>
          <Text style={styles.title}>{item.titulo}</Text>
        </View>
      </View>
    )
  }

  const renderNewItem = ({ item }) => {
    return (
      <View>
        <Text>{item.titulo}</Text>

      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}>

      <Text style={{ fontSize: 20, marginTop: 150, fontWeight: "bold", marginHorizontal: 20 }}>Más Relevante</Text>

      <FlatList
        data={content}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.wrapper}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      {/*   {
        <FlatList
          data={newContent}
          keyExtractor={item => item.id}
          renderItem={renderNewItem}
          style={styles.newWrapper}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />} */}
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
  newWrapper: {
    borderWidth: 3,

  },
  box: {

    borderColor: "green",
    height: 250
  },
  wrapper: {

    width: "90%",

    borderColor: "red",
    height: 0,

  },
  image: {
    width: width,
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15
  },
  footer: {
    paddingHorizontal: 15,

  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  }
})