const LoginModel = require("../models/login/login.model.mongo")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class LoginService {
  static list(request, response) {
    LoginModel.find()
      .select("-senha")
      .then((login) => {
        response.status(201).json(login)
      })
  }

  static async register(request, response) {
    try {
      var senhaHash = await bcrypt.hash(request.body.senha, 10)

      var novoUsuario = await LoginModel.create({
        nome: request.body.nome,
        email: request.body.email,
        senha: senhaHash,
        fone: request.body.fone,
        tipo: request.body.tipo,
      })

      var usuarioSemSenha = novoUsuario.toObject()
      delete usuarioSemSenha.senha

      response.status(201).json(usuarioSemSenha)
    } catch (err) {
      console.error(err)
      response.status(500).json({ erro: "Falha no cadastro" })
    }
  }

  static async login(request, response) {
    try {
      var usuario = await LoginModel.findOne({ email: request.body.email })

      if (!usuario) {
        return response.status(401).json({ erro: "Email ou senha inválidos" })
      }

      var senhaCorreta = await bcrypt.compare(request.body.senha, usuario.senha)

      if (!senhaCorreta) {
        return response.status(401).json({ erro: "Email ou senha inválidos" })
      }

      var token = jwt.sign(
        { id: usuario._id, tipo: usuario.tipo },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      )

      response.json({
        token: token,
        usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
      })
    } catch (err) {
      console.error(err)
      response.status(500).json({ erro: "Falha no login" })
    }
  }

  static retrieve(request, response) {
    LoginModel.findById(request.params.id)
      .select("-senha")
      .then((login) => {
        response.status(201).json(login)
      })
  }

  static update(request, response) {
    LoginModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
      .then((eventos) => {
        response.status(201).json(eventos)
      })
  }

  static delete(request, response) {
    LoginModel.findByIdAndRemove(request.params.id)
      .then((login) => {
        response.status(201).json(login)
      })
  }
}

module.exports = LoginService