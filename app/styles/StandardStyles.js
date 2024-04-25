import { StyleSheet } from "react-native";

const StandardStyles = StyleSheet.create({
    orangePrimaryButton: {
        backgroundColor: "#E45417",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        padding:15
    },
    orangeSecondaryButton:{
        backgroundColor: "white",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        borderColor:"#E45417",
        borderWidth:2,
        padding:15
    },
    simpleTextWhite:{
        color:"white",
        fontSize:14,
    },
    simpleTextOrange: {
        color: "#E45417",
        fontSize:14
    },
    bluePrimaryButton: {
        backgroundColor:"#0f2b46",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        padding:15
    }

})

export { StandardStyles }