export class UserModel{
     id:string="";
     firstName:string="";
     lastName:string="";
     password:string="";
     userName:string="";
     isAdmin:boolean=false;
     getFullName() {
        return this.firstName + ' ' + this.lastName;
      }
      deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
}