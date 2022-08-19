import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import NavigatorsParamList from "../navigation/NavigatorsParamList";


type Props = {
    navigation: NativeStackNavigationProp<NavigatorsParamList, "WorkoutSetListView">;
}

export default function WorkoutSetListFooter({navigation} : Props) {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("WorkoutSetForm", {})}
            activeOpacity={0.8}
            style={styles.content}
        >
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    )
}


const winSize = Dimensions.get("window");

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        width: winSize.width * 0.9,
        marginTop: winSize.height * 0.05,

        borderWidth: 4,
        borderColor: "springgreen",
        backgroundColor: "white",
    },
    text: {
        fontSize: 100,
        fontWeight: "400",
        color: "lime",
    }
});