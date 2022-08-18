import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import NavigatorsParamList from "../navigation/NavigatorsParamList";
import { useWorkoutStorage } from "../storage/WorkoutStorage";
import { WorkoutSet } from "../types/WorkoutSet";
import WorkoutSetListFooter from "./WorkoutSetListFooter";
import WorkoutSetListItem from "./WorkoutSetListItem";


type NavProps = NativeStackScreenProps<NavigatorsParamList, "WorkoutSetListView">;

const winSize = Dimensions.get("window");

export default function WorkoutSetListView({route, navigation} : NavProps) {
    const storage = useWorkoutStorage();
    const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]);

    useFocusEffect(
        useCallback(() => {
            storage.getAll("WorkoutSet")
            .then(sets => setWorkoutSets(sets));
        }, [])
    );

    return (
        <View style={styles.content}>
            <FlatList<WorkoutSet>
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={winSize.width * 0.9}
                decelerationRate={"fast"}
                
                keyExtractor={item => item.id}
                data={workoutSets}
                extraData={workoutSets}
                renderItem={({ item }) => 
                    <WorkoutSetListItem 
                        workoutSet={item} 
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