var express = require('express');
var router = express.Router();

var cors = require('cors');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    const forms = JSON.parse(data);
    console.log(forms);
    res.send(forms);
  });
});

router.post('/create', function(req, res, next) {
  fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
        res.send('error');
    } else {
      let readData = JSON.parse(data);
      let requestBody = req.body;

      if (isFullNameValid(requestBody, readData)) {
        requestBody.id = uuidv4();
        readData.push(requestBody);
        json = JSON.stringify(readData); //convert it back to json
        fs.writeFile('data.json', json, 'utf8', function callback() {
          res.send('OK');
        });
      } else {
        next('Full Name invalid');
      }

    }
  });
  
});

function isFullNameValid(body, readData) {
  if (body && readData) {
    const objFound = readData.find(function(data) {
      return data.fullName === body.fullName;
    });

    return !objFound;
  } else {
    return false;
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = router;
