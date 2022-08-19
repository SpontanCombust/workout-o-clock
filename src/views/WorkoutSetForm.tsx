import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormView from "../components/FormView";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";
import { WorkoutSet } from "../types/WorkoutSet";


type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutSetForm">;

export function WorkoutSetForm({route, navigation} : NavProps) {
    const storage = useWorkoutStorage();

    const [title, setTitle] = useState("New workout set");
    const [cardColor, setCardColor] = useState("springgreen");

    useEffect(() => {
        if(route.params.editedSet !== undefined) {
            setTitle(route.params.editedSet.title);
            setCardColor(route.params.editedSet.cardColor);
        }
    }, []);


    async function saveWorkoutSet() {
        if(route.params.editedSet !== undefined) {
            return storage.update("WorkoutSet", route.params.editedSet.id, {
                ...route.params.editedSet,
                title: title,
                cardColor: cardColor
            });
        } else {
            return storage.create("WorkoutSet", new WorkoutSet(title, cardColor));
        }
    }

    return (
        <FormView
        headerText={route.params.editedSet !== undefined ? "Editing workout set" : "New workout set"}
        onRequestCancel={() => navigation.goBack()}
        onRequestSave={() => saveWorkoutSet().then(() => navigation.goBack())}>
            <Text style={styles.inputHeader}>Title</Text>
            <TextInput value={title} onChangeText={(text: string) => setTitle(text)} style={styles.textInput}/>
        </FormView>
    )
} 

const styles = StyleSheet.create({
    inputHeader: {
        fontWeight: "200",
        fontSize: 15,
    },
    textInput: {
        paddingLeft: 10,

        height: 50,

        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
});