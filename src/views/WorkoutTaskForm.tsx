import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FormView from "../components/FormView";
import { useColorPickerContext } from "../context/ColorPickerContext";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";
import { CompletionCondition, CompletionConditionType, WorkoutTask } from "../types/WorkoutTask";


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

    const colorPickerContext = useColorPickerContext();
    const storage = useWorkoutStorage();

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
            colorPickerContext.setColor(route.params.editedTask.cardColor);
        } else {
            colorPickerContext.setColor("springgreen");
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

    async function saveWorkoutTask() {
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
            return storage.update("WorkoutTask", route.params.editedTask.id, {
                ...route.params.editedTask,
                title: title,
                completionCondition: completionCondition,
                cardColor: colorPickerContext.color,
            });
        } else {
            const newTask = await storage.create("WorkoutTask", new WorkoutTask(
                route.params.setId,
                title,
                completionCondition,
                colorPickerContext.color
            ));

            const set = await storage.get("WorkoutSet", route.params.setId);
            set.taskIds.push(newTask.id);
            
            return storage.update("WorkoutSet", route.params.setId, set);
        }
    }

    return (
        <FormView
        headerText={route.params.editedTask !== undefined ? "Editing workout task" : "New workout task"}
        onRequestCancel={() => navigation.goBack()}
        onRequestSave={() => saveWorkoutTask().then(() => navigation.goBack())}>
            <Text style={styles.inputHeader}>Title</Text>
            <TextInput 
                value={title}
                onChangeText={(text: string) => setTitle(text)} 
                style={styles.titleTextInput}/>

            <View style={styles.completionCondView}>
                <Text style={styles.inputHeader}>Completion condition</Text>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: '35%'}}>
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

                    <View style={styles.completionConditionInputView}>
                        {CompletionCondInput()}
                    </View>
                </View>
            </View>

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
    titleTextInput: {
        paddingLeft: 10,

        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
    completionCondView: {
        flexDirection: "column",
        marginTop: 15,
        height: 60,    
    },
    completionConditionDropdown: {
        height: 60,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
    completionConditionInputView: {
        flexDirection: "row", 
        justifyContent: "center",

        width: '70%',
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
        width: '85%',
        height: 60,
    },
    completionCondInputContent: {
        fontSize: 40,
        textAlign: "center",
        fontWeight: "200",
    },
    colorPickerView: {
        flexDirection: "row", 
        marginTop: 50,
    },
    colorPickerButton: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "black",
        marginRight: 10,
    },
})