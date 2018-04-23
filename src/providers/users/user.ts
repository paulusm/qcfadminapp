/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Local data model for User.
*/
export class User {
    public forename:string; 
    public surname:string;
    public displayname:string;
    public imagepath: string;
    public password: string;
    public isfirstlogin: string;
    
 constructor(
     
     public email:string,
     public role:string,
     public companyid:string,
     public department:string,
     
 )
 {
    
 
 }
 
   
 
 }