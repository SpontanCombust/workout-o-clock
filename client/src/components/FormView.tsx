import React from "react";
import { Button, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewProps } from "react-native";


export interface FormViewProps extends ViewProps {
    headerText?: string,
    onRequestCancel?: () => void;
    onRequestSave?: () => void;
}

export default function FormView(props: FormViewProps) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.content, props.style]}>
                <View style={styles.cancelXButtonView}>
                    <TouchableOpacity style={styles.cancelXButton} onPress={props.onRequestCancel}>
                        <Text style={styles.cancelXButtonText}>X</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.header}>{props.headerText}</Text>

                {props.children}

                <View style={styles.bottomButtonsView}>
                    <Button title="Cancel" onPress={props.onRequestCancel}/>
                    <Button title="Save" onPress={props.onRequestSave}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        alignContent: "center",

        paddingTop: '4%',
        paddingBottom: '8%',
        paddingHorizontal: '8%',
        marginTop: '20%',
        marginHorizontal: '3%',

        borderRadius: 20,
        borderWidth: 1,
        borderColor: "gray",
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
    bottomButtonsView: {
        flexDirection: "row",
        justifyContent: "space-evenly",

        width: "100%",
        marginTop: 70,
    },
});
