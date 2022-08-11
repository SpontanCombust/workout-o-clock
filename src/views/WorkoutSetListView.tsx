import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useWorkoutContext } from "../context/WorkoutContext";
import NavigatorsParamList from "../navigation/NavigatorsParamList";

import { WorkoutSet } from "../types/WorkoutSet";
import WorkoutSetListFooter from "./WorkoutSetListFooter";
import WorkoutSetListItem from "./WorkoutSetListItem";


type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutSetListView">;

export default function WorkoutSetListView({route, navigation} : NavProps) {
    const context = useWorkoutContext();
    const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]);
    
    async function fetchSets() {
        const result = await context.storage.getAll("WorkoutSet");
        if(typeof result === "number") {
            console.log("Error fetching sets: " + result);
        } else {
            setWorkoutSets(result);
        }
    }

    useEffect(() => {
        fetchSets();
    });

    return (
        <View style={styles.content}>
            <FlatList<WorkoutSet>
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={workoutSets}
                renderItem={({ item }) => 
                    <WorkoutSetListItem 
                        workoutSet={item} 
                        onPress={() => navigation.navigate("WorkoutTaskList", {workoutSet: item})} />
                }
                ListFooterComponent={<WorkoutSetListFooter onPress={() => navigation.navigate("WorkoutSetForm")}/>}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    content: {
        //TODO use safe area view for screens
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});