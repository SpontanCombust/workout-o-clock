import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WorkoutPlaybackView from "../views/WorkoutPlaybackView";
import WorkoutTaskForm from "../views/WorkoutTaskForm";
import WorkoutTaskFormColorPicker from "../views/WorkoutTaskFormColorPicker";
import WorkoutTaskList from "../views/WorkoutTaskList";
import NavigatorsParamList from "./NavigatorsParamList";


const RootStack = createNativeStackNavigator<NavigatorsParamList>();

export default function Navigators() {
    return (
        <RootStack.Navigator initialRouteName="WorkoutTaskList">
            <RootStack.Screen 
                name="WorkoutTaskList" 
                component={WorkoutTaskList} 
                options={{
                    headerShown: false
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
                name="WorkoutTaskFormColorPicker"
                component={WorkoutTaskFormColorPicker}
                options={{
                    headerShown: true,
                    headerTitle: "Choose card color",
                    presentation: "transparentModal", 
                }}/>
            <RootStack.Screen
                name="WorkoutPlaybackView"
                component={WorkoutPlaybackView}
                initialParams={{currentTaskOrderIndex: 0}}
                options={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}/>
        </RootStack.Navigator>
    )
}