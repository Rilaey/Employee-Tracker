const db = require('./index')

test = () => {
    return new Promise((resolve, reject) => {
        let answer = "SELECT * FROM department"
        const firstQuery = db.query(answer, (err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
                return firstQuery
            }
        })
    })
}

module.exports = {
    test
}





//  function viewEmployeesByDepartment() {
//   db.findAllDepartments()
//   .then(([rows]) => {
//     let departments = rows;
//     const departmentChoices = departments.map(({ id, name }) => ({
//       name: name,
//       value: id
//     }));

//     inquirer.prompt([
//       {
//         type: "list",
//         name: "departmentId",
//         message: "Which department would you like to see employees for?",
//         choices: departmentChoices
//       }
//     ])
//       .then(res => db.findAllEmployeesByDepartment(res.departmentId))
//       .then(([rows]) => {
//         let employees = rows;
//         console.log("\n");
//         console.table(employees);
//       })
//       .then(() => loadMainPrompts())
//   });
// }
