import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { //3rd execution

  aim='Your perfect banking partner';
  accounts="Enter your account number here ";
  acno="";
  pswd="";
  
  
  constructor() { } //1st execution

  ngOnInit(): void { //life cycle hooks-(initial process) //2nd execution
  }
userDetails:any={ //object of objects
  1000:{acno:1000,username:'Jayden',password:1000,balance:30000},
  1001:{acno:1001,username:'Jerald',password:1001,balance:20000},
  1002:{acno:1002,username:'Isabel',password:1002,balance:10000},

}
  //userdefined function() //4th execution

acnoChange(event:any){
  // console.log(event)
  console.log(event.target.value)
  this.acno=event.target.value;
}

pswdChange(event:any){
  console.log(event.target.value)
  this.pswd=event.target.value;
}

  login(){
    // alert('Login Cliked')

    var acno=this.acno;
    var pswd=this.pswd;

    var userDetails=this.userDetails;

    if(acno in userDetails)
    {
      if(pswd==userDetails[acno]['password']){
        alert("login successfull");

      }
      else{
        alert("incorrect password")
      }
    }
    else{
      alert("user does not existed")
    }

  }

}