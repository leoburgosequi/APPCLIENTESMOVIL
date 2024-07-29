import * as WebBrowser from 'expo-web-browser';

import { ActivityIndicator, Alert, Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { deleteItem, getItem, saveItem } from '../storage/GeneralStorage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { Entypo } from '@expo/vector-icons';
import HeaderImg from '../resources/HeaderImg.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/Loader';
import LoginBackground from '../resources/LoginBackground.png';
import { LoginStyles } from '../styles/LoginStyles';
import LoginUserIcon from '../resources/LoginUserIcon.png';
import Spinner from 'react-native-loading-spinner-overlay';
import { StandardStyles } from '../styles/StandardStyles';
import WhiteLogo from '../resources/WhiteLogo.png';
import { primaryOrangeColor } from '../config';
import { simpleMsgAlert } from '../helpers/General'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, testApi, , , , , isLoading] = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const message = () => {
        Alert.alert("Información", "La restauración de su contraseña es en nuestro portal web.", [
            {
                text: 'Cerrar',
                style: 'destructive',
            },
            {
                text: '¡Ir!',
                onPress: () => WebBrowser.openBrowserAsync("https://appclientes.equinorte.co/password/reset")
            }
        ]);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={LoginStyles.container} >
                <ImageBackground
                    source={LoginBackground}
                    resizeMode="cover"
                    style={LoginStyles.imgBackground}
                >
                    <Image
                        source={HeaderImg}
                        style={{ position: "absolute", bottom: "10%", width: 120, height: 30, }}
                    />
                    <View style={LoginStyles.wrapper} >

                        <View style={[LoginStyles.userIcon, LoginStyles.userIconshadow]}>
                            <Image
                                source={LoginUserIcon}
                                style={LoginStyles.loginUserIcon}
                            />
                        </View>

                        <Text style={LoginStyles.titleMessage}>
                            ¡Bienvenido!
                        </Text>
                        <View style={{ width: "90%" }}>
                            <View style={LoginStyles.inputWrapper}>
                                <TextInput
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={[LoginStyles.textInput]}
                                    keyboardType="email-address"
                                    autoComplete="email"
                                    autoCapitalize="none"

                                />
                                <Entypo name="email" size={24} style={StandardStyles.rightIconInput} color={primaryOrangeColor} />
                            </View>

                            <View style={LoginStyles.inputWrapper}>
                                <TextInput
                                    placeholder="Contraseña"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    style={LoginStyles.textInput}
                                />
                                {
                                    showPassword ?
                                        <Entypo name="eye-with-line" size={24} color="#c1c1c1" style={StandardStyles.rightIconInput} onPress={() => { setShowPassword(false) }} />
                                        :
                                        <Entypo name="eye" size={24} color="#c1c1c1" style={StandardStyles.rightIconInput} onPress={() => { setShowPassword(true) }} />
                                }

                            </View>
                        </View>

                        <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 30, width: "80%" }]}
                            onPress={() => { login(email, password); }}  >
                            <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>INGRESAR</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={[StandardStyles.orangeSecondaryButton, { marginTop: 10, width: "80%" }]}
                            onPress={() => navigation.navigate("Registrarse")}  >
                            <Text style={[StandardStyles.simpleTextOrange, { fontWeight: "bold" }]}>REGISTRARME</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={LoginStyles.forgotButton} onPress={message}>
                            <Text style={LoginStyles.textForgot}>Olvidé mi contraseña</Text>
                        </TouchableOpacity>
                        {/*      <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 10, width: "80%" }]}
                            onPress={() => { testApi(); }}  >
                            <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>TEST</Text>

                        </TouchableOpacity> */}
                    </View>
                </ImageBackground>
                {isLoading && (
                    <Loader bg="white" />
                )}

            </View>

        </TouchableWithoutFeedback>



    );
}

export default LoginScreen;