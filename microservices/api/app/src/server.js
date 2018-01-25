var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
const Wit = require('node-wit').Wit;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
 res.send('Hello World - Go to /wit endpoint for help');
});

app.get('/wit', function(req, res) {
res.sendFile(path.join(__dirname +'/index.html'));
});



app.post('/wit',function(req,res){
//res.send('Your Question : '+req.body.Input);
var question=req.body.Input
const client = new Wit({accessToken: 'OMST7LGOVDCUU2IFQNWYNQCKKMSZBBD4'});
client.message(question, {})
.then((data) => {
console.log(JSON.stringify(data));
var med=''
var intent=''
intent=data.entities.intent[0].value;
if(intent =='findMedicine')
{
var condition=data.entities.condition[0].value;
switch(condition)
{
case 'fever' :
	med='Aspirin';break;
case 'dry cough' :
	med='Robitussin';break;
case 'headache' :
	med=' Acetaminophen';break;
case 'indigestion' :
	med='Antacids';break;
case 'cold' :
case 'cough' :
	med='Dextromethorphan';break;

case 'constipation':
	med='Laxatives';break;
default : med='not found. Try another query';
}
     var output="Suggested medicine for "+condition+" is "+med;
     res.send(output);
}
else
  console.log("Couldn't recognise your intent.Try another query.");
})
.catch(console.error);

});


var port=8080;
app.listen(port, function() { 
console.log('Listening for connections on port '+port+'!');
});