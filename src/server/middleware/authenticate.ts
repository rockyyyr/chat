import JsonWebToken from '../authentication/util/JsonWebToken'

export async function authenticate(req, res, next) {
  const authorization = req.get('Authorization')

  if (authorization) {
    try {
      const user = JsonWebToken.verify(authorization.replace('Bearer ', ''))

      req.user = {
        userId: user.id
      }

      return next()

    } catch (err) {
      console.error('this is an error', err)
    }
  }
  res.json({
    error: 'no user was found'
  })
}
