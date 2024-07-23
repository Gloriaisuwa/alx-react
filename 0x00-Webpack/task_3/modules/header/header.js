import "./header.css";
const $ = require("jquery");

console.log("Init footer");

$("body").append("<header></header>");
$("header").append('<div id="logo"></div>', "<h1>Holberton Dashboard</h1>");
