import express from "express";
let server = express();

let port: number = 8080;

server.get("/", function(req, res){
    res.send("Running solar webServer");
})

server.listen(port, () => console.log(`Running on port ${port}`));