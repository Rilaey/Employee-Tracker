// require modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Zookie99!',
      database: 'company_db'
    },
    console.log(`Connected to the Company_DB.`)
  );

// inquirer start questions
const startApp = () => {
    return inquirer.prompt
        ([
           {
            type: "list",
            name: "first",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Roll", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
           }
        ])
        .then(function(data) {
            if(data.first == "View All Employees") {
                // Query employees table
                db.query('SELECT * FROM employee', function (err, results) {
                    console.log(results);
                    return startApp();
                });
            } else if(data.first == "View All Departments") {
                // Query department table
                db.query('SELECT * FROM department', function (err, results) {
                    console.log(results);
                    return startApp();
                });
            } else if(data.first == "View All Roles") {
                // Query role table
                db.query('SELECT * FROM role', function (err, results) {
                    console.log(results);
                    return startApp();
                });
            }
        })
}

startApp()