import { Router } from 'express'
import {
  serveImageController,
  serveM3u8HLSController,
  serveSegmentController,
  serveVideoStreamController
} from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video-stream/:name', serveVideoStreamController)
staticRouter.get('/video-hls/:id/master.m3u8', serveM3u8HLSController)
staticRouter.get('/video-hls/:id/:v/:segment', serveSegmentController)

export default staticRouter
