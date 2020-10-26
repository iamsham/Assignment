const express = require('express')
const route = express.Router();
const URI = "mongodb+srv://mahadev:Mtugaon@8575@cluster0.toewd.gcp.mongodb.net/sas?retryWrites=true&w=majority"
const MongoClient = require('mongodb').MongoClient;
const dbName = 'sas';
var db;
var xl = require('excel4node');
//  MongoClient.connect('mongodb://192.168.1.14', function (err, client) { 
MongoClient.connect(process.env.MONGODB_URI || URI, { useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;
    db = client.db(dbName)
    console.log('db connection successfull')
});
route.main = (req, res) => {
    res.json({ Message: "connection successfull to heroku" })
}
route.storeUser = (req, res) => {
    let name = req.body.name;
    let id = req.body.id;
    let status='inActive';
    db.collection('user').insert({ 'name': name, 'id': id,'status':status }).then((data) => {
        res.send({ Message: 'data stored successfully!', status: 200 })
    }).catch((err) => {
        res.send({ Message: err, status: 400 })
    })
}
route.getCandidate = (req, res) => {
    db.collection('user').find({status:'inActive'}).toArray(function (err, results) {
        console.log(results)
        if (err) {
            res.send({ data: err, message: err, status: 400 })
        }
        res.send({ data: results, message: 'successfully fetched data!', status: 200 })
    })
}
route.login=(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    db.collection('register').find({"email":email,"password":password}).toArray(function (err, results) {
        console.log(results)
        if (err) {
            res.send({ data: err, message: err, status: 400 })
        }
if(results.length!=0){
res.send({ data: results, message: 'successfull login!', status: 200 })
}
else{
res.send({ data: results, message: 'Login credentials not found!', status: 404 })
}
        
    })
}
route.updateCandidate=(req,res)=>{
    var reqData=req.body
    for(let i=0;i<reqData.length;i++){
        
        var name=reqData[i].name;
        var id=reqData[i].id;
        console.log(reqData,'name')
        console.log(name,id)
        db.collection('user').updateMany({'name':name,'id':id},{$set:{status:'active'}},function (err, results) {
                console.log(results)
                if (err) {
                        // res.send({ data: err, message: err, status: 400 })
                    }
                    // res.send({ data: results, message: 'successfully updated data!', status: 200 })
                })
            }
}
route.getActiveCandidate=(req,res)=>{
    db.collection('user').find({status:'active'}).toArray(function (err, results) {
        console.log(results)
        if (err) {
            res.send({ data: err, message: err, status: 400 })
        }
        res.send({ data: results, message: 'successfully fetched data!', status: 200 })
    }) 
}
route.updateCandidateForActive=(req,res)=>{
    var reqData=req.body
    for(let i=0;i<reqData.length;i++){
        
        var name=reqData[i].name;
        var id=reqData[i].id;
        console.log(reqData,'name')
        console.log(name,id)
        db.collection('user').updateMany({'name':name,'id':id},{$set:{status:'inActive'}},function (err, results) {
                console.log(results)
                if (err) {
                        // res.send({ data: err, message: err, status: 400 })
                    }
                    // res.send({ data: results, message: 'successfully updated data!', status: 200 })
                })
            }
}
//download excel in dashboard
route.downloadExcelDashboard = (req, res) => {
    db.collection('user').find({status:'active'}).toArray(function (err, results) {
        console.log(results)
        
    var dataexcel = {};
    dataexcel = JSON.stringify(results)
    var wb = new xl.Workbook();
    // Add Worksheets to the workbook
    var ws = wb.addWorksheet('Sheet 1');
    var myStyle = wb.createStyle({
        font: {
            bold: true,
            underline: true,
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
        },
    });
    
    var data = [];
    var data = JSON.parse(dataexcel);
    console.log(data)
    var arraydata = [];
    for (var i = 0; i < data.length; i++) {
        arraydata.push({
            "name": data[i].name, "id": data[i].id
        });
    }
    var myJSON = {}
    myJSON = arraydata;
    var style = wb.createStyle({
        font: {
            color: '#000000',//'#FF0800',
            size: 14,
            bold: true,
        }
    });
    //for heading styles
    var style1 = wb.createStyle({
        font: {
            color: '#000000',//'#FF0800',
            size: 15,
            bold: true,
        }
    });
    
    //for header
  

    ws.cell(2, 1).string('Candidate details  ').style(style1);
    ws.cell(4, 1).string('NAME').style(style);
    ws.cell(4, 2).string('ID').style(style);
   
    //for json data to excel
    for (var i = 0; i < myJSON.length; i++) {
        ws.cell(i + 5, 1).string(myJSON[i].name);
        ws.cell(i + 5, 2).string(myJSON[i].id);
       

    }
    wb.write('ExcelFile1.xlsx', res);





    })
}
route.datainsertupdate = (req, res) => {
    var dataReq=req.body;
    for(let i=0;i<dataReq.length;i++){
        let name = req.body[i].name;
        let id = req.body[i].id;
        let status = req.body[i].status;
        console.log(dataReq,'data')
        db.collection('updated_user').insertMany({ 'name': name, 'id': id,'status':status }).then((data) => {
            // res.send({ Message: 'data stored successfully!', status: 200 })
        }).catch((err) => {
            res.send({ Message: err, status: 400 })
        })
    }
}
module.exports = route;
