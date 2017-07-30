var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var PORT = process.env.PORT || 4998;
var resJson = {};

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('TimeStamp API Root');
});

app.get('/:time', function (req, res) {
    var urlParam = req.params.time;
    if (moment(urlParam, "MMMM D, YYYY", true).isValid()){
        resJson.unix = moment(urlParam).unix();
        resJson.natural = urlParam;
    } else if ((urlParam > 0) && (urlParam < 2147483647)) {
        resJson.unix = parseInt(urlParam);
        resJson.natural = moment.unix(urlParam).format('LL')
    } else {
        resJson.unix = null;
        resJson.natural = null;
    }
    res.status(200).json(resJson);
});

app.listen(PORT);
