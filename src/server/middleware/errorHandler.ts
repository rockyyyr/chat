export function errorHandler(err, req, res, next) {
  res.status(err.status || 500)
  res.send('error', { error: err })
  console.log(err)
}
