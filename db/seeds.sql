-- insert values into the department table
INSERT INTO department (name)
VALUES  
("Marketing"),
("Accounting"),
("Customer Service"),
("Tech Support"),
("HR"),
("Management");

-- insert values into the role table
INSERT INTO role (title, salary, department_id)
VALUES
("Marketing Employee", 75000, 1),
("Accounting Employee", 90000, 2),
("Customer Service Employee", 60000, 3),
("Tech Support Employee", 82000, 4),
("HR Employee", 71000, 5),
("Management Employee", 97000, 6);

-- insert values into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Riley", "Newhart", 2, 6),
("Tom", "Zoo", 1, 6),
("Chris", "Rock", 5, 6),
("Owen", "Tomland", 4, 6),
("Shelly", "Babble", 3, 6),
("Bill", "Gates", 6, NULL);
