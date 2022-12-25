// require modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
//const { test } = require('./querys')

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
                message: "What is the name of the new department?",
                validate: DepartmentNameInput => {
                    if(DepartmentNameInput) {
                        return true
                    } else {
                        console.log("Please input a department name.")
                    }
                }
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
            name: "roleTitle",
            message: "What is the name of the new role?",
            validate: roleNameInput => {
                if(roleNameInput) {
                    return true
                } else {
                    console.log("Please input a name for this new role.")
                }
            }
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary for this position?",
            validate: roleSalaryInput => {
                if(roleSalaryInput) {
                    return true;
                } else {
                    console.log("Please enter a salary for this new role.")
                }
            }
        },
    ]).then(function(roleInput) {
        let roleTitle = roleInput.roleTitle
        let roleSalary = roleInput.roleSalary
        db.promise().query("SELECT name FROM department")
            .then(([row, fields]) => {
                return inquirer.prompt ({
                    type: "list",
                    name: "roleDepartment",
                    message: "What department will this role be in?",
                    choices: row.filter(r => !!r.name).map(r => r.name), // filter to get rid of the nulls and map
                    validate: roleDepartmentInput => {
                        if(roleDepartmentInput) {
                            return true;
                        } else {
                            console.log("Please input what department this new role belongs to.")
                        }
                    }
                })
              }).then(function(roleDep) {
                let roleDepName = roleDep.roleDepartment
                const bestRole = new NewRole (roleTitle, roleSalary, roleDepName)
                    db.query("INSERT INTO role (title, salary, department_id) VALUES (?)", , (err, res) => {
                        if(err) {
                            console.log(err)
                        } else {
                            console.log("New Role Created!")
                        }
                    })
              })
    })     
}
    // TODO: GET THIS DATA TO BE ABLE TO PUSH TO ROLE TABLE


//add employee questions
// const addEmployeeQuestions = () => {
    
//     return inquirer.prompt([
//         {
//             type: "input",
//             name: "employeeFirstName",
//             message: "What is the first name of the employee?",
//             validate: employeeFirstNameInput => {
//                 if(employeeFirstNameInput) {
//                     return true;
//                 } else {
//                     console.log("Please input the first name of the employee.")
//                 }
//             }
//         },
//         {
//             type: "input",
//             name: "employeeLastName",
//             message: "What is the the last name of the employee?",
//             validate: employeeLastNameInput => {
//                 if(employeeLastNameInput) {
//                     return true;
//                 } else {
//                     console.log("Please input the last name of the employee.")
//                 }
//             }
//         },
//         {
//             type: "list",
//             name: "employeeRole",
//             message: "What is the new employees role?",
//             choices: 
//         },
//         {
//             type: "list",
//             name: "employeeManager",
//             message: "Does this new employee have a manager?",
//             choices: 
//         }
//     ])
//     .then(function(employeeData) {
//         const {employeeFirstName, employeeLastName, EmployeeRoll, EmployeeManager} = employeeData
//         const newestEmployee = new NewEmployee (employeeFirstName, employeeLastName, EmployeeRoll, EmployeeManager)

//         db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)', employeeFirstName, employeeLastName, EmployeeRoll, EmployeeManager, (err, result) => {
//             if(err) {
//                 console.log(err);
//                 return startApp();
//             } else {
//                 console.log('New Employee Added!');
//                 return startApp();
//             }
//         })        
//     })
// }



// addRoleQuestions()


// start application
startApp()

module.exports = db