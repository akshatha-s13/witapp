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
	host:  'localhost',//postgres.beady27-hasura',

	port: '6432',//5432
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

	var json="";
	client.message(question, {})
	.then((data) => {
	console.log(JSON.stringify(data));
	try{
		var intent=data.entities.intent[0].value;
		console.log("User Intent : "+intent);
		switch(intent)
		{
		case 'findMedicine' :
			try{
				var condition=data.entities.condition[0].value;
				pool.query('SELECT * FROM medicines WHERE "condition"=$1',[condition],function(err,result){
        
				if(err){
  
					json=err.toString();          
					res.send(JSON.parse(JSON.stringify({"Response" : json })));    
					}
        
				else{
     
					if(result.rows.length==0){
						json="Unable to find medicines";
   						res.send(JSON.parse(JSON.stringify({"Response" : json}))); 
  						}
					else{
						json=result.rows[0].drug;
   						res.send(JSON.parse(JSON.stringify({"Response" : json})));
   					    }
				     }
				});

			   }catch(Error){
					json="Medical Condition unrecognised";
					res.send(JSON.parse(JSON.stringify({"Response" : json}))); 
					}//try-catch condition
	  		break;

		case 'findCondition' :
			try{
				var drug=data.entities.drug[0].value;
				pool.query('SELECT * FROM medicines WHERE "drug"=$1',[drug],function(err,result){
        
				if(err){
   
					json=err.toString();         
					res.send(JSON.parse(JSON.stringify({"Response" : json })));    
 					}
        
				else{
            
					if(result.rows.length==0){
						json= "Unable to recognise medical condition";
   						res.send(JSON.parse(JSON.stringify({"Response" : json}))); 
						}
					else{ 
						json= result.rows[0].condition;
   						res.send(JSON.parse(JSON.stringify({"Response" : json })));
		        	    		}
				    }
				});

			   }catch(Error){
					json="Drug unrecognised";
					res.send(JSON.parse(JSON.stringify({"Response" : json}))); break;
					}//try-catch drug
			break;

		case "greeting" :  
			json="Hey! How can I help you?";
			res.send(JSON.parse(JSON.stringify({"Response" : json}))); 
			break;

		case "bye" : 
			json="Thanks for using Health Assistant bot! Take Care! Bye!";
			res.send(JSON.parse(JSON.stringify({"Response" : json}))); 
			break;

		default :  
			json="Unable to find intent.Try another query";
			res.send(JSON.parse(JSON.stringify({"Response" : json})));

		}//switch
	}catch(Error){
		json="Intent unrecognised";
		res.send(JSON.parse(JSON.stringify({"Response" : json}))); 
		};//try-catch intent
	})
	.catch(console.error);

});//app.post

var port=8080;
app.listen(port, function() { 
	console.log('Listening for connections on port '+port+'!');
});