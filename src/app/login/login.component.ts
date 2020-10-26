import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder,private api: ApiService) { }
  // private api: ApiService
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],

      acceptTerms: [false, Validators.requiredTrue]
    });
  }
  loginUser(data) {
    console.log(data)
    var loginCredentials = {
      email: data.email,
      password: data.password
    }
    return new Promise((resolve, reject) => {

      this.api.login(loginCredentials).subscribe((data: any) => {
        // console.log(data,'data')
        if (data.status == 200) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
    }).then((data) => {
      console.log(data, 'dddata')
  this.router.navigate(['/home'])
    }).catch((err) => {
      if (err.status == 404) {
        alert('login credentials not matched!')
      }
      console.log(err)
    })
  }
}