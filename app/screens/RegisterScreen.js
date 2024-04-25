import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext, useState } from "react";

import CheckBox from "../components/CheckBox";
//import { AuthContext } from '../context/AuthContext';
import { LoginStyles } from "../styles/LoginStyles";
import { RegisterStyles } from "../styles/RegisterStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { StandardStyles } from "../styles/StandardStyles";

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tratamientoSelection, setTratamientoSelection] = useState(false);
    const [terminosSelection, setTerminosSelection] = useState(false);
    //  const [,register,,,isLoading,user] = useContext(AuthContext);

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        
        <View style={RegisterStyles.container}>
            <Spinner visible={isLoading} />
            <Text style={{ textAlign: "center", marginVertical: 20, fontSize: 18, fontWeight: "bold" }}>Completa todos los campos</Text>

            <View style={RegisterStyles.inputWrapper}>
                <TextInput style={[LoginStyles.textInput, { alignItems: "center" }]}
                    placeholder="Nombre Completo"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor="#F38658"

                />

                <TextInput style={LoginStyles.textInput}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#F38658"
                />
                <TextInput style={LoginStyles.textInput}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#F38658"
                    secureTextEntry
                />
                <TextInput style={LoginStyles.textInput}
                    placeholder="Confirmar contraseña"
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    placeholderTextColor="#F38658"
                    secureTextEntry
                />

                <CheckBox label="Autorizo el tratamiento de mis datos personales a Equinorte SA bajo su política de tratamiento de información."
                    isChecked={tratamientoSelection}
                    onChange={setTratamientoSelection}
                    sizeFont={16}
                    isButton={true}
                    link="Login"
                  
                />

                <CheckBox label="Acepto los terminos y condiciones."
                    isChecked={terminosSelection}
                    onChange={setTerminosSelection}
                    sizeFont={16}
                    isButton={true}
                    link="Login"
                />

                <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 10 }]}
                    onPress={() => { register(name, email, password, passwordConfirmation); }} >
                    <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>CREAR CUENTA</Text>

                </TouchableOpacity>

            </View>


        </View>
        </TouchableWithoutFeedback>
    )
}

export default RegisterScreen;