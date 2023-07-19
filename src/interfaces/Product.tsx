import { ICategory } from "./Category";

export interface IProduct {
  _id?: string; 
  categoryId?: string;
  name: string; 
  price: number; 
  image: string; 
  description: string; 
  category?: ICategory; 
}