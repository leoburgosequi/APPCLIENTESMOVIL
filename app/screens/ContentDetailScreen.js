import { Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'
import SimpleBackground from '../components/SimpleBackground';
import { StandardStyles } from '../styles/StandardStyles';

const { width, height } = Dimensions.get('window');

const ContentDetailScreen = ({ navigation, route }) => {
    const { item } = route.params;
    console.log(item);

    const handlePress = async () => {
        // Verifica si el enlace puede ser manejado
        const url = item.link
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Si es soportado, abre el enlace
            await Linking.openURL(url);
        } else {
            // Si no es soportado, muestra una alerta
            Alert.alert(`No se puede abrir esta url: ${url}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.titulo}</Text>
            <View>
                <Image source={{ uri: item.imagen }} style={[styles.image, StandardStyles.androidShadow]} />
            </View>
            <View style={styles.boxDescription}>
                <Text style={styles.description}>{item.descripcion}</Text>
                <TouchableOpacity style={[StandardStyles.bluePrimaryButton, styles.buttonMore]} onPress={handlePress}>
                    <Text style={styles.buttonText}>Visitar enlace para más información</Text>
                </TouchableOpacity>
            </View>
            <SimpleBackground />
        </View>
    )
}

export default ContentDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    title: {
        fontSize: 30,
        marginTop: "10%",
        marginLeft: 20
    },
    image: {
        width: "95%",
        height: 200,
        resizeMode: "center",
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
    },
    description: {
        width: "90%",
        marginTop: "3%",
        fontSize: 18
    },
    boxDescription: {
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
    buttonMore: {
        marginTop: "5%",
    }
})