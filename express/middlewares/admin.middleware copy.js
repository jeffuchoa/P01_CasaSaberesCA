var jwt = require("jsonwebtoken")

function somenteAdmin(request, response, next) {
  if (request.usuario.tipo !== "adm") {
    return response.status(403).json({ erro: "Apenas administradores podem fazer isso" })
  }
  next()
}

module.exports = somenteAdmin