var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

var productList = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(product => {
            var price = parseFloat(Math.round(product.price * 100) / 100).toFixed(2);
            console.log("Product Id: " + product.items_id + "\nProduct Name: " + product.product_name + "\nPrice: $" + price + "\n");

        });


        customerPurchase();
    })
}

var customerPurchase = function () {
    inquirer
        .prompt([
            {
                name: "productID",
                type: "number",
                message: "What would you like to purchase today? Please enter product ID:",
                validate: function (value) {
                    if (isNaN(value)) {
                        return "Please enter a valid product ID";
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "quantity",
                type: "number",
                message: "Quantity: ",
                validate: function (value) {
                    if (isNaN(value)) {
                        return "Invalid Entry.";
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (customerAnswer) {
            completePurchase(customerAnswer.productID, customerAnswer.quantity);
        });
}


var completePurchase = function (prodID, qty) {
    var query = 'SELECT items_id, product_name, price, stock_quantity FROM products WHERE items_id=?';
    connection.query(query, [prodID], function (err, res) {
        if (err) throw err;
        if (qty > res[0].stock_quantity) {
            console.log("Insufficient quantity in stock!");
            connection.end();
        } else {
            var totalPrice = parseFloat(Math.round((qty * res[0].price) * 100) / 100).toFixed(2);
            console.log("Thank you for your purchase.\n" + "Product: " + res[0].product_name + "\nQuantity: " + qty + "\nTotal Price: $" + totalPrice)
            updateInventory(prodID,totalPrice, qty)
        }
    });
}

var updateInventory = function (prodID, price, qty) {
    var query = 'UPDATE products SET stock_quantity = (stock_quantity - ?), product_sales = (product_sales + ?) WHERE items_id=?';
    connection.query(query, [qty, price, prodID], function (err, res) {
        if (err) throw err;
        connection.end();
    })
}

productList();