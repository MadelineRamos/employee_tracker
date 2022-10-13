use employees;

INSERT INTO department
    (name),
VALUES
    ('sales'),
    ('IT'),
    ('Legal'),
    ('Engineering'),
    ('Finance');

INSERT INTO role
    (title, salary, department_id),
VALUES
    ('Sales Lead', 75000, 1),
    ('IT Support', 1000000, 2),
    ('Lawyer', 30000, 3 ),
    ('Engineer', 150000, 4),
    ('Accountant', 51000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id),
VALUES
    ('Madeline', 'Ramos', 1, NULL),
    ('Jordan', 'Cooper', 2, NULL),
    ('Codi', 'Jordan', 1, 1);
