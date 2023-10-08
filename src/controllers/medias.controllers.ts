import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'
import fs from 'fs'
import mime from 'mime'
import { sendFileFromS3 } from '~/utils/s3'
export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadImage(req)
  res.json({
    messages: USERS_MESSAGES.UPLOAD_IMAGE_SUCCESS,
    result: url
  })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadVideo(req)
  res.json({
    messages: USERS_MESSAGES.UPLOAD_VIDEO_SUCCESS,
    result: url
  })
}

export const uploadVideoHLSController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadVideoHLS(req)
  res.json({
    messages: USERS_MESSAGES.UPLOAD_VIDEO_SUCCESS,
    result: url
  })
}

export const videoStatusController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await mediasService.getVideoStatus(id as string)
  return res.json({
    messages: USERS_MESSAGES.GET_VIDEO_STATUS_SUCCESS,
    result: result
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params

  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send('404 Not Found')
    }
  })
}

export const serveM3u8HLSController = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  sendFileFromS3(res, `videos-hls/${id}/master.m3u8`)
  // return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, id, 'master.m3u8'), (err) => {
  //   if (err) {
  //     res.status((err as any).status).send('404 Not Found')
  //   }
  // })
}

export const serveSegmentController = (req: Request, res: Response, next: NextFunction) => {
  const { id, v, segment } = req.params
  sendFileFromS3(res, `videos-hls/${id}/${v}/${segment}`)
  // return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, id, v, segment), (err) => {
  //   if (err) {
  //     res.status((err as any).status).send('404 Not Found')
  //   }
  // })
}

export const serveVideoStreamController = (req: Request, res: Response, next: NextFunction) => {
  const range = req.headers.range
  if (!range) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send('Requires Range header')
  }
  const { name } = req.params
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, name)
  // 1MB = 10^6 bytes (he 10)
  // 1MB = 2^20 bytes (1024*1024) (he nhi phan)

  // Dung luong video(bytes)
  const videoSize = fs.statSync(videoPath).size
  // Dung luong video cho moi phan doan stream
  const chunkSize = 30 * 10 ** 6 // 1MB
  // Lay gia tri byte bat dau tu header Range
  const start = Number(range.replace(/\D/g, ''))
  // Lay gia tri byte ket thuc, vuot qua dung luong video thi lay gia tri videoSize
  const end = Math.min(start + chunkSize, videoSize - 1)
  // Dung luong thuc te cho moi doan video stream
  // Thuong day se la chunkSize, ngoai tru doan cuoi cung
  const contentLength = end - start + 1
  const contentType = mime.getType(videoPath) || 'video/*'
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': contentType
  }
  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)
  const videoStreams = fs.createReadStream(videoPath, { start, end })
  videoStreams.pipe(res)
}
