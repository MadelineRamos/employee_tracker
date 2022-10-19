use employees;

INSERT INTO department
    (department_name)
VALUES
    ('Furniture Designer'),
    ('Interior Designer'),
    ('Industrial Designer'),
    ('UX Designer'),
    ('Architect');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Craftsmen', 65000, 1),
    ('Commercial Design', 55000, 2),
    ('3D Modeling', 60000, 3),
    ('Prototyping', 97000, 4),
    ('Urban Planner', 75000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Clyde', 'Fields', 1, NULL),
    ('Kaya', 'McKee', 2, NULL),
    ('Jordan', 'Higgs', 3, 3),
    ('Conrad', 'Taylor', 4, NULL),
    ('Emma', 'Graham', 5, 5),
    ('Indy', 'Scott', 1, NULL);
