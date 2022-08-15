import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useWorkoutContext } from "../context/WorkoutContext";
import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { StorageError } from "../storage/AsyncStorageSQL";
import WorkoutSetListFooter from "./WorkoutSetListFooter";
import WorkoutSetListItem from "./WorkoutSetListItem";


type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutSetListView">;

const winSize = Dimensions.get("window");

export default function WorkoutSetListView({route, navigation} : NavProps) {
    const context = useWorkoutContext();
    const [workoutSetIds, setWorkoutSetIds] = useState<string[]>([]);
    const isFocused = useIsFocused();
    
    async function fetchSets() {
        try {
            const sets = await context.storage.getAll("WorkoutSet");
            setWorkoutSetIds(sets.map(set => set.id));
        } catch (error: any) {
            console.error(`Failed to fetch sets: ${StorageError[error]}`);
        }
    }

    useEffect(() => {
        //FIXME won't update the screen if sets get added/removed
        fetchSets();
    }, [isFocused]);

    return (
        <View style={styles.content}>
            <FlatList<string>
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={winSize.width * 0.9}
                decelerationRate={"fast"}
                data={workoutSetIds}
                renderItem={({ item }) => 
                    <WorkoutSetListItem 
                        workoutSetId={item} 
                        navigation={navigation}/>
                }
                ListFooterComponent={<WorkoutSetListFooter navigation={navigation}/>}
                style={styles.flatlist}
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
    },
    flatlist: {
        // marginLeft: winSize.width * 0.05,
    }
});