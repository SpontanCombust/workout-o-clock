import { ApiRequests } from "./ApiRequests";
import { CreateWorkoutTaskRequestDto, UpdateWorkoutTaskRequestDto } from "../dto/WorkoutTaskDtos";
import WorkoutTaskDto from "../dto/common/WorkoutTaskDto";


export default class WorkoutTaskRequests extends ApiRequests { 
    private setId: number;

    constructor(setId: number) {
        super();
        this.setId = setId;
    }


    protected requestMappingBase(): string {
        return `/workout-sets/${this.setId}/tasks`;
    }


    async createWorkoutTask(req: CreateWorkoutTaskRequestDto) : Promise<WorkoutTaskDto> {
        return await this.doRequest('POST', `/`, req, true);
    }

    async updateWorkoutTask(id: number, req: UpdateWorkoutTaskRequestDto) : Promise<WorkoutTaskDto> {
        return await this.doRequest('PUT', `/${id}`, req, true);
    }

    async deleteWorkoutTask(id: number) : Promise<boolean> {
        return await this.doRequest('DELETE', `/${id}`, undefined, true);
    }

    async getAllWorkoutTasks() : Promise<Array<WorkoutTaskDto>> {
        return await this.doRequest('GET', `/`, undefined, true);
    }

    async getWorkoutTaskById(id: number) : Promise<WorkoutTaskDto> {
        return await this.doRequest('GET', `/${id}`, undefined, true);
    }
}