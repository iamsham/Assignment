import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ApiService } from '../service/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeData:any
  inActiveData:any=[]
  inActive:boolean=true
  constructor(private api:ApiService) { }

  ngOnInit() {

  //get all existing candidate list

   this.api.getActiveCandidate().subscribe((data:any)=>{
    this.inActiveData=data.data
    console.log(this.inActiveData,'inactive')
   })
  }
  //add new candidate to database
  addCandidate(name,id){
    console.log(name,id)
    var addData={
      name:name,
      id:id,
    }
    console.log(addData)
    this.api.storeCandidate(addData).subscribe((data)=>{
      console.log(data,'data')
    })
  }
  //get div details
  getDivData(event,data,index){
    // console.log(data)
    if(event===true){
      this.inActiveData.push(data)
    }
    if(event===false){
      this.inActiveData.splice(index,1)
    }
    console.log(this.inActiveData,'inActiveData',index,event)
  }
  addData(){
    var reqData=[]
    reqData=this.inActiveData;
    this.inActive=true;
    console.log(reqData,'reqData')
    for(let i=0;i<reqData.length;i++){
      this.api.updateCandidate(reqData).subscribe((data)=>{
        console.log(data)
      })
    }

  }
  getActiveData(event,data,index){
    if(event===true){
      this.activeData.push(data)
    }
    if(event===false){
      this.activeData.splice(index,1)
    }
  }
  addDataActive(){
    var reqData=[]
    reqData=this.activeData;
    this.inActive=true;
    console.log(reqData,'reqData')
    for(let i=0;i<reqData.length;i++){
      this.api.updateCandidateForActive(reqData).subscribe((data)=>{
        console.log(data)
      })
    }
  }
  //tab click event
  tabClick(data) {
console.log(data.index)

if(data.index==1){
  this.api.getCandidate().subscribe((data:any)=>{
    console.log(data)
    this.activeData=data.data;
    console.log(this.activeData)
  })
}
  }
//download excel
  donwloadexcel() {

    
    this.api.downloadExcelDashboard().subscribe((data: any) => {
      console.log(data)
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Candiadte_details.xlsx";
      link.click();
    })
  
}
datainsert(){
  this.api.datainsertupdate(this.inActiveData).subscribe((data: any) => {

     
  })
}
}
