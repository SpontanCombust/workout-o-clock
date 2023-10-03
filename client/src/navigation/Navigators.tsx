import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutPlaybackFinishView from "../views/WorkoutPlaybackFinishView";

import WorkoutPlaybackView from "../views/WorkoutPlaybackView";
import { WorkoutSetForm } from "../views/WorkoutSetForm";
import WorkoutSetListView from "../views/WorkoutSetListView";
import WorkoutTaskForm from "../views/WorkoutTaskForm";
import ColorPickerScreen from "../views/ColorPickerScreen";
import WorkoutTaskList from "../views/WorkoutTaskList";
import NavigatorsParamList from "./NavigatorsParamList";
import { ColorPickerContextProvider } from "../context/ColorPickerContext";


const RootStack = createNativeStackNavigator<NavigatorsParamList>();

export default function Navigators() {
    return (
        <RootStack.Navigator initialRouteName="WorkoutSetListView">
            <RootStack.Screen 
                name="WorkoutTaskList" 
                component={WorkoutTaskList} 
                options={{
                    headerShown: true
                }} />

            <RootStack.Screen 
                name="WorkoutTaskForm" 
                component={WorkoutTaskForm} 
                options={{
                    headerShown: false,
                    presentation: "transparentModal", 
                    animation: "slide_from_bottom", 
                }}/>

            <RootStack.Screen
                name="ColorPickerScreen"
                component={ColorPickerScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Choose card color",
                    presentation: "transparentModal", 
                }}/>

            <RootStack.Screen
                name="WorkoutPlaybackView"
                component={WorkoutPlaybackView}
                initialParams={{currentTaskIndex: 0}}
                options={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}/>

            <RootStack.Screen
                name="WorkoutPlaybackFinishView"
                component={WorkoutPlaybackFinishView}
                options={{
                    headerShown: false,
                    animation: "simple_push",
                }}/>

            <RootStack.Screen
                name="WorkoutSetListView"
                component={WorkoutSetListView}
                options={{
                    headerShown: false,
                }}/>

            <RootStack.Screen 
                name="WorkoutSetForm" 
                component={WorkoutSetForm} 
                options={{
                    headerShown: false,
                    presentation: "transparentModal", 
                    animation: "slide_from_bottom", 
                }}/>
        </RootStack.Navigator>
    )
}