import { Router } from 'express'
import { likeTweetController, unlikeTweetController } from '~/controllers/likes.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likesRouter = Router()

/**
 * Description: like a tweet
 * Path: /
 * Method: POST
 * Body: {tweet_id: string}
 * Authorization: Bearer <access_token>
 */
likesRouter.post(
  '',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(likeTweetController)
)

/**
 * Description: unlike a tweet
 * Path: /tweets/tweet_id
 * Method: DELETE
 * Authorization: Bearer <access_token>
 */
likesRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unlikeTweetController)
)

export default likesRouter
