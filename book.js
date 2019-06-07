'use strict';

const Hapi = require('@hapi/hapi');
	/*var books=[
    {
        id:1,
        title:"JS Fundamentals",
        author:"John"
    },
    {
        id:2,
        title:"Angular Fundamentals",
        author:"David"
    },
    {
        id:3,
        title:"HTML/CSS Basics",
        author:"John"
    }
]*/
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

   server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
    	return books;
}
});
    server.route({
    method: 'POST',
    path: '/',
    handler: function (request, h) {
        var newBook=request.payload;
        books.push(newBook);
        return books;
}});
    server.route({
    	method:'PUT',
    	path:'/{id}',
    	handler:function(request,h){
    		var id=request.params.id;
        var bookToBeupdated=books.filter((book)=>{
            return book.id==id
        })
        bookToBeupdated[0].title=request.payload.title;
        return bookToBeupdated;
    	}
    })

server.route({
    	method:'DELETE',
    	path:'/{id}',
    	handler:function(request,h){
    		var id=request.params.id;
        var bookToBeupdated=books.filter((book)=>{
            return book.id!=id
        })
       
        return bookToBeupdated;
    	}
    })

     await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();