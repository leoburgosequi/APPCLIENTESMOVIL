import React, { useContext } from "react";
import { deleteItem, getItem, saveItem } from "../storage/GeneralStorage";

import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export function formatPrice(valor) {
  const partes = valor.toFixed(2).toString().split('.');
  let numeroFormateado = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (partes.length > 1) {
    numeroFormateado += ',' + partes[1];
  } else {
    numeroFormateado += ',00';
  }

  return numeroFormateado;
}

export function simpleMsgAlert(title, content) {
  Alert.alert(title, content, [
    {
      text: 'Cerrar',
      style: 'cancel',
    },
  ]);
}

export function dobleButtonActionAlert(title, content, textDoneButton, textCancelButton, functionExecute) {
  Alert.alert(title, content, [
    {
      text: textCancelButton,
      style: 'destructive',
    },
    {
      text: textDoneButton,
      style: 'cancel',
      onPress: functionExecute()
    },
  ]);
}

export async function checkActivity(range, logout) {


  await getItem('lastLogin').then(resp => {
    const d1 = new Date(resp);
    const d2 = new Date();

    const earlierDate = new Date(Math.min(d1, d2));
    const laterDate = new Date(Math.max(d1, d2));

    earlierDate.setHours(earlierDate.getHours() + range);
    //earlierDate.setMinutes(earlierDate.getMinutes() + range);

    console.log(earlierDate, laterDate)

    if (earlierDate >= laterDate) {
      console.log("Está dentro del rango");
    } else {
      Alert.alert("Tiempo de inactividad", "Debe volver a iniciar sesión.", [
        {
          text: 'OK',
          style: 'cancel',
          onPress: () => logout()
        },
      ]);
    }
  }).catch(error => {
    console.log(error)
  });
}