import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

export interface LoginReqBody {
  email: string
  password: string
}

export interface updateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface followReqBody {
  followed_user_id: string
}

export interface GetProfileReqParams extends ParamsDictionary {
  username: string
}

export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface changePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface verifyForgotPasswordReqBody {
  forgot_password_token: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}
