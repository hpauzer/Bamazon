var mysql = require("mysql");
var inquirer = require("inquirer");

var productArray = [];
var product;
var price;
var totalPrice;
var qtyPurchased;
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

connection.connect(function(error) {
    if (error) throw error;
    selectProducts();
})

function selectProducts() {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.log("Bamazon Best Sellers: ");

        for (var i = 0; i < results.length; i++) {
            productArray.push({
                ID: results[i].item_id,
                Product: results[i].product_name,
                Department: results[i].department_name,
                Price: results[i].price,
                Stock: results[i].stock_quantity
            });
        }
    })
}
console.table(productArray);
console.log("------------------------");

inquirer.prompt(customerPrompt).then(function(answers) {
    idSelectArray = parseInt(answers.idPurchase - 1);
    idSelectedTable = parseInt(answers.idPurchase);
    qtyPurchased = parseInt(answers.unitsPurchase);


})