import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { WorkoutContext, WorkoutContextProps } from "../context/WorkoutContext";
import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { CompletionCondition, CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


type NavProps = NativeStackScreenProps<NavigatorsParamList, 'WorkoutTaskForm'>;

export default function WorkoutTaskForm({navigation, route}: NavProps) {
    const [completionCondDropdown, setCompletionCondDropdownOpen] = useState(false);
    const [completionCondDropdownValue, setCompletionCondDropdownValue] = useState(CompletionConditionType.TIME);
    const [completionCondDropdownItems, setCompletionCondDropdownItems] = useState([
        {value: CompletionConditionType.TIME, label: 'Time'},
        {value: CompletionConditionType.REPS, label: 'Reps'},
    ]);

    const [workoutTitle, setWorkoutTitle] = useState("");
    const [workoutTimeMinutes, setWorkoutTimeMinutes] = useState("");
    const [workoutTimeSeconds, setWorkoutTimeSeconds] = useState("");
    const [workoutReps, setWorkoutReps] = useState("");
    const [workoutCardColor, setWorkoutCardColor] = useState("springgreen");

    const context = useContext(WorkoutContext);

    useEffect(() => {
        if(route.params?.cardColor) {
            setWorkoutCardColor(route.params.cardColor);
        }
    }, [route.params?.cardColor]);

    

    //DISCUSS make a seperate component for number text input
    function filterNonDigits(s: string): string {
        return s.replace(/\D+/g, '');
    }

    function CompletionCondInput(): JSX.Element {
        if(completionCondDropdownValue == CompletionConditionType.TIME) {
            return <>
            <TextInput 
                style={[styles.timeTextInput, styles.completionCondInputContent]} 
                keyboardType="numeric" 
                placeholder={"mm"}
                value={workoutTimeMinutes}
                onChangeText={(s: string) => setWorkoutTimeMinutes(filterNonDigits(s))}
                maxLength={2}
            />
            <Text style={styles.completionCondInputContent}> : </Text>
            <TextInput 
                style={[styles.timeTextInput, styles.completionCondInputContent]} 
                keyboardType="numeric" 
                placeholder={"ss"}
                value={workoutTimeSeconds}
                onChangeText={(s: string) => setWorkoutTimeSeconds(filterNonDigits(s))}
                maxLength={2}
            />
            </>
        } else {
            return (
            <TextInput 
                style={[styles.repsTextInput, styles.completionCondInputContent]} 
                keyboardType="numeric" 
                placeholder="Reps"
                value={workoutReps}
                onChangeText={(s: string) => setWorkoutReps(filterNonDigits(s))}
                maxLength={4}
            />)
        }
    }

    function parseIntSafe(s: string): number {
        const n = parseInt(s);
        return isNaN(n) ? 0 : n;
    }

    function addNewWorkoutTask(context: WorkoutContextProps) {
        let completionCondition: CompletionCondition;
        if(completionCondDropdownValue == CompletionConditionType.TIME) {
            completionCondition = {
                type: CompletionConditionType.TIME,
                minutes: parseIntSafe(workoutTimeMinutes),
                seconds: parseIntSafe(workoutTimeSeconds),
            };
        } else {
            completionCondition = {
                type: CompletionConditionType.REPS,
                reps: parseIntSafe(workoutReps),
            }
        }

        context.addTask(new WorkoutTask(
            workoutTitle,
            completionCondition,
            workoutCardColor
        ));
    }




    return (
        <View style={styles.content}>
            <View style={styles.cancelXButtonView}>
                <TouchableOpacity style={styles.cancelXButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelXButtonText}>X</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>New workout task</Text>

            <TextInput onChangeText={setWorkoutTitle} style={styles.titleTextInput} placeholder="Title"/>

            <View style={styles.completionCondView}>
                <View style={{width: '40%', flexDirection: "column"}}>
                    <Text>Completion condition</Text>
                    <DropDownPicker
                        open={completionCondDropdown}
                        setOpen={setCompletionCondDropdownOpen}
                        items={completionCondDropdownItems}
                        setItems={setCompletionCondDropdownItems}
                        value={completionCondDropdownValue}
                        setValue={setCompletionCondDropdownValue}

                        style={styles.completionConditionDropdown}
                    />
                </View>

                <View style={{flexDirection: "row", marginLeft: 30}}>
                    {CompletionCondInput()}
                </View>
            </View>

            <View style={{flexDirection: "row", marginTop: 50}}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('WorkoutTaskFormColorPicker', {oldColor: workoutCardColor})}>
                    <View style={[styles.colorPickerButton, {backgroundColor: workoutCardColor}]}></View>
                </TouchableWithoutFeedback>
                <Text>Select card color</Text>
            </View>
            
            <View style={styles.bottomButtonsView}>
                <Button title="Cancel" onPress={() => navigation.goBack()}/>
                <Button title="Save" onPress={() => {
                    addNewWorkoutTask(context);
                    navigation.goBack();
                }}/>
            </View>
        </View>
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
    cancelXButtonView: {
        flexDirection: "row-reverse", 

        marginLeft: -20, 
        marginTop: -5,
    },
    cancelXButton: {
        alignItems: "center",
        justifyContent: "center",

        marginBottom: 10,

        width: 40,
        height: 40,
        borderRadius: 50,

        backgroundColor: 'red',
    },
    cancelXButtonText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    header: {
        marginBottom: 30,

        fontSize: 24,
        color: "gray",

        textAlign: "center",
    },
    titleTextInput: {
        paddingLeft: 10,

        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
    //TODO fix children alignment
    completionCondView: {
        flexDirection: "row",
        marginTop: 15,
        height: 60,    
    },
    completionConditionDropdown: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
    timeTextInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        width: 80,
        height: 60,
    },
    repsTextInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        width: 100,
        height: 60,
    },
    completionCondInputContent: {
        fontSize: 40,
        textAlign: "center",
        fontWeight: "200",
    },
    colorPickerButton: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "black",
        marginRight: 10,
    },
    colorPickerModalView: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    bottomButtonsView: {
        flexDirection: "row",
        justifyContent: "space-evenly",

        width: "100%",
        marginTop: 70,
    },
})