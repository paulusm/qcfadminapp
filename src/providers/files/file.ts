//Created By Alistair Dewar:20/02/2018
//Type definition for file....

import { Storage } from '@ionic/storage';


export class File {
    public companyid:string;
    public filename:string;
    public file:string;
    
constructor(companyid:string, filename:string, file:string)
{
    this.companyid = companyid;
    this.filename = filename;
    this.file = file;
    
    
    

}

 

}