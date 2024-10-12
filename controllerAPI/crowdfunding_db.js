/**
 * My backend server
 */
var express = require('express');
var cors = require('cors');//Import cors
var app = express();//Creates an Express application object

// 用于解析 JSON 格式的请求体
app.use(express.json());

app.use(cors()); // Allow requests from all sources
var fundraisersAPI = require("./API-controller");//An external module API-controller is introduced. It references the API-controller.js file located in the API-controller folder
app.use("/api", fundraisersAPI);
app.listen(3060);//Use port 3060
console.log("Server up and running on port 3060");