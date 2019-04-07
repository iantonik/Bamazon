var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) throw err;
})


var managerAction = function () {
    inquirer
        .prompt(
            {
                type: "list",
                name: "action",
                message: "Choose Action:",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            },
        ).then(answer => {
            console.log(answer.action)

            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
            }
        });
}



var viewProducts = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(product => {
            var price = parseFloat(Math.round(product.price * 100) / 100).toFixed(2);
            console.log("Product Id: " + product.items_id + "\nProduct Name: " + product.product_name + "\nDepartment: " + product.department_name + "\nPrice: $" + price + "\nStock Quantity: " + product.stock_quantity + "\n");

        });
        connection.end();
    })
}

var viewLowInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        res.forEach(product => {
            var price = parseFloat(Math.round(product.price * 100) / 100).toFixed(2);
            console.log("Product Id: " + product.items_id + "\nProduct Name: " + product.product_name + "\nDepartment: " + product.department_name + "\nPrice: $" + price + "\nStock Quantity: " + product.stock_quantity + "\n");

        });
        connection.end();
    });
}

var addToInventory = function () {
    inquirer
        .prompt([
            {
                name: "prodID",
                message: "Product ID: "
            },
            {
                name: "qty",
                message: "Quantity: "
            }
        ]).then(answers => {
            updateInventory(answers.qty, answers.prodID);
        });
}


var updateInventory = function (qty, prodID) {
    var query = 'UPDATE products SET stock_quantity = (stock_quantity + ?) WHERE items_id=?';
    connection.query(query, [qty, prodID], function (err, res) {
        if (err) throw err;
        console.log("Inventory for Product ID: " + prodID + " has been updated.");
    });
    connection.end();
}

var addNewProduct = function () {
    inquirer
        .prompt([
            {
                name: "product_name",
                message: "Product Name: "
            },
            {
                name: "dept_name",
                message: "Department: "
            },
            {
                name: "price",
                message: "Price of the Product: "
            },
            {
                name: "stock_qty",
                message: "Quantity in Stock: "
            },
        ]).then(answers => {
            // console.log(answers);
            var query = 'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?) ';
            connection.query(query,[answers.product_name, answers.dept_name, answers.price, answers.stock_qty], function (err, res) {
                if (err) throw err;
                console.log("New product has been added.");
            });
            connection.end();

        })
}



managerAction();