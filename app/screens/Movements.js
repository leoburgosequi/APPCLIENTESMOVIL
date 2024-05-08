import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Movements = () => {

    const html = `
        <html>
            <body>
                <h1> PDF NEW </h1>
            </body>
        </html>
    `;

    const generatePdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });

        await shareAsync(file.uri);
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Movements</Text>
            <Button title="Generar PDF" onPress={generatePdf} />
        </View>
    )
}

export default Movements

const styles = StyleSheet.create({})