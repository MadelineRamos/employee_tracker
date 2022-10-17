const { prompt, default: inquirer } = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '7thPrestige',
        database: 'employees'
    },
    console.log('Connected to the employees_db database.')
).promise();

const viewEmployees = async () => {
    const [employeeData] = await db.query(`SELECT * FROM employee`);
    console.table(employeeData);
    mainMenu();
};

const viewDepartments = async () => {
    const [departmentData] = await db.query('SELECT * FROM department');
    console.table(departmentData);
    mainMenu();
};

const viewRoles = async () => {
    const [roleData] = await db.query('SELECT * FROM role');
    console.table(roleData);
    mainMenu();
};

const addEmployee = async () => {
    await prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'first_name'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'last_name'
        },
        {
            type: 'rawlist',
            message: "What is their role?",
            name: 'role',
            choices: ['Craftsmen', 'Commercial Design', '3D Modeling', 'Prototyping' ,'Urban Planner']
        }

    ]).then(function (answers) {
        switch (answers.role) {
            case 'Craftsmen':
                answers.role = 1;
                break;
            case 'Commercial Design':
                answers.role = 2;
                break;
            case '3D Modeling':
                answers.role = 3;
                break;
            case 'Prototyping':
                answers.role = 4;
                break;
            case 'Urban Planner':
                answers.role = 5;
                break;
        };

        db.query(`INSERT INTO employee SET ?` , {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role,
        })
        console.log('--- Employee Added ---');
        mainMenu();
    });
};

const addDepartment = async () => {
    await prompt([
        {
            type: 'input',
            message: "What is the name of the department?",
            name: 'department_name'
        }

    ]).then(function (answers) {
        db.query(`INSERT INTO department SET ?` , {
            department_name: answers.department_name,
        });

        console.log('--- Department Added ---');
        mainMenu();
    });
};

const addRole = async () => {
    await prompt([
      {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'role',
      },
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
      },
      {
        type: 'list',
        message: 'What department will they be in?',
        name: 'role_department',
        choices: ['Furniture Designer', 'Interior Designer', 'Industrial Designer', 'UX Designer' ,'Architect'],
      }

    ]).then(function (answers) {
      db.query(`INSERT INTO role SET ?`, {
        title: answers.role,
        salary: answers.salary,
        department_id: answers.role_department,
      });

        console.log('--- Department Added ---');
        mainMenu();
    });
  };

const updateEmployee = async () => {
    await prompt([
        {
            type: 'list',
            message: "Who would you like to update?",
            name: 'employee_name',
        },
        {
            type: 'list',
            message: "What role would you like to update them to?",
            name: 'employee_role',
            choices: formattedRole,
        }
    ]).then(function (answers){
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [
            answers.employee_role,
            answers.employee_name,
        ]);
    });
        console.log ('--- Employee Updated ---');
        mainMenu();
};

const mainMenu = async () => {
    const { choice } = await prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE'
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add a Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add a Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Exit',
                    value: 'EXIT'
                }
            ]
        }
    ]);

switch (choice) {
    case 'VIEW_EMPLOYEES':
        viewEmployees();
        break;
    case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;
    case 'VIEW_ROLES':
        viewRoles();
        break;
    case "ADD_EMPLOYEE":
      addEmployee();
      break;
    case "UPDATE_EMPLOYEE":
      updateEmployee();
      break;
    case "ADD_DEPARTMENT":
      addDepartment();
      break;
    case "ADD_ROLE":
      addRole();
    case 'EXIT':
        process.exit();
        break;
    default:
        process.exit();
};




}

mainMenu();
