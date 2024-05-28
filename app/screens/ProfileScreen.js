import { Alert, Keyboard, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { BASE_URI, grayStandardColor, primaryOrangeColor } from '../config'
import React, { useContext, useState } from 'react'
import { dobleButtonActionAlert, simpleMsgAlert } from '../helpers/General';

import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SimpleBackground from '../components/SimpleBackground';
import { StandardStyles } from '../styles/StandardStyles'
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {

  const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [lastPass, setLastPass] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toogleForm = () => {
    setShowForm(!showForm);
  }

  const changePassword = () => {
    setIsLoading(true);
    if (password.length < 8) {
      simpleMsgAlert("¡Error!", "La nueva contraseña debe tener 8 caracteres, por lo menos.");
      setIsLoading(false);
      return;
    }

    axios.post(`${BASE_URI}/changePassword`, { email: user.email, oldPass: lastPass, newPass: password }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(resp => {
      console.log(resp.data)
      if (!resp.data.done) {
        simpleMsgAlert("¡Error!", resp.data.message);
        setIsLoading(false);
        return;
      }

      Alert.alert("¡Operación exitosa!", resp.data.message, [
        {
          text: 'Cerrar',
          style: 'cancel',
          onPress: logout
        },
      ]);


      setIsLoading(false);
    })
      .catch(error => {
        console.log(`Error al cambiar contraseña: ${error}`);
        setIsLoading(false);
      });

  }

  const testAlert = () => {
    simpleMsgAlert("hey", "probando alerta");
  }

  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bannerInfo}>
          <FontAwesome name="user-circle" size={120} color={primaryOrangeColor} style={[StandardStyles.androidShadow, StandardStyles.iosShadow]} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={{ color: primaryOrangeColor, fontSize: 18, fontWeight: "bold", marginTop: 7 }}>
            {user.id_role === 3 ? "Cliente" : user.role === 2 ? "Visitante" : "Administrador"}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 7 }}> <Feather name="mail" size={24} color="black" /> {user.email}</Text>
          <TouchableOpacity style={[StandardStyles.bluePrimaryButton, { padding: 10, marginTop: 20 }]} onPress={logout}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonWrapper]}>
          <TouchableOpacity style={styles.boxButton} onPress={toogleForm}>
            <View style={styles.iconBox}>
              <FontAwesome name="edit" size={24} color={primaryOrangeColor} />
            </View>

            <View style={styles.boxText}>
              <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18 }}>
                {showForm ? "Ocultar" : "Editar contraseña"}
              </Text>
              {
                showForm ? <AntDesign name="up" size={24} color={primaryOrangeColor} style={{ marginRight: 10 }} /> :
                  <AntDesign name="down" size={24} color={primaryOrangeColor} style={{ marginRight: 10 }} />
              }

            </View>
          </TouchableOpacity>
        </View>

        {
          showForm && (
            <View style={styles.boxForm}>
              <View style={styles.inputBox}>
                <Text style={styles.label}>Actual contraseña</Text>
                <TextInput
                  value={lastPass}
                  onChangeText={setLastPass}
                  style={styles.input}
                  secureTextEntry={!showPass}
                />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>Nueva contraseña</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry={!showPass}
                />
              </View>

              {/*   <View style={styles.inputBox}>
                <Text style={styles.label}>Confirma nueva contraseña</Text>
                <TextInput
                  value={passConfirm}
                  onChangeText={setPassCofirm}
                  style={styles.input}
                  secureTextEntry={!showPass}
                />
              </View> */}

              <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 15, width: "30%", padding: 10 }]} onPress={changePassword}>
                  <Text style={{ fontWeight: "bold", color: "white", fontSize: 12 }}> Actualizar contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[StandardStyles.bluePrimaryButton, { marginTop: 15, width: "30%", padding: 10 }]} onPress={() => setShowPass(!showPass)}>
                  <Text style={{ fontWeight: "bold", color: "white", fontSize: 12, textAlign: "center" }}>{showPass ? "Ocultar contraseñas" : "Mostrar contraseñas"}  </Text>
                </TouchableOpacity>
              </View>


            </View>
          )
        }

        <SimpleBackground width="100%" />
      </View >

    </TouchableWithoutFeedback>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  label: {
    color: primaryOrangeColor,
    fontWeight: "bold",
    fontSize: 12
  },
  boxForm: {
    width: "80%",
    marginTop: 10
  },
  inputBox: {
    marginTop: 5
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginTop: 15,
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  bannerInfo: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 50
  },
  profileIcon: {
    width: 130,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    backgroundColor: primaryOrangeColor
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },
  boxButton: {
    flexDirection: "row",
    width: "80%",
  },
  buttonWrapper: {
    borderRadius: 15,
  },
  boxText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%"
  },
  iconBox: {
    backgroundColor: grayStandardColor,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 15,
    height: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10
  },

})