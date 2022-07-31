import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutTaskForm from "../views/WorkoutTaskForm";
import WorkoutTaskFormColorPicker from "../views/WorkoutTaskFormColorPicker";

import WorkoutTaskList from "../views/WorkoutTaskList";


const RootStack = createNativeStackNavigator();

export default function Navigators() {
    return (
        <RootStack.Navigator initialRouteName="WorkoutTaskList">
            <RootStack.Screen 
                name="WorkoutTaskList" 
                component={WorkoutTaskList} 
                options={{headerShown: false}} />
            <RootStack.Screen 
                name="WorkoutTaskForm" 
                component={WorkoutTaskForm} 
                options={{presentation: "transparentModal", animation: "slide_from_bottom", headerShown: false}}/>
            <RootStack.Screen
                name="WorkoutTaskFormColorPicker"
                component={WorkoutTaskFormColorPicker}
                options={{presentation: "transparentModal", headerTitle: "Choose card color"}}/>
        </RootStack.Navigator>
    )
}