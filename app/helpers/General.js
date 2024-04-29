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