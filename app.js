var port = process.env.PORT || 8080;
var restify = require('restify');
const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const json2csv = require('json2csv');
var Dropbox = require('dropbox');
const convertToCsv = require('./convertToArray.js')
var dbx = new Dropbox({ accessToken: 'lG--VGb_TW0AAAAAAAABBBgDv3Dh-uPN7pRc0uAHTPqW2Gw4XtP4-TM5KCkjlj7F'});
app.use(cors());
app.use(restify.fullResponse());
app.use(bodyParser.urlencoded({ extended: false }))


// app.post('/sendData', function (req, res) {
//   // var result = json2csv({ data: req.body, fields: fields })
//   // console.log(req.body)
//   const contacts = JSON.parse(Object.keys(req.body)[0])
//   jsonexport(contacts,function(err, csv){
//     if(err) return console.log(err);
//     var filename = 'responses.csv'
//     var contents = csv

//     dbx.filesUpload({ path: '/' + filename, contents: contents, mode: 'overwrite' })
//         .then(function(response) {
//             res.send("done")
//         })
//         .catch(function(error) {
//             res.send(error)
//         });
//     });
//   // req.body.forEach(function(element) {
//   //   consle.log(element)
//   // });
// })

app.post('/sendData', function (req, res) {
  const contacts = JSON.parse(Object.keys(req.body)[0])
  // console.log("here : ",csvData)
  const filename = 'responses.csv'
  const csvData = convertToCsv(contacts)
  dbx.filesUpload({ path: '/' + filename, contents: csvData, mode: 'overwrite' })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.error(error);
        });
  // jsonexport(contacts,function(err, csv){
  //   if(err) return console.log(err);
  //   var filename = 'responses.csv'
  //   var contents = csv
  //   console.log(csv)
  //   dbx.filesUpload({ path: '/' + filename, contents: contents, mode: 'overwrite' })
  //       .then(function(response) {
  //           console.log(response);
  //       })
  //       .catch(function(error) {
  //           console.error(error);
  //       });
  //   });
  // req.body.forEach(function(element) {
  //   consle.log(element)
  // });
})

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});