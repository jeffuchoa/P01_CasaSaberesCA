var jwt = require("jsonwebtoken")

function autenticar(request, response, next) {
  var authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ erro: "Token não fornecido" })
  }

  var token = authHeader.split(" ")[1] // "Bearer <token>" → pega só o token

  if (!token) {
    return response.status(401).json({ erro: "Token mal formatado" })
  }

  try {
    var payload = jwt.verify(token, process.env.JWT_SECRET)
    request.usuario = payload // disponibiliza { id, tipo } pro resto da rota
    next() // deixa a requisição continuar
  } catch (err) {
    return response.status(401).json({ erro: "Token inválido ou expirado" })
  }
}

module.exports = autenticar