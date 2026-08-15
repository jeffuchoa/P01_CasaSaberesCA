var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');
const multer = require ("multer")
const fs = require('fs')


var eventosRouter = require("./routes/eventos")
var loginRouter = require("./routes/login")
var noticiasRouter = require ("./routes/noticias")
var pesquisasRouter = require ("./routes/pesquisas")
var indexRouter = require ("./routes/acessos")
var seaweed = require ("./routes/seaweed-trabalhos")

var app = express();
require("./db/mongo.connection")
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "public/arquivos")
  },
  filename: function (req, file, cb) {
      const parts = file.mimetype.split("/");
      cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
  }
})
const upload = multer({storage});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public','arquivos')));

app.use('/',indexRouter);
app.use('/seaweed', seaweed);
app.use('/eventos', eventosRouter);
app.use('/usuarios',loginRouter);
app.use('/noticias',noticiasRouter);
app.use('/pesquisas',pesquisasRouter);
app.use('/pasta-desejada', express.static(path.join(__dirname, 'public', 'arquivos')));


app.post("/save-image", upload.single("pdf"), (req, res) => {
  res.sendFile(`${__dirname}/public/arquivos/${req.file.filename}`);
  const filePath = `${__dirname}/public/arquivos/${req.file.filename}`;
  res.json({ caminhoImagem: req.file.filename });
})

app.get('/imagem/:nomeArquivo', (req, res) => {
  const nomeArquivo = req.params.nomeArquivo;
  const imagePath = path.join(__dirname, 'public/arquivos', nomeArquivo);
  
  if (fs.existsSync(imagePath)) {
    
    res.sendFile(imagePath);
  } else {
 
    res.sendStatus(404);
  }
});

app.get('/pdf/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, 'public/arquivos', fileName);

  res.sendFile(filePath);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






module.exports = app;
