var express = require('express');

const app = express();
var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});


function loadRegions(regionList,callback) {

    var ec2 = new AWS.EC2();
    var params = {};

    ec2.describeRegions(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else
            data.Regions.forEach(function(list) {
                regionList.push(list.RegionName);
            });
        callback()
    });

}
function loadVpc(region,vpcList,callback) {

    AWS.config.update({region: region});
    var ec2 = new AWS.EC2();
    var params = {
    };

    ec2.describeVpcs(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else
            data.Vpcs.forEach(function(list) {
                vpcList.push(list.VpcId);
            });
        callback()
    });

}

function loadSubnet(region,vpcId,subnetList,callback) {
    var ec2 = new AWS.EC2();
    AWS.config.update({region: region});
    var params = {
        Filters: [
            {
                Name: "vpc-id",
                Values: [
                    vpcId
                ]
            }
        ]
    };

    ec2.describeSubnets(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else
            data.Subnets.forEach(function(list) {
                subnetList.push(list.SubnetId);
            });
        callback()
    });

}

app.get('/regions', (req, res) => {
    let regionList = new Array();

    function sendResponse() {
        return res.send(regionList)
    }

    loadRegions(regionList,sendResponse)

});


app.get('/vpc', (req, res) => {
    let vpcList = new Array();
    let region = req.query.region
    function sendResponse() {
        let vpcName = vpcList
        return res.send(vpcList)
    }

    loadVpc(region,vpcList,sendResponse)

});

app.get('/subnets', (req, res) => {
    let subnetList = new Array();
    let vpcId = req.query.vpcId
    let region = req.query.region
    function sendResponse() {
        let vpcName = subnetList
        return res.send(subnetList)
    }

    loadSubnet(region,vpcId,subnetList,sendResponse)

});

var server = app.listen( process.env.PORT || 3000, function(){
    console.log('Listening on port ' + server.address().port);
});

