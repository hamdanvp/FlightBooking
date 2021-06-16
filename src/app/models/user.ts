export class UserModel{
     id:string="3fa85f64-5717-4562-b3fc-2c963f66afa6";
     firstName:string="";
     lastName:string="";
     password:string="";
     confirmPasword:string="";
     userName:string="";
     isAdmin:boolean=false;
     getFullName() {
        return this.firstName + ' ' + this.lastName;
      }
}