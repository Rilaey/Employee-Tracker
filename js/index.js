// require modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// import class files
const NewEmployee = require('./newEmployee');
const NewRole = require('./newRole');
const NewDepartment = require('./newDepartment');

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
                    console.table(results);
                    return startApp();
                });
            } else if(data.first == "View All Departments") {
                // Query department table
                db.query('SELECT * FROM department', function (err, results) {
                    console.table(results);
                    return startApp();
                });
            } else if(data.first == "View All Roles") {
                // Query role table
                db.query('SELECT * FROM role', function (err, results) {
                    console.table(results);
                    return startApp();
                });
            } else if(data.first == "Add Department") {
                addDepartmentQuestions();
            } else if(data.first == "Add Employee") {
                addEmployeeQuestions();
            } else if(data.first == "Add Role") {
                addRoleQuestions();
            } else if(data.first == "Quit") {
                process.exit(console.log("Goodbye!"))
            }
        })
}

// add department questions
const addDepartmentQuestions = () => {
    return inquirer.prompt
        ([
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the new department?"
            }
        ])
        .then(function(department) {
            const bestDepartment = new NewDepartment (department.departmentName)
            const name = bestDepartment.name
            // query new department name into table
            db.query('INSERT INTO department (name) VALUES (?)', name, (err, result) => {
                if(err) {
                    console.log(err);
                    return startApp();
                } else {
                    console.log('New Department Added!');
                    return startApp();
                }
            })
        })
}

// add role questions
const addRoleQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the new role?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary for this position?"
        },
        {
            type: "list",
            name: "roleDepartment",
            message: "What department will this role be in?",
            choices: 
        }
    ])
    .then(function(roleData) {
        const {roleName, roleSalary, roleDepartment} = roleData;
        const newestRole = new NewRole (roleName, roleSalary, roleDepartment)

        db.query('INSERT INTO role (title, salary, department_id) VALUES (?)', roleName, roleSalary, roleDepartment,(err, result) => {
            if(err) {
                console.log(err);
                return startApp();
            } else {
                console.log('New Role Added!');
                return startApp();
            }
        }) 
    })
}

// add employee questions
const addEmployeeQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "What is the first name of the employee?"
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "What is the the last name of the employee?"
        },
        {
            type: "list",
            name: "employeeRole",
            message: "What is the new employees role?",
            choices: 
        },
        {
            type: "list",
            name: "employeeManager",
            message: "Does this new employee have a manager?",
            choices: 
        }
    ])
    .then(function(employeeData) {
        const {employeeFirstName, employeeLastName, EmployeeRoll, EmployeeManager} = employeeData
        const newestEmployee = new NewEmployee (employeeFirstName, employeeLastName, EmployeeRoll, EmployeeManager)

        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)', employeeFirstName, employeeLastName, EmployeeRoll, EmployeeManager, (err, result) => {
            if(err) {
                console.log(err);
                return startApp();
            } else {
                console.log('New Employee Added!');
                return startApp();
            }
        })        
    })
}



// addRoleQuestions()


// start application
startApp()