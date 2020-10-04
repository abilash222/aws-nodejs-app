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
## AWS credential file
Place you aws credential file in user home directory as mentioned in below url
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html

## Steps for running the app

To start the express server, run the following

```bash
node app.js
```
## To get a list of all available AWS regions

curl http://localhost:3000/regions

## To get a list of all VPCs within a specific region

curl http://localhost:3000/vpc?region='<region name>'

## To get a list of all Subnets within a specific VPC

curl http://localhost:3000/subnets?region='<regions name>'&vpcId='<vpc id>'
