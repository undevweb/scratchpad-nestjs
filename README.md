### create the database

postgres=# create database tradyourself;
CREATE DATABASE
postgres=# create user traduser with encrypted password 'trad';
CREATE ROLE
postgres=# grant all privileges on database tradyourself to traduser;
