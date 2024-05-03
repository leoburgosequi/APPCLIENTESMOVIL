import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { BASE_URI_CES } from '../config';
import { StandardStyles } from '../styles/StandardStyles';
import axios from 'axios';
import { getItem } from '../storage/GeneralStorage';
import { primaryOrangeColor } from '../config';

const QuestionsScreen = ({ navigation, route }) => {
    const data = route.params;
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getQuestions = async () => {
            setLoading(true);
            const cesToken = await getItem('ces:token');
            axios.get(`${BASE_URI_CES}/get-questions-by-category?codigo=4`, {
                headers: {
                    'Authorization': `Bearer ${cesToken}`
                }
            }).then(response => {
                setQuestions(response.data);
                setLoading(false);
            }).catch(error => { console.log("Error: ", error); setLoading(false) });
        };

        getQuestions();
    }, []);

    function convertDecimalAnswer(numberString) {
        if (numberString.includes(',')) {
            numberString = numberString.replace(',', '.');
        }
        const number = parseFloat(numberString);
        return number;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>{item.descripcion}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                onChangeText={(text) => setResponses(prevResponses => ({
                                    ...prevResponses,
                                    [item.id]: convertDecimalAnswer(text)
                                }))}
                                value={responses[item.id] || ''}
                            />
                            <Text style={styles.textUnidad}>{item.unidad}</Text>

                        </View>
                        <Text style={{ color: "gray", fontSize: 12 }}>El valor debe estar entre {item.minimo} y {item.maximo}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={StandardStyles.bluePrimaryButton} onPress={() => navigation.navigate("Sistemas", [responses, questions])}>
                <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>Consultar</Text>
            </TouchableOpacity>

            {loading && (
                <View style={[StandardStyles.loadingContainer]}>
                    <ActivityIndicator size="large" color={primaryOrangeColor} />
                    <Text style={{ fontWeight: "bold" }}>Procesando</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white"
    },
    questionContainer: {
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    questionText: {
        fontSize: 16,
        marginBottom: 10,
        color: primaryOrangeColor,
        fontWeight: "bold"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        height: 40,
        borderRadius: 10,
        flex: 1,
        marginRight: 50, // Ajustar según el tamaño del texto de unidad
    },
    textUnidad: {
        position: 'absolute',
        right: 10,
        alignSelf: 'center',
        fontWeight: "bold"
    }
});

export default QuestionsScreen;
