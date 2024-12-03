import { CreateWorkoutSetRequestDto, UpdateWorkoutSetRequestDto } from "../api/dto/WorkoutSetDtos";
import Api from "../api/requests";
import Converters from "../converters/Converters";
import WorkoutSet from "../types/WorkoutSet";

export default class WorkoutSetService {
    async createWorkoutSet(
        title: string, 
        cardColorHex: string
    ) : Promise<WorkoutSet> {
        const req: CreateWorkoutSetRequestDto = {
            title,
            cardColorHex
        };

        const respDto = await Api.workoutSets().createWorkoutSet(req);

        return Converters.workoutSet.fromDto(respDto);
    }

    async updateWorkoutSet(updatedSet: WorkoutSet) : Promise<WorkoutSet> {
        const req: UpdateWorkoutSetRequestDto = {
            title: updatedSet.title,
            cardColorHex: updatedSet.cardColorHex
        };

        const respDto = await Api.workoutSets().updateWorkoutSet(updatedSet.id, req);

        return Converters.workoutSet.fromDto(respDto);
    }

    async deleteWorkoutSet(setId: number) : Promise<boolean> {
        return await Api.workoutSets().deleteWorkoutSet(setId);
    }

    async getAllWorkoutSets() : Promise<Array<WorkoutSet>> {
        const respDtos = await Api.workoutSets().getAllWorkoutSets();

        return respDtos.map((dto) => Converters.workoutSet.fromDto(dto));
    }

    async getWorkoutSetById(setId: number) : Promise<WorkoutSet> {
        const respDto = await Api.workoutSets().getWorkoutSetById(setId);

        return Converters.workoutSet.fromDto(respDto);
    }
}