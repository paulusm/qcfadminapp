/*
Class created by: Alistair Dewar
Date Created: Feb 2018
Purpose: Local company data model..
*/

import { Storage } from '@ionic/storage';
import { Theme } from '../themes/theme';

export class Company {
   
constructor(
    public _id:string,
    public companyname:string, 
    public companydescription:string,
    public filename:string,
    public email:string,
    public themes:string[],
    public colourtheme:string = 'app-color-theme-3'
)
{
   

}

  

}