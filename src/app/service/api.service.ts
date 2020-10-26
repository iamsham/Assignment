import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  configUrl='http://localhost:3000'
  constructor(private http: HttpClient) { }

  login(loginData){
    return this.http.post(this.configUrl+'/login',loginData)
  }
  storeCandidate(data){
    return this.http.post(this.configUrl+'/storeUser',data)
  }
  getCandidate(){
    return this.http.get(this.configUrl+'/getCandidate')
  }
  updateCandidate(data){
    return this.http.post(this.configUrl+'/updateCandidate',data)
  }
  getActiveCandidate(){
    return this.http.get(this.configUrl+'/getActiveCandidate')
  }
  updateCandidateForActive(data){
    return this.http.post(this.configUrl+'/updateCandidateForActive',data)
  }
  downloadExcelDashboard(){
    return this.http.get(this.configUrl+'/downloadExcelDashboard', { responseType: 'blob' })
  }

  datainsertupdate(data){
    return this.http.post(this.configUrl+'/datainsertupdate',data)
  }
}
