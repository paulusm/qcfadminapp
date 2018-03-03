//Created By Alistair Dewar:20/02/2018
//Type definition for Theme....

import { Storage } from '@ionic/storage';


export class Theme {
  constructor(
    public name:string,
    public areaname:string,
    public subject:string,
    public companyname:string,
    public selected:string){
      
    }
    //subThemes:subTheme[];
    

}
export class subTheme{
  area:String;
}