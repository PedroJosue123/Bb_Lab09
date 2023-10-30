var express = require('express');
var app = express();
app.get('/', f_inicio);
app.get('/login', f_login);
function f_inicio(req, res) {
    res.send('Hola INDEX');
}
function f_login(req, res) {
    res.send('Login3');
}
function f_server() {
    port = server.address().port;
    console.log('Port: ', port);
}
var server = app.listen(3000, f_server);