import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";
import { WorkoutSet } from "../types/WorkoutSet";


type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutSetForm">;

export function WorkoutSetForm({route, navigation} : NavProps) {
    const storage = useWorkoutStorage();

    const [title, setTitle] = useState("New workout set");
    const [cardColor, setCardColor] = useState("springgreen");

    async function saveWorkoutSet() {
        return storage.create("WorkoutSet", new WorkoutSet(title, cardColor));
    }

    return (
        <TouchableWithoutFeedback>
            <View style={styles.content}>
                <Text>New workout set</Text>

                <Text>Title</Text>
                <TextInput value={title} onChangeText={setTitle}/>

                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <Button title="Cancel" onPress={() => {
                        navigation.goBack()
                    }}/>
                    <Button title="Save" onPress={() => {
                        saveWorkoutSet().then(() => navigation.goBack());
                    }}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
} 

const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        alignContent: "center",

        paddingTop: '4%',
        paddingBottom: '8%',
        paddingHorizontal: '8%',
        marginTop: '20%',
        marginHorizontal: '3%',

        borderRadius: 20,
        backgroundColor: "white",
    },
});