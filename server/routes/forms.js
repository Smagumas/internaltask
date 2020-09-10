var express = require('express');
var router = express.Router();

var cors = require('cors');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    const forms = JSON.parse(data);
    res.send(forms);
  });
});

/* GET users listing. */
router.get('/fullNameValidation', function(req, res, next) {
  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    const forms = JSON.parse(data);
    const query = req.query.fullName;
    console.log(query);

    if (isFullNameValid(query, forms)) {
      res.send({response: 'OK'});
    } else {
      res.send({response: 'Invalid'});
    }

    
  });
});

router.post('/create', function(req, res, next) {
  fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
    if (err){
        res.send('error');
    } else {
      let readData = JSON.parse(data);
      let requestBody = req.body;
      requestBody.id = uuidv4();
      readData.push(requestBody);
      json = JSON.stringify(readData); //convert it back to json
      fs.writeFile('data.json', json, 'utf8', function callback() {
        res.send({response: 'OK'});
      });

    }
  });
  
});

router.delete('/delete', function(req, res, next) {
  fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
    if (err){
        res.send('error');
    } else {
      let readData = JSON.parse(data);
      let requestBody = req.body;

      const index = readData.indexOf(function(data) {
        return data.id === query;
      });

      readData.splice(index, 1);
    
      json = JSON.stringify(readData); //convert it back to json
      fs.writeFile('data.json', json, 'utf8', function callback() {
        res.send({response: 'OK'});
      });

    }
  });
  
});

function isFullNameValid(query, readData) {
  if (query && readData) {
    const foundObject = readData.find(function(data) {
      return data.fullName === query;
    });

    return !foundObject;
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
