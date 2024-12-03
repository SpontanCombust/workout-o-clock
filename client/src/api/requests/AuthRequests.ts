import { ApiRequests } from "./ApiRequests";
import { ChangePasswordRequestDto, RefreshRequestDto, RefreshResponseDto, SignInRequestDto, SignInResponseDto, SignOutRequestDto, SignUpRequestDto } from "../dto/AuthDtos";
import UserDto from "../dto/common/UserDto";


export default class AuthRequests extends ApiRequests {
    protected requestMappingBase(): string {
        return "/auth";
    }


    async signIn(req: SignInRequestDto) : Promise<SignInResponseDto> {
        return await this.doRequest('POST', `/signin`, req, false);
    }

    async signUp(req: SignUpRequestDto) : Promise<UserDto> {
        return await this.doRequest('POST', `/signup`, req, false);
    }

    async refresh(req: RefreshRequestDto) : Promise<RefreshResponseDto> {
        return await this.doRequest('POST', `/refresh`, req, true);
    }

    async signOut(req: SignOutRequestDto) : Promise<void> {
        return await this.doRequest('POST', `/signout`, req, true);
    }

    async changePassword(req: ChangePasswordRequestDto): Promise<UserDto> {
        return await this.doRequest('POST', `/change-password`, req, true);
    }


    async getSignedInUser(): Promise<UserDto> {
        return await this.doRequest('GET', `/`, undefined, true);
    }
}