import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";

import NavigatorsParamList from "../navigation/NavigatorsParamList";


type NavProps = NativeStackScreenProps<NavigatorsParamList, 'WorkoutTaskFormColorPicker'>;

export default function WorkoutTaskFormColorPicker({navigation, route}: NavProps) {
    return (
        <View style={styles.colorPickerModalView}>
            <TriangleColorPicker
                oldColor={route.params.oldColor}
                onColorSelected={(c: string) => {
                    route.params.setColor(c);
                    navigation.goBack();
                }}
                style={{flex: 1}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    colorPickerModalView: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
})