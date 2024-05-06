import { Image, StyleSheet } from "react-native";

import HomeBackground from "../resources/HomeBackground.png"
import React from "react";

const SimpleBackground = ({ width }) => {
    return (
        <Image
            source={HomeBackground}
            style={{
                position: "absolute", bottom: 0, width, zIndex: -1
            }}
        />
    )
}

export default SimpleBackground;
