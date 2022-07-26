import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { WorkoutContextProvider } from "./src/context/WorkoutContext";
import WorkoutTaskList from "./src/views/WorkoutTaskList";


export default function App() {
    return (
        <GestureHandlerRootView style={{flex:1}}>
        <WorkoutContextProvider>
            <WorkoutTaskList/>
        </WorkoutContextProvider>
        </GestureHandlerRootView>
    );
}
