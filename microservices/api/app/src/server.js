var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Pool = require('pg').Pool;

var app = express();
const Wit = require('node-wit').Wit;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var config={
    
database : 'hasuradb',
user: 'admin',
host:  'postgres.beady27-hasura',

port: '5432',//5432
password: 'dujxara-bxuzesb-agippuh-odcuwo'
};

var pool=new Pool(config);

app.get('/test',function(req,res){
 

pool.query('SELECT * FROM drugs',function(err,result){
        
if(err){
            
res.status(500).send(err.toString());
       
 }
        
else{
            
res.send(JSON.stringify(result.rows));
        
}
});

});

app.get('/', function(req, res) {
 res.send('Hello World - Go to /wit endpoint for help');
});

app.get('/wit', function(req, res) {
res.sendFile(path.join(__dirname +'/index.html'));
});

app.post('/wit',function(req,res){
var question=req.body.Input
const client = new Wit({accessToken: 'OMST7LGOVDCUU2IFQNWYNQCKKMSZBBD4'});
client.message(question, {})
.then((data) => {
console.log(JSON.stringify(data));
var med=''
var condition=data.entities.condition[0].value;
var json=''
switch(condition)
{
case 'fever' :
	 json = '{"Response": "Suggested medicine for fever is Aspirin" }';break;
case 'dry cough' :
	json = '{"Response": "Suggested medicine for dry cough is Robitussin"}';break;
case 'headache' :
	json = '{"Response": "Suggested medicine for headache is Acetaminophen"}';break;
case 'indigestion' :
	json = '{"Response": "Suggested medicine for indigestion is Antacids"}';break;
case 'cold' :
case 'cough' :
	json = '{"Response": "Suggested medicine for cold and cough is Dextromethorphan"}';break;

case 'constipation':
	json = '{"Response": "Suggested medicine for constipation is Laxatives"}';break;
default : json='{"Response": "Unable to understand. Try another query"}';
}
     obj=JSON.parse(json);
     res.send(obj);
})
.catch(console.error);

});


var port=8080;
app.listen(port, function() { 
console.log('Listening for connections on port '+port+'!');
});