import { Router } from 'express'
import {
  uploadImageController,
  uploadVideoController,
  uploadVideoHLSController,
  videoStatusController
} from '~/controllers/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const mediasRouter = Router()

/**
 * Description: Upload image
 * Path: /upload-image
 * Method: POST
 * Body->form-data: key:image, value:file
 */
mediasRouter.post(
  '/upload-image',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadImageController)
)

/**
 * Description: Upload video
 * Path: /upload-video
 * Method: POST
 * Body->form-data: key:video, value:file
 */
mediasRouter.post(
  '/upload-video',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoController)
)

/**
 * Description: Upload video http live streaming
 * Path: /upload-video-hls
 * Method: POST
 * Body->form-data: key:video, value:file
 */
mediasRouter.post(
  '/upload-video-hls',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoHLSController)
)

/**
 * Description: Get video status
 * Path: /video-status/:id
 * Method: GET
 */
mediasRouter.get(
  '/video-status/:id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(videoStatusController)
)

export default mediasRouter
