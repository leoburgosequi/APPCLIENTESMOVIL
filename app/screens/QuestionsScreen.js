import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BASE_URI_CES, timeActivity } from '../config';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import Logout from '../components/Logout';
import SimpleBackground from '../components/SimpleBackground';
import { StandardStyles } from '../styles/StandardStyles';
import axios from 'axios';
import { checkActivity } from '../helpers/General';
import { getItem } from '../storage/GeneralStorage';
import { primaryOrangeColor } from '../config';

const QuestionsScreen = ({ navigation, route }) => {
    const { codCategory } = route.params;
    const [, , token, logout, , user, , cesToken] = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkActivity(timeActivity, logout)
        const getQuestions = async () => {
            setLoading(true);
            const cesToken = await getItem('ces:token');
            axios.get(`${BASE_URI_CES}/get-questions-by-category?codigo=${codCategory}`, {
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
        // Permitir una cadena vacía o solo un punto.
        if (numberString === '' || numberString === '.') {
            return numberString;
        }

        // Reemplazar coma por punto.
        if (numberString.includes(',')) {
            numberString = numberString.replace(',', '.');
        }

        // Intentar convertir a número.
        const number = parseFloat(numberString);

        // Validar que el número sea un valor numérico.
        if (isNaN(number)) {
            return '';
        }

        return numberString;
    }

    function validateFields() {
        var valid = true;
        questions.map(question => {
            const answer = responses[question.id];
            if (answer > question.maximo || answer < question.minimo) {
                valid = false
            }
        });
        (valid) ?
            navigation.navigate("Sistemas", [responses, questions])
            :
            Alert.alert("¡Error!", 'Verifique las respuestas, estas deben estar dentro de los rangos establecidos.', [
                {
                    text: 'Cerrar',
                    style: 'cancel',
                },
            ]);
    }

    const handleTextChange = (text) => {
        setInputValue(text);
        setResponses(prevResponses => ({
            ...prevResponses,
            [item.id]: convertDecimalAnswer(text)
        }));
    };

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
            <TouchableOpacity style={StandardStyles.bluePrimaryButton} onPress={() => {
                validateFields();
            }}>
                <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>Consultar</Text>
            </TouchableOpacity>
            <SimpleBackground width="110%" />

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
        marginRight: 0,
    },
    textUnidad: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        fontWeight: "bold"
    }
});

export default QuestionsScreen;
