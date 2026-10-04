-- one to one 
create table users (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(255) NOT NULL,
    created_at timestamp
);

create table profiles (
    id serial PRIMARY KEY,
    user_id int unique,
    bio text,
    foreign key (user_id) references users(id)
);

insert into profiles (user_id, bio) values (4, 'loves coding!')

select users.name, profiles.bio
from users
join profiles on users.id = profiles.user_id

--one to many
create table authors (
    id serial primary key,
    name varchar(100)
);

create table books (
    id serial primary key,
    title varchar(100),
    author_id int,
    foreign key (author_id) references authors(id)
);

insert into authors (name) values ('Yuval Noah Harari');

insert into books (title, author_id) 
values 
    ('A Brief History of Humankind', 1),
    ('A Brief History of Tomorrow', 1);

select authors.name, books.title
from authors
join books on authors.id = books.author_id


INSERT INTO student_courses (student_id, course_id) VALUES (1, 1);
-- ERROR:  duplicate key value violates unique constraint "student_courses_pkey"
-- Key (student_id, course_id)=(1, 1) already exists. 
-- Why: the value is unique, can't allow the same pair twice.

--many to many
create table students (
id serial primary key,
name varchar (100)
);

create table courses (
id serial primary key,
title varchar(100)
);

create table student_courses (
student_id int,
course_id int,
PRIMARY KEY (student_id, course_id),
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (course_id) REFERENCES courses(id)
);

insert into students (name) values ('Tom'), ('Sara');
insert into courses (title) values ('math'), ('art');
insert into student_courses (student_id, course_id) values (1,1), (1,2), (2,1);

select students.name, courses.title
from students
join student_courses on students.id = student_courses.student_id
join courses on courses.id = student_courses.course_id