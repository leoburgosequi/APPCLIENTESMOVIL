import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../context/AuthContext";
import { StandardStyles } from "../styles/StandardStyles";

const HomeScreen = ({navigation}) => {

    const [,,,logout,,user] = useContext(AuthContext);
    console.log(user);
    return (
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
            <Text>
                Bienvenido, {user.name}
            </Text>
            <TouchableOpacity
                onPress={() => logout()}
                style={StandardStyles.orangePrimaryButton}
            >

                <Text style={StandardStyles.simpleTextWhite}>
                    Salir
                </Text>
            </TouchableOpacity>

        </View>
    );
}

export default HomeScreen;