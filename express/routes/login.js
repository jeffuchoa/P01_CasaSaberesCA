
var express = require('express');
var router = express.Router();
var LoginService = require ("../services/login.services.mongo")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(
  '/adm'
  ,
  (req, res, next) => {
    res.json(LoginService.adm())
  }
)

router.get(
  '/admchange'
  ,
  (req, res, next) => {
    res.json(LoginService.admChange())
  }
)

router.get(
  "/listar"
  ,
  (request, response, next) => {
    LoginService.list(request,response)
  }
)


router.post(
  "/adicionar"
  ,
  (request, response, next) => {
    LoginService.register(request,response)
  }
)

router.post(
  "/login",
  (request, response, next) => {
    LoginService.login(request, response)
  }
)

router.delete("/delete/:id"
    ,
    function (request, response, next) {
      LoginService.delete(request,response)
    }
)

module.exports = router ;