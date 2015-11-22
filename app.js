var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	 res.sendFile(__dirname + '/index.html');
});
var id = 1;
io.on('connection', function(socket){
	var my_id = id ;
	io.emit('user connected', 'Anon#' + my_id + ' is connected')
	socket.on('chat message', function(msg){
		io.emit('chat message', my_id + ": " + msg);
	});
	id++;
});

	http.listen(port, function(){
	 	console.log('listening on ' + port);
});