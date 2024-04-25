import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";

async function saveItem(key,data) {
    try {
        await AsyncStorage.setItem(key, data);
        console.log('Data guardada exitosamente');
        return data;
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return null;
    }
}


async function getItem(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            console.log('No hay datos almacenados para la clave', key);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener datos: ', error);
      return null;
    }
}

async function deleteItem(key) {
    try {
        await AsyncStorage.removeItem(key);
        const item = await AsyncStorage.getItem(key).then(d => {
            return d;
        });
        return (item === null) ? "data eliminada del storage" : "Error al eliminar la data del storage";
       
    } catch (error) {
        console.log("Error al eliminar: ", error);
        return "Error";
    }
}

export { saveItem, getItem, deleteItem}