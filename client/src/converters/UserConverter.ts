import UserDto from "../api/dto/common/UserDto";
import User from "../types/User";


export default class UserConverter {
    fromDto(dto: UserDto) : User {
        return new User(
            dto.id,
            dto.username ?? '',
            dto.email ?? '',
            dto.createdDate ? new Date(dto.createdDate) : new Date(),
            dto.modifiedDate ? new Date(dto.modifiedDate) : new Date()
        )
    }

    intoDto(model: User) : UserDto {
        return {
            id: model.id,
            username: model.username,
            email: model.email,
            createdDate: model.createdDate.toUTCString(),
            modifiedDate: model.modifiedDate?.toUTCString()
        }
    }
}