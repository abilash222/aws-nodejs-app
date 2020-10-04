Nodejs app for AWS automation
=================

## Requirements

* Node 8
* Git
 

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/abilash222/aws-nodejs-app.git
cd aws-nodejs-app
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
node app.js

## To get Region List

curl http://localhost:3000/regions

## To get the VPC list in a partiular region

curl http://localhost:3000/vpc?region=<region name>

## To get all subnet for a partiulcar VPC

curl http://localhost:3000/subnets?region=<regions name>&vpcId=<vpc id>