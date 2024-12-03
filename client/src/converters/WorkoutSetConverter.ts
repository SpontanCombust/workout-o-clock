import WorkoutSetDto from "../api/dto/common/WorkoutSetDto"
import WorkoutSet from "../types/WorkoutSet"

export default class WorkoutSetConverter {
    fromDto(dto: WorkoutSetDto) : WorkoutSet {
        return new WorkoutSet(
            dto.id,
            dto.title ?? '',
            dto.cardColorHex ?? ''
        )
    }

    intoDto(model: WorkoutSet) : WorkoutSetDto {
        return {
            id: model.id,
            title: model.title,
            cardColorHex: model.cardColorHex
        }
    }
}