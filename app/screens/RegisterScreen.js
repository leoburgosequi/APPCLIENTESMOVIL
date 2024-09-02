import { ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext, useState } from "react";

import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import CheckBox from "../components/CheckBox";
import { Entypo } from '@expo/vector-icons';
//import { AuthContext } from '../context/AuthContext';
import { LoginStyles } from "../styles/LoginStyles";
import PolicyScreen from './PolicyScreen';
import { RegisterStyles } from "../styles/RegisterStyles";
import SimpleBackground from '../components/SimpleBackground';
import Spinner from "react-native-loading-spinner-overlay";
import { StandardStyles } from "../styles/StandardStyles";
import { primaryOrangeColor } from '../config';

const RegisterScreen = ({ navigation }) => {

    const [, , , , register, , isLoading] = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [tratamientoSelection, setTratamientoSelection] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    // const [terminosSelection, setTerminosSelection] = useState(false);
    //  const [,register,,,isLoading,user] = useContext(AuthContext);

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={RegisterStyles.container}>
                {/*  <Spinner visible={isLoading} /> */}
                <Text style={{ textAlign: "center", marginVertical: 20, fontSize: 18, fontWeight: "bold" }}>Completa todos los campos</Text>

                <View style={RegisterStyles.inputWrapper}>
                    <View style={LoginStyles.inputWrapper}>
                        <TextInput style={[LoginStyles.textInput, { alignItems: "center" }]}
                            placeholder="Nombre Completo"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor="#F38658"
                        />
                        <AntDesign name="user" size={24} style={StandardStyles.rightIconInput} color={primaryOrangeColor} />
                    </View>

                    <View style={LoginStyles.inputWrapper}>
                        <TextInput style={LoginStyles.textInput}
                            placeholder="Correo electrónico"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#F38658"
                            keyboardType="email-address"
                            autoComplete="email"
                            autoCapitalize="none"
                        />
                        <Entypo name="email" size={24} style={StandardStyles.rightIconInput} color={primaryOrangeColor} />
                    </View>

                    <View style={LoginStyles.inputWrapper}>
                        <TextInput style={LoginStyles.textInput}
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="#F38658"
                            secureTextEntry={!showPass}
                            textContentType="oneTimeCode"
                        />
                        {
                            showPass ?
                                <Entypo name="eye-with-line" size={24} color="#c1c1c1" style={StandardStyles.rightIconInput} onPress={() => { setShowPass(false) }} />
                                :
                                <Entypo name="eye" size={24} color="#c1c1c1" style={StandardStyles.rightIconInput} onPress={() => { setShowPass(true) }} />
                        }
                    </View>

                    <View style={LoginStyles.inputWrapper}>
                        <TextInput style={LoginStyles.textInput}
                            placeholder="Confirmar contraseña"
                            value={passwordConfirmation}
                            onChangeText={setPasswordConfirmation}
                            placeholderTextColor="#F38658"
                            secureTextEntry={!showConfirm}
                            textContentType="oneTimeCode"
                        />
                        {
                            showConfirm ?
                                <Entypo name="eye-with-line" size={24} color="#c1c1c1" style={StandardStyles.rightIconInput} onPress={() => { setShowConfirm(false) }} />
                                :
                                <Entypo name="eye" size={24} color="#c1c1c1" style={StandardStyles.rightIconInput} onPress={() => { setShowConfirm(true) }} />
                        }
                    </View>

                    <CheckBox label="Autorizo el tratamiento de mis datos personales a Equinorte SA bajo su política de tratamiento de información."
                        isChecked={tratamientoSelection}
                        onChange={setTratamientoSelection}
                        sizeFont={16}
                        isButton={true}
                        link="Politica de tratamiento de datos"
                        containerWidth="80%"
                        width={25}
                        height={25}

                    />
                    <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 10 }]}
                        onPress={() => { register(fullName, email, password, passwordConfirmation, tratamientoSelection); }} >
                        <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>CREAR CUENTA</Text>

                    </TouchableOpacity>
                    <SimpleBackground width="100%" />
                    {isLoading && (
                        <View style={[StandardStyles.loadingContainer]}>
                            <ActivityIndicator size="large" color={primaryOrangeColor} />
                            <Text style={{ fontWeight: "bold" }}>Procesando</Text>
                        </View>
                    )}
                </View>
            </View>

        </TouchableWithoutFeedback>
    )
}

export default RegisterScreen;