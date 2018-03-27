//Created By Alistair Dewar:20/02/2018
//Type definition for Theme....

import { Storage } from '@ionic/storage';

export class Activity {
   
constructor(
    public activityname:string, 
    public activitydescription:string,
    public activityowner:string,
    public activitytype:string,
    public donationmatch:number,
    public approved:boolean,
    public companyid:string,
    public enddate:string,
    public startdate:string,
    public mydonateurl:string,
    public likes:string[],
    public volunteers:string[],
    public sponsors:string[]
)
{
   

}

  

}