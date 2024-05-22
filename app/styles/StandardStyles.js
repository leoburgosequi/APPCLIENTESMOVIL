import { primaryOrangeColor, secondBlueColor } from "../config";

import { StyleSheet } from "react-native";

const StandardStyles = StyleSheet.create({
    orangePrimaryButton: {
        backgroundColor: primaryOrangeColor,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    orangeSecondaryButton: {
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: primaryOrangeColor,
        borderWidth: 2,
        padding: 15
    },
    simpleTextWhite: {
        color: "white",
        fontSize: 14,
    },
    simpleTextOrange: {
        color: primaryOrangeColor,
        fontSize: 14
    },
    bluePrimaryButton: {
        backgroundColor: secondBlueColor,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    loadingContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iosShadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    androidShadow: {
        elevation: 10
    },
    rightIconInput: { position: "absolute", alignSelf: "center", right: 0 },

})

export { StandardStyles }