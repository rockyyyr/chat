export function clientview(req, res, next) {
  res.sendFile('index.html', { root: './view' })
}
