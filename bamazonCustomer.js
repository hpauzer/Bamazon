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
idSelectTable = parseInt(answers.idPurchase);
qtyPurchased = parseInt(answers.unitsPurchase);

var cart = [{
    ID: results[idSelectArray].id,
    Product: results[idSelectArray].product_name,
    Department: results[idSelectArray].department_name,
    Price: results[idSelectArray].price,
    Stock: results[idSelectArray].stock_quantity
}];

revStock = parseInt(results[idSelectArray].stock_quantity - qtyPurchased);

price = parseFloat(results[idSelectArray].price);
product = results[idSelectArray].product_name;


if (parseInt(results[idSelectArray].stock_quantity) >= parseInt(qtyPurchased)) {

    console.log("Item in stock.")

    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: revStock }, { id: idSelectTable }], function(err, results) {

        if (err) throw err;


        totalPrice = parseFloat(price * parseInt(qtyPurchased));

        console.log("Your order has been placed.");
        console.log("The total cost for " + product + " is: $" + totalPrice);
        productArray = [];

        connection.query("SELECT * FROM products", function(error, results) {
            if (error) throw error;
            console.log("Bamazon Best Sellers: ");

            for (var i = 0; i < results.length; i++) {
                productArray.push({
                    ID: results[i].id,
                    Product: results[i].product_name,
                    Department: results[i].department_name,
                    Price: results[i].price,
                    Stock: results[i].stock_quantity
                });
            }

            console.table(productArray);
            console.log("----------------------------");
            stillShopping();

        });

    });

} else {
    console.log("Out of stock");
    stillShopping();

}
});

});

}

function stillShopping() {
    inquirer.prompt(anotherOrder).then(function(answers) {

        if (answers.purchase_again === true) {
            productArray = [];
            selectProducts();
        } else {
            connection.end();
        }
    });
};