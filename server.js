let db = {
    "dani": 10,
    "nico": 10
}

console.log("server is up and running");

let express = require("express");
let app = express();

let server = app.listen(3000, () => {
    console.log('we out heree');
});

// this allows me to have express look into a folder 'public' and retrieve static files (html, imgs)
app.use(express.static("public"));

app.get('/tuits', sendTuits);

app.get('/tuits/:author/:msg', writeTuits);

function writeTuits(request, response) {
    let auth = request.params.author;
    let message = request.params.msg;
    db[auth] = message;

    let reply = {
        rep: "thank you for your input."
    }

    response.send(reply);
}

function sendTuits(request, response) {
    response.send(db);

}