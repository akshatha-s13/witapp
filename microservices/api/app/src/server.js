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

port: '5432',
password: 'dujxara-bxuzesb-agippuh-odcuwo'
};

app.get('/', function(req, res) {
 res.send('Hello World - Go to /wit endpoint for help');
});

app.get('/wit', function(req, res) {
res.sendFile(path.join(__dirname +'/index.html'));
});

app.post('/wit',function(req,res){
var question=req.body.Input;
const client = new Wit({accessToken: 'OMST7LGOVDCUU2IFQNWYNQCKKMSZBBD4'});
var pool=new Pool(config);


client.message(question, {})
.then((data) => {
console.log(JSON.stringify(data));

var intent=data.entities.intent[0].value;
switch(intent)
{
case 'findMedicine' :
var condition=data.entities.condition[0].value;
pool.query('SELECT * FROM medicines WHERE "condition"=$1',[condition],function(err,result){
        
if(err){
            
res.send(JSON.parse(JSON.stringify({"Response" : err.toString() })));    
 }
        
else{
            
res.send(JSON.parse(JSON.stringify({"Response" : result.rows[0].drug})));
}
});

break;

case 'findCondition' :
var drug=data.entities.drug[0].value;
pool.query('SELECT * FROM medicines WHERE "drug"=$1',[drug],function(err,result){
        
if(err){
            
res.send(JSON.parse(JSON.stringify({"Response" : err.toString() })));    
 }
        
else{
            
res.send(JSON.parse(JSON.stringify({"Response" : result.rows[0].condition })));
}
});

break;

default :  res.send(JSON.parse(JSON.stringify({"Response" : "Unable to find intent.Try another query"})));
}

})
.catch(console.error);
});

var port=8080;
app.listen(port, function() { 
console.log('Listening for connections on port '+port+'!');
});