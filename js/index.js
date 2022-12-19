// require modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// inquirer start questions
const startApp = () => {
    return inquirer.prompt
        ([
           {
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Roll", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
           }
        ])
}

startApp()