import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios';

const QuestionsScreen = ({navigation,route}) => {

    const data = route.params;
    console.log(data);
    const [questions, setQuestions] = useState({});

    useEffect(() => {
        const getQuestions = () => {
            axios.get(`https://api.equinorte.co/xsoftCes/api/v1/ext/Questions/categoria?codigo=4`,{
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDQUxUQU1BUiIsInJvbGVzIjpbXSwiaWF0IjoxNzE0MTgxNzc2LCJleHAiOjE3MTQyMjQ5NzZ9.q8l71L1HaJkt6qiFsX3Z62lp76Lw1HJOR-PHSCovCbE"
                }
            }).then(q => {
                console.log(q.data);
                setQuestions(q.data);
            }).catch(error => console.log("Error: ", error));
        }

        getQuestions();
    }, []);

   const [responses, setResponses] = useState({});

    return (
        <View style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>{item.descripcion}</Text>
                        <TextInput
                        keyboardType="numeric"
                            style={styles.input}
                            onChangeText={(text) => {
                                setResponses(prevResponses => ({
                                    ...prevResponses,
                                    [item.id]: text
                                }));
                            }}
                            value={responses[item.id] || ''}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        height: 40,
    }
});

export default QuestionsScreen