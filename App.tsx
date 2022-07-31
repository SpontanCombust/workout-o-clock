import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { WorkoutContextProvider } from "./src/context/WorkoutContext";
import Navigators from "./src/navigation/Navigators";




export default function App() {
    return (
        <GestureHandlerRootView style={{flex:1}}>
        <WorkoutContextProvider>
        <NavigationContainer>
            <Navigators/>
        </NavigationContainer>
        </WorkoutContextProvider>
        </GestureHandlerRootView>
    );
}
