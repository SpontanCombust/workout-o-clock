import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';

export default function WorkoutTaskForm(props: {
    onRequestClose: () => void;
}) {
    const [displayTime, setDisplayTime] = useState(true);

    return (
        <View style={styles.content}>
            <View style={styles.cancelXButtonView}>
                <TouchableOpacity style={styles.cancelXButton} onPress={props.onRequestClose}>
                    <Text style={styles.cancelXButtonText}>X</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>New workout task</Text>
            <TextInput style={styles.textInput} placeholder="Title"/>
            <ModalDropdown style={styles.dropdown} dropdownStyle={styles.dropdownModal} 
                options={["Countdown", "Counter"]}
                defaultValue="Select timer type..."
                onSelect={(index: string) => setDisplayTime(index === "0")}
            />
            
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
    textInput: {
        paddingLeft: 10,

        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
    dropdown: {
        marginTop: 15,
        paddingLeft: 10,
        paddingTop: 5,

        height: 40,
        width: '40%',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
    dropdownModal: {
        borderColor: "gray",
        borderWidth: 1,
    },
    bottomButtonsView: {
        flexDirection: "row",
        // alignContent: "center",
        // alignItems: "center",
        justifyContent: "space-evenly",

        width: "100%",
        marginTop: 70,
    },
})