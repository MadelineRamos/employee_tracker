const { promt } = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: '',
        password: '7thPrestige',
        database: 'employees'
    },
    console.log('Connected to the employees_db database.')
);

