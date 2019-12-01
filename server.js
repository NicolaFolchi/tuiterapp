let fs = require("fs");
let binData = fs.readFileSync("data.js");
let db = JSON.parse(binData);

console.log(db);

console.log("server is up and running");

let express = require("express");
// used to parse the request body
let bodyParser = require("body-parser");
// used for the creation of unique id's for tuiter posts
const shortid = require('shortid');
let app = express();

let server = app.listen(3000, () => {
    console.log('we out heree');
});

// this allows me to have express look into a folder 'public' and retrieve static files (html, imgs)
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/tuits', sendTuits);

app.get('/tuits/:author/:msg', writeTuits);

function writeTuits(request, response) {
    let auth = request.params.author;
    let message = request.params.msg;
    db[auth] = message;

    let reply = {
        rep: "thank you for your input."
    }
    let data = JSON.stringify(db, null, 2);
    fs.writeFile("data.js", data, function (err, result) {
        if (err) console.log('error', err);
    });
    response.send(reply);
}

app.post('/tuits', makePost);

function makePost(request, response) {
    let reply = {
        status: 'success',
        tuitData: request.body
    };

    // adding needed properties to my tuits
    request.body['id'] = shortid.generate();
    request.body['isLiked'] = false;
    request.body['retweetCount'] = 0;
    request.body['replyCount'] = 0;
    request.body['likeCount'] = 0;
    request.body['someLikes'] = 0;
    request.body['createdAt'] = (new Date());
    
    console.log(db[1]);

    // CHECK FOR TYPE OF POST, IF RETWEET THEN INCREASE PARENT RETWEET COUNT
    if (request.body['type'] == 'retweet'){
        db[request.body['parent']]['retweetCount'] += 1;
    }
    if (request.body['type'] == 'reply'){
        db[request.body['parent']]['replyCount'] += 1;
    }
    // adding as first element to json file
    db.unshift(request.body);
    let data = JSON.stringify(db, null, 2);
    fs.writeFile("data.js", data, function (err, result) {
        if (err) console.log('error', err);
    });

    console.log(reply);
    response.send(reply);
}

function sendTuits(request, response) {
    response.send(db);

}