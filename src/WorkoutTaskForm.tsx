import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";


export default function WorkoutTaskForm(props: {
    onRequestClose: () => void;
}) {
    const [timerDropdownOpen, setTimerDropdownOpen] = useState(false);
    //TODO validate input
    const [timerDropdownValue, setTimerDropdownValue] = useState(0);
    const [timerDropdownItems, setTimerDropdownItems] = useState([
        {value: 0, label: 'Countdown'},
        {value: 1, label: 'Counter'},
    ]);

    return (
        <View style={styles.content}>
            <View style={styles.cancelXButtonView}>
                <TouchableOpacity style={styles.cancelXButton} onPress={props.onRequestClose}>
                    <Text style={styles.cancelXButtonText}>X</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>New workout task</Text>
            <TextInput style={styles.titleTextInput} placeholder="Title"/>
            <View style={styles.timerSettingsView}>
                <View style={{width: '40%'}}>
                    <DropDownPicker
                        open={timerDropdownOpen}
                        setOpen={setTimerDropdownOpen}
                        items={timerDropdownItems}
                        setItems={setTimerDropdownItems}
                        value={timerDropdownValue}
                        setValue={setTimerDropdownValue}

                        style={styles.timerDropdown}
                    />
                </View>

                {timerDropdownValue == 0 &&
                <View style={{flexDirection: "row", marginLeft: 30}}>
                    <TextInput style={[styles.timeTextInput, styles.timeTextInputContent]} keyboardType="numeric" defaultValue="00" maxLength={2}/>
                    <Text style={styles.timeTextInputContent}> : </Text>
                    <TextInput style={[styles.timeTextInput, styles.timeTextInputContent]} keyboardType="numeric" defaultValue="00" maxLength={2}/>
                </View>}
            </View>
            
            <View style={styles.bottomButtonsView}>
                <Button title="Cancel" onPress={props.onRequestClose}/>
                <Button title="Save" onPress={props.onRequestClose}/>
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
    timerSettingsView: {
        flexDirection: "row",
        marginTop: 15,
        height: 60,    
    },
    timerDropdown: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
    timeTextInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        width: 60,
        height: 60,
    },
    timeTextInputContent: {
        fontSize: 40,
        textAlign: "center",
        fontWeight: "200",
    },
    bottomButtonsView: {
        flexDirection: "row",
        justifyContent: "space-evenly",

        width: "100%",
        marginTop: 70,
    },
})