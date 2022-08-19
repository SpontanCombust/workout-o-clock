import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";
import { useColorPickerContext } from "../context/ColorPickerContext";

import NavigatorsParamList from "../navigation/NavigatorsParamList";


type NavProps = NativeStackScreenProps<NavigatorsParamList, 'ColorPickerScreen'>;

export default function ColorPickerScreen({navigation, route}: NavProps) {
    const context = useColorPickerContext();

    return (
        <View style={styles.colorPickerModalView}>
            <TriangleColorPicker
                oldColor={context.color}
                onColorSelected={(c: string) => {
                    context.setColor(c);
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