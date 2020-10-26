const express =require('express');
// const connectDB=require('./DB/Connection')
const fetch=require('./fetch/fetch')
const app=express();
var bodyParser = require('body-parser')
// connectDB()

app.use(express.json({ extended: false }));
app.use(bodyParser.json())
// app.use('/api/userModel',require('./API/User'))
// app.use('/api/userGet',require('./API/User'))
const port=process.env.port || 3000;
// app.get('/getUser',connectDB.getUser)
app.get('/',fetch.main)
// app.get('/',(req,res)=>{
//     res.json({"Message":"Helo Heroku"})
// })
app.post('/storeUser',fetch.storeUser)
app.get('/getCandidate',fetch.getCandidate)
app.post('/login',fetch.login)
app.post('/updateCandidate',fetch.updateCandidate)
app.get('/getActiveCandidate',fetch.getActiveCandidate)
app.post('/updateCandidateForActive',fetch.updateCandidateForActive)
app.get('/downloadExcelDashboard',fetch.downloadExcelDashboard)
app.post('/datainsertupdate',fetch.datainsertupdate)
// if(process.env.NODE_ENV === 'production'){

// }
app.listen(process.env.PORT || 3000,()=>console.log("server listening on port",port));
// app.listen(port,()=>console.log("server listening on port",port))
