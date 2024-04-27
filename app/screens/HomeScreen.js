import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../context/AuthContext";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StandardStyles } from "../styles/StandardStyles";
import axios from "axios";
import { primaryOrangeColor } from "../config";

const HomeScreen = ({ navigation }) => {

    const [, , , logout, , user] = useContext(AuthContext);

    const [lineas, setLineas] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            console.log("Entra");
            try {
                axios.get(`https://api.equinorte.co/xsoftCes/api/v1/ext/LineasNegocio?pageIndex=0&pageSize=5`,{
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDRVMwQVBJIiwicm9sZXMiOltdLCJpYXQiOjE3MTQxNzAzMTUsImV4cCI6MTcxNDIxMzUxNX0.ZnxLC-ONG97yFsLfCBSqAYLfHXdnGFRrIgc2XECffqQ`
                    }
                }).then(resp => {
                    setLineas(resp.data.content);
                })
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []); 

   /*  function testApiCes(){
        console.log("Entrando a la api")
        axios.get(`https://api.equinorte.co/xsoftCes/api/v1/ext/get-obra-by-cliente?nide_cliente=890911431&email=MDCHIRINO@CONINSA.CO`,{
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDRVMwQVBJIiwicm9sZXMiOltdLCJpYXQiOjE3MTQxNzAzMTUsImV4cCI6MTcxNDIxMzUxNX0.ZnxLC-ONG97yFsLfCBSqAYLfHXdnGFRrIgc2XECffqQ`
            }
        }).then(data => {
            console.log("data: ", data);
            navigation.navigate("Lineas");
        }).catch(e => {console.log("Error: ",e)})
    } */

    return (
        <View style={{ alignItems: "center", flex: 1, backgroundColor: "white" }}>

            <View style={styles.contentWrapper}>
                <Text style={{fontSize:22,fontWeight:"bold"}}>
                    Bienvenido, {user.name}.
                </Text>

                <TouchableOpacity style={styles.boxOption}>
                    <FontAwesome6 name="building-user" size={30} style={styles.iconBoxOption}/>
                    <Text style={styles.textBoxOption}> Consultar Obras</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Lineas", {data:lineas})} style={styles.boxOption}>
                    
                    <MaterialCommunityIcons name="calculator-variant" size={30} style={styles.iconBoxOption} />
                    <Text style={styles.textBoxOption}>Autocotizador</Text>
                </TouchableOpacity>


                {/*  <TouchableOpacity
                    onPress={() => logout()}
                    style={StandardStyles.orangePrimaryButton}
                >

                    <Text style={StandardStyles.simpleTextWhite}>
                        Salir
                    </Text>
                </TouchableOpacity> 

                <TouchableOpacity onPress={testApiCes} style={[StandardStyles.bluePrimaryButton, {marginTop:30}]}>
                    <Text style={{color:"white"}}>Probar api CES</Text>
                </TouchableOpacity>*/}

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    contentWrapper: {
        marginTop: 60,
        alignItems:"center"
    },
    boxOption: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems:"center",
        borderWidth: 2,
        borderColor: "black",
        width:300,
        paddingHorizontal: 10,
        paddingVertical: 30,
        borderRadius: 20,
        marginTop:20
    },
    textBoxOption:{
        fontSize:20,
        fontWeight:"bold",
        color:"#313C4b"
    },
    iconBoxOption:{
        backgroundColor:"#313C4b",
        color:"white",
        padding:10,
        borderRadius:10
    }
})

export default HomeScreen;