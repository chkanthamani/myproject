`use strict`
const Hapi=require('@hapi/hapi');
require("dotenv").config();
const MySQL=require('mysql')

  

const server = Hapi.Server({
    host: 'localhost',
    port: 8000
});

console.log("helloworld");
server.route({
    method: 'GET',
    path: '/api/producer/approvedbeat',
    handler: function (req, reply) {
     return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();

      connection.query(`select beat_name,approvaldate,postdatetime from beat where approved=1;`,
       function (error,producer,fields) {
        if(error) 
          rej(error);
        res(producer);   
    });
       connection.end();
  });
   }
   });

server.route({
    method: 'GET',
    path: '/api/producer/submitbeat',
    handler: function (req, reply) {
     return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();

connection.query(`select beat_name from beat where submitdate!=0;`,
       function (error,producer,fields) {
        if(error) 
          rej(error);
        res(producer);
      });
connection.end();
  });
   }
   });

server.route({
    method: 'GET',
    path: '/api/beat/submit',
    handler: function (req, reply) {
     return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();
connection.query(`select beat_name from beat where approved=0 and submitdate!=0;`,
       function (error,producer,fields) {
        if(error) 
         rej(error);
        res(producer);
      });
connection.end();
  });
   }
   });
server.route({
    method: 'GET',
    path: '/api/beat/approved/{sd}/{ld}',
    handler: function (req, reply) {
      var sd=req.params.sd;
      var ld=req.params.ld;
     return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();
connection.query(`select beat_name from beat where approvaldate between '${sd}' and '${ld}'`,
       function (error,producer,fields) {
        if(error) 
          rej(error);
        res(producer);
      });
connection.end();
  });
   }
   });
/*server.route({
    method: 'GET',
    path: '/api/beat/approved/{sd}/{ld}',
    handler: function (req, reply) {
      var sd=req.params.sd;
      var ld=req.params.ld;
     return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();
connection.query(`select beat_name from beat where approvaldate between '${sd}' and '${ld}'`,
       function (error,producer,fields) {
        if(error) 
          rej(error);
        res(producer);
      });
connection.end();
  });
   }
   });*/
server.route({
    method: 'GET',
    path: '/api/beat/pending',
    handler: function (req, reply) {
     return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();

      connection.query(`select beat_name from beat where approved=1 and approvaldate==0;`,
       function (error,producer,fields) {
        if(error) 
          rej(error)
        res(producer);   
    });
       connection.end();
  });
   }
   });

server.route({
    method: 'GET',
    path: '/api/beat/{id}',
    handler: function (req, reply) {
     return new Promise((res,rej)=>{
      id=req.params.id;
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();

      connection.query(`select * from beat where id='${id}')`,
       function (error,producer,fields) {
        if(error) 
          rej(error)
        res(producer);   
    });
       connection.end();
  });
   }
   });

server.route({
  method:'post',
  path:'/',
  handler:function(req,rep){
    var i=req.payload;
    if((i.name.length<32)&&(i.Email.includes("@gmail.com"))&&(i.Email.length<256)&&(i.twitter_name.length<16)&&(i.soundcloud_name.length<32)&&(i.name.includes('XxXxStr8FirexXxX')==false))
    {
      return new Promise((res,rej)=>{
      const connection = MySQL.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        database : process.env.DB_NAME
      });

      connection.connect();

        connection.query(`insert into producer(name,Email,password_hash,twitter_name,soundcloud_name,producer_status) values('${i.name}','${i.Email}','${i.password_hash}','${i.twitter_name}','${i.soundcloud_name}','${i.producer_status}')`,
        function (error, producer, fields) {
       res(producer);
      });
    connection.end();
        
      });
        }
  else
     return 'error';

}

  });

server.route({
  method:'post',
  path:'/beat',
  handler:function(req,rep){
    var i=req.payload;
    if(i.beat_name.length<64)
    {
      return new Promise((res,rej)=>{
      const connection = MySQL.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        database : process.env.DB_NAME
      });

      connection.connect();

        connection.query(`insert into beat(beat_name) values('${i.beat_name}')`,
        function (error, producer, fields) {
       res(producer);
      });
    connection.end();
        
      });
        }
  else
     return 'error';

}

  });

server.route({
  method:'put',
  path:'/{id}',
  handler:function(req,reply){
    var id=req.params.id;
    var i=req.payload;
    if((i.name.length<32)&&(i.Email.includes("@gmail.com"))&&(i.Email.length<256)&&(i.twitter_name.length<16)&&(i.soundcloud_name.length<32)&&(i.name.includes('XxXxStr8FirexXxX')==false))
    {
    return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();
connection.query(`update producer set name='${i.name}',Email='${i.Email}',password_hash='${i.password_hash}',twitter_name='${i.twitter_name}',soundcloud_name='${i.soundcloud_name}',producer_status='${i.producer_status}' where id=${id}`,
    function (error, producer, fields) {
              res(producer)  
          });
connection.end();
});
  }
  else
    return 'error';
}
});
//});
server.route({
    method: 'delete',
    path: '/{id}',
    handler: function (req, reply) {
      var id=req.params.id;
     return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();

       connection.query(`delete from producer where id=${id}`,
       function (error, producer, fields) {
       if (error) throw error;
        res(producer);
    });
       connection.end();
  });
   }
 });

server.route({
    method: 'delete',
    path: '/api/{id}',
    handler: function (req, reply) {
      var id=req.params.id;
     return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();

       connection.query(`update beat set submitdate=null where beat_id=${id}`,
       function (error, producer, fields) {
       if (error) throw error;
        res(producer);
    });
       connection.end();
  });
   }
 });

server.route({
  method:'put',
  path:'/api/beat/{id}',
  handler:function(req,reply){
    var id=req.params.id;
    var i=req.payload;
    if(beat_name.length<=64)
    {
    return new Promise((res,rej)=>{
    const connection = MySQL.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME
});
    connection.connect();
connection.query(`update beat set beat_name,beat_url,approved,submitdate,approvaldate,postdatetime where id=${id}`,
    function (error, producer, fields) {
              res(producer)  
          });
connection.end();
});
  }
  else
    return 'error';
}
});
  

 /*server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });*/
    
     server.start((error)=>{
     if (error) throw error;
 });
    console.log('Server started');


