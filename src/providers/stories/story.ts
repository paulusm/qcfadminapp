//Created By Alistair Dewar:20/02/2018
//Type definition for Theme....

import { Storage } from '@ionic/storage';

export class Story {
   
constructor(
    public storytitle:string, 
    public story:string,
    public themeid:string,
    public imagepath:string,
    public storyauthor:string,
    public publisheddate:string,
    public likes:string[],
    public type:string
)
{
   

}

  

}