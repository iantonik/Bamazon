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

var superAction = function(){
    inquirer
    .prompt(
        {
            type: "list",
            name: "action",
            message: "Choose Action:",
            choices: ["View Product Sales by Department","Create New Department"]
        }
    ).then(answer => {
        switch (answer.action) {
            case "View Product Sales by Department":
                viewProductsSales();
                break;
            case "Create New Department":
                createNewDept();
                break;
        }
    });
}

var viewProductsSales = function(){
    connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS product_sales, sum(p.product_sales) - d.over_head_costs as total_profit FROM departments d JOIN products p ON d.department_name = p.department_name GROUP BY department_id;", function (err, res) {
        if (err) throw err;
        console.table(res)
        connection.end();
    });

}

var createNewDept = function(){
    inquirer
    .prompt([
        {
            name: "deptName",
            message: "Department Name: "
        },
        {
            name: "overhead",
            message: "Overhead Cost: "
        }
    ]).then(answers => {
        addDept(answers.deptName, answers.overhead);
    });
}
var addDept = function(dept, cost){
    var query = 'INSERT INTO departments (department_name, over_head_costs) VALUES (?,?);'
    connection.query(query, [dept, cost], function (err, res) {
        if (err) throw err;
        console.log("New Department has been added. ");
    });
    connection.end();

}

superAction();


