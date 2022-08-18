import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Navigators from "./src/navigation/Navigators";




export default function App() {
    return (
        <GestureHandlerRootView style={{flex:1}}>
        <NavigationContainer>
            <Navigators/>
        </NavigationContainer>
        </GestureHandlerRootView>
    );
}
