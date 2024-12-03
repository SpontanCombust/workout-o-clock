import { ChangePasswordRequestDto, RefreshRequestDto, SignInRequestDto, SignOutRequestDto, SignUpRequestDto } from "../api/dto/AuthDtos";
import Api from "../api/requests";
import Converters from "../converters/Converters";
import AuthTokenPair from "../types/AuthTokenPair";
import User from "../types/User";


export default class AuthService {

    async signUp(email: string, password: string, username: string) : Promise<User> {
        const req: SignUpRequestDto = {
            email,
            password,
            username
        };

        const respDto = await Api.auth().signUp(req);

        return Converters.user.fromDto(respDto);
    }

    async signIn(email: string, password: string) : Promise<AuthTokenPair> {
        const req: SignInRequestDto = {
            email,
            password
        };

        const respDto = await Api.auth().signIn(req);

        return {
            accessToken: respDto.accessToken,
            refreshToken: respDto.refreshToken
        }
    }

    async refresh(refreshToken: string) : Promise<AuthTokenPair> {
        const req: RefreshRequestDto = {
            refreshToken
        };

        const respDto = await Api.auth().refresh(req);

        return {
            accessToken: respDto.accessToken,
            refreshToken: respDto.refreshToken
        }
    }

    async signOut(refreshToken: string) {
        const req: SignOutRequestDto = {
            refreshToken
        };

        await Api.auth().signOut(req);
    }

    async changePassword(oldPassword: string, newPassword: string) : Promise<User> {
        const req: ChangePasswordRequestDto = {
            oldPassword,
            newPassword
        };

        const respDto = await Api.auth().changePassword(req);

        return Converters.user.fromDto(respDto);
    }


    async getSignedInUser() : Promise<User> {
        const respDto = await Api.auth().getSignedInUser();

        return Converters.user.fromDto(respDto);
    }
}