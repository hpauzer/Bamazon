var mysql = require("mysql");
var inquirer = require("inquirer");

var productArray = [];
var product;
var price;
var totalPrice;
var revStock;
var idSelectArray;
var idSelectTable;

var connection = mysql.createConnection({
    host: "localHost",
    port: 3030,
    user: "root",
    password: "",
    database: "bamazon"
});

var customerPrompt = [{
        type: "input",
        name: "idPurchase",
        message: "Enter the Item ID you'd like to purchase."
    },
    {
        type: "input",
        name: "unitsPurchase",
        message: "Enter desired quantity.",
    }
];

var stillShopping = [{
    type: "list",
    name: "continueShopping",
    message: "Are you ready to checkout?",
    choices: ["Yes", "No"],
}];