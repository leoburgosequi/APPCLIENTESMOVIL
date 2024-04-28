import { primaryOrangeColor, secondBlueVolor } from "../config";

import { StyleSheet } from "react-native";

const StandardStyles = StyleSheet.create({
    orangePrimaryButton: {
        backgroundColor: primaryOrangeColor,
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
        borderColor:primaryOrangeColor,
        borderWidth:2,
        padding:15
    },
    simpleTextWhite:{
        color:"white",
        fontSize:14,
    },
    simpleTextOrange: {
        color: primaryOrangeColor,
        fontSize:14
    },
    bluePrimaryButton: {
        backgroundColor:secondBlueVolor,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        padding:15
    }

})

export { StandardStyles }