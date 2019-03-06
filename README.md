# witapp : health-assistant-bot

## What is it?
This project was done as a part of hpdf. It is a custom service that integrates with wit.ai API and implements the features described below.

Entities used :

Intent -  it extracts user intent from his query                

Condition - it extracts the medical condition such as fever,cold,malaria etc. 

Drug - it extracts the name of drug mentioned in user query such as aspirin,tetracyclines,etc.

## How it works?

When the user sends a message, intent behind the text is extracted, analysed and the appropriate response is displayed. 
    Intent			Response
1. findMedicine - It fetches drug for value of condition entity
2. findCondition - It fetches medical condition for value of drug entity
3. greeting
4. bye

## What does it use?
Hasura
Wit.ai API

## How do I use it in my workspace?
You can also clone and deploy from this link
https://hasura.io/hub/project/akshu/health-assistant

Install hasura CLI

1) Run the quickstart command
$ hasura quickstart akshu/health-assistant

2) Git add, commit & push to deploy to your cluster
$ cd health-assistant
$ git add . && git commit -m "First commit"
$ git push hasura master

Run hasura cluster status to find your cluster name.

It is all set. You can check the translation functionality in action in your workspace.

## How to build on top of this?
This service is written in javascript using nodejs-express framework. The source code lies in microservices/api/app/src directory. server.js is where you want to start modifying the code.

If you are using any extra packages, just add them to microservices/api/app/src/package.json and they will be 'npm installed' during the Docker build.

You can find the entire project with frontend at this link.
https://platform.hasura.io/hub/projects/Raphael/HealthAssistant

## Support
If you find a bug, you can raise an issue here.
