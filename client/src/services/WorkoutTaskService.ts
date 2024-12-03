import { CreateWorkoutTaskRequestDto, UpdateWorkoutTaskRequestDto } from "../api/dto/WorkoutTaskDtos";
import Api from "../api/requests";
import Converters from "../converters/Converters";
import WorkoutTask from "../types/WorkoutTask";
import { WorkoutTaskObjective } from "../types/WorkoutTaskObjective";

export default class WorkoutTaskService {
    async createWorkoutTask(
        setId: number, 
        title: string, 
        objective: WorkoutTaskObjective, 
        cardColorHex: string
    ) {
        const req: CreateWorkoutTaskRequestDto = {
            title,
            objective: Converters.workoutTaskObjective.intoDto(objective),
            cardColorHex
        };

        const respDto = await Api.workoutTasks(setId).createWorkoutTask(req);

        return Converters.workoutTask.fromDto(respDto);
    }

    async updateWorkoutTask(updatedTask: WorkoutTask) : Promise<WorkoutTask> {
        const req: UpdateWorkoutTaskRequestDto = {
            title: updatedTask.title,
            objective: Converters.workoutTaskObjective.intoDto(updatedTask.objective),
            index: updatedTask.index,
            cardColorHex: updatedTask.cardColorHex
        };

        const respDto = await Api.workoutTasks(updatedTask.setId).updateWorkoutTask(updatedTask.id, req);

        return Converters.workoutTask.fromDto(respDto);
    }

    async deleteWorkoutTask(setId: number, id: number) : Promise<boolean> {
        return await Api.workoutTasks(setId).deleteWorkoutTask(id);
    }

    async getAllWorkoutTasks(setId: number) : Promise<Array<WorkoutTask>> {
        const respDtos = await Api.workoutTasks(setId).getAllWorkoutTasks();

        return respDtos.map(dto => Converters.workoutTask.fromDto(dto));
    }

    async getWorkoutTaskById(setId: number, id: number) : Promise<WorkoutTask> {
        const respDto = await Api.workoutTasks(setId).getWorkoutTaskById(id);

        return Converters.workoutTask.fromDto(respDto);
    }
}