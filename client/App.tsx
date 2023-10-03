import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ColorPickerContextProvider } from "./src/context/ColorPickerContext";

import Navigators from "./src/navigation/Navigators";




export default function App() {
    return (
        <GestureHandlerRootView style={{flex:1}}>
        <ColorPickerContextProvider>
        <NavigationContainer>
            <Navigators/>
        </NavigationContainer>
        </ColorPickerContextProvider>
        </GestureHandlerRootView>
    );
}
