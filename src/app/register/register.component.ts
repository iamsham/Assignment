import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  box: any;
  outputExample:any;
  constructor() { }
 
  ngOnInit() {
    this.box='red'
  }
  multi={
    'background':'red'
  }
  //input
@Input() placeholderText:string="Search"

onData(data){
  console.log(data,'data')
  this.outputExample=data
}
}
