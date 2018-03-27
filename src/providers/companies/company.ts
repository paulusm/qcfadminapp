//Created By Alistair Dewar:20/02/2018
//Type definition for Theme....

import { Storage } from '@ionic/storage';
import { Theme } from '../themes/theme';

export class Company {
   
constructor(
    public companyname:string, 
    public companydescription:string,
    public filename:string,
    public email:string,
    public themes:string[]
)
{
   

}

  

}