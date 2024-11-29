import { ApiRequests, ResponseEntity } from "./ApiRequests";
import { ChangePasswordRequestDto, RefreshRequestDto, RefreshResponseDto, SignInRequestDto, SignInResponseDto, SignOutRequestDto, SignUpRequestDto } from "../dto/AuthDtos";
import { UserDto } from "../dto/CommonDtos";


export default class AuthRequests extends ApiRequests {
    protected requestMappingBase(): string {
        return "/auth";
    }


    async signIn(req: SignInRequestDto) : Promise<ResponseEntity<SignInResponseDto>> {
        return await this.doRequest('POST', `/signin`, req, false);
    }

    async signUp(req: SignUpRequestDto) : Promise<ResponseEntity<UserDto>> {
        return await this.doRequest('POST', `/signup`, req, false);
    }

    async refresh(req: RefreshRequestDto) : Promise<ResponseEntity<RefreshResponseDto>> {
        return await this.doRequest('POST', `/refresh`, req, true);
    }

    async signOut(req: SignOutRequestDto) : Promise<ResponseEntity<void>> {
        return await this.doRequest('POST', `/signout`, req, true);
    }

    async changePassword(req: ChangePasswordRequestDto): Promise<ResponseEntity<UserDto>> {
        return await this.doRequest('POST', `/change-password`, req, true);
    }


    async getSignedInUser(): Promise<ResponseEntity<UserDto>> {
        return await this.doRequest('GET', `/`, undefined, true);
    }
}