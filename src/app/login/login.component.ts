import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { //3rd execution

  aim='Your perfect banking partner';
  accounts="Enter your account number here ";
  //register model
  loginForm=this.fb.group({//group
    acno:['',[Validators.required]],//array(*-regular expressions)
    pswd:['',[Validators.required]]//array

    //control goes to register.html
  })

  
  
  constructor(private router:Router ,private ds:DataService, private fb:FormBuilder ) { } //1st execution
//dependency injection

  ngOnInit(): void { //life cycle hooks-(initial process) //2nd execution
  }
userDetails:any={ //object of objects
  1000:{acno:1000,username:'Jayden',password:1000,balance:30000},
  1001:{acno:1001,username:'Jerald',password:1001,balance:20000},
  1002:{acno:1002,username:'Isabel',password:1002,balance:10000},

}
  //userdefined function() //4th execution

// acnoChange(event:any){
//   // console.log(event)
//   console.log(event.target.value)
//   this.acno=event.target.value;
// }

// pswdChange(event:any){
//   console.log(event.target.value)
//   this.pswd=event.target.value;
// }

login(){
  // alert("clicked")
  if (this.loginForm.valid) {

    var acno = this.loginForm.value.acno;
    var pswd = this.loginForm.value.pswd;
    const result = this.ds.login(acno, pswd)
      .subscribe((result:any )=>{
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser) )
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno) )
        localStorage.setItem('token',JSON.stringify(result.token) )


        alert(result.message);
        this.router.navigateByUrl('dashboard');
      },
        result=> {
          alert(result.error.message)
          this.router.navigateByUrl('')

        }
      )
  }
}
}



//     if(result){
//     alert("login successfull");
//     this.router.navigateByUrl('dashboard');
//   }
// }
// else{
//   console.log(this.loginForm.get('acno')?.errors);
 


  // login(a:any,p:any){
  //   // alert('Login Cliked')

  //   var acno=a.value;
  //   var pswd=p.value;

  //   var userDetails=this.userDetails;

  //   if(acno in userDetails)
  //   {
  //     if(pswd==userDetails[acno]['password']){
  //       alert("login successfull");

  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
//     else{
//       alert("user does not existed")
//     }

//   }
// }



 