var express = require('express');
var router = express.Router();

var cors = require('cors');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('coaches.json', (err, data) => {
    if (err) throw err;
    const forms = JSON.parse(data);
    console.log(forms);
    res.send(forms);
  });
});


module.exports = router;
