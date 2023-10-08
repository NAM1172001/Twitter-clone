import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: namskymtp23@gmail.com
 *         password:
 *           type: string
 *           example: Nam123!
 *     SuccessAuthentication:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjUwY2ZiZjhkOWM2YjE5ODk2OWRkMDM3IiwidHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE2OTU4NjY1OTUsImV4cCI6MTY5NTk1Mjk5NX0.Ms9hMxU80GSgvSlR0J1c5SFTP05IAn8hFxbA3r4fV8o
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjUwY2ZiZjhkOWM2YjE5ODk2OWRkMDM3IiwidHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE2OTU4NjY1OTUsImV4cCI6MTcwNDUwNjU5NX0.SKcyZ3Wjd5u5CiKbJgbDl5oU__X4_JS9RfVfUvmFHw8
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: MongoId
 *           example: "650cfbf8d9c6b198969dd037"
 *         name:
 *           type: string
 *           example: "Nam"
 *         email:
 *           type: string
 *           example: "namskymtp23+9@gmail.com"
 *         date_of_birth:
 *           type: string
 *           format: ISO8601
 *           example: 2023-06-30T09:15:13.355Z
 *         created_at:
 *           type: string
 *           format: ISO8601
 *           example: 2023-09-22T02:29:12.552Z
 *         updated_at:
 *           type: string
 *           format: ISO8601
 *           example: 2023-09-22T02:29:12.552Z
 *         verify:
 *           $ref: "#/components/schemas/UserVerifyStatus"
 *         twitter_circle:
 *           type: array
 *           items:
 *             type: string
 *             format: MongoId
 *           example: ["650cfbf8d9c6b198969dd037", "650cfbf8d9c6b198969dd038"]
 *         bio:
 *           type: string
 *           example: "This is my bio"
 *         location:
 *           type: string
 *           example: "San Francisco, CA"
 *         website:
 *           type: string
 *           example: "www.namskymtp23.com"
 *         username:
 *           type: string
 *           example: "user650cfbf8d9c6b198969dd037"
 *         avatar:
 *           type: string
 *           example: "http://localhost:4000/images/avatars/namvan.jpg"
 *         cover_photo:
 *           type: string
 *           example: "http://localhost:4000/images/avatars/namvan.jpg"
 *     UserVerifyStatus:
 *       type: number
 *       enum: [Unverified, Verified, Banned]
 *       example: 1
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

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

export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  iat: number
  exp: number
}
