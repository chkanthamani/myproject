`use strict`
const Hapi=require('@hapi/hapi');
require("dotenv").config();
const MySQL=require('mysql')
// Create a server with a host and port
const server = new Hapi.Server();
 
const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     database: 'project'
});
 
server.connection({
    host: 'localhost',
    port: 8000
});
 
connection.connect();

server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
       connection.query('SELECT user_id, username, email FROM users',
       function (error, results, fields) {
       if (error) throw error;

       reply(results);
    });
  }
});

server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
       connection.query('SELECT *from producer',
       function (error, results, fields) {
       if (error) throw error;
 
       reply(results);
    });
  }
});
server.start((error)=>{
     if (error) throw error;
 });
    console.log('Server started');
