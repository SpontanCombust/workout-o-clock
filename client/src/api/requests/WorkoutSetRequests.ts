import { ApiRequests } from "./ApiRequests";
import { CreateWorkoutSetRequestDto, UpdateWorkoutSetRequestDto } from "../dto/WorkoutSetDtos";
import { WorkoutSetDto } from "../dto/common/WorkoutSetDto";


export default class WorkoutSetRequests extends ApiRequests {
    protected requestMappingBase(): string {
        return "/workout-sets";
    }


    async createWorkoutSet(req: CreateWorkoutSetRequestDto) : Promise<WorkoutSetDto> {
        return await this.doRequest('POST', `/`, req, true);
    }

    async updateWorkoutSet(id: number, req: UpdateWorkoutSetRequestDto) : Promise<WorkoutSetDto> {
        return await this.doRequest('PUT', `/${id}`, req, true);
    }

    async deleteWorkoutSet(id: number) : Promise<boolean> {
        return await this.doRequest('DELETE', `/${id}`, undefined, true);
    }

    async getAllWorkoutSets() : Promise<Array<WorkoutSetDto>> {
        return await this.doRequest('GET', `/`, undefined, true);
    }

    async getWorkoutSetById(id: number) : Promise<WorkoutSetDto> {
        return await this.doRequest('GET', `/${id}`, undefined, true);
    }
}