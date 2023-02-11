var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let upload = multer({
  dest: './public/'
})
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

app.route('/api/fileanalyse').post(upload.single('upfile'), (req, res) => {
  let reg = /\.\w+/
  // let type = ((req.file.originalname.match(reg))[0].slice(1))
  console.log(req.file)
  res.send({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
