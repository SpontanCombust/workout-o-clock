import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormView from "../components/FormView";
import { useColorPickerContext } from "../context/ColorPickerContext";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";
import { WorkoutSet } from "../types/WorkoutSet";


type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutSetForm">;

export function WorkoutSetForm({route, navigation} : NavProps) {
    const storage = useWorkoutStorage();

    const [title, setTitle] = useState("New workout set");
    const colorPickerContext = useColorPickerContext();

    useEffect(() => {
        if(route.params.editedSet !== undefined) {
            setTitle(route.params.editedSet.title);
            colorPickerContext.setColor(route.params.editedSet.cardColor);
        } else {
            colorPickerContext.setColor("springgreen");
        }
    }, []);


    async function saveWorkoutSet() {
        if(route.params.editedSet !== undefined) {
            return storage.update("WorkoutSet", route.params.editedSet.id, {
                ...route.params.editedSet,
                title: title,
                cardColor: colorPickerContext.color
            });
        } else {
            return storage.create("WorkoutSet", new WorkoutSet(title, colorPickerContext.color));
        }
    }

    return (
        <FormView
        headerText={route.params.editedSet !== undefined ? "Editing workout set" : "New workout set"}
        onRequestCancel={() => navigation.goBack()}
        onRequestSave={() => saveWorkoutSet().then(() => navigation.goBack())}>
            <Text style={styles.inputHeader}>Title</Text>
            <TextInput value={title} onChangeText={(text: string) => setTitle(text)} style={styles.textInput}/>

            <View style={styles.colorPickerView}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate("ColorPickerScreen");
                }}>
                    <View style={[styles.colorPickerButton, {backgroundColor: colorPickerContext.color}]}></View>
                </TouchableWithoutFeedback>
                <Text style={[styles.inputHeader, {marginTop: 5}]}>Select card color</Text>
            </View>
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
    colorPickerView: {
        flexDirection: "row", 
        marginTop: 25,
    },
    colorPickerButton: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "black",
        marginRight: 10,
    },
});