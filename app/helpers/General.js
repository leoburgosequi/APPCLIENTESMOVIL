import { Alert } from "react-native";
import React from "react";

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