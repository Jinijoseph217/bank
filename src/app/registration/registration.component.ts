import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Data } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // uname="";//properties
  // acno="";
  // pswd="";

  //register model
  registerForm=this.fb.group({//group
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array(*-regular expressions)
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]//array

    //control goes to register.html
  })

  constructor(private fb:FormBuilder,private ds:DataService , private router:Router) { }

  ngOnInit(): void {
  }

  register(){
   // alert("register clicked")
  //  console.log(this.registerForm);
   if(this.registerForm.valid){

   var uname=this.registerForm.value.uname;
   var acno=this.registerForm.value.acno;
   var pswd=this.registerForm.value.pswd;

   const result=this.ds.register(acno,uname,pswd)
   .subscribe((result:any)=>{
    alert(result.message);
    this.router.navigateByUrl('')
   },
   result=>{
    alert(result.error.message);
    this.router.navigateByUrl('registration')
   })

  //  if(result){
  //   alert("successfully registered");
  //   this.router.navigateByUrl('')
  //  }
  //  else{
  //   alert("something went wrong")
  //  }

   

    
  }
  else{
    console.log(this.registerForm.get('uname')?.errors);
   
  }
}

}
