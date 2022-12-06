import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';
//global http header object
const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  //login name display
  currentUser:any;

  //login accounts number display

  currentAcno:any;

  userDetails: any = { //object of objects
    1000: { acno: 1000, username: 'Jayden', password: 1000, balance: 30000 ,transaction:[]},
    1001: { acno: 1001, username: 'Jerald', password: 1001, balance: 20000 ,transaction:[]},
    1002: { acno: 1002, username: 'Isabel', password: 1002, balance: 10000 ,transaction:[]},

  }

  constructor(private http:HttpClient) { //http injetion
    // this.getDetails() //function call
  }

  //saveDetails() -To store data in the local storage

  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('dataBase',JSON.stringify(this.userDetails));
    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno));
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    }
  }

  //getDetails() - to get data  from the local storage

  // getDetails(){
  //  if(localStorage.getItem('dataBase')){
  //   this.userDetails = JSON.parse(localStorage.getItem('dataBase') || '');
  //  }


  //   }
  //   getcurrentUser(){
  //     if(localStorage.getItem('currentUser')){
  //       this.userDetails = JSON.parse(localStorage.getItem('currentUser') || '');
  //      }
      


  //     }
  //     getcurrentAcno(){
  //       if(localStorage.getItem('currentAcno')){
  //         this.userDetails = JSON.parse(localStorage.getItem('currentAcno') || '');
  //        }
        

  //     }
    
  
 

//register api request

  register(acno: any, username: any, password: any) {
    const data={
      acno,
      password,
      username
    }
   return this.http.post('http://localhost:3000/register',data)
    // let userDetails = this.userDetails;
    // if (acno in userDetails) {
    //   return false;
    // }
    // else {
    //   userDetails[acno] = {
    //     acno,
    //     username,
    //     password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   console.log(userDetails)
    //   this.saveDetails();//function call

    //   return true;
    // }

  }

//login api request
  login(acno: any, pswd: any) {
    const data={
          acno,
          pswd
        }
       return this.http.post('http://localhost:3000/login',data)
        // let userDetails = this.userDetails;
    // if (acno in userDetails) {
    //   if (pswd == userDetails[acno]['password']) {
    //     this.currentUser=this.userDetails[acno]['username']
    //     this.currentAcno=acno;
    //     this.saveDetails();//function call
    //     return true;
    //   }
    //   else {
    //     alert('Incorrect Password');
    //     return false;
    //   }
    // }
    // else {
    //   alert('Invalid User')
    //   return false;
    // }
  }
  getToken(){
    //fetch the token from local storage
    const token =JSON.parse( localStorage.getItem('token') || '')
    //generate request header
    let headers=new HttpHeaders()
    //append token inside the headers
    if(token)
    {
      options.headers=headers.append('x-access-token', token)
    }
    return options
    
  }
  
//deposit api request
  deposit(acno: any, pswd: any, amount: any) {
   
      const data={
            acno,
            pswd,
            amount
          }
         return this.http.post('http://localhost:3000/deposit',data,this.getToken())
    // var userDetails = this.userDetails;
    // var amount = parseInt(amt);
    // if (acno in userDetails) {
    //   if (pswd == userDetails[acno]['password']) {
    //     userDetails[acno]['balance'] += amount;
    //     userDetails[acno]['transaction'].push({
    //       type:'Credit',
    //       amount
    //     })
    //     console.log(userDetails);
    //     this.saveDetails();//function call
    //     return userDetails[acno]['balance'];
    //   }
    //   else {
    //     alert('incorrect password');
    //     return false;
    //   }
    // }
    // else {
    //   alert('invalid user');
    //   return false;
    // }
  }
  withdraw(acno: any, pswd: any, amount: any) {
    const data={
      acno,
      pswd,
      amount
    }
   return this.http.post('http://localhost:3000/withdraw',data,this.getToken())
  //   var userDetails = this.userDetails;
  //   var amount = parseInt(amt);
  //   if (acno in userDetails) {
  //     if (pswd == userDetails[acno]['password']) {
  //       if (userDetails[acno]['balance'] > amount){
  //         userDetails[acno]['balance'] -= amount;
  //         userDetails[acno]['transaction'].push({
  //           type:'Dedit',
  //           amount
  //         })
  //         console.log(userDetails);
  //         this.saveDetails();//function call
  //       return userDetails[acno]['balance'];
  //     }
  //     else {
  //       alert('incorrect password');
  //       return false;
  //     }

  //   }
  // }
  //   else {
  //     alert('invalid user');
  //     return false;
  //   }
  }

  getTransaction(acno:any){
    const data={
      acno
     
    }
   return this.http.post('http://localhost:3000/transaction',data,this.getToken())

  }
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)

  }
}
