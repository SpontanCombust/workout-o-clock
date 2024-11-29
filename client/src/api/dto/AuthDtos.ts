export interface SignInRequestDto {
    email: string,
    password: string
}

export interface SignInResponseDto {
    accessToken: string,
    refreshToken: string
}


export interface SignUpRequestDto {
    email: string,
    password: string,
    username: string
}


export interface RefreshRequestDto {
    refreshToken: string
}

export interface RefreshResponseDto {
    accessToken: string,
    refreshToken: string
}


export interface SignOutRequestDto {
    refreshToken: string
}


export interface ChangePasswordRequestDto {
    oldPassword: string,
    newPassword: string
}