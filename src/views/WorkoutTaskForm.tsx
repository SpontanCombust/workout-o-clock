import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { Button, LogBox, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { WorkoutContext, WorkoutContextProps } from "../context/WorkoutContext";
import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { CompletionCondition, CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


// Ignore messages about non-serializable data when navigating to WorkoutTaskFormColorPicker
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);


type NavProps = NativeStackScreenProps<NavigatorsParamList, 'WorkoutTaskForm'>;

export default function WorkoutTaskForm({navigation, route}: NavProps) {
    const [completionCondDropdown, setCompletionCondDropdownOpen] = useState(false);
    const [completionCondDropdownValue, setCompletionCondDropdownValue] = useState(CompletionConditionType.TIME);
    const [completionCondDropdownItems, setCompletionCondDropdownItems] = useState([
        {value: CompletionConditionType.TIME, label: 'Time'},
        {value: CompletionConditionType.REPS, label: 'Reps'},
    ]);

    const [title, setTitle] = useState("New Task");
    const [timeMinutes, setTimeMinutes] = useState(0);
    const [timeSeconds, setTimeSeconds] = useState(0);
    const [reps, setReps] = useState(0);
    const [cardColor, setCardColor] = useState("springgreen");

    const context = useContext(WorkoutContext);

    useEffect(() => {
        if(route.params.editedTask !== undefined) {
            setTitle(route.params.editedTask.title);
            if(route.params.editedTask.completionCondition.type === CompletionConditionType.TIME) {
                setCompletionCondDropdownValue(CompletionConditionType.TIME);
                setTimeMinutes(route.params.editedTask.completionCondition.minutes);
                setTimeSeconds(route.params.editedTask.completionCondition.seconds);
            } else {
                setCompletionCondDropdownValue(CompletionConditionType.REPS);
                setReps(route.params.editedTask.completionCondition.reps);
            }
            setCardColor(route.params.editedTask.cardColor);
        }
    }, [])
    
    

    function parseIntSafe(s: string): number {
        s.replace(/\D+/g, '');
        const n = parseInt(s);
        return isNaN(n) ? 0 : n;
    }

    function CompletionCondInput(): JSX.Element {
        if(completionCondDropdownValue == CompletionConditionType.TIME) {
            return <>
            <TextInput 
                style={[styles.timeTextInput, styles.completionCondInputContent]} 
                keyboardType="numeric" 
                placeholder={"mm"}
                value={timeMinutes > 0 ? timeMinutes.toString() : ""}
                onChangeText={(s: string) => setTimeMinutes(parseIntSafe(s))}
                maxLength={2}
            />
            <Text style={styles.completionCondInputContent}> : </Text>
            <TextInput 
                style={[styles.timeTextInput, styles.completionCondInputContent]} 
                keyboardType="numeric" 
                placeholder={"ss"}
                value={timeSeconds > 0 ? timeSeconds.toString() : ""}
                onChangeText={(s: string) => setTimeSeconds(parseIntSafe(s))}
                maxLength={2}
            />
            </>
        } else {
            return (
            <TextInput 
                style={[styles.repsTextInput, styles.completionCondInputContent]} 
                keyboardType="numeric" 
                placeholder="Reps"
                value={reps > 0 ? reps.toString() : ""}
                onChangeText={(s: string) => setReps(parseIntSafe(s))}
                maxLength={4}
            />)
        }
    }

    function saveWorkoutTask(context: WorkoutContextProps) {
        let completionCondition: CompletionCondition;
        if(completionCondDropdownValue == CompletionConditionType.TIME) {
            completionCondition = {
                type: CompletionConditionType.TIME,
                minutes: timeMinutes,
                seconds: timeSeconds,
            };
        } else {
            completionCondition = {
                type: CompletionConditionType.REPS,
                reps: reps,
            }
        }

        if(route.params.editedTask !== undefined) {
            context.updateTask(route.params.editedTask.uuid, {
                ...route.params.editedTask,
                title: title,
                completionCondition: completionCondition,
                cardColor: cardColor,
            });
        } else {
            context.addTask(new WorkoutTask(
                title,
                completionCondition,
                cardColor
            ));
        }
    }




    return (
        <View style={styles.content}>
            <View style={styles.cancelXButtonView}>
                <TouchableOpacity style={styles.cancelXButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelXButtonText}>X</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>New workout task</Text>

            <TextInput 
                value={title}
                onChangeText={(text: string) => setTitle(text)} 
                style={styles.titleTextInput} placeholder="Title"/>

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
                {/*TODO lose focus on text fields when color picker is in focus*/}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('WorkoutTaskFormColorPicker', {oldColor: cardColor, setColor: setCardColor})}>
                    <View style={[styles.colorPickerButton, {backgroundColor: cardColor}]}></View>
                </TouchableWithoutFeedback>
                <Text>Select card color</Text>
            </View>
            
            <View style={styles.bottomButtonsView}>
                <Button title="Cancel" onPress={() => navigation.goBack()}/>
                <Button title="Save" onPress={() => {
                    saveWorkoutTask(context);
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
    bottomButtonsView: {
        flexDirection: "row",
        justifyContent: "space-evenly",

        width: "100%",
        marginTop: 70,
    },
})