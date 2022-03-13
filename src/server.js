const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

// serve files from the public directory
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/fetchCsv", (req, res)=>{
    const url = "https://og-production-open-data-chelseama-892364687672.s3.amazonaws.com/resources/130d7ba2-b6eb-438d-a412-741bde207e1c/covid19vaccinesbycounty.csv?Signature=nOQyn8kP98sJplaXqG5rqmWVjYM%3D&Expires=1647165647&AWSAccessKeyId=AKIAJJIENTAPKHZMIPXQ"
    var file = fs.createWriteStream("./covid19vaccinesbycounty.csv");
    var request = https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
        file.close();  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
    });
    res.end();
})

app.listen(3000);