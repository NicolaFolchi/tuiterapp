let fs = require("fs");
let binData = fs.readFileSync("data.js");
let db = JSON.parse(binData);

console.log(db);

console.log("server is up and running");

let express = require("express");
// used to parse the request body
let bodyParser = require("body-parser");
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
    fs.writeFile("data.js", data);
    response.send(reply);
}

app.post('/add', makePost);

function makePost(request, response){
    console.log(request.body);
}

function sendTuits(request, response) {
    response.send(db);

}