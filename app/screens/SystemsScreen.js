import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { getItem } from '../storage/GeneralStorage'
import { primaryOrangeColor } from '../config'

const SystemsScreen = ({ navigation, route }) => {

    const data = route.params;
    const dataKey = data[0];
    const params = Object.keys(dataKey).map(key => `q_${key}=${encodeURIComponent(dataKey[key])}`);
    const resp = params.join('&');

    const [systems, setSystems] = useState([]);


    useEffect(() => {
        const getSystems = async () => {
            const cesToken = await getItem('ces:token');

            axios.get(`https://api.equinorte.co/xsoftCes/api/v1/ext/get-systems-by-answers?${resp}`, {

                headers: {
                    'Authorization': `Bearer ${cesToken}`
                }
            }).then(s => {
                setSystems(s.data);
            }).catch(e => console.log(`Error: ${e}`));
        }
        getSystems();

    }, [])


    return (
        (systems.length > 0) ?
        <View style={styles.systemContainer}>

           
            <Text style={styles.title}>SISTEMAS ENCONTRADOS</Text>
            <FlatList
                data={systems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.cardSystem}
                        onPress={() => navigation.navigate("Sistema",{answers: resp,idSistema:item.id,questions:data[1]} )}>
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.tinyLogo}
                                source={{
                                    uri: item.imgUrl,
                                }}
                            />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.titleSystem}>{item.nombre}</Text>
                            <Text style={styles.textCategory}>{item.categoria.nombre}</Text>
                            <Text style={styles.price}>$108.000</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
        :
        <View style={styles.systemContainer}>
            <Text style={styles.title}>No se han encontrado sistemas</Text>
        </View>
    )
}

export default SystemsScreen

const styles = StyleSheet.create({
    systemContainer: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",

    },
    cardSystem: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: "row",
        
    },
    imgContainer: {
        width: "50%",
        shadowColor: "black",
        alignItems:"center",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    detailsContainer: {
        width: "50%",
        alignItems:"left",
        justifyContent:"center"
    },
    tinyLogo: {
        width: 150,
        height: 150,
        borderRadius:15
    },
    titleSystem:{
        fontSize:16,
        fontWeight:"bold",
    },
    price:{
        color:"gray",
    },
    textCategory:{
        color:primaryOrangeColor,
        fontSize:12,
        fontWeight:"bold"
    },
    title:{
        fontSize:20,
        marginVertical:20,
        fontWeight:"bold"
    }

})