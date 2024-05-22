import { ActivityIndicator, Alert, Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { deleteItem, getItem, saveItem } from '../storage/GeneralStorage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/Loader';
import LoginBackground from '../resources/LoginBackground.png';
import { LoginStyles } from '../styles/LoginStyles';
import LoginUserIcon from '../resources/LoginUserIcon.png';
import Spinner from 'react-native-loading-spinner-overlay';
import { StandardStyles } from '../styles/StandardStyles';
import WhiteLogo from '../resources/WhiteLogo.png';
import { primaryOrangeColor } from '../config';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('leonardobh96@gmail.com');
    const [password, setPassword] = useState('1234567890');
    const [login, testApi, , , , , isLoading] = useContext(AuthContext);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={LoginStyles.container} >
                <ImageBackground
                    source={LoginBackground}
                    resizeMode="cover"
                    style={LoginStyles.imgBackground}
                >
                    <Image
                        source={WhiteLogo}
                        style={{ position: "absolute", top: 50 }}
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
                        <TextInput
                            placeholder="Correo electrónico"
                            value={email}
                            onChangeText={setEmail}
                            style={[LoginStyles.textInput]}
                            keyboardType="email-address"
                            autoComplete="email"
                            autoCapitalize="none"
                        //placeholderTextColor="#F38658"
                        />
                        <TextInput
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={LoginStyles.textInput}
                        //  placeholderTextColor="#F38658"
                        />
                        <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 30, width: "80%" }]}
                            onPress={() => { login(email, password); }}  >
                            <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>INGRESAR</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={[StandardStyles.orangeSecondaryButton, { marginTop: 10, width: "80%" }]}
                            onPress={() => navigation.navigate("Registrarse")}  >
                            <Text style={[StandardStyles.simpleTextOrange, { fontWeight: "bold" }]}>REGISTRARME</Text>

                        </TouchableOpacity>
                        {/*      <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 10, width: "80%" }]}
                            onPress={() => { testApi(); }}  >
                            <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>TEST</Text>

                        </TouchableOpacity> */}
                    </View>
                </ImageBackground>
                {isLoading && (
                    <Loader />
                )}

            </View>

        </TouchableWithoutFeedback>



    );
}

export default LoginScreen;