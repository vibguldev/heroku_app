
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
var restify = require('restify');
// set the view engine to ejs

// make express look in the public directory for assets (css/js/img)

// set the home page route
// app.get('/', function(req, res) {

//     // ejs render automatically looks in the views folder
//     res.render('index');
// });



const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
var jsonexport = require('jsonexport');
var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'lG--VGb_TW0AAAAAAAABBBgDv3Dh-uPN7pRc0uAHTPqW2Gw4XtP4-TM5KCkjlj7F'});
app.use(cors());
app.use(restify.fullResponse());
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/sendData', function (req, res) {
  // var result = json2csv({ data: req.body, fields: fields })
  // console.log(req.body)
  const contacts = JSON.parse(Object.keys(req.body)[0])
  jsonexport(contacts,function(err, csv){
    if(err) return console.log(err);
    var filename = 'responses.csv'
    var contents = csv

    dbx.filesUpload({ path: '/' + filename, contents: contents, mode: 'overwrite' })
        .then(function(response) {
            res.send("done")
        })
        .catch(function(error) {
            res.send(error)
        });
    });
  // req.body.forEach(function(element) {
  //   consle.log(element)
  // });
})

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })