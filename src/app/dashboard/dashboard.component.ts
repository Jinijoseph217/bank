import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //login name display
  user="";

//   deposit properties
  // acno="";
  // pswd="";
  // amount="";

  //withdraw properties
  // acno1="";
  // pswd1="";
  // amount1="";

  depositForm = this.fb.group({
        acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
        amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    
    
      })
    
    
      withdrawForm = this.fb.group({
        acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
        amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    
    
      })
      acno: any;
      //router: any;
      SystemDate:any;
    
    //control -ts file model link to html file
      constructor(private fb: FormBuilder, private ds: DataService, private router:Router) {
        this.user = this.ds.currentUser;      //login name display
        this.SystemDate=new Date();
        if(localStorage.getItem('currentUser')){
          this.user=JSON.parse(localStorage.getItem('currentUser') || '')


        }
        console.log(localStorage);
      }

  // //date and time
  // SystemDate:any;

  // constructor(private ds:DataService , private router:Router) {
  //   this.user=this.ds.currentUser;
  //   this.SystemDate= new Date();
  //  }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login');
      this.router.navigateByUrl('');
    }
  }
  deposit(){
    // var acno=this.acno;
    // var pswd=this.pswd;
    // var amount=this.amount;
    if (this.depositForm.valid) {          //validation  for submit button
            var acno = this.depositForm.value.acno;
            var pswd = this.depositForm.value.pswd;
            var amount = this.depositForm.value.amount;
      
    const result=this.ds.deposit(acno,pswd,amount)
    .subscribe((result:any)=>{
      alert(result.message);
    },
    result=>{
      alert(result.error.message)
    })
    
    
    
    
    
  }
  //   if(result){
  //     alert(`${amount} is credited...balance:${result}`);
  //   }

  // }
  // else {
  //         alert('input valid data');
  //         console.log(this.depositForm.get('acno')?.errors);
    
  //       }
    
}
      
  withdraw(){
    // var acno=this.acno1;
    // var pswd=this.pswd1;
    // var amount=this.amount1;
    if (this.withdrawForm.valid) {          //validation  for submit button
            var acno = this.withdrawForm.value.acno1;
            var pswd = this.withdrawForm.value.pswd1;
            var amount = this.withdrawForm.value.amount1;
    const result=this.ds.withdraw(acno,pswd,amount)
  
    .subscribe((result:any)=>{
      alert(result.message);
    },
    result=>{
      alert(result.error.message)
    })
  }
    
  //   if(result){
  //     alert(`${amount} is debited...balance:${result}`);
  //   }


  // }
  // else {
  //       alert('input valid data');
  //       console.log(this.depositForm.get('acno')?.errors);
    
  //     }
    }
  logout(){
    //remove login and user name

    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('token');



    //navigate to login page
    this.router.navigateByUrl('')

  }
  

  delete(){
   this. acno=JSON.parse(localStorage.getItem('currentAcno')|| '')
  }

 onCancel(){
  this.acno="";
 }
 onDelete(event:any){
// alert(event)
this.ds.deleteAcc(event)
.subscribe((result:any)=>{
  alert(result.message);
  this.logout()
},
result=>{
  alert(result.error.message)})
 }


}
